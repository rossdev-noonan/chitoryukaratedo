"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import type { DownloadCategoryId, DownloadDocumentType } from "@/lib/downloads";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_TYPES_BY_FILE_TYPE: Record<DownloadDocumentType, string[]> = {
  PDF: ["application/pdf"],
  DOC: [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  XLS: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ],
};

const CATEGORY_IDS: DownloadCategoryId[] = [
  "grading-syllabus",
  "membership-forms",
  "technical-documents",
  "rules-guidelines",
];
const FILE_TYPES: DownloadDocumentType[] = ["PDF", "DOC", "XLS"];

const addSchema = z.object({
  categoryId: z.enum(CATEGORY_IDS as [DownloadCategoryId, ...DownloadCategoryId[]]),
  title: z.string().min(1).max(200),
  fileType: z.enum(FILE_TYPES as [DownloadDocumentType, ...DownloadDocumentType[]]),
});

export interface AddDownloadDocumentActionState {
  error: string | null;
  success: boolean;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function addDownloadDocumentAction(
  _prevState: AddDownloadDocumentActionState,
  formData: FormData,
): Promise<AddDownloadDocumentActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can add federation documents.", success: false };
  }

  const parsed = addSchema.safeParse({
    categoryId: formData.get("categoryId"),
    title: formData.get("title"),
    fileType: formData.get("fileType"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission.", success: false };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Attach a file.", success: false };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "File is too large (max 20MB).", success: false };
  }
  if (!ALLOWED_TYPES_BY_FILE_TYPE[parsed.data.fileType].includes(file.type)) {
    return {
      error: `File doesn't look like a ${parsed.data.fileType} — check the file type you selected.`,
      success: false,
    };
  }

  const supabase = await createSupabaseServerClient();
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${parsed.data.categoryId}/${randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("download-documents")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}`, success: false };
  }

  const { error: insertError } = await supabase.from("download_documents").insert({
    category_id: parsed.data.categoryId,
    title: parsed.data.title,
    file_type: parsed.data.fileType,
    file_path: path,
    file_size_label: formatFileSize(file.size),
  });

  if (insertError) {
    return { error: insertError.message, success: false };
  }

  revalidatePath("/admin/downloads");
  revalidatePath("/resources/downloads");
  return { error: null, success: true };
}

export async function deleteDownloadDocumentAction(
  documentId: string,
  filePath: string | null,
): Promise<{ error: string | null }> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can remove federation documents." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("download_documents")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", documentId);

  if (error) return { error: error.message };

  if (filePath) {
    await supabase.storage.from("download-documents").remove([filePath]);
  }

  revalidatePath("/admin/downloads");
  revalidatePath("/resources/downloads");
  return { error: null };
}

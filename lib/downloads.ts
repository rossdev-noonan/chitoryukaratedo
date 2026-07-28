import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DownloadDocumentType = "PDF" | "DOC" | "XLS";
export type DownloadCategoryId =
  | "grading-syllabus"
  | "membership-forms"
  | "technical-documents"
  | "rules-guidelines";

export interface DownloadDocumentRow {
  id: string;
  categoryId: DownloadCategoryId;
  title: string;
  fileType: DownloadDocumentType;
  fileUrl: string | null;
  fileSizeLabel: string | null;
  updatedAt: string;
}

interface RawRow {
  id: string;
  category_id: DownloadCategoryId;
  title: string;
  file_type: DownloadDocumentType;
  file_path: string | null;
  file_size_label: string | null;
  updated_at: string;
}

export async function getDownloadDocuments(): Promise<DownloadDocumentRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("download_documents")
    .select("id, category_id, title, file_type, file_path, file_size_label, updated_at")
    .is("deleted_at", null)
    .order("category_id", { ascending: true })
    .order("sort_order", { ascending: true });

  const rows = (data ?? []) as RawRow[];

  return rows.map((row) => ({
    id: row.id,
    categoryId: row.category_id,
    title: row.title,
    fileType: row.file_type,
    fileUrl: row.file_path
      ? supabase.storage.from("download-documents").getPublicUrl(row.file_path).data.publicUrl
      : null,
    fileSizeLabel: row.file_size_label,
    updatedAt: row.updated_at,
  }));
}

export interface AdminDownloadDocumentRow extends DownloadDocumentRow {
  filePath: string | null;
}

// Admin sees the exact same rows as the public page — there's no separate
// "pending" queue (see 0012's migration comment: no approvals workflow for
// this table) — plus the raw storage path, needed to delete the underlying
// file when a row is removed.
export async function getAdminDownloadDocuments(): Promise<AdminDownloadDocumentRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("download_documents")
    .select("id, category_id, title, file_type, file_path, file_size_label, updated_at")
    .is("deleted_at", null)
    .order("category_id", { ascending: true })
    .order("sort_order", { ascending: true });

  const rows = (data ?? []) as RawRow[];

  return rows.map((row) => ({
    id: row.id,
    categoryId: row.category_id,
    title: row.title,
    fileType: row.file_type,
    filePath: row.file_path,
    fileUrl: row.file_path
      ? supabase.storage.from("download-documents").getPublicUrl(row.file_path).data.publicUrl
      : null,
    fileSizeLabel: row.file_size_label,
    updatedAt: row.updated_at,
  }));
}

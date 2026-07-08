"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getCurrentUser } from "@/lib/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const submitSchema = z.object({
  teacherId: z.string().uuid(),
  dojoId: z.string().uuid(),
  rankClaimed: z.string().min(1).max(100),
  issuedBy: z.string().max(200).optional(),
  issuedDate: z.string().optional(),
});

export interface SubmitRankEvidenceActionState {
  error: string | null;
  success: boolean;
}

export async function submitRankEvidenceAction(
  _prevState: SubmitRankEvidenceActionState,
  formData: FormData,
): Promise<SubmitRankEvidenceActionState> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { error: "You must be logged in.", success: false };
  }

  const parsed = submitSchema.safeParse({
    teacherId: formData.get("teacherId"),
    dojoId: formData.get("dojoId"),
    rankClaimed: formData.get("rankClaimed"),
    issuedBy: formData.get("issuedBy") || undefined,
    issuedDate: formData.get("issuedDate") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission.", success: false };
  }

  if (currentUser.role === "country_admin") {
    return { error: "Country Admins cannot submit rank evidence.", success: false };
  }
  if (currentUser.role === "dojo_admin" && currentUser.dojoId !== parsed.data.dojoId) {
    return {
      error: "You can only submit rank evidence for teachers at your own dojo.",
      success: false,
    };
  }
  if (currentUser.role === "teacher" && currentUser.teacherId !== parsed.data.teacherId) {
    return { error: "You can only submit rank evidence for yourself.", success: false };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Attach a file.", success: false };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { error: "File is too large (max 10MB).", success: false };
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: "Only PDF, JPG, or PNG files are accepted.", success: false };
  }

  const supabase = await createSupabaseServerClient();
  const extension = file.name.split(".").pop() ?? "bin";
  const path = `${currentUser.id}/${randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("rank-evidence")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}`, success: false };
  }

  const { error: insertError } = await supabase.from("rank_evidence").insert({
    teacher_id: parsed.data.teacherId,
    rank_claimed: parsed.data.rankClaimed,
    issued_by: parsed.data.issuedBy ?? null,
    issued_date: parsed.data.issuedDate || null,
    file_path: path,
    submitted_by: currentUser.id,
  });

  if (insertError) {
    return { error: insertError.message, success: false };
  }

  revalidatePath("/admin/rank-evidence");
  return { error: null, success: true };
}

export async function reviewRankEvidenceAction(
  rankEvidenceId: string,
  decision: "approved" | "rejected",
): Promise<{ error: string | null }> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can review rank evidence." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("rank_evidence")
    .update({
      status: decision,
      reviewed_by: currentUser.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", rankEvidenceId);

  if (error) return { error: error.message };

  revalidatePath("/admin/rank-evidence");
  return { error: null };
}

export async function getRankEvidenceSignedUrlAction(
  rankEvidenceId: string,
): Promise<{ url: string | null; error: string | null }> {
  const currentUser = await getCurrentUser();
  if (!currentUser) return { url: null, error: "You must be logged in." };

  const supabase = await createSupabaseServerClient();
  // RLS (rank_evidence_select) already ensures this row only comes back if
  // the current user is sohonbu_admin, the original submitter, or the
  // teacher this record belongs to.
  const { data: row } = await supabase
    .from("rank_evidence")
    .select("id, file_path")
    .eq("id", rankEvidenceId)
    .maybeSingle();

  if (!row) return { url: null, error: "Not found or not permitted." };

  const admin = createSupabaseAdminClient();
  const { data: signed, error } = await admin.storage
    .from("rank-evidence")
    .createSignedUrl(row.file_path, 60);

  if (error || !signed) return { url: null, error: error?.message ?? "Failed to sign URL." };

  return { url: signed.signedUrl, error: null };
}

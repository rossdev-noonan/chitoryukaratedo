"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const TABLE_BY_ENTITY: Record<string, string> = {
  country: "countries",
  dojo: "dojos",
  teacher: "teachers",
  rank_evidence: "rank_evidence",
};

export async function reviewApprovalAction(
  approvalId: string,
  decision: "approved" | "rejected",
): Promise<{ error: string | null }> {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "sohonbu_admin") {
    return { error: "Only Sohonbu Admin can review approvals." };
  }

  const supabase = await createSupabaseServerClient();
  const { data: approval } = await supabase
    .from("approvals")
    .select("id, entity_type, entity_id, action, payload, status")
    .eq("id", approvalId)
    .maybeSingle();

  if (!approval || approval.status !== "pending") {
    return { error: "This approval no longer exists or was already reviewed." };
  }

  if (decision === "approved") {
    const table = TABLE_BY_ENTITY[approval.entity_type];
    const payload = approval.payload as Record<string, unknown>;

    if (approval.action === "create") {
      const { error } = await supabase.from(table).insert({ ...payload, status: "approved" });
      if (error) return { error: `Failed to create record: ${error.message}` };
    } else if (approval.action === "update" && approval.entity_id) {
      const { error } = await supabase
        .from(table)
        .update({ ...payload, status: "approved" })
        .eq("id", approval.entity_id);
      if (error) return { error: `Failed to update record: ${error.message}` };
    } else if (approval.action === "delete" && approval.entity_id) {
      const { error } = await supabase
        .from(table)
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", approval.entity_id);
      if (error) return { error: `Failed to delete record: ${error.message}` };
    }
  }

  const { error: reviewError } = await supabase
    .from("approvals")
    .update({
      status: decision,
      reviewed_by: currentUser.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", approvalId);

  if (reviewError) return { error: reviewError.message };

  revalidatePath("/admin/approvals");
  revalidatePath("/admin");
  revalidatePath("/dojo-directory");
  revalidatePath("/teachers");

  return { error: null };
}

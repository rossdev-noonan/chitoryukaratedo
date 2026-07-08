import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ApprovalEntity = "country" | "dojo" | "teacher" | "rank_evidence";
export type ApprovalAction = "create" | "update" | "delete";
export type ApprovalStatus = "pending" | "approved" | "rejected";

export interface ApprovalRow {
  id: string;
  entityType: ApprovalEntity;
  entityId: string | null;
  action: ApprovalAction;
  payload: Record<string, unknown>;
  submittedBy: string;
  submittedByEmail: string | null;
  status: ApprovalStatus;
  createdAt: string;
}

interface RawApprovalRow {
  id: string;
  entity_type: ApprovalEntity;
  entity_id: string | null;
  action: ApprovalAction;
  payload: Record<string, unknown>;
  submitted_by: string;
  status: ApprovalStatus;
  created_at: string;
}

export async function getApprovals(): Promise<ApprovalRow[]> {
  const supabase = await createSupabaseServerClient();

  const { data: rows } = await supabase
    .from("approvals")
    .select("id, entity_type, entity_id, action, payload, submitted_by, status, created_at")
    .order("created_at", { ascending: false });

  const approvals = (rows ?? []) as RawApprovalRow[];
  const submitterIds = [...new Set(approvals.map((row) => row.submitted_by))];

  const emailById = new Map<string, string>();
  if (submitterIds.length > 0) {
    const { data: users } = await supabase
      .from("users")
      .select("id, email")
      .in("id", submitterIds);
    for (const user of users ?? []) {
      emailById.set(user.id, user.email);
    }
  }

  return approvals.map((row) => ({
    id: row.id,
    entityType: row.entity_type,
    entityId: row.entity_id,
    action: row.action,
    payload: row.payload,
    submittedBy: row.submitted_by,
    submittedByEmail: emailById.get(row.submitted_by) ?? null,
    status: row.status,
    createdAt: row.created_at,
  }));
}

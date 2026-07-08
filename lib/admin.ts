import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface DashboardOverview {
  pendingApprovals: number;
  approvedThisWeek: number;
  activeAdmins: number;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  tableName: string;
  recordId: string | null;
  createdAt: string;
}

function startOfWeekIso(): string {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = (day + 6) % 7; // days since Monday
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() - diff);
  monday.setUTCHours(0, 0, 0, 0);
  return monday.toISOString();
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  const supabase = await createSupabaseServerClient();

  const [pending, approved, admins] = await Promise.all([
    supabase.from("approvals").select("id", { count: "exact", head: true }).eq("status", "pending"),
    supabase
      .from("approvals")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved")
      .gte("reviewed_at", startOfWeekIso()),
    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .in("role", ["sohonbu_admin", "country_admin", "dojo_admin"]),
  ]);

  return {
    pendingApprovals: pending.count ?? 0,
    approvedThisWeek: approved.count ?? 0,
    activeAdmins: admins.count ?? 0,
  };
}

export async function getRecentAuditLog(limit = 10): Promise<AuditLogEntry[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("audit_logs")
    .select("id, action, table_name, record_id, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []).map((row) => ({
    id: row.id,
    action: row.action,
    tableName: row.table_name,
    recordId: row.record_id,
    createdAt: row.created_at,
  }));
}

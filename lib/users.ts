import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/lib/auth";

export interface AdminUserRow {
  id: string;
  email: string;
  fullName: string | null;
  role: AppRole;
  createdAt: string;
}

interface RawUserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  created_at: string;
}

export async function getAllUsers(): Promise<AdminUserRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("users")
    .select("id, email, full_name, role, created_at")
    .order("created_at", { ascending: false });

  return ((data ?? []) as RawUserRow[]).map((row) => ({
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    createdAt: row.created_at,
  }));
}

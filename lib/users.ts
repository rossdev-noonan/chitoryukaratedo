import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/lib/auth";

export interface AdminUserRow {
  id: string;
  email: string;
  fullName: string | null;
  role: AppRole;
  countryId: string | null;
  dojoId: string | null;
  teacherId: string | null;
  createdAt: string;
}

interface RawUserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  country_id: string | null;
  dojo_id: string | null;
  teacher_id: string | null;
  created_at: string;
}

export async function getAllUsers(): Promise<AdminUserRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("users")
    .select("id, email, full_name, role, country_id, dojo_id, teacher_id, created_at")
    .order("created_at", { ascending: false });

  return ((data ?? []) as RawUserRow[]).map((row) => ({
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    role: row.role,
    countryId: row.country_id,
    dojoId: row.dojo_id,
    teacherId: row.teacher_id,
    createdAt: row.created_at,
  }));
}

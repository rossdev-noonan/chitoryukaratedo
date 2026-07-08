import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AppRole = "sohonbu_admin" | "country_admin" | "dojo_admin" | "teacher";

interface UserRow {
  id: string;
  email: string;
  full_name: string | null;
  role: AppRole;
  country_id: string | null;
  dojo_id: string | null;
  teacher_id: string | null;
}

export interface CurrentUser {
  id: string;
  email: string;
  fullName: string | null;
  role: AppRole;
  countryId: string | null;
  dojoId: string | null;
  teacherId: string | null;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  const { data } = await supabase
    .from("users")
    .select("id, email, full_name, role, country_id, dojo_id, teacher_id")
    .eq("id", authUser.id)
    .maybeSingle<UserRow>();

  if (!data) return null;

  return {
    id: data.id,
    email: data.email,
    fullName: data.full_name,
    role: data.role,
    countryId: data.country_id,
    dojoId: data.dojo_id,
    teacherId: data.teacher_id,
  };
}

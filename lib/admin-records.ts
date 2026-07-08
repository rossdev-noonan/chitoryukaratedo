import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ApprovalStatus } from "@/lib/approvals";

export interface AdminDojoRow {
  id: string;
  slug: string;
  name: string;
  city: string | null;
  headInstructor: string | null;
  status: ApprovalStatus;
}

export interface AdminTeacherRow {
  id: string;
  slug: string;
  nameRomaji: string | null;
  rank: string | null;
  status: ApprovalStatus;
}

export async function getAllDojosForAdmin(): Promise<AdminDojoRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("dojos")
    .select("id, slug, name, city, head_instructor, status")
    .is("deleted_at", null)
    .order("name");

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    city: row.city,
    headInstructor: row.head_instructor,
    status: row.status,
  }));
}

export async function getAllTeachersForAdmin(): Promise<AdminTeacherRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("teachers")
    .select("id, slug, name_romaji_final, rank, status")
    .is("deleted_at", null)
    .order("name_romaji_final");

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    nameRomaji: row.name_romaji_final,
    rank: row.rank,
    status: row.status,
  }));
}

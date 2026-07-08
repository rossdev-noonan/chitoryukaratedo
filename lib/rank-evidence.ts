import { createSupabaseServerClient } from "@/lib/supabase/server";

export type RankEvidenceStatus = "pending" | "approved" | "rejected";

export interface RankEvidenceRow {
  id: string;
  teacherId: string;
  teacherName: string | null;
  rankClaimed: string;
  issuedBy: string | null;
  issuedDate: string | null;
  filePath: string;
  status: RankEvidenceStatus;
  submittedBy: string;
  createdAt: string;
}

interface RawRow {
  id: string;
  teacher_id: string;
  rank_claimed: string;
  issued_by: string | null;
  issued_date: string | null;
  file_path: string;
  status: RankEvidenceStatus;
  submitted_by: string;
  created_at: string;
  teachers: { name_romaji_final: string | null } | null;
}

export async function getRankEvidenceForCurrentUser(): Promise<RankEvidenceRow[]> {
  const supabase = await createSupabaseServerClient();

  // RLS already scopes this to what the current user is allowed to see
  // (sohonbu_admin: all, submitter: own, teacher: their own record) — see
  // rank_evidence_select in supabase/migrations/0001_init_schema.sql.
  const { data } = await supabase
    .from("rank_evidence")
    .select(
      "id, teacher_id, rank_claimed, issued_by, issued_date, file_path, status, submitted_by, created_at, teachers(name_romaji_final)",
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as unknown as RawRow[];

  return rows.map((row) => ({
    id: row.id,
    teacherId: row.teacher_id,
    teacherName: row.teachers?.name_romaji_final ?? null,
    rankClaimed: row.rank_claimed,
    issuedBy: row.issued_by,
    issuedDate: row.issued_date,
    filePath: row.file_path,
    status: row.status,
    submittedBy: row.submitted_by,
    createdAt: row.created_at,
  }));
}

export interface RankEvidenceTeacherOption {
  id: string;
  name: string | null;
  dojoId: string;
}

export async function getTeachersForRankEvidenceForm(): Promise<RankEvidenceTeacherOption[]> {
  const supabase = await createSupabaseServerClient();

  // teachers_admin_select RLS already scopes this per role, so the query
  // just needs the columns — no manual filtering required here.
  const { data } = await supabase
    .from("teachers")
    .select("id, name_romaji_final, dojo_id")
    .is("deleted_at", null)
    .order("name_romaji_final");

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name_romaji_final,
    dojoId: row.dojo_id,
  }));
}

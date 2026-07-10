import type { Metadata } from "next";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubmitTeacherForm } from "@/components/admin/SubmitTeacherForm";
import { getAllDojosForAdmin, getAllTeachersForAdmin } from "@/lib/admin-records";

export const metadata: Metadata = {
  title: "Admin — Teachers",
  robots: { index: false, follow: false },
};

export default async function AdminTeachersPage() {
  const [teachers, dojos] = await Promise.all([getAllTeachersForAdmin(), getAllDojosForAdmin()]);

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Teacher records
      </h1>
      {teachers.length === 0 ? (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No teacher records yet.
        </p>
      ) : (
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2">Name (Romaji)</th>
              <th className="py-2">Rank</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="border-border border-b">
                <td className="py-2">{teacher.nameRomaji ?? "—"}</td>
                <td className="py-2">{teacher.rank ?? "—"}</td>
                <td className="py-2">
                  <StatusBadge status={teacher.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
        Submit a new teacher
      </h2>
      <p className="text-muted-foreground mt-1 text-xs">
        Goes to the approval queue — it won&apos;t appear publicly until Sohonbu Admin approves it.
        Rank evidence upload is a separate, later piece.
      </p>
      <SubmitTeacherForm dojos={dojos} teachers={teachers} />
    </>
  );
}

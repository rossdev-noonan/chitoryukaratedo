import type { Metadata } from "next";

import { StatusBadge } from "@/components/admin/StatusBadge";
import { getAllTeachersForAdmin } from "@/lib/admin-records";

export const metadata: Metadata = {
  title: "Admin — Teachers",
  robots: { index: false, follow: false },
};

export default async function AdminTeachersPage() {
  const teachers = await getAllTeachersForAdmin();

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
      <p className="text-muted-foreground mt-3 text-xs">
        Rank evidence upload and the Japanese/Romaji approval workflow land in a later pass.
      </p>
    </>
  );
}

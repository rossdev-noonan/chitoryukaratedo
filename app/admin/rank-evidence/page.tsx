import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { RankEvidenceActions } from "@/components/admin/RankEvidenceActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SubmitRankEvidenceForm } from "@/components/admin/SubmitRankEvidenceForm";
import { getCurrentUser } from "@/lib/auth";
import { getRankEvidenceForCurrentUser, getTeachersForRankEvidenceForm } from "@/lib/rank-evidence";

export const metadata: Metadata = {
  title: "Admin — Rank Evidence",
  robots: { index: false, follow: false },
};

export default async function AdminRankEvidencePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/login");

  const canSubmit = currentUser.role !== "country_admin";
  const canReview = currentUser.role === "sohonbu_admin";

  const [rows, teachers] = await Promise.all([
    getRankEvidenceForCurrentUser(),
    canSubmit ? getTeachersForRankEvidenceForm() : Promise.resolve([]),
  ]);

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Rank evidence
      </h1>
      <p className="text-muted-foreground mt-1 text-xs">
        Private — never public. Evidence files can only be opened by Sohonbu Admin, the submitter,
        or the teacher the record belongs to.
      </p>
      {rows.length === 0 ? (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No rank evidence records yet.
        </p>
      ) : (
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2">Teacher</th>
              <th className="py-2">Rank claimed</th>
              <th className="py-2">Issued by</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-border border-b">
                <td className="py-2">{row.teacherName ?? "—"}</td>
                <td className="py-2">{row.rankClaimed}</td>
                <td className="py-2">{row.issuedBy ?? "—"}</td>
                <td className="py-2">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-2">
                  <RankEvidenceActions
                    rankEvidenceId={row.id}
                    canReview={canReview && row.status === "pending"}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {canSubmit && (
        <>
          <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
            Submit rank evidence
          </h2>
          <p className="text-muted-foreground mt-1 text-xs">
            Goes to Sohonbu Admin for review before it counts as verified.
          </p>
          <SubmitRankEvidenceForm teachers={teachers} />
        </>
      )}
    </>
  );
}

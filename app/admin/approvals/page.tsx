import type { Metadata } from "next";

import { ApprovalActions } from "@/components/admin/ApprovalActions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getApprovals } from "@/lib/approvals";

export const metadata: Metadata = {
  title: "Admin — Approvals",
  robots: { index: false, follow: false },
};

function recordLabel(payload: Record<string, unknown>, entityId: string | null): string {
  if (typeof payload.name === "string") return payload.name;
  if (typeof payload.slug === "string") return payload.slug;
  return entityId ?? "—";
}

export default async function AdminApprovalsPage() {
  const approvals = await getApprovals();

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Approval queue
      </h1>
      {approvals.length === 0 ? (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No submissions yet.
        </p>
      ) : (
        <table className="mt-3 w-full border-collapse text-sm">
          <thead>
            <tr className="border-border border-b text-left">
              <th className="py-2">Type</th>
              <th className="py-2">Record</th>
              <th className="py-2">Submitted by</th>
              <th className="py-2">Status</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map((row) => (
              <tr key={row.id} className="border-border border-b align-top">
                <td className="py-2 capitalize">
                  {row.action} {row.entityType.replace("_", " ")}
                </td>
                <td className="py-2">{recordLabel(row.payload, row.entityId)}</td>
                <td className="py-2">{row.submittedByEmail ?? "—"}</td>
                <td className="py-2">
                  <StatusBadge status={row.status} />
                </td>
                <td className="py-2">
                  {row.status === "pending" ? (
                    <ApprovalActions approvalId={row.id} />
                  ) : (
                    <span className="text-muted-foreground text-xs">Reviewed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="text-muted-foreground mt-3 text-xs">
        Every decision writes an audit log entry automatically (append-only, non-editable).
      </p>
    </>
  );
}

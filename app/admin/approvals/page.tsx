import type { Metadata } from "next";

import { StatusBadge } from "@/components/admin/StatusBadge";

export const metadata: Metadata = {
  title: "Admin — Approvals",
  robots: { index: false, follow: false },
};

const mockApprovalRows = [
  { type: "Dojo", record: "—", submittedBy: "Country Admin", status: "pending" as const },
  { type: "Teacher rank", record: "—", submittedBy: "Dojo Admin", status: "approved" as const },
  { type: "Country", record: "—", submittedBy: "Sohonbu", status: "rejected" as const },
];

export default function AdminApprovalsPage() {
  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Approval queue
      </h1>
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
          {mockApprovalRows.map((row) => (
            <tr key={`${row.type}-${row.submittedBy}`} className="border-border border-b">
              <td className="py-2">{row.type}</td>
              <td className="py-2">{row.record}</td>
              <td className="py-2">{row.submittedBy}</td>
              <td className="py-2">
                <StatusBadge status={row.status} />
              </td>
              <td className="text-muted-foreground py-2">Approve / Reject</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-muted-foreground mt-3 text-xs">
        Every row must produce an audit log entry on decision — append-only, non-editable. Pending
        Supabase integration (Phase 4).
      </p>
    </>
  );
}

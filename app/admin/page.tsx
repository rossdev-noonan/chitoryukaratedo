import type { Metadata } from "next";

import { getDashboardOverview, getRecentAuditLog } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const [overview, auditLog] = await Promise.all([getDashboardOverview(), getRecentAuditLog()]);

  const overviewCards = [
    { label: "Pending approvals", value: overview.pendingApprovals },
    { label: "Approved this week", value: overview.approvedThisWeek },
    { label: "Active admins", value: overview.activeAdmins },
  ];

  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Overview
      </h1>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {overviewCards.map((card) => (
          <div key={card.label} className="border-border border p-4 text-sm">
            <p className="text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-lg font-medium">{card.value}</p>
          </div>
        ))}
      </div>
      <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
        Recent activity (audit log excerpt)
      </h2>
      {auditLog.length > 0 ? (
        <ul className="mt-3">
          {auditLog.map((entry) => (
            <li key={entry.id} className="border-border border-b py-2 text-sm">
              <span className="font-medium">{entry.action}</span> on{" "}
              <span className="text-muted-foreground">{entry.tableName}</span>
              {entry.recordId && <span className="text-muted-foreground"> · {entry.recordId}</span>}
              <span className="text-muted-foreground float-right text-xs">
                {new Date(entry.createdAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
          No activity logged yet.
        </p>
      )}
    </>
  );
}

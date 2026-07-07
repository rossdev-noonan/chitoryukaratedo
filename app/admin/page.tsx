import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const overviewCards = [
  { label: "Pending approvals", value: "—" },
  { label: "Approved this week", value: "—" },
  { label: "Active admins", value: "—" },
];

export default function AdminDashboardPage() {
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
      <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
        Read-only log rows pending Supabase audit log integration (Phase 4).
      </p>
    </>
  );
}

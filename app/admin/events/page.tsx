import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Events",
  robots: { index: false, follow: false },
};

export default function AdminEventsPage() {
  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Events management
      </h1>
      <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
        Pending Sanity Studio integration (Phase 2) — event content is authored in Sanity, not here.
      </p>
    </>
  );
}

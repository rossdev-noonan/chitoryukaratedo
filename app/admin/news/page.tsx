import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — News",
  robots: { index: false, follow: false },
};

export default function AdminNewsPage() {
  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        News management
      </h1>
      <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
        Pending Sanity Studio integration (Phase 2) — news content is authored in Sanity, not here.
      </p>
    </>
  );
}

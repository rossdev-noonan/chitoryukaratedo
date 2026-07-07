import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Dojos",
  robots: { index: false, follow: false },
};

export default function AdminDojosPage() {
  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Dojo submissions &amp; records
      </h1>
      <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
        Pending Supabase integration (Phase 3/4) — dojo CRUD and scoped submit permissions land
        here.
      </p>
    </>
  );
}

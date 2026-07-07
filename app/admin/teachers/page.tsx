import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Teachers",
  robots: { index: false, follow: false },
};

export default function AdminTeachersPage() {
  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Teacher records
      </h1>
      <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
        Pending Supabase integration (Phase 3/4) — teacher CRUD, rank evidence upload, and
        Japanese/Romaji fields land here.
      </p>
    </>
  );
}

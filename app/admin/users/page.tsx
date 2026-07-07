import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Users",
  robots: { index: false, follow: false },
};

export default function AdminUsersPage() {
  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        User &amp; role management
      </h1>
      <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
        Sohonbu Admin only. Pending Supabase Auth integration (Phase 4) — invite-only user creation,
        no open signup.
      </p>
    </>
  );
}

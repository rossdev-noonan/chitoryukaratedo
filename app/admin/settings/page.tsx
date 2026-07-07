import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Settings",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <>
      <h1 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
        Settings
      </h1>
      <p className="border-border text-muted-foreground mt-3 border p-4 text-sm">
        Pending Phase 4 — Sohonbu Admin only.
      </p>
    </>
  );
}

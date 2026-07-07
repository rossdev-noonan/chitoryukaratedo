import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chito-Ryu International",
  description:
    "The official international home for Chito-Ryu — lineage, dojo directory, and teacher registry.",
};

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Chito-Ryu International</h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        This page is a structural placeholder for Phase 1 (Project Foundation). Final content —
        lineage, leadership, directory, and news — lands in Phase 2 once Sanity content and design
        tokens are in place.
      </p>
    </div>
  );
}

import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Bogu Kumite",
  description: "Rules and guidance for Bogu Kumite.",
};

export default function BoguKumitePage() {
  return (
    <>
      <PageHeader
        title="Bogu Kumite"
        description="Copy pending — this page is owned by Sanity and will be authored by the content team."
      />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

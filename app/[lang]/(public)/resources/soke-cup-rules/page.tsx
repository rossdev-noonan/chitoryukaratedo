import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Soke Cup Rules",
  description: "Official rules for the Soke Cup.",
};

export default function SokeCupRulesPage() {
  return (
    <>
      <PageHeader
        title="Soke Cup Rules"
        description="Copy pending — this page is owned by Sanity and will be authored by the content team."
      />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

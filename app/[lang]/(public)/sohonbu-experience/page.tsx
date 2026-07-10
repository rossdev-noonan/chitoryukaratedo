import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Sohonbu Experience",
  description: "Training at the Sohonbu in Tsuboi, Kumamoto City, Japan.",
};

export default function SohonbuExperiencePage() {
  return (
    <>
      <PageHeader
        title="Sohonbu Experience"
        description="Copy pending — this page is owned by Sanity and will be authored by the content team."
      />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "About Chito-Ryu",
  description: "About Chito-Ryu karate and the international federation.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Chito-Ryu"
        description="Copy pending — this page is owned by Sanity and will be authored by the content team."
      />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

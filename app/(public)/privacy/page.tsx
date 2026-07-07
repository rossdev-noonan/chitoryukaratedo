import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Chito-Ryu International.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        description="Copy pending — this page is owned by Sanity and will be authored by the content team."
      />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "History",
  description: "The history of Chito-Ryu karate.",
};

export default function HistoryPage() {
  return (
    <>
      <PageHeader
        title="History"
        description="Copy pending — this page is owned by Sanity and will be authored by the content team."
      />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

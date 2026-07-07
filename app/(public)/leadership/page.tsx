import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The Chito-Ryu Soke lineage and current leadership.",
};

const lineage = [
  { generation: "Founder (O-Sensei)", name: "— (placeholder, pending Sanity content)" },
  { generation: "2nd Generation Soke", name: "— (placeholder, pending Sanity content)" },
  { generation: "3rd Generation Soke", name: "— (placeholder, pending Sanity content)" },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        title="Leadership"
        description="The three-generation Soke lineage. Dates and names are Sanity-authored content, pending."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ol className="mt-8 flex flex-col gap-4">
          {lineage.map((entry) => (
            <li key={entry.generation} className="border-border border-l-2 pl-4">
              <p className="text-muted-foreground text-sm">{entry.generation}</p>
              <p className="font-medium">{entry.name}</p>
            </li>
          ))}
        </ol>
      </div>
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

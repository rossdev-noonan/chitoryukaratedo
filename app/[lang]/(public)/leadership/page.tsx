import type { Metadata } from "next";
import Image from "next/image";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The Chito-Ryu Soke lineage and current leadership.",
};

const lineage = [
  {
    generation: "Founder (O-Sensei)",
    name: "— (placeholder, pending Sanity content)",
    photoSrc: "/images/leadership/founder-soke.png",
  },
  {
    generation: "2nd Generation Soke",
    name: "— (placeholder, pending Sanity content)",
    photoSrc: "/images/leadership/nidaime-soke.png",
  },
  {
    generation: "3rd Generation Soke",
    name: "— (placeholder, pending Sanity content)",
    photoSrc: "/images/leadership/sandaime-soke.png",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <PageHeader
        title="Leadership"
        description="The three-generation Soke lineage. Dates and names are Sanity-authored content, pending."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ol className="mt-8 flex flex-col gap-6">
          {lineage.map((entry) => (
            <li key={entry.generation} className="flex items-center gap-4 border-l-2 border-border pl-4">
              <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-full">
                <Image
                  src={entry.photoSrc}
                  alt={entry.generation}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
              <div>
                <p className="text-muted-foreground text-sm">{entry.generation}</p>
                <p className="font-medium">{entry.name}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

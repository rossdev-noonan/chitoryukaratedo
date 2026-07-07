import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { mockCountries } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "World Dojo Directory",
  description: "Approved Chito-Ryu dojos and federations worldwide.",
};

export default function DojoDirectoryPage() {
  return (
    <>
      <PageHeader
        title="World Dojo Directory"
        description="Search and filter are not wired up yet — country list below is mock data."
      />
      <ul className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {mockCountries.map((country) => (
          <li key={country.slug} className="border-border border-b py-3">
            <Link
              href={`/dojo-directory/${country.slug}`}
              className="text-sm underline underline-offset-4"
            >
              {country.name}
            </Link>
            {country.hasOwnFederationSite && (
              <span className="text-muted-foreground ml-2 text-xs">(own federation site)</span>
            )}
          </li>
        ))}
      </ul>
      <PlaceholderNotice source="Supabase (approved records only)" />
    </>
  );
}

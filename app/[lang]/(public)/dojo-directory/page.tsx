import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getCountries } from "@/lib/directory";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "World Dojo Directory",
  description: "Approved Chito-Ryu dojos and federations worldwide.",
};

interface DojoDirectoryPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function DojoDirectoryPage({ params }: DojoDirectoryPageProps) {
  const { lang } = await params;
  const countries = await getCountries();

  return (
    <>
      <PageHeader
        title="World Dojo Directory"
        description="Search and filter are not wired up yet — country list below is live but unstyled."
      />
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {countries.map((country) => (
          <Link
            key={country.slug}
            href={`/${lang}/dojo-directory/${country.slug}`}
            className="border-border bg-background flex items-center justify-between gap-2 border p-4 text-sm transition-colors hover:bg-black/[0.02]"
          >
            <span className="font-medium">{country.name}</span>
            {country.hasOwnFederationSite && (
              <span className="text-muted-foreground shrink-0 text-xs">Own federation site</span>
            )}
          </Link>
        ))}
      </div>
      <PlaceholderNotice source="Supabase (approved records only)" />
    </>
  );
}

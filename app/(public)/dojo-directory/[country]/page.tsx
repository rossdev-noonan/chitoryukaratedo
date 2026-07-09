import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DojoCard } from "@/components/public/DojoCard";
import { FederationCard } from "@/components/public/FederationCard";
import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { SearchBox } from "@/components/public/SearchBox";
import { getCountryBySlug, getDojosByCountryId, searchDojosByCountryId } from "@/lib/directory";

interface CountryPageProps {
  params: Promise<{ country: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { country } = await params;
  const match = await getCountryBySlug(country);
  return { title: match?.name ?? "Country" };
}

export default async function CountryPage({ params, searchParams }: CountryPageProps) {
  const { country } = await params;
  const { q } = await searchParams;
  const match = await getCountryBySlug(country);

  if (!match) notFound();

  const dojos = match.hasOwnFederationSite
    ? []
    : q
      ? await searchDojosByCountryId(match.id, q)
      : await getDojosByCountryId(match.id);

  return (
    <>
      <PageHeader title={match.name} />
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {match.hasOwnFederationSite ? (
          <FederationCard country={match} />
        ) : (
          <>
            <SearchBox placeholder="Search dojos…" initialQuery={q ?? ""} />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {dojos.length === 0 ? (
                <p className="text-muted-foreground col-span-full text-sm">No dojos found.</p>
              ) : (
                dojos.map((dojo) => <DojoCard key={dojo.slug} dojo={dojo} />)
              )}
            </div>
          </>
        )}
      </div>
      <PlaceholderNotice source="Supabase (approved records only)" />
    </>
  );
}

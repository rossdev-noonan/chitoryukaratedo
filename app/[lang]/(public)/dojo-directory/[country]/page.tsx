import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DojoCard } from "@/components/public/DojoCard";
import { FederationCard } from "@/components/public/FederationCard";
import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import { SearchBox } from "@/components/public/SearchBox";
import {
  getCountryBySlug,
  getDojosByCountryId,
  searchDojosByCountryId,
  type Dojo,
} from "@/lib/directory";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";
import { checkSearchRateLimit } from "@/lib/rate-limit";

interface CountryPageProps {
  params: Promise<{ lang: Locale; country: string }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { lang, country } = await params;
  const match = await getCountryBySlug(country);
  if (!match) return { title: "Country" };

  return {
    title: match.name,
    description: `Approved Chito-Ryu dojos in ${match.name}.`,
    alternates: localeAlternates(lang, `/dojo-directory/${match.slug}`),
  };
}

export default async function CountryPage({ params, searchParams }: CountryPageProps) {
  const { lang, country } = await params;
  const { q } = await searchParams;
  const match = await getCountryBySlug(country);

  if (!match) notFound();

  let dojos: Dojo[];
  let rateLimited = false;
  if (match.hasOwnFederationSite) {
    dojos = [];
  } else if (q) {
    const withinLimit = await checkSearchRateLimit();
    if (withinLimit) {
      dojos = await searchDojosByCountryId(match.id, q);
    } else {
      rateLimited = true;
      dojos = await getDojosByCountryId(match.id);
    }
  } else {
    dojos = await getDojosByCountryId(match.id);
  }

  return (
    <>
      <main className="mx-auto min-h-[650px] max-w-7xl px-5 py-16 sm:px-6 lg:px-10 lg:py-20">
        <div className="public-hero-breadcrumb text-brand-accent flex items-center gap-3 font-semibold tracking-[0.16em] uppercase">
          <Link href={`/${lang}/dojo-directory`} className="hover:text-primary transition-colors">
            Dojo Directory
          </Link>
          <span aria-hidden="true">/</span>
          <span>{match.name}</span>
        </div>
        <div className="bg-primary mt-3 h-0.5 w-[86px]" />

        <h1 className="public-hero-title font-heading text-foreground mt-8 max-w-3xl text-4xl font-medium tracking-tight">
          {match.hasOwnFederationSite
            ? `Official Federation for ${match.name}`
            : `Approved Dojos in ${match.name}`}
        </h1>

        <div className="mt-10">
          {match.hasOwnFederationSite ? (
            <FederationCard country={match} />
          ) : (
            <>
              <div className="max-w-2xl">
                <SearchBox placeholder="Search dojos…" initialQuery={q ?? ""} />
              </div>
              {rateLimited && (
                <p className="mt-3 text-sm text-red-600">
                  Too many searches — showing the full list. Try again in a minute.
                </p>
              )}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {dojos.length === 0 ? (
                  <p className="text-muted-foreground col-span-full text-sm">No dojos found.</p>
                ) : (
                  dojos.map((dojo) => <DojoCard key={dojo.slug} dojo={dojo} lang={lang} />)
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <GlobalCommunityCTA lang={lang} />
      <div className="h-20" />
    </>
  );
}

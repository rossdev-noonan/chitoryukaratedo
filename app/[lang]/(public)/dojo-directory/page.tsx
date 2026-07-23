import { ArrowRight, ChevronDown, MapPin, Search } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CountryFlag } from "@/components/public/CountryFlag";
import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import { continentForCountrySlug, type Continent } from "@/lib/continents";
import { FEATURED_DIRECTORY_COUNTRIES } from "@/lib/countries-featured";
import { getApprovedDojos, getCountries } from "@/lib/directory";
import type { Locale } from "@/lib/i18n/locales";

// Gil's fix for the old flag-row not scaling as ICKF adds members: a bounded
// "popular countries" quick-pick list + a "See more" link to the full
// federations list below, instead of rendering every country's flag inline.
const POPULAR_COUNTRY_SLUGS = [
  "japan",
  "usa",
  "canada",
  "australia",
  "scotland",
  "norway",
  "jamaica",
  "hong-kong",
  "singapore",
  "ireland",
];
const POPULAR_COUNTRIES = POPULAR_COUNTRY_SLUGS.map((slug) =>
  FEATURED_DIRECTORY_COUNTRIES.find((country) => country.slug === slug),
).filter((country) => country !== undefined);

export const metadata: Metadata = {
  title: "World Dojo Directory",
  description: "Approved Chito-Ryu dojos and federations worldwide.",
};

interface DojoDirectoryPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ q?: string; region?: string; country?: string }>;
}

const REGION_LABELS: Record<Continent, string> = {
  northAmerica: "North America",
  southAmerica: "South America",
  europe: "Europe",
  africa: "Africa",
  asia: "Asia",
  australia: "Australia & Oceania",
};

const MAP_PINS = [
  { left: "27%", top: "35%" },
  { left: "37%", top: "66%" },
  { left: "53%", top: "72%" },
  { left: "50%", top: "28%" },
  { left: "78%", top: "37%" },
  { left: "81%", top: "70%" },
];

function displaySite(url: string | null) {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function approvedDojoImage(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes("peakhurst") || normalized.includes("karate institute")) {
    return "/images/figma/dojo-tkip.png";
  }
  if (normalized.includes("gold coast")) return "/images/figma/dojo-gold-coast.png";
  return "/brand/chito-ryu-logo.svg";
}

export default async function DojoDirectoryPage({ params, searchParams }: DojoDirectoryPageProps) {
  const [{ lang }, filters] = await Promise.all([params, searchParams]);
  const [countries, dojos] = await Promise.all([getCountries(), getApprovedDojos()]);
  const countryById = new Map(countries.map((country) => [country.id, country]));
  const query = filters.q?.trim().toLowerCase() ?? "";
  const selectedRegion = filters.region as Continent | undefined;
  const selectedCountry = filters.country ?? "";

  const countryMatches = (country: (typeof countries)[number]) => {
    const region = continentForCountrySlug(country.slug);
    if (selectedCountry && country.slug !== selectedCountry) return false;
    if (selectedRegion && region !== selectedRegion) return false;
    if (!query) return true;
    return [country.name, country.federationName, country.representative]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query));
  };

  const visibleCountries = countries.filter(countryMatches);
  const visibleDojos = dojos.filter((dojo) => {
    const country = countryById.get(dojo.countryId);
    if (!country) return false;
    if (selectedCountry && country.slug !== selectedCountry) return false;
    if (selectedRegion && continentForCountrySlug(country.slug) !== selectedRegion) return false;
    if (!query) return true;
    return [dojo.name, dojo.city, dojo.headInstructor, country.name]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query));
  });

  return (
    <>
      <section className="pt-10 pb-20 sm:pt-16 lg:pt-20 lg:pb-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 sm:px-6">
          <div className="text-center">
            <p className="text-brand-accent text-sm font-semibold uppercase">Find a Dojo</p>
            <div className="bg-primary mx-auto mt-3 h-0.5 w-[86px]" />
            <h1 className="public-hero-title font-heading mt-4 text-4xl font-medium text-black">
              Dojo Directory
            </h1>
            <p className="mt-4 text-base leading-[1.6] text-[#4b5563]">
              Find an official Chito Ryu dojo near you.
            </p>
          </div>

          <form
            action={`/${lang}/dojo-directory`}
            className="mt-10 flex w-full flex-col gap-3 sm:mt-12 lg:flex-row lg:items-center lg:gap-4"
          >
            <label className="border-border flex h-12 flex-1 items-center gap-3 rounded-sm border bg-white px-4">
              <span className="sr-only">Search by country or city</span>
              <input
                type="search"
                name="q"
                defaultValue={filters.q ?? ""}
                placeholder="Search by country or city"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#374151] outline-none placeholder:text-[#9ca3af]"
              />
              <Search className="h-[18px] w-[18px] text-[#9ca3af]" />
            </label>
            <label className="relative flex-1 lg:max-w-60">
              <span className="sr-only">Region</span>
              <select
                name="region"
                defaultValue={filters.region ?? ""}
                className="border-border h-12 w-full appearance-none rounded-sm border bg-white px-4 pr-10 text-sm text-[#374151] outline-none"
              >
                <option value="">All Regions</option>
                {Object.entries(REGION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#374151]" />
            </label>
            <label className="relative flex-1 lg:max-w-60">
              <span className="sr-only">Country</span>
              <select
                name="country"
                defaultValue={selectedCountry}
                className="border-border h-12 w-full appearance-none rounded-sm border bg-white px-4 pr-10 text-sm text-[#374151] outline-none"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.slug}>
                    {country.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-[#374151]" />
            </label>
            <button
              type="submit"
              className="bg-primary text-primary-foreground h-12 rounded-sm px-8 text-sm font-bold lg:min-w-24"
            >
              <span className="lg:hidden">Search Dojos</span>
              <span className="hidden lg:inline">Search</span>
            </button>
          </form>

          <div className="mt-6 flex w-full flex-wrap items-center gap-2 sm:mt-8">
            <span className="text-sm font-semibold text-[#374151]">Popular countries</span>
            {POPULAR_COUNTRIES.map((country) => (
              <Link
                key={country.slug}
                href={`/${lang}/dojo-directory?country=${country.slug}`}
                className="border-border hover:border-primary flex items-center gap-2 rounded-full border bg-white py-1 pr-3 pl-1 text-sm text-[#374151] transition-colors"
              >
                <span className="relative block h-5 w-5 shrink-0 overflow-hidden rounded-full">
                  <CountryFlag country={country} shape="circle" />
                </span>
                {country.name}
              </Link>
            ))}
            <a href="#federations" className="text-primary text-sm font-semibold hover:underline">
              See more
            </a>
          </div>

          <div className="relative mt-10 h-60 w-full overflow-hidden rounded-xl sm:h-80 lg:h-[480px]">
            <Image
              src="/images/figma/directory-world-map.png"
              alt="World map showing Chito-Ryu regions"
              fill
              priority
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover"
            />
            {MAP_PINS.map((pin, index) => (
              <MapPin
                key={`${pin.left}-${pin.top}`}
                className={`text-primary absolute -translate-x-1/2 -translate-y-1/2 fill-current ${
                  index > 3 ? "hidden sm:block" : ""
                } h-5 w-5 sm:h-6 sm:w-6`}
                style={pin}
                aria-hidden
              />
            ))}
          </div>

          <div id="federations" className="mt-10 flex w-full scroll-mt-24 flex-col gap-4 lg:mt-20">
            {visibleCountries.length === 0 ? (
              <p className="text-muted-foreground text-center text-sm">No federations found.</p>
            ) : (
              visibleCountries.slice(0, 4).map((country) => (
                <Link
                  key={country.id}
                  href={`/${lang}/dojo-directory/${country.slug}`}
                  className="border-border/60 group flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.02)] sm:flex-row sm:items-center sm:justify-between lg:rounded-none lg:px-10 lg:py-6"
                >
                  <span className="flex min-w-0 items-center gap-4 sm:gap-6">
                    <span className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                      <MapPin className="h-7 w-7" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-semibold text-black sm:text-xl">
                        {country.federationName ?? `${country.name} Chito-Ryu`}
                      </span>
                      <span className="mt-1 block text-sm text-[#6b7280]">{country.name}</span>
                      {country.representative && (
                        <span className="mt-1 block truncate text-sm text-[#6b7280]">
                          {country.representative}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="flex items-center justify-between gap-8 sm:justify-end">
                    {country.hasOwnFederationSite && (
                      <span className="bg-brand-accent rounded px-3 py-1 text-[10px] font-bold text-[#faf9f7] uppercase sm:text-xs">
                        Federation
                      </span>
                    )}
                    {displaySite(country.federationSiteUrl) && (
                      <span className="hidden w-48 truncate text-sm text-[#4b5563] md:block">
                        {displaySite(country.federationSiteUrl)}
                      </span>
                    )}
                    <span className="text-primary text-xs font-semibold sm:hidden">
                      View Details
                    </span>
                    <ArrowRight className="text-primary h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-6 lg:px-10">
          <div className="bg-primary h-0.5 w-[86px]" />
          <h2 className="mt-4 text-2xl font-semibold text-black">Approved Dojos</h2>
          {visibleDojos.length === 0 ? (
            <p className="text-muted-foreground mt-8 text-sm">No approved dojos found.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
              {visibleDojos.slice(0, 6).map((dojo) => {
                const country = countryById.get(dojo.countryId);
                return (
                  <Link
                    key={dojo.id}
                    href={`/${lang}/dojo/${dojo.slug}`}
                    className="border-border/60 group flex flex-col gap-4 rounded-xl border bg-white p-4 transition-transform hover:-translate-y-0.5 sm:flex-row sm:items-center sm:gap-5 lg:rounded-none lg:px-5 lg:py-6"
                  >
                    <span className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-white sm:h-[100px] sm:w-40 sm:rounded-none">
                      <Image
                        src={approvedDojoImage(dojo.name)}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-contain"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-heading block text-base font-bold text-[#1f2937]">
                        {dojo.name}
                      </span>
                      <span className="mt-2 block text-xs text-[#4b5563]">
                        {[dojo.city, country?.name].filter(Boolean).join(", ")}
                      </span>
                      {dojo.headInstructor && (
                        <span className="mt-2 block text-xs text-[#4b5563]">
                          Head Instructor: {dojo.headInstructor}
                        </span>
                      )}
                    </span>
                    <span className="text-primary flex items-center gap-1 text-xs font-semibold sm:self-center">
                      <span className="sm:hidden">Details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <GlobalCommunityCTA lang={lang} />
      <div className="h-20" aria-hidden />
    </>
  );
}

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

export const metadata: Metadata = {
  title: "World Dojo Directory",
  description: "Approved Chito-Ryu dojos and federations worldwide.",
};

interface DojoDirectoryPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ q?: string; region?: string; country?: string }>;
}

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

function popularCountryLabel(slug: string, name: string) {
  return slug === "usa" ? "USA" : name;
}

export default async function DojoDirectoryPage({ params, searchParams }: DojoDirectoryPageProps) {
  const [{ lang }, filters] = await Promise.all([params, searchParams]);
  const [countries, dojos] = await Promise.all([getCountries(), getApprovedDojos()]);
  const countryById = new Map(countries.map((country) => [country.id, country]));
  const query = filters.q?.trim().toLowerCase() ?? "";
  const selectedRegion = filters.region as Continent | undefined;
  const selectedCountry = filters.country ?? "";

  const visibleCountries = countries.filter((country) => {
    const region = continentForCountrySlug(country.slug);
    if (selectedCountry && country.slug !== selectedCountry) return false;
    if (selectedRegion && region !== selectedRegion) return false;
    if (!query) return true;
    return [country.name, country.federationName, country.representative]
      .filter(Boolean)
      .some((value) => value!.toLowerCase().includes(query));
  });

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
      <section className="pt-14 pb-16 md:pt-16 md:pb-20 xl:pt-20 xl:pb-24">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center px-5 md:px-10 xl:px-0">
          <nav
            aria-label="Breadcrumb"
            className="flex w-full items-center gap-2 text-[11px] text-[#6b7280] md:justify-center md:text-xs xl:justify-start"
          >
            <Link href={`/${lang}`} className="hover:text-primary transition-colors">
              Home
            </Link>
            <span aria-hidden>/</span>
            <span className="text-primary">Dojo Directory</span>
          </nav>

          <div className="mt-8 text-center md:mt-6 xl:mt-14">
            <p className="text-brand-accent text-xs font-semibold uppercase md:text-xl">
              Find a Dojo
            </p>
            <div className="bg-primary mx-auto mt-3 h-0.5 w-[60px] md:h-[3px] xl:mt-6 xl:w-[86px]" />
            <h1 className="public-hero-title font-heading mt-4 text-2xl font-medium text-black md:text-[40px] xl:mt-5">
              Dojo Directory
            </h1>
            <p className="mt-2 text-xs leading-[1.6] text-[#4b5563] md:mt-4 md:text-base">
              Find an official Chito Ryu dojo near you.
            </p>
          </div>

          <form
            action={`/${lang}/dojo-directory`}
            method="get"
            className="mt-8 grid w-full grid-cols-2 gap-3 md:mt-12 md:grid-cols-[1fr_1fr_auto] md:gap-4 xl:mt-24 xl:grid-cols-[minmax(0,1fr)_240px_240px_auto]"
          >
            <label className="border-border col-span-2 flex h-12 items-center gap-3 rounded-sm border bg-white px-4 md:col-span-3 xl:col-span-1">
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
            <label className="relative">
              <span className="sr-only">Region</span>
              <select
                name="region"
                defaultValue={filters.region ?? ""}
                className="border-border h-12 w-full appearance-none rounded-sm border bg-white px-3 pr-8 text-xs text-[#374151] outline-none md:px-4 md:pr-10 md:text-sm"
              >
                <option value="">All Regions</option>
                {Object.entries(REGION_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#374151] md:right-4" />
            </label>
            <label className="relative">
              <span className="sr-only">Country</span>
              <select
                name="country"
                defaultValue={selectedCountry}
                className="border-border h-12 w-full appearance-none rounded-sm border bg-white px-3 pr-8 text-xs text-[#374151] outline-none md:px-4 md:pr-10 md:text-sm"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.slug}>
                    {country.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-[#374151] md:right-4" />
            </label>
            <button
              type="submit"
              className="bg-primary text-primary-foreground col-span-2 h-12 rounded-sm px-8 text-sm font-bold md:col-span-1 md:min-w-28 xl:min-w-24"
            >
              <span className="xl:hidden">Search Dojos</span>
              <span className="hidden xl:inline">Search</span>
            </button>
          </form>

          <div className="mt-6 hidden w-full max-w-[978px] flex-col items-start gap-2 xl:flex">
            <span className="text-base leading-[1.7] text-[#8e8e93]">Popular countries</span>
            <div className="flex w-full flex-wrap items-center gap-2">
              {POPULAR_COUNTRIES.map((country) => (
                <Link
                  key={country.slug}
                  href={`/${lang}/dojo-directory?country=${country.slug}`}
                  className="border-border hover:border-primary flex h-7 items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs text-[#4b5563] transition-colors"
                >
                  <span className="relative block h-3.5 w-[22px] shrink-0 overflow-hidden rounded-[1.5px]">
                    <CountryFlag country={country} shape="rect" />
                  </span>
                  {popularCountryLabel(country.slug, country.name)}
                </Link>
              ))}
            </div>
            <a
              href="#directory-results"
              className="border-border hover:border-primary flex h-7 items-center rounded-full border bg-white px-3 py-1.5 text-xs text-[#4b5563] transition-colors"
            >
              See more
            </a>
          </div>
          <div className="mt-6 hidden w-full flex-col items-start gap-2 md:flex xl:hidden">
            <span className="text-sm text-[#8e8e93]">Popular countries</span>
            <div className="flex w-full flex-wrap items-center gap-2">
              {POPULAR_COUNTRIES.filter((country) =>
                ["japan", "usa", "canada", "australia", "scotland", "ireland"].includes(
                  country.slug,
                ),
              ).map((country) => (
                <Link
                  key={country.slug}
                  href={`/${lang}/dojo-directory?country=${country.slug}`}
                  className="border-border hover:border-primary flex h-7 items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs text-[#4b5563] transition-colors"
                >
                  <span className="relative block h-3.5 w-[22px] shrink-0 overflow-hidden rounded-[1.5px]">
                    <CountryFlag country={country} shape="rect" />
                  </span>
                  {popularCountryLabel(country.slug, country.name)}
                </Link>
              ))}
            </div>
            <a
              href="#directory-results"
              className="border-border hover:border-primary flex h-7 items-center rounded-full border bg-white px-3 py-1.5 text-xs text-[#4b5563] transition-colors"
            >
              See more
            </a>
          </div>

          <div className="relative mt-14 h-60 w-full overflow-hidden rounded-xl md:mt-10 md:h-[360px] xl:mt-28 xl:h-[480px]">
            <Image
              src="/images/figma/directory-world-map.png"
              alt="World map showing Chito-Ryu regions"
              fill
              priority
              sizes="(min-width: 1280px) 1100px, 100vw"
              className="object-cover"
            />
            {MAP_PINS.map((pin, index) => (
              <span
                key={`${pin.left}-${pin.top}`}
                className={`absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 md:h-6 md:w-6 ${
                  index > 3 ? "hidden md:block" : ""
                }`}
                style={pin}
                aria-hidden
              >
                <Image
                  src="/images/homepage/icons/map-pin-continent.svg"
                  alt=""
                  fill
                  sizes="24px"
                  className="object-contain"
                />
              </span>
            ))}
          </div>

          <div
            id="directory-results"
            className="mt-12 flex w-full scroll-mt-24 flex-col gap-4 md:mt-10 md:gap-3 xl:mt-20"
          >
            {visibleCountries.length === 0 ? (
              <p className="text-muted-foreground text-center text-sm">No federations found.</p>
            ) : (
              visibleCountries.slice(0, 4).map((country) => (
                <Link
                  key={country.id}
                  href={`/${lang}/dojo-directory/${country.slug}`}
                  className="border-border/60 group flex flex-col gap-4 rounded-xl border bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.02)] md:flex-row md:items-center md:justify-between md:rounded-lg xl:rounded-none xl:px-10 xl:py-6"
                >
                  <span className="flex min-w-0 items-center gap-4 md:gap-6">
                    <span className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white">
                      <MapPin className="h-7 w-7" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base font-semibold text-black md:text-lg xl:text-xl">
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
                  <span className="flex items-center justify-between gap-5 md:justify-end xl:gap-8">
                    {country.hasOwnFederationSite && (
                      <span className="bg-brand-accent rounded px-3 py-1 text-[10px] font-bold text-[#faf9f7] uppercase md:text-xs">
                        Federation
                      </span>
                    )}
                    {displaySite(country.federationSiteUrl) && (
                      <span className="hidden w-40 truncate text-sm text-[#4b5563] md:block xl:w-48">
                        {displaySite(country.federationSiteUrl)}
                      </span>
                    )}
                    <span className="text-primary text-xs font-semibold md:hidden">
                      View Details
                    </span>
                    <ArrowRight className="text-primary h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        <div
          id="approved-dojos"
          className="mx-auto mt-20 max-w-7xl scroll-mt-24 px-5 md:px-10 xl:px-0"
        >
          <div className="bg-primary h-0.5 w-[60px] xl:w-[86px]" />
          <h2 className="mt-4 text-2xl font-semibold text-black">Approved Dojos</h2>
          {visibleDojos.length === 0 ? (
            <p className="text-muted-foreground mt-8 text-sm">No approved dojos found.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:gap-10">
              {visibleDojos.slice(0, 6).map((dojo) => {
                const country = countryById.get(dojo.countryId);
                return (
                  <Link
                    key={dojo.id}
                    href={`/${lang}/dojo/${dojo.slug}`}
                    className="border-border/60 group flex flex-col gap-4 rounded-xl border bg-white p-4 transition-transform hover:-translate-y-0.5 xl:flex-row xl:items-center xl:gap-5 xl:rounded-none xl:px-10 xl:py-6"
                  >
                    <span className="relative h-40 w-full shrink-0 overflow-hidden rounded-lg bg-white md:h-[140px] xl:h-[100px] xl:w-40 xl:rounded-none">
                      <Image
                        src={approvedDojoImage(dojo.name)}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 160px, (min-width: 768px) 314px, 350px"
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
                    <span className="text-primary flex items-center gap-1 text-xs font-semibold xl:self-center">
                      <span className="xl:hidden">Details</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <GlobalCommunityCTA lang={lang} fullBleedUntilDesktop />
      <div className="hidden h-20 xl:block" aria-hidden />
    </>
  );
}

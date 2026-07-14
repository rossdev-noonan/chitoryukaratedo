import { ArrowRight, ChevronDown, MapPin, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getApprovedDojos, getDojoCountsByContinent } from "@/lib/directory";
import type { Continent } from "@/lib/continents";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeDojoFinderProps {
  lang: Locale;
  dictionary: Dictionary;
}

// Pin position as a percentage of the 1100x480 map image, and the dictionary
// key for each continent's label — matches Gil's updated Figma map layout.
const MAP_PINS: { continent: Continent; xPct: number; yPct: number }[] = [
  { continent: "northAmerica", xPct: 38.9, yPct: 39.1 },
  { continent: "southAmerica", xPct: 48.4, yPct: 64.1 },
  { continent: "europe", xPct: 61.8, yPct: 31.6 },
  { continent: "asia", xPct: 89.3, yPct: 39.1 },
  { continent: "australia", xPct: 90.4, yPct: 71.6 },
  { continent: "africa", xPct: 65.1, yPct: 73.2 },
];

export async function HomeDojoFinder({ lang, dictionary }: HomeDojoFinderProps) {
  const [dojos, continentCounts] = await Promise.all([
    getApprovedDojos(4),
    getDojoCountsByContinent(),
  ]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="text-center">
        <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase">
          {dictionary.home.dojoFinderLabel}
        </p>
        <div className="bg-primary mx-auto mt-2 h-0.5 w-[86px]" />
        <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">
          {dictionary.home.dojoFinderHeading}
        </h2>
        <p className="text-muted-foreground mt-2">{dictionary.home.dojoFinderDescription}</p>
      </div>

      <Link
        href={`/${lang}/dojo-directory`}
        className="border-border bg-background mx-auto mt-8 flex max-w-3xl flex-col gap-3 border p-3 transition-colors hover:bg-black/[0.02] sm:flex-row sm:items-center"
      >
        <span className="border-border text-muted-foreground flex flex-1 items-center gap-2 border-b px-2 py-2 text-sm sm:border-r sm:border-b-0">
          <Search className="h-4 w-4 shrink-0" />
          {dictionary.home.searchPlaceholder}
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 px-2 py-2 text-sm">
          {dictionary.home.allRegions}
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 px-2 py-2 text-sm">
          {dictionary.home.allCountries}
          <ChevronDown className="h-3.5 w-3.5" />
        </span>
        <span className="bg-primary text-primary-foreground px-6 py-2.5 text-center text-sm font-bold">
          {dictionary.home.search}
        </span>
      </Link>

      <div className="relative mx-auto mt-10 aspect-[1100/480] w-full max-w-5xl overflow-hidden rounded-xl">
        <Image
          src="/images/homepage/world-map.png"
          alt="World map showing Chito-Ryu dojo regions"
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
        {MAP_PINS.map(({ continent, xPct, yPct }) => (
          <div
            key={continent}
            className="group absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${xPct}%`, top: `${yPct}%` }}
          >
            <div className="border-border bg-background flex flex-col gap-1 border px-3 py-1.5 text-xs shadow-md transition-transform group-hover:scale-105">
              <span className="text-foreground font-semibold whitespace-nowrap">
                {dictionary.home.continents[continent]}
              </span>
              <span className="text-muted-foreground whitespace-nowrap">
                {dictionary.home.dojoCountLabel.replace(
                  "{count}",
                  String(continentCounts[continent]),
                )}
              </span>
            </div>
            <MapPin className="text-primary mx-auto -mt-px h-5 w-5 fill-current" />
          </div>
        ))}
      </div>

      {dojos.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-5xl flex-col gap-3">
          {dojos.map((dojo) => (
            <Link
              key={dojo.slug}
              href={`/${lang}/dojo/${dojo.slug}`}
              className="border-border bg-background flex items-center justify-between gap-4 border px-6 py-5 shadow-sm transition-colors hover:bg-black/[0.02]"
            >
              <div className="flex items-center gap-6">
                <span className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-heading font-semibold">{dojo.name}</p>
                  {dojo.city && <p className="text-muted-foreground mt-1 text-sm">{dojo.city}</p>}
                </div>
              </div>
              <div className="hidden items-center gap-6 sm:flex">
                {dojo.contactEmail && (
                  <span className="text-muted-foreground text-sm">{dojo.contactEmail}</span>
                )}
                <ArrowRight className="text-primary h-5 w-5 shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

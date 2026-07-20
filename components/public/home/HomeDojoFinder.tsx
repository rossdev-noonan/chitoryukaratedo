import Image from "next/image";
import Link from "next/link";

import { DojoWorldMap } from "@/components/public/home/DojoWorldMap";
import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import { FEATURED_DIRECTORY_COUNTRIES } from "@/lib/countries-featured";
import { getApprovedDojos, getDojoCountsByContinent } from "@/lib/directory";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeDojoFinderProps {
  lang: Locale;
  dictionary: Dictionary;
}

export async function HomeDojoFinder({ lang, dictionary }: HomeDojoFinderProps) {
  const [dojos, dojoCountsByContinent] = await Promise.all([
    getApprovedDojos(4),
    getDojoCountsByContinent(),
  ]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="text-center">
        <SectionEyebrow centered>{dictionary.home.dojoFinderLabel}</SectionEyebrow>
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
          <span className="relative block h-4 w-4 shrink-0 opacity-60">
            <Image src="/images/homepage/icons/search.svg" alt="" fill className="object-contain" />
          </span>
          {dictionary.home.searchPlaceholder}
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 px-2 py-2 text-sm">
          {dictionary.home.allRegions}
          <span className="relative block h-3.5 w-3.5 shrink-0 opacity-60">
            <Image
              src="/images/homepage/icons/chevron-down.svg"
              alt=""
              fill
              className="object-contain"
            />
          </span>
        </span>
        <span className="text-muted-foreground flex items-center gap-1.5 px-2 py-2 text-sm">
          {dictionary.home.allCountries}
          <span className="relative block h-3.5 w-3.5 shrink-0 opacity-60">
            <Image
              src="/images/homepage/icons/chevron-down.svg"
              alt=""
              fill
              className="object-contain"
            />
          </span>
        </span>
        <span className="bg-primary text-primary-foreground px-6 py-2.5 text-center text-sm font-bold">
          {dictionary.home.search}
        </span>
      </Link>

      <div className="mx-auto mt-4 flex max-w-3xl flex-col gap-2">
        <p className="text-[#8e8e93]">{dictionary.home.popularCountries}</p>
        <div className="flex flex-wrap gap-2">
          {FEATURED_DIRECTORY_COUNTRIES.map((country) => (
            <Link
              key={country.slug}
              href={`/${lang}/dojo-directory?country=${country.slug}`}
              className="border-border bg-background hover:border-primary flex h-7 items-center gap-2 rounded-full border px-3 py-1.5 text-xs text-[#4b5563] transition-colors"
            >
              <span className="relative block h-3.5 w-[22px] shrink-0 overflow-hidden rounded-[1.5px]">
                <Image src={country.flagSrc} alt="" fill className="object-cover" />
              </span>
              {country.name}
            </Link>
          ))}
          <Link
            href={`/${lang}/dojo-directory`}
            className="border-border bg-background hover:border-primary flex h-7 items-center rounded-full border px-3 py-1.5 text-xs text-[#4b5563] transition-colors"
          >
            {dictionary.home.seeMore}
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <DojoWorldMap dictionary={dictionary} dojoCountsByContinent={dojoCountsByContinent} />
      </div>

      {dojos.length > 0 && (
        <div className="border-border divide-border mx-auto mt-10 flex max-w-5xl flex-col divide-y border-t border-b">
          {dojos.map((dojo) => (
            <Link
              key={dojo.slug}
              href={`/${lang}/dojo/${dojo.slug}`}
              className="flex items-center justify-between gap-4 px-2 py-5 transition-colors hover:bg-black/[0.02]"
            >
              <div className="flex items-center gap-6">
                <span className="bg-background flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                  <span className="relative block h-7 w-7">
                    <Image
                      src="/images/homepage/icons/map-pin-dojo.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </span>
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
                <span className="relative block h-5 w-5 shrink-0">
                  <Image
                    src="/images/homepage/icons/arrow-right.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

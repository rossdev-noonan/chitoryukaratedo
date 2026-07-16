import { CountryFlag } from "@/components/public/CountryFlag";
import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import { FEATURED_DIRECTORY_COUNTRIES } from "@/lib/countries-featured";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeMemberCountriesProps {
  dictionary: Dictionary;
}

// Alphabetical, matching Gil's Figma — distinct from the dojo-count map order.
const ALPHABETICAL_COUNTRIES = [...FEATURED_DIRECTORY_COUNTRIES].sort((a, b) =>
  a.name.localeCompare(b.name),
);

export function HomeMemberCountries({ dictionary }: HomeMemberCountriesProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 text-center sm:px-6 lg:px-10">
      <SectionEyebrow centered>{dictionary.home.affiliationsLabel}</SectionEyebrow>
      <div className="bg-primary mx-auto mt-2 h-0.5 w-[86px]" />
      <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">
        {dictionary.home.memberCountriesHeading}
      </h2>
      <p className="text-muted-foreground mt-2">{dictionary.home.memberCountriesDescription}</p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-[10px]">
        {ALPHABETICAL_COUNTRIES.map((country) => (
          <div key={country.slug} className="h-[54px] w-20 overflow-hidden rounded-[4px] sm:h-[72px] sm:w-[108px]">
            <CountryFlag country={country} shape="rect" />
          </div>
        ))}
      </div>
    </section>
  );
}

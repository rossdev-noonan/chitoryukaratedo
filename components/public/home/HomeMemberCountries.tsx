import { CountryFlag } from "@/components/public/CountryFlag";
import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import { FEATURED_DIRECTORY_COUNTRIES, type FeaturedCountry } from "@/lib/countries-featured";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeMemberCountriesProps {
  dictionary: Dictionary;
}

// Alphabetical, matching Gil's Figma — distinct from the dojo-count map order.
const ALPHABETICAL_COUNTRIES = [...FEATURED_DIRECTORY_COUNTRIES].sort((a, b) =>
  a.name.localeCompare(b.name),
);

interface FlagChipProps {
  country: FeaturedCountry;
  repeated?: boolean;
}

function FlagChip({ country, repeated = false }: FlagChipProps) {
  return (
    <div
      className={`h-[52px] w-[78px] shrink-0 overflow-hidden rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.15)] ring-1 ring-black/5 ${repeated ? "lg:hidden" : ""}`}
      aria-hidden={repeated || undefined}
    >
      <CountryFlag country={country} shape="rect" />
    </div>
  );
}

export function HomeMemberCountries({ dictionary }: HomeMemberCountriesProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-20 text-center sm:px-6 lg:px-0">
      <SectionEyebrow centered>{dictionary.home.affiliationsLabel}</SectionEyebrow>
      <div className="bg-primary mx-auto mt-2 h-0.5 w-[86px]" />
      <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">
        {dictionary.home.memberCountriesHeading}
      </h2>
      <p className="text-muted-foreground mt-2">{dictionary.home.memberCountriesDescription}</p>

      <div className="mt-10 overflow-hidden lg:overflow-x-auto">
        <div className="flex w-max min-w-full items-center gap-[10px] px-4 sm:px-6 max-lg:motion-safe:animate-[marquee_28s_linear_infinite] lg:justify-center lg:px-0">
          {ALPHABETICAL_COUNTRIES.map((country) => (
            <FlagChip key={country.slug} country={country} />
          ))}
          {/* Duplicate set so the marquee track can loop seamlessly at -50%; hidden
              on desktop where the row is static and already centered. */}
          {ALPHABETICAL_COUNTRIES.map((country) => (
            <FlagChip key={`${country.slug}-repeat`} country={country} repeated />
          ))}
        </div>
      </div>
    </section>
  );
}

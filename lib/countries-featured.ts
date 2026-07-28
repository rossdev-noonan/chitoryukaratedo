// Countries Ross confirmed as the ICKF-referenced set for the homepage
// "Popular countries" pill row (see handover-to-gil.md Section 8).
//
// Updated 2026-07-27 per Manos Mamalis's Teams correction (same list applied
// to the "ICKF Member Countries" section, lib/countries-ickf-members.ts) —
// Scotland swapped for Switzerland so this list matches that one instead of
// drifting into a third, slightly-different "which 8 countries" answer.
//
// Flags are real image assets pulled from Gil's Figma file, not emoji — Windows
// Chrome/Edge has no built-in color-flag emoji font and renders flag emoji as
// plain two-letter ISO codes (e.g. "AU") instead of an actual flag image.
export interface FeaturedCountry {
  slug: string;
  name: string;
  flagSrc: string;
}

export const FEATURED_DIRECTORY_COUNTRIES: FeaturedCountry[] = [
  { slug: "australia", name: "Australia", flagSrc: "/images/flags/australia.png" },
  { slug: "canada", name: "Canada", flagSrc: "/images/flags/canada.png" },
  { slug: "germany", name: "Germany", flagSrc: "/images/flags/germany.png" },
  { slug: "ireland", name: "Ireland", flagSrc: "/images/flags/ireland.png" },
  { slug: "japan", name: "Japan", flagSrc: "/images/flags/japan.png" },
  { slug: "norway", name: "Norway", flagSrc: "/images/flags/norway.png" },
  { slug: "scotland", name: "Scotland", flagSrc: "/images/flags/scotland.png" },
  { slug: "switzerland", name: "Switzerland", flagSrc: "/images/flags/switzerland.png" },
  { slug: "usa", name: "United States", flagSrc: "/images/flags/usa.png" },
];

// Countries Ross confirmed as the ICKF-referenced set for the homepage directory
// map (see handover-to-gil.md Section 8). Pin position is a rough percentage
// placement on the "world-map.png" asset, anchored near the existing continent
// pin coordinates — this is an illustrative static map, not a georeferenced one.
//
// Flags are real image assets pulled from Gil's Figma file, not emoji — Windows
// Chrome/Edge has no built-in color-flag emoji font and renders flag emoji as
// plain two-letter ISO codes (e.g. "AU") instead of an actual flag image.
export interface FeaturedCountry {
  slug: string;
  name: string;
  flagSrc: string;
  xPct: number;
  yPct: number;
}

export const FEATURED_DIRECTORY_COUNTRIES: FeaturedCountry[] = [
  { slug: "canada", name: "Canada", flagSrc: "/images/flags/canada.png", xPct: 38, yPct: 30 },
  { slug: "usa", name: "United States", flagSrc: "/images/flags/usa.png", xPct: 36, yPct: 42 },
  { slug: "jamaica", name: "Jamaica", flagSrc: "/images/flags/jamaica.png", xPct: 33, yPct: 52 },
  { slug: "ireland", name: "Ireland", flagSrc: "/images/flags/ireland.png", xPct: 56, yPct: 28 },
  { slug: "scotland", name: "Scotland", flagSrc: "/images/flags/scotland.png", xPct: 58, yPct: 24 },
  { slug: "norway", name: "Norway", flagSrc: "/images/flags/norway.png", xPct: 63, yPct: 20 },
  { slug: "japan", name: "Japan", flagSrc: "/images/flags/japan.png", xPct: 91, yPct: 35 },
  {
    slug: "hong-kong",
    name: "Hong Kong",
    flagSrc: "/images/flags/hong-kong.png",
    xPct: 85,
    yPct: 44,
  },
  {
    slug: "singapore",
    name: "Singapore",
    flagSrc: "/images/flags/singapore.png",
    xPct: 86,
    yPct: 52,
  },
  {
    slug: "australia",
    name: "Australia",
    flagSrc: "/images/flags/australia.png",
    xPct: 90.4,
    yPct: 71.6,
  },
];

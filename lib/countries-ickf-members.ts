// Countries shown in the homepage's "ICKF Member Countries" flag marquee
// (HomeMemberCountries.tsx).
//
// Corrected 2026-07-27 per Manos Mamalis (Teams, cc'd Sheehan/MJN, noon
// AEST deadline): the previous 10-country set (incl. Hong Kong, Jamaica,
// Scotland, Singapore) was wrong. Replaced with the explicit 8-country list
// he gave — Australia, Canada, Germany, Ireland, Japan, Norway,
// Switzerland, United States — alphabetical (HomeMemberCountries.tsx
// already sorts this array by name, so insertion order here doesn't need
// to be alphabetical itself). Done from the chat text directly, NOT
// re-verified against Figma — the Figma MCP connection dropped mid-session;
// re-check node 6:4 once it's back to confirm this matches Gil's file too.
//
// Still a separate list from lib/countries-featured.ts (Dojo Directory's
// "Popular countries" pills) — different section, don't conflate them.
import type { FeaturedCountry } from "@/lib/countries-featured";

export const ICKF_MEMBER_COUNTRIES: FeaturedCountry[] = [
  { slug: "australia", name: "Australia", flagSrc: "/images/flags/australia.png" },
  { slug: "canada", name: "Canada", flagSrc: "/images/flags/canada.png" },
  { slug: "germany", name: "Germany", flagSrc: "/images/flags/germany.png" },
  { slug: "ireland", name: "Ireland", flagSrc: "/images/flags/ireland.png" },
  { slug: "japan", name: "Japan", flagSrc: "/images/flags/japan.png" },
  { slug: "norway", name: "Norway", flagSrc: "/images/flags/norway.png" },
  { slug: "switzerland", name: "Switzerland", flagSrc: "/images/flags/switzerland.png" },
  { slug: "usa", name: "United States", flagSrc: "/images/flags/usa.png" },
];

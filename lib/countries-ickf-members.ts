// Countries shown in the homepage's "ICKF Member Countries" flag marquee
// (HomeMemberCountries.tsx), matching Gil's Figma "ickf members" section
// (node 382:2766 / instance "flags-mobile") literally.
//
// Deliberately a SEPARATE list from lib/countries-featured.ts — that one
// feeds the Dojo Directory's "Popular countries" pills, which Sheehan
// explicitly asked to change (drop Jamaica/Hong Kong/Singapore, add
// Germany). This homepage section is a different Figma frame that still
// shows the original 10-country set; don't conflate the two just because
// they happened to share a constant before.
import type { FeaturedCountry } from "@/lib/countries-featured";

export const ICKF_MEMBER_COUNTRIES: FeaturedCountry[] = [
  { slug: "australia", name: "Australia", flagSrc: "/images/flags/australia.png" },
  { slug: "canada", name: "Canada", flagSrc: "/images/flags/canada.png" },
  { slug: "hong-kong", name: "Hong Kong", flagSrc: "/images/flags/hong-kong.png" },
  { slug: "ireland", name: "Ireland", flagSrc: "/images/flags/ireland.png" },
  { slug: "jamaica", name: "Jamaica", flagSrc: "/images/flags/jamaica.png" },
  { slug: "japan", name: "Japan", flagSrc: "/images/flags/japan.png" },
  { slug: "norway", name: "Norway", flagSrc: "/images/flags/norway.png" },
  { slug: "scotland", name: "Scotland", flagSrc: "/images/flags/scotland.png" },
  { slug: "singapore", name: "Singapore", flagSrc: "/images/flags/singapore.png" },
  { slug: "usa", name: "United States", flagSrc: "/images/flags/usa.png" },
];

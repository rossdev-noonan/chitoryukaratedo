export type Continent =
  | "northAmerica"
  | "southAmerica"
  | "europe"
  | "africa"
  | "asia"
  | "australia";

// Country slug -> continent, covering the countries currently in Supabase plus
// the ICKF country/language research list (see handover-to-gil.md Section 8) so
// this doesn't need updating every time a new country is approved.
const COUNTRY_CONTINENT: Record<string, Continent> = {
  canada: "northAmerica",
  usa: "northAmerica",
  "united-states": "northAmerica",
  mexico: "northAmerica",
  jamaica: "northAmerica",
  brazil: "southAmerica",
  argentina: "southAmerica",
  chile: "southAmerica",
  japan: "asia",
  malaysia: "asia",
  singapore: "asia",
  bangladesh: "asia",
  china: "asia",
  taiwan: "asia",
  "hong-kong": "asia",
  macau: "asia",
  india: "asia",
  norway: "europe",
  sweden: "europe",
  finland: "europe",
  "united-kingdom": "europe",
  ireland: "europe",
  scotland: "europe",
  germany: "europe",
  france: "europe",
  australia: "australia",
  "new-zealand": "australia",
  "south-africa": "africa",
  nigeria: "africa",
  kenya: "africa",
};

export function continentForCountrySlug(slug: string): Continent | null {
  return COUNTRY_CONTINENT[slug] ?? null;
}

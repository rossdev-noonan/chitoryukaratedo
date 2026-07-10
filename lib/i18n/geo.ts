import type { Locale } from "@/lib/i18n/locales";

// ISO 3166-1 alpha-2 country code -> default locale, based on the ICKF
// country/language research in handover-to-gil.md. Countries not listed
// here fall through to Accept-Language, then the site default (English).
export const localeByCountry: Partial<Record<string, Locale>> = {
  JP: "ja", // Japan (Sohonbu)
  HK: "yue", // Hong Kong
  MO: "yue", // Macau — same Cantonese-speaking region, not in the research list
  CN: "zh", // Mainland China — not in the research list, included for completeness
  TW: "zh", // Taiwan — same reasoning as CN
  NO: "no", // Norway
  MY: "ms", // Malaysia — not itself in the research (Singapore was), same language
  SE: "sv", // Sweden
  BD: "bn", // Bangladesh
  // Finland has no dedicated locale here (no Finnish dictionary); Swedish
  // is a co-official language there, so it's the closest available default.
  FI: "sv",
};

export function localeFromCountryCode(code: string | null): Locale | null {
  if (!code) return null;
  return localeByCountry[code.toUpperCase()] ?? null;
}

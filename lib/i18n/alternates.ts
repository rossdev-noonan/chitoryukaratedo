import { locales, type Locale } from "@/lib/i18n/locales";

// Builds the canonical + hreflang alternates block for a page's metadata,
// consistent with the locale URLs sitemap.ts emits.
export function localeAlternates(lang: Locale, path: string) {
  return {
    canonical: `/${lang}${path}`,
    languages: Object.fromEntries(locales.map((locale) => [locale, `/${locale}${path}`])),
  };
}

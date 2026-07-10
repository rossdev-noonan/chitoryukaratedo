export const locales = ["en", "ja", "yue", "no", "zh", "ms", "ta", "sv", "bn"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  yue: "廣東話",
  no: "Norsk",
  zh: "中文",
  ms: "Bahasa Melayu",
  ta: "தமிழ்",
  sv: "Svenska",
  bn: "বাংলা",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

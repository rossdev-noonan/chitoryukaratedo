import "server-only";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/lib/i18n/dictionaries/en.json").then((module) => module.default),
  ja: () => import("@/lib/i18n/dictionaries/ja.json").then((module) => module.default),
  yue: () => import("@/lib/i18n/dictionaries/yue.json").then((module) => module.default),
  no: () => import("@/lib/i18n/dictionaries/no.json").then((module) => module.default),
  zh: () => import("@/lib/i18n/dictionaries/zh.json").then((module) => module.default),
  ms: () => import("@/lib/i18n/dictionaries/ms.json").then((module) => module.default),
  ta: () => import("@/lib/i18n/dictionaries/ta.json").then((module) => module.default),
  sv: () => import("@/lib/i18n/dictionaries/sv.json").then((module) => module.default),
  bn: () => import("@/lib/i18n/dictionaries/bn.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

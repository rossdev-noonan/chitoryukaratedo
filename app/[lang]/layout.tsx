import { Noto_Sans_Bengali, Noto_Sans_HK, Noto_Sans_SC, Noto_Sans_Tamil } from "next/font/google";
import { notFound } from "next/navigation";

import { isLocale, locales, type Locale } from "@/lib/i18n/locales";

const notoSansHK = Noto_Sans_HK({ variable: "--font-noto-sans-hk", subsets: ["latin"] });
const notoSansSC = Noto_Sans_SC({ variable: "--font-noto-sans-sc", subsets: ["latin"] });
const notoSansTamil = Noto_Sans_Tamil({ variable: "--font-noto-sans-ta", subsets: ["latin"] });
const notoSansBengali = Noto_Sans_Bengali({ variable: "--font-noto-sans-bn", subsets: ["latin"] });

// Cantonese/Mandarin/Tamil/Bengali need script-specific fonts the base
// Noto Serif JP + Inter pairing doesn't cover (see the Gil handover doc's
// font gap note). Applied only as a wrapping class per-locale, not on
// <html>, so other locales never pay for these fonts over the network —
// next/font only fetches a font file when something on the page actually
// resolves to its font-family.
const localeFontClass: Partial<Record<Locale, string>> = {
  yue: `${notoSansHK.variable} font-locale-yue`,
  zh: `${notoSansSC.variable} font-locale-zh`,
  ta: `${notoSansTamil.variable} font-locale-ta`,
  bn: `${notoSansBengali.variable} font-locale-bn`,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const fontClass = localeFontClass[lang];
  if (!fontClass) return children;

  return <div className={`flex flex-1 flex-col ${fontClass}`}>{children}</div>;
}

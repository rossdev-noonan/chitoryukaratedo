import type { Metadata } from "next";

import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import { HistoryHero } from "@/components/public/history/HistoryHero";
import { HistoryOriginsAndLineage } from "@/components/public/history/HistoryOriginsAndLineage";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "History",
  description:
    "The history of Chito-Ryu karate, from its origins in China to Dr. Tsuyoshi Chitose founding Chito Ryu in Japan.",
};

interface HistoryPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function HistoryPage({ params }: HistoryPageProps) {
  const { lang } = await params;

  return (
    <>
      <HistoryHero lang={lang} />
      <HistoryOriginsAndLineage />
      <GlobalCommunityCTA lang={lang} />
      <div className="h-20" aria-hidden />
    </>
  );
}

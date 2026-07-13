import type { Metadata } from "next";

import { HomeCTA } from "@/components/public/home/HomeCTA";
import { HomeDojoFinder } from "@/components/public/home/HomeDojoFinder";
import { HomeFeatureBar } from "@/components/public/home/HomeFeatureBar";
import { HomeHero } from "@/components/public/home/HomeHero";
import { HomeNewsEvents } from "@/components/public/home/HomeNewsEvents";
import { HomeOrigins } from "@/components/public/home/HomeOrigins";
import { HomePhilosophy } from "@/components/public/home/HomePhilosophy";
import { HomeUpcomingEvents } from "@/components/public/home/HomeUpcomingEvents";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Chito-Ryu International",
  description:
    "The official international home for Chito-Ryu — lineage, dojo directory, and teacher registry.",
};

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <>
      <HomeHero lang={lang} dictionary={dictionary} />
      <HomeFeatureBar dictionary={dictionary} />
      <HomePhilosophy lang={lang} dictionary={dictionary} />
      <HomeUpcomingEvents lang={lang} dictionary={dictionary} />
      <HomeOrigins dictionary={dictionary} />
      <HomeNewsEvents lang={lang} dictionary={dictionary} />
      <HomeCTA lang={lang} dictionary={dictionary} />
      <HomeDojoFinder lang={lang} dictionary={dictionary} />
    </>
  );
}

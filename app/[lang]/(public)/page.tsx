import type { Metadata } from "next";

import { HomeCTA } from "@/components/public/home/HomeCTA";
import { HomeDojoFinder } from "@/components/public/home/HomeDojoFinder";
import { HomeHero } from "@/components/public/home/HomeHero";
import { HomeNewsEvents } from "@/components/public/home/HomeNewsEvents";
import { HomeOrigins } from "@/components/public/home/HomeOrigins";
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
      <HomeOrigins dictionary={dictionary} />
      <HomeNewsEvents lang={lang} dictionary={dictionary} />
      <HomeCTA lang={lang} dictionary={dictionary} />
      <HomeDojoFinder lang={lang} dictionary={dictionary} />
    </>
  );
}

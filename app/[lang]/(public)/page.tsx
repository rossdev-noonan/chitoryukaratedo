import type { Metadata } from "next";

import { HomeCTA } from "@/components/public/home/HomeCTA";
import { HomeDojoFinder } from "@/components/public/home/HomeDojoFinder";
import { HomeFeatureBar } from "@/components/public/home/HomeFeatureBar";
import { HomeHero } from "@/components/public/home/HomeHero";
import { HomeMemberCountries } from "@/components/public/home/HomeMemberCountries";
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
      <HomeMemberCountries dictionary={dictionary} />
      <HomeFeatureBar dictionary={dictionary} />
      <HomePhilosophy lang={lang} dictionary={dictionary} />
      <HomeUpcomingEvents lang={lang} dictionary={dictionary} />
      <div className="flex flex-col">
        <div className="order-1 md:hidden lg:order-1 lg:block">
          <HomeOrigins dictionary={dictionary} />
        </div>
        <div className="order-2 md:order-1 lg:order-3">
          <HomeCTA lang={lang} dictionary={dictionary} />
        </div>
        <div className="order-3 md:order-2 lg:order-2">
          <HomeNewsEvents lang={lang} dictionary={dictionary} />
        </div>
        <div className="order-4 md:order-3 lg:order-4">
          <HomeDojoFinder lang={lang} dictionary={dictionary} />
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";

import { HomeCTA } from "@/components/public/home/HomeCTA";
import { HomeDojoFinder } from "@/components/public/home/HomeDojoFinder";
import { HomeFeatureBar } from "@/components/public/home/HomeFeatureBar";
import { HomeHero } from "@/components/public/home/HomeHero";
import { HomeMemberCountries } from "@/components/public/home/HomeMemberCountries";
import { HomeOrigins } from "@/components/public/home/HomeOrigins";
import { HomePhilosophy } from "@/components/public/home/HomePhilosophy";
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
      {/* Hidden 2026-07-27 per Ross — was re-enabled 2026-07-24 following
          Figma evidence, but per this instruction it should stay off. If
          re-enabling again, re-import HomeUpcomingEvents and confirm with
          Ross first this time rather than going by Figma alone. */}
      <div className="flex flex-col">
        <div className="order-1 md:hidden lg:order-1 lg:block">
          <HomeOrigins lang={lang} dictionary={dictionary} />
        </div>
        {/* Hidden 2026-07-27 per Ross — "News & Events / Latest Updates"
            section, same request as the Featured/Upcoming Events section
            above. If re-enabling, re-import HomeNewsEvents and confirm
            with Ross/Manos first, since events-on-the-homepage is the
            specific thing that caused the escalation today. */}
        <div className="order-3 md:order-1 lg:order-3">
          <HomeCTA lang={lang} dictionary={dictionary} />
        </div>
        <div className="order-4 md:order-3 lg:order-4">
          <HomeDojoFinder lang={lang} dictionary={dictionary} />
        </div>
      </div>
    </>
  );
}

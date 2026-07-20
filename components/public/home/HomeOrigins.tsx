import Image from "next/image";

import { OriginsAccordion } from "@/components/public/home/OriginsAccordion";
import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import { SlideFadeReveal } from "@/components/public/home/SlideFadeReveal";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeOriginsProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function HomeOrigins({ lang, dictionary }: HomeOriginsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-0 lg:py-[120px]">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[726fr_495fr] lg:gap-[10px] lg:items-center">
        <div className="relative aspect-[774/544] w-full">
          <SlideFadeReveal direction="from-left" className="absolute inset-0">
            <Image
              src="/images/homepage/origins-portrait.png"
              alt="O-Sensei Tsuyoshi Chitose and Tsunetomo Soke, founders and lineage of Chito-Ryu Karate-Do"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-contain"
            />
          </SlideFadeReveal>
        </div>

        <div>
          <SectionEyebrow>{dictionary.home.originsLabel}</SectionEyebrow>
          <div className="bg-primary mt-2 h-0.5 w-[86px]" />
          <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">
            {dictionary.home.originsHeading}
          </h2>
          <p className="text-muted-foreground mt-4">{dictionary.home.originsDescription}</p>
          <OriginsAccordion lang={lang} dictionary={dictionary} />
        </div>
      </div>
    </section>
  );
}

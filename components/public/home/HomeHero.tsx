import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeHeroProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function HomeHero({ lang, dictionary }: HomeHeroProps) {
  return (
    <section className="relative md:h-[654px] lg:h-[720px]">
      <div className="relative h-[280px] w-full sm:h-[360px] md:absolute md:inset-0 md:h-full">
        <Image
          src="/images/homepage/hero-practitioner.png"
          alt="A Chito-Ryu Karate-Do practitioner in a fighting stance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center] md:object-right"
        />
        <span
          aria-hidden="true"
          className="text-background/70 font-heading absolute top-4 right-4 text-2xl font-bold tracking-widest sm:top-6 sm:right-6 sm:text-4xl md:top-16 md:right-8 md:text-6xl"
          style={{ writingMode: "vertical-rl" }}
        >
          力必達
        </span>
      </div>

      <div className="bg-background relative px-4 py-8 sm:px-6 md:absolute md:inset-0 md:flex md:items-center md:bg-transparent md:px-6 lg:px-10">
        <div className="md:max-w-xl">
          <h1 className="font-heading text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl">
            <span className="text-foreground">{dictionary.home.heroTitleLine1}</span>
            <br />
            <span className="text-primary">{dictionary.home.heroTitleHighlight}</span>{" "}
            <span className="text-foreground">{dictionary.home.heroTitleLine2}</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md md:mt-6">
            {dictionary.home.heroDescription}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
            <Link
              href={`/${lang}/about`}
              className="bg-primary text-primary-foreground inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
            >
              {dictionary.home.aboutChitoRyu}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/dojo-directory`}
              className="border-border text-foreground md:bg-background/90 inline-flex items-center justify-center gap-2 border bg-white px-6 py-3 text-sm font-bold transition-colors hover:bg-black/[0.03] md:hover:bg-white"
            >
              {dictionary.home.findADojo}
              <MapPin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

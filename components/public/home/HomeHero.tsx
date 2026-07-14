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
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:absolute md:inset-0 md:h-full">
        {/* Circle-first entrance: a red brush-stroke stand-in scales/rotates in
            from nothing, then the real composite photo (which already has the
            brush stroke baked in) cross-fades on top of it — approximates
            Gil's reference video since the separated circle/photo layers
            aren't available through the Figma API for this component. */}
        <div
          aria-hidden
          className="motion-safe:animate-[hero-circle-in_650ms_ease-out_both] absolute top-1/2 right-[8%] h-[70%] aspect-square -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--color-primary) 0%, var(--color-primary-dark) 70%, transparent 100%)",
          }}
        />
        <Image
          src="/images/homepage/hero-practitioner.png"
          alt="Three Chito-Ryu Karate-Do practitioners in fighting stances"
          fill
          priority
          sizes="100vw"
          className="motion-safe:animate-[hero-image-in_700ms_ease-out_both] object-cover object-[70%_center] [animation-delay:450ms] md:object-right"
        />
      </div>

      <div className="bg-background relative px-4 py-8 sm:px-6 md:absolute md:inset-0 md:bg-transparent md:px-6 md:pt-[120px] lg:px-10">
        <div className="md:max-w-xl">
          <h1 className="font-heading motion-safe:animate-[hero-content-in_700ms_ease-out_both] text-3xl leading-tight font-medium sm:text-4xl lg:text-5xl [animation-delay:150ms]">
            <span className="text-foreground">{dictionary.home.heroTitleLine1}</span>
            <br />
            <span className="text-primary">{dictionary.home.heroTitleHighlight}</span>{" "}
            <span className="text-foreground">{dictionary.home.heroTitleLine2}</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md motion-safe:animate-[hero-content-in_700ms_ease-out_both] md:mt-6 [animation-delay:300ms]">
            {dictionary.home.heroDescription}
          </p>
          <div className="mt-6 flex flex-col gap-3 motion-safe:animate-[hero-content-in_700ms_ease-out_both] sm:flex-row sm:flex-wrap md:mt-8 [animation-delay:450ms]">
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

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BrushReveal } from "@/components/public/home/BrushReveal";
import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomePhilosophyProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function HomePhilosophy({ lang, dictionary }: HomePhilosophyProps) {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[447fr_773fr] lg:px-5">
        <div>
          <SectionEyebrow>{dictionary.home.philosophyLabel}</SectionEyebrow>
          <div className="bg-primary mt-2 h-0.5 w-[86px]" />
          <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">
            {dictionary.home.philosophyHeadingLine1}
            <br />
            {dictionary.home.philosophyHeadingLine2}
          </h2>
          <p className="text-muted-foreground mt-4">{dictionary.home.philosophyDescription}</p>
          <Link
            href={`/${lang}/about`}
            className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-bold hover:underline"
          >
            {dictionary.home.philosophyCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative aspect-[1447/1024] w-full">
          <BrushReveal className="absolute inset-0">
            <Image
              src="/images/homepage/philosophy-training.png"
              alt="Chito-Ryu Karate-Do dojo training session"
              fill
              sizes="(min-width: 1024px) 600px, 90vw"
              className="object-contain"
            />
          </BrushReveal>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomePhilosophyProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function HomePhilosophy({ lang, dictionary }: HomePhilosophyProps) {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase">
            {dictionary.home.philosophyLabel}
          </p>
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

        <div className="grid grid-cols-2 gap-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/homepage/philosophy-1.jpeg"
              alt="Chito-Ryu Karate-Do practitioners training"
              fill
              sizes="(min-width: 1024px) 300px, 45vw"
              className="object-cover"
            />
          </div>
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/images/homepage/philosophy-2.jpeg"
              alt="Chito-Ryu Karate-Do dojo training session"
              fill
              sizes="(min-width: 1024px) 300px, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

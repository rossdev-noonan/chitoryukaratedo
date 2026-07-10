import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeCTAProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function HomeCTA({ lang, dictionary }: HomeCTAProps) {
  return (
    <section className="bg-primary-dark">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            {dictionary.home.ctaHeading}
          </h2>
          <p className="mt-2 text-white/80">{dictionary.home.ctaDescription}</p>
        </div>
        <Link
          href={`/${lang}/dojo-directory`}
          className="text-primary-dark inline-flex shrink-0 items-center gap-2 bg-white px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90"
        >
          {dictionary.home.findADojo}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

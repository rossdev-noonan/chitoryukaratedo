import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";

interface GlobalCommunityCTAProps {
  lang: Locale;
}

export function GlobalCommunityCTA({ lang }: GlobalCommunityCTAProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 xl:px-0">
      <div className="bg-primary-dark flex min-h-[184px] flex-col items-start justify-center gap-5 rounded-sm p-6 md:items-center md:p-8 md:text-center xl:min-h-[199px] xl:flex-row xl:justify-between xl:px-20 xl:py-16 xl:text-left">
        <div className="w-full">
          <h2 className="font-heading text-2xl leading-tight font-bold text-white md:text-[26px] xl:text-[32px]">
            Join Our Global Community
          </h2>
          <p className="mt-2 text-[13px] text-white/80 md:text-sm">
            Find a certified dojo near you and begin your journey.
          </p>
        </div>
        <Link
          href={`/${lang}/dojo-directory`}
          className="text-primary-dark inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90 md:w-auto xl:px-8 xl:py-4"
        >
          Find a Dojo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

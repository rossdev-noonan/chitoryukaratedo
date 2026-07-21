import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";

interface GlobalCommunityCTAProps {
  lang: Locale;
}

export function GlobalCommunityCTA({ lang }: GlobalCommunityCTAProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-10 md:pb-12 xl:px-0 xl:pb-0">
      <div className="bg-primary-dark hidden h-[244px] flex-col items-center justify-center gap-6 rounded-lg px-10 py-12 text-center md:flex xl:hidden">
        <div>
          <h2 className="font-heading text-[32px] leading-none font-bold text-white">
            Continue the lineage.
          </h2>
          <p className="mt-3 text-sm text-white/80">
            Find a certified Chito Ryu dojo near you and begin your journey.
          </p>
        </div>
        <Link
          href={`/${lang}/dojo-directory`}
          className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold text-[#1f2937] transition-opacity hover:opacity-90"
        >
          Find a Dojo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="bg-primary-dark flex min-h-[199px] flex-col items-start justify-center gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-10 md:hidden xl:flex xl:px-20 xl:py-16">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Join Our Global Community
          </h2>
          <p className="mt-2 text-sm text-white/80">
            Find a certified dojo near you and begin your journey.
          </p>
        </div>
        <Link
          href={`/${lang}/dojo-directory`}
          className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold text-black transition-opacity hover:opacity-90"
        >
          Find a Dojo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

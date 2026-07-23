import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";

interface GlobalCommunityCTAProps {
  lang: Locale;
  fullBleedUntilDesktop?: boolean;
}

export function GlobalCommunityCTA({
  lang,
  fullBleedUntilDesktop = false,
}: GlobalCommunityCTAProps) {
  const panelClass = fullBleedUntilDesktop
    ? "bg-primary-dark flex h-[229px] flex-col items-center justify-center gap-6 rounded-none px-5 py-12 text-center xl:h-[199px] xl:flex-row xl:justify-between xl:rounded-sm xl:px-20 xl:py-16 xl:text-left"
    : "bg-primary-dark flex min-h-[184px] flex-col items-start justify-center gap-5 rounded-sm p-6 md:items-center md:p-8 md:text-center xl:min-h-[199px] xl:flex-row xl:justify-between xl:px-20 xl:py-16 xl:text-left";

  return (
    <section
      className={`mx-auto w-full max-w-7xl ${
        fullBleedUntilDesktop ? "px-0" : "px-4 sm:px-6 md:px-8 xl:px-0"
      }`}
    >
      <div className={panelClass}>
        <div className="w-full">
          <h2
            className={`font-heading text-2xl leading-tight text-white md:text-[26px] xl:text-[32px] ${
              fullBleedUntilDesktop ? "font-medium xl:font-bold" : "font-bold"
            }`}
          >
            Join Our Global Community
          </h2>
          <p className="mt-2 text-xs leading-[1.5] text-white/80 md:text-sm">
            Find a certified dojo near you and begin your journey
            {fullBleedUntilDesktop ? (
              <>
                <span className="md:hidden"> today</span>.
              </>
            ) : (
              "."
            )}
          </p>
        </div>
        <Link
          href={`/${lang}/dojo-directory`}
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-bold transition-opacity hover:opacity-90 xl:px-8 xl:py-4 ${
            fullBleedUntilDesktop ? "w-auto text-black" : "text-primary-dark w-full md:w-auto"
          }`}
        >
          Find a Dojo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import { homeUpcomingEvents } from "@/lib/homepage-content";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeUpcomingEventsProps {
  lang: Locale;
  dictionary: Dictionary;
}

const BCP47: Record<Locale, string> = {
  en: "en-US",
  ja: "ja-JP",
  yue: "zh-HK",
  no: "nb-NO",
  zh: "zh-CN",
  ms: "ms-MY",
  ta: "ta-IN",
  sv: "sv-SE",
  bn: "bn-BD",
};

export function HomeUpcomingEvents({ lang, dictionary }: HomeUpcomingEventsProps) {
  if (homeUpcomingEvents.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="flex items-end justify-between">
        <div>
          <SectionEyebrow>{dictionary.home.eventsLabel}</SectionEyebrow>
          <div className="bg-primary mt-2 h-0.5 w-[86px]" />
        </div>
        <Link
          href={`/${lang}/events`}
          className="text-primary hidden text-sm font-semibold hover:underline sm:inline"
        >
          {dictionary.home.viewAllEvents}
        </Link>
      </div>
      <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">
        {dictionary.home.upcomingEventsHeading}
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {homeUpcomingEvents.map((event, index) => {
          const text = dictionary.home.upcomingEvents[index] ?? dictionary.home.upcomingEvents[0];
          const date = new Date(event.startDate);
          const month = new Intl.DateTimeFormat(BCP47[lang], { month: "short" })
            .format(date)
            .toUpperCase();
          const day = new Intl.DateTimeFormat(BCP47[lang], { day: "numeric" }).format(date);
          return (
            <Link
              key={`${event.startDate}-${index}`}
              href={`/${lang}${event.href}`}
              className="group flex gap-5 rounded-[2px] border border-[#c8a24a] bg-white p-5 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.05)] transition-colors hover:bg-black/[0.02]"
            >
              <div className="relative flex h-[72px] w-16 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border border-[#9b0d18]">
                <div className="absolute top-0 h-[7px] w-full rounded-tl-[4px] rounded-tr-[4px] bg-[#c1121f]" />
                <span className="text-[12px] font-bold uppercase text-[#b31b1b]">{month}</span>
                <span className="text-2xl font-bold text-[#1f2937]">{day}</span>
              </div>
              <div>
                <p className="font-heading font-bold text-[#1a1a1a]">{text.title}</p>
                <p className="mt-2 text-sm text-[#666]">{text.location}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#c1121f]">
                  {dictionary.home.viewEventDetails}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

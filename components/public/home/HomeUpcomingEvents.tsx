import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
          <p className="text-brand-accent text-sm font-semibold tracking-widest uppercase">
            {dictionary.home.eventsLabel}
          </p>
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

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {homeUpcomingEvents.map((event, index) => {
          const text = dictionary.home.upcomingEvents[index];
          const date = new Date(event.startDate);
          const month = new Intl.DateTimeFormat(BCP47[lang], { month: "short" })
            .format(date)
            .toUpperCase();
          const day = new Intl.DateTimeFormat(BCP47[lang], { day: "numeric" }).format(date);
          return (
            <Link
              key={event.href + text.title}
              href={`/${lang}${event.href}`}
              className="border-border bg-background group flex gap-5 border p-6 shadow-sm transition-colors hover:bg-black/[0.02]"
            >
              <div className="border-primary text-primary flex h-[72px] w-16 shrink-0 flex-col items-center justify-center rounded-lg border">
                <span className="text-xs font-bold uppercase">{month}</span>
                <span className="text-2xl font-bold">{day}</span>
              </div>
              <div>
                <p className="font-heading font-bold">{text.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">{text.location}</p>
                <ArrowRight className="text-primary mt-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

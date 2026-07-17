import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import { homeFeaturedEvent, homeUpcomingEvents } from "@/lib/homepage-content";
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

  const featuredText = dictionary.home.upcomingEvents[0];
  const featuredDate = new Date(homeFeaturedEvent.startDate);
  const featuredMonth = new Intl.DateTimeFormat(BCP47[lang], { month: "short" })
    .format(featuredDate)
    .toUpperCase();
  const featuredDay = new Intl.DateTimeFormat(BCP47[lang], { day: "numeric" }).format(featuredDate);

  // The featured event above is already shown in full; only list events that
  // aren't a duplicate of it here.
  const otherEvents = homeUpcomingEvents
    .map((event, index) => ({ event, index }))
    .filter(({ event }) => event.startDate !== homeFeaturedEvent.startDate);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="border-border border bg-white p-5">
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

        <div className="mt-8 grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-[100px]">
          <div className="flex flex-col">
            <h2 className="font-heading text-2xl font-semibold text-[#1f2937]">
              {dictionary.home.featuredEventLabel}
            </h2>
            <Link
              href={`/${lang}${homeFeaturedEvent.href}`}
              className="group mt-4 flex flex-1 flex-col gap-6 rounded-[2px] border border-[#c8a24a] bg-white p-5 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.05)] transition-colors hover:bg-black/[0.02]"
            >
              <div className="relative aspect-[509/115] w-full shrink-0">
                <Image
                  src={homeFeaturedEvent.posterSrc}
                  alt={featuredText.title}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex gap-5">
                <div className="relative flex h-[72px] w-16 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border border-[#9b0d18]">
                  <div className="absolute top-0 h-[7px] w-full bg-[#c1121f]" />
                  <span className="text-[12px] font-bold text-[#b31b1b] uppercase">
                    {featuredMonth}
                  </span>
                  <span className="text-2xl font-bold text-[#1f2937]">{featuredDay}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-heading text-base font-bold text-[#1a1a1a]">
                    {featuredText.title}
                  </p>
                  <p className="text-sm text-[#666]">{dictionary.home.featuredEventDateRange}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-[#666]">
                <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {homeFeaturedEvent.addressLine1} {homeFeaturedEvent.addressLine2}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {dictionary.home.featuredEventActivities.map((activity) => (
                  <span
                    key={activity}
                    className="rounded-full border border-[#e5e7eb] px-3 py-1 text-xs text-[#666]"
                  >
                    {activity}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-[#c1121f]">
                {dictionary.home.viewEventDetails}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {otherEvents.length > 0 && (
            <div className="flex flex-col">
              <h2 className="font-heading text-2xl font-semibold text-[#1f2937]">
                {dictionary.home.upcomingEventsHeading}
              </h2>
              <div className="mt-4 flex flex-1 flex-col justify-between gap-6">
                {otherEvents.map(({ event, index }) => {
                  const text =
                    dictionary.home.upcomingEvents[index] ?? dictionary.home.upcomingEvents[0];
                  const date = new Date(event.startDate);
                  const month = new Intl.DateTimeFormat(BCP47[lang], { month: "short" })
                    .format(date)
                    .toUpperCase();
                  const day = new Intl.DateTimeFormat(BCP47[lang], { day: "numeric" }).format(
                    date,
                  );
                  return (
                    <Link
                      key={`${event.startDate}-${index}`}
                      href={`/${lang}${event.href}`}
                      className="group flex gap-5 rounded-[2px] border border-[#c8a24a] bg-white p-5 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.05)] transition-colors hover:bg-black/[0.02]"
                    >
                      <div className="relative flex h-[72px] w-16 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border border-[#9b0d18]">
                        <div className="absolute top-0 h-[7px] w-full rounded-tl-[4px] rounded-tr-[4px] bg-[#c1121f]" />
                        <span className="text-[12px] font-bold text-[#b31b1b] uppercase">
                          {month}
                        </span>
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

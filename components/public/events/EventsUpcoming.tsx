"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  eventsMonthsDesktop,
  eventsMonthsMobile,
  eventsUpcoming,
  type EventsMonthOption,
} from "@/lib/events-content";
import type { Locale } from "@/lib/i18n/locales";

function EventCard({
  month,
  day,
  title,
  location,
  tag,
}: {
  month: string;
  day: string;
  title: string;
  location: string;
  tag: string;
}) {
  return (
    <div className="flex w-full items-center gap-3 rounded-[4px] border border-[#e5e7eb] bg-white p-3 xl:gap-5 xl:rounded-[2px] xl:p-5">
      <div className="border-primary-dark relative flex h-[60px] w-[52px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-md border xl:h-[72px] xl:w-16 xl:rounded-lg">
        <div className="bg-primary absolute top-0 h-[5px] w-full xl:h-[7px]" />
        <span className="text-[11px] font-bold text-[#b31b1b] uppercase xl:text-xs">{month}</span>
        <span className="text-lg font-bold text-[#1f2937] xl:text-2xl">{day}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 xl:gap-1.5">
        <p className="truncate text-sm font-semibold text-[#1f2937] xl:text-[15px]">{title}</p>
        <p className="truncate text-xs text-[#4b5563] xl:text-xs">{location}</p>
        <span className="bg-brand-accent inline-flex w-fit items-start rounded px-2 py-0.5 text-[9px] font-medium text-[#faf9f7] xl:text-[10px]">
          {tag}
        </span>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#1f2937]" />
    </div>
  );
}

function useMonthScrollSpy(months: EventsMonthOption[]) {
  const [activeId, setActiveId] = useState(months[0]?.id ?? "");

  useEffect(() => {
    const targets = months
      .map((month) => document.getElementById(month.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.3 + 4;
      let next = targets[0]?.id ?? "";

      targets.forEach((target) => {
        if (target.getBoundingClientRect().top <= marker) next = target.id;
      });

      setActiveId(next);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return { activeId, jumpTo };
}

export function EventsUpcoming({ lang }: { lang: Locale }) {
  const desktopSpy = useMonthScrollSpy(eventsMonthsDesktop);
  const mobileSpy = useMonthScrollSpy(eventsMonthsMobile);

  const mobileEvents = eventsUpcoming.filter((event) => event.showOnMobile);
  const seenMobileGroups = new Set<string>();

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 md:px-10 xl:px-[190px] xl:py-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2 xl:gap-4">
            <div className="bg-primary-dark h-0.5 w-10 xl:w-[63px]" />
            <h2 className="text-base font-semibold text-[#1f2937] xl:text-2xl">Upcoming Events</h2>
          </div>
          <Link
            href={`/${lang}/events`}
            className="hidden items-center gap-2 text-sm font-bold text-[#b31b1b] hover:underline xl:inline-flex"
          >
            View All Events
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile: horizontal jump-to-month chip bar + flat card list */}
        <div className="mt-4 xl:hidden">
          <div className="-mx-4 bg-[#faf6ec] px-4 py-3 sm:-mx-6 sm:px-6">
            <p className="text-[10px] font-bold tracking-wide text-[#4b5563] uppercase">
              Jump to month
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {eventsMonthsMobile.map((month) => {
                const isActive = mobileSpy.activeId === month.id;
                return (
                  <button
                    key={month.id}
                    type="button"
                    onClick={() => mobileSpy.jumpTo(month.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                      isActive
                        ? "bg-primary-dark text-white"
                        : "border border-[#e4dccf] bg-[#faf9f7] text-[#706963]"
                    }`}
                  >
                    {month.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {mobileEvents.map((event) => {
              const isFirstInGroup = !seenMobileGroups.has(event.monthGroupId);
              seenMobileGroups.add(event.monthGroupId);
              return (
                <div key={event.slug} id={isFirstInGroup ? event.monthGroupId : undefined}>
                  <EventCard
                    month={event.month}
                    day={event.day}
                    title={event.title}
                    location={event.location}
                    tag={event.tag}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop: sticky month sidebar + grouped timeline */}
        <div className="hidden xl:mt-8 xl:flex xl:gap-10">
          <div className="flex w-[140px] shrink-0 flex-col gap-4 bg-[#faf6ec] px-2.5 py-5">
            <p className="text-[10px] font-bold tracking-wide text-[#4b5563] uppercase">
              Jump to month
            </p>
            <div className="flex flex-col gap-3">
              {eventsMonthsDesktop.map((month) => {
                const isActive = desktopSpy.activeId === month.id;
                return (
                  <button
                    key={month.id}
                    type="button"
                    onClick={() => desktopSpy.jumpTo(month.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-center gap-2 text-left text-xs transition-colors ${
                      isActive ? "text-primary-dark font-semibold" : "text-[#4b5563]"
                    }`}
                  >
                    {isActive && <span className="bg-primary-dark h-3.5 w-0.5 shrink-0" />}
                    {month.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-8 py-5">
            {eventsMonthsDesktop.map((month) => {
              const monthEvents = eventsUpcoming.filter(
                (event) => event.monthGroupId === month.id,
              );
              if (monthEvents.length === 0) return null;
              return (
                <div key={month.id} id={month.id} className="flex flex-col gap-3">
                  <p className="text-[11px] font-bold tracking-wide text-[#4b5563] uppercase">
                    {monthEvents[0]?.monthGroupLabel}
                  </p>
                  <div className="flex flex-col gap-3">
                    {monthEvents.map((event) => (
                      <EventCard
                        key={event.slug}
                        month={event.month}
                        day={event.day}
                        title={event.title}
                        location={event.location}
                        tag={event.tag}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

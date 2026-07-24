import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MapPinSolid } from "@/components/public/icons/MapPinSolid";
import { eventsFeaturedEvent } from "@/lib/events-content";
import type { Locale } from "@/lib/i18n/locales";

export function EventsFeatured({ lang }: { lang: Locale }) {
  const event = eventsFeaturedEvent;

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 pb-6 sm:px-6 md:px-10 xl:px-[190px] xl:pt-4 xl:pb-4">
        <div className="flex flex-col items-start gap-2 xl:gap-4">
          <div className="bg-primary-dark h-0.5 w-10 xl:w-[63px]" />
          <h2 className="text-base font-semibold text-[#1f2937] xl:text-2xl">Featured Event</h2>
        </div>

        <Link
          href={`/${lang}/events`}
          className="group mt-4 flex flex-col overflow-hidden rounded-lg border border-[#e4dccf] bg-[#fcfaf6] transition-colors hover:bg-black/[0.015] xl:mt-4 xl:h-[320px] xl:flex-row"
        >
          <div className="relative h-[180px] w-full shrink-0 xl:h-full xl:w-[480px]">
            <Image
              src={event.posterSrc.mobile}
              alt=""
              fill
              sizes="(min-width: 1280px) 480px, 100vw"
              className="object-cover xl:hidden"
            />
            <Image
              src={event.posterSrc.desktop}
              alt=""
              fill
              sizes="480px"
              className="hidden object-cover xl:block"
            />
          </div>

          <div className="flex flex-1 flex-col gap-4 bg-white p-4 xl:justify-center xl:gap-5 xl:p-[52px]">
            <div className="flex items-center gap-3 xl:gap-6">
              <div className="border-primary-dark relative flex h-[60px] w-[52px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-md border xl:h-[72px] xl:w-16 xl:rounded-lg">
                <div className="bg-primary-dark absolute top-0 h-[5px] w-full xl:h-[7px]" />
                <span className="text-[11px] font-bold text-[#b31b1b] uppercase xl:text-xs">
                  {event.month}
                </span>
                <span className="text-lg font-bold text-[#1f2937] xl:text-2xl">{event.day}</span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 xl:gap-2">
                <p className="text-sm leading-[1.3] font-bold text-[#1f2937] xl:text-base">
                  {event.title}
                </p>
                <p className="text-xs text-[#4b5563] xl:text-sm">{event.dateRangeLabel}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <MapPinSolid className="mt-0.5 h-5 w-5 shrink-0 text-[#c1121f] xl:h-6 xl:w-6" />
              <p className="text-xs leading-[1.4] text-[#4b5563] xl:text-sm">
                <span className="xl:hidden">
                  {event.addressLine1} {event.addressLine2}
                </span>
                <span className="hidden xl:inline">
                  {event.addressLine1}
                  <br />
                  {event.addressLine2}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 xl:gap-2">
              {event.tagsMobile.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#e5e7eb] bg-white px-2.5 py-1 text-[10px] text-[#4b5563] xl:hidden"
                >
                  {tag}
                </span>
              ))}
              {event.tagsDesktop.map((tag) => (
                <span
                  key={tag}
                  className="hidden rounded-full border border-[#e5e7eb] bg-white px-3 py-1.5 text-xs text-[#4b5563] xl:inline-flex"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-2 text-xs font-bold text-[#a3271f]">
              View Event Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

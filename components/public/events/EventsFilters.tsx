import { ChevronDown, Search } from "lucide-react";

import { eventsFilterChipsDesktop, eventsFilterChipsMobile } from "@/lib/events-content";

// Search input / dropdowns / chips are presentational only, matching Gil's
// design — no live filtering yet since there's no real event dataset to
// query against (same "static UI over real content" approach already used
// for the homepage dojo finder, see components/public/home/HomeDojoFinder.tsx).
export function EventsFilters() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-2 pb-5 sm:px-6 md:px-10 xl:px-[190px] xl:pt-4 xl:pb-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:gap-3">
          <div className="flex items-center gap-2 rounded-[4px] border border-[#e4dccf] bg-white px-3.5 py-2.5 xl:flex-1 xl:rounded-none xl:px-4 xl:py-3">
            <Search className="h-3.5 w-3.5 shrink-0 text-[#706963] xl:hidden" />
            <span className="text-[13px] text-[#706963]">Search events...</span>
          </div>

          <div className="flex gap-2 xl:contents">
            <div className="flex flex-1 items-center justify-between gap-2 rounded-[4px] border border-[#e4dccf] bg-white px-3 py-2.5 xl:w-[180px] xl:flex-none xl:rounded-none xl:px-4 xl:py-3">
              <span className="text-[13px] text-[#2a2521]">All Types</span>
              <ChevronDown className="h-3 w-3 shrink-0 text-[#706963]" />
            </div>
            <div className="flex flex-1 items-center justify-between gap-2 rounded-[4px] border border-[#e4dccf] bg-white px-3 py-2.5 xl:w-[180px] xl:flex-none xl:rounded-none xl:px-4 xl:py-3">
              <span className="text-[13px] text-[#2a2521]">All Countries</span>
              <ChevronDown className="h-3 w-3 shrink-0 text-[#706963]" />
            </div>
          </div>

          <button
            type="button"
            className="flex h-10 items-center justify-center rounded-[4px] bg-[#8d261e] px-6 py-2.5 text-[13px] font-semibold text-white xl:h-11 xl:w-auto xl:rounded-[4px] xl:px-6 xl:py-3"
          >
            <span className="xl:hidden">Search Events</span>
            <span className="hidden xl:inline">Search</span>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 xl:mt-4 xl:gap-2">
          {eventsFilterChipsDesktop.map((chip, index) => {
            const isActive = index === 0;
            const isMobileVisible = eventsFilterChipsMobile.includes(chip);
            return (
              <span
                key={chip}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold xl:text-xs xl:font-semibold ${
                  !isMobileVisible ? "hidden xl:inline-flex" : "inline-flex"
                } ${
                  isActive
                    ? "bg-[#b08a4e] text-white"
                    : "border border-[#e4dccf] bg-[#faf9f7] text-[#706963] xl:bg-transparent xl:font-normal"
                }`}
              >
                {chip}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

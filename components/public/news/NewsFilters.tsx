import { Search } from "lucide-react";

import { newsFilterChipsDesktop, newsFilterChipsMobile } from "@/lib/news-content";

// Presentational only, matching Gil's design — no live filtering yet since
// there's no real news dataset to query against, same approach as
// components/public/events/EventsFilters.tsx.
export function NewsFilters() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-2 pb-5 sm:px-6 md:px-10 xl:px-[190px] xl:pt-4 xl:pb-4">
        <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:gap-6">
          <div className="flex items-center gap-2 rounded-[4px] border border-[#e8e2d5] bg-white px-3.5 py-2.5 xl:flex-1 xl:rounded-[2px] xl:px-4 xl:py-3">
            <Search className="h-3.5 w-3.5 shrink-0 text-[#8f857e]" />
            <span className="text-[13px] text-[#8f857e]">Search news...</span>
          </div>

          <button
            type="button"
            className="flex h-10 items-center justify-center bg-[#a3271f] px-6 py-2.5 text-[13px] font-bold text-[#faf9f7] xl:h-[41px] xl:w-[150px] xl:shrink-0 xl:rounded-[4px] xl:text-sm"
          >
            <span className="xl:hidden">Search News</span>
            <span className="hidden xl:inline">Search</span>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 xl:mt-4 xl:gap-2">
          {newsFilterChipsDesktop.map((chip, index) => {
            const isActive = index === 0;
            const mobileLabel = newsFilterChipsMobile[index];
            return (
              <span
                key={chip}
                className={`rounded-full px-3.5 py-2 text-xs font-semibold xl:px-4 xl:py-2.5 ${
                  isActive
                    ? "border border-[#a88752] bg-[#a88752] text-white"
                    : "border border-[#e8e2d5] bg-white text-[#6e6560] xl:font-normal"
                }`}
              >
                <span className="xl:hidden">{mobileLabel}</span>
                <span className="hidden xl:inline">{chip}</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

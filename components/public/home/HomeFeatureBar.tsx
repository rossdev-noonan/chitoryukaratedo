import { Fragment } from "react";

import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-8 border border-[#C8A24A] bg-white px-6 py-8 sm:flex-row sm:items-center sm:justify-center sm:gap-[40px] sm:px-10 sm:py-9 lg:px-[80px] lg:py-[48px]">
        {dictionary.home.trustBar.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && (
              <div className="hidden h-[58px] w-0 border-l border-[#C8A24A] sm:block" />
            )}
            <div className="flex-1 text-center">
              <p className="font-heading text-[48px] leading-none font-bold text-[#C1121F]">
                {item.value}
              </p>
              <p className="mt-1 text-[14px] font-semibold text-[#4B5563]">{item.label}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

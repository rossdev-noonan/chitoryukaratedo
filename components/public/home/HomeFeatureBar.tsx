import { Fragment } from "react";

import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

const ICONS = [
  "/images/homepage/icons/feature-origins.svg",
  "/images/homepage/icons/feature-community.svg",
  "/images/homepage/icons/feature-teaching.svg",
  "/images/homepage/icons/feature-development.png",
];

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="flex flex-col gap-8 border border-[#e5e7eb] bg-white px-6 py-8 sm:flex-row sm:items-start sm:gap-[40px] sm:px-10 sm:py-9 lg:px-[80px] lg:py-[48px]">
        {dictionary.home.featureBar.map((item, index) => (
          <Fragment key={item.title}>
            {index > 0 && <div className="border-accent hidden h-[58px] w-0 border-l sm:block" />}
            <div className="flex flex-1 items-start gap-[16px]">
              {/* eslint-disable-next-line @next/next/no-img-element -- small
                  decorative vector/transparent icons, no benefit from next/image's
                  raster optimization pipeline and SVGs aren't optimized by default */}
              <img
                src={ICONS[index]}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div>
                <p className="text-[16px] font-bold text-[#1f2937]">{item.title}</p>
                <p className="mt-1 text-[14px] leading-[1.4] text-[#666]">{item.description}</p>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

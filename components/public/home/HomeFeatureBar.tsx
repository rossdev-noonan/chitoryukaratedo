import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

const ICONS = [
  "/images/homepage/icons/trust-generations.svg",
  "/images/homepage/icons/trust-years.svg",
  "/images/homepage/icons/trust-countries.svg",
  "/images/homepage/icons/trust-dojos.svg",
];

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="flex flex-wrap justify-center gap-3">
        {dictionary.home.trustBar.map((item, index) => (
          <div
            key={item.label}
            className="flex h-[163px] w-[193px] flex-col items-center justify-center border border-[#E5E7EB] bg-white px-2 py-2.5 text-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- small
                decorative vector icons, no benefit from next/image's raster
                optimization pipeline and SVGs aren't optimized by default */}
            <img src={ICONS[index]} alt="" width={35} height={33} className="h-[33px] w-auto" />
            <p className="font-heading -mt-1 text-[60px] leading-[86px] font-bold text-[#C1121F]">
              {item.value}
            </p>
            <p className="-mt-1 text-[14px] font-semibold text-[#1F2937]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

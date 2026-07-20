import Image from "next/image";

import type { Continent } from "@/lib/continents";
import type { Dictionary } from "@/lib/i18n/types";

// Pixel-calibrated against the "dojo-directory-map.png" asset (1536x672, same
// 1280x560 aspect as Figma's map-container): each pin's position was read
// directly from Gil's Figma layout (node 279:4443, "map-section") rather than
// estimated, so the callouts sit on their real continents.
const CONTINENT_PINS: { continent: Continent; xPct: number; yPct: number }[] = [
  { continent: "northAmerica", xPct: 30.16, yPct: 36.88 },
  { continent: "southAmerica", xPct: 36.88, yPct: 64.02 },
  { continent: "europe", xPct: 50.63, yPct: 32.23 },
  { continent: "asia", xPct: 77.5, yPct: 39.91 },
  { continent: "australia", xPct: 79.38, yPct: 70.63 },
  { continent: "africa", xPct: 54.3, yPct: 73.66 },
];

interface DojoWorldMapProps {
  dictionary: Dictionary;
  dojoCountsByContinent: Record<Continent, number>;
}

export function DojoWorldMap({ dictionary, dojoCountsByContinent }: DojoWorldMapProps) {
  return (
    <div className="relative aspect-[1280/560] w-full overflow-hidden rounded-xl">
      <Image
        src="/images/homepage/dojo-directory-map.png"
        alt="World map showing Chito-Ryu dojo regions"
        fill
        sizes="(min-width: 1024px) 1100px, 100vw"
        className="object-cover"
      />

      {CONTINENT_PINS.map(({ continent, xPct, yPct }) => {
        const count = dojoCountsByContinent[continent] ?? 0;
        const flipLeft = xPct > 55;

        return (
          <div
            key={continent}
            className="absolute flex -translate-y-1/2 items-center"
            style={{
              left: `${xPct}%`,
              top: `${yPct}%`,
              flexDirection: flipLeft ? "row-reverse" : "row",
            }}
          >
            <span className="relative block h-[16px] w-[16px] shrink-0 sm:h-[20px] sm:w-[20px] lg:h-[24px] lg:w-[24px]">
              <Image
                src="/images/homepage/icons/map-pin-continent.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
            <div
              className={`border-border bg-background flex flex-col gap-0.5 border px-2 py-1 whitespace-nowrap shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] sm:px-3 sm:py-1.5 ${flipLeft ? "mr-1" : "ml-1"}`}
            >
              <p className="text-[10px] font-semibold text-[#1f2937] sm:text-xs lg:text-sm">
                {dictionary.home.continents[continent]}
              </p>
              <p className="text-[9px] text-[#4b5563] sm:text-[11px] lg:text-xs">
                {dictionary.home.dojoCountLabel.replace("{count}", String(count))}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

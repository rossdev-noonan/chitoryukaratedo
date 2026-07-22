import { MapPin } from "lucide-react";
import Image from "next/image";

const members = [
  ["Japan", "japan"],
  ["USA", "usa"],
  ["Canada", "canada"],
  ["Australia", "australia"],
  ["Scotland", "scotland"],
  ["Norway", "norway"],
  ["Jamaica", "jamaica"],
  ["Hong Kong", "hong-kong"],
  ["Singapore", "singapore"],
  ["Ireland", "ireland"],
] as const;

const pins = [
  [28.5, 35],
  [30.4, 28.5],
  [31, 44.5],
  [45, 25.7],
  [46.6, 23.3],
  [49.2, 19],
  [69.4, 53.4],
  [71.8, 42.1],
  [77.3, 35],
  [78.2, 66],
] as const;

export function AboutWorldMap() {
  return (
    <div className="pb-10">
      <h3 className="font-heading text-2xl font-medium text-black md:text-[32px] xl:text-5xl xl:font-semibold">
        ICKF Members
      </h3>
      <div className="mt-8 grid grid-cols-3 gap-1 sm:flex sm:flex-wrap sm:gap-3">
        {members.map(([name, file]) => (
          <div
            key={name}
            className="text-muted-foreground flex h-7 min-w-0 items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-2 py-1.5 text-[10px] sm:min-w-[117px] sm:px-3 sm:text-xs"
          >
            <span className="relative h-[14px] w-[22px] overflow-hidden rounded-[2px] border border-[#e5e7eb]">
              <Image
                src={`/images/flags/${file}.png`}
                alt=""
                fill
                sizes="22px"
                className="object-cover"
              />
            </span>
            {name}
          </div>
        ))}
      </div>

      <div className="relative mt-10 aspect-[1284/560] w-full overflow-hidden rounded-xl bg-[#fafafa] md:mt-[68px]">
        <Image
          src="/images/about/world-map.png"
          alt="Map showing the worldwide Chito-Ryu community"
          fill
          sizes="(min-width: 1280px) 1284px, 100vw"
          className="object-cover"
        />
        {pins.map(([left, top], index) => (
          <MapPin
            key={index}
            aria-hidden
            className="fill-primary text-primary absolute size-4 sm:size-6"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>
    </div>
  );
}

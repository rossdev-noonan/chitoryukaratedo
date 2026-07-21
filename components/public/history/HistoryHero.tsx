import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MapPinSolid } from "@/components/public/icons/MapPinSolid";
import type { Locale } from "@/lib/i18n/locales";

interface HistoryHeroProps {
  lang: Locale;
}

// Percentages against Figma's 1440x720 hero canvas — same aspect-locked
// technique as HomeHero, so the "history pic 1" box scales correctly at
// every breakpoint instead of relying on a fixed pixel box. Gil replaced the
// torii-gate photo with a new aerial dojo-ceremony shot and moved/resized
// the box (left 501, top 40, w 968, h 539 on the 1440x720 canvas).
const historyPicGeometry = { left: 34.792, top: 5.556, width: 67.222, height: 74.861 };

export function HistoryHero({ lang }: HistoryHeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Below md: Figma's mobile hero is just a flat 240px banner photo, not
          the layered bg + repositioned crop used at md+ (that composition is
          desktop-canvas math and doesn't translate to a narrow viewport). */}
      <div className="relative h-[240px] w-full md:hidden">
        <Image
          src="/images/history/history-pic-1.png"
          alt="Aerial view of Chito-Ryu practitioners in formation before a ceremonial hall"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="bg-background hidden px-5 pt-12 pb-8 md:block xl:hidden">
        <div className="flex h-[272px] flex-col items-start">
          <p className="text-brand-accent text-xl font-semibold uppercase">
            home / about / history
          </p>
          <div className="bg-primary mt-[11px] h-[3px] w-[86px]" />
          <h1 className="font-heading mt-[11px] text-5xl leading-none font-semibold text-[#1f2937]">
            History of Chito Ryu
          </h1>
          <p className="mt-6 w-[551px] text-lg leading-[1.6] text-[#4b5563]">
            A tradition spanning over one thousand years, born in China and elevated in Okinawa and
            Japan.
          </p>
          <div className="mt-6 flex gap-4">
            <Link
              href={`/${lang}/login`}
              className="bg-primary-dark text-primary-foreground hover:bg-primary inline-flex h-[51px] items-center justify-center gap-2 px-8 text-base font-bold transition-colors"
            >
              Join our Community
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/dojo-directory`}
              className="border-brand-accent text-brand-accent hover:bg-brand-accent inline-flex h-[51px] items-center justify-center gap-2 border bg-white/80 px-8 text-base font-semibold transition-colors hover:text-white"
            >
              Find our Dojo
              <MapPinSolid className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <div className="relative mt-8 h-[380px] w-full overflow-hidden rounded-lg">
          <Image
            src="/images/history/history-pic-1.png"
            alt="Aerial view of Chito-Ryu practitioners in formation before a ceremonial hall"
            fill
            preload
            sizes="(min-width: 768px) 794px, 100vw"
            className="object-cover object-[center_45%]"
          />
        </div>
      </div>

      <div className="absolute inset-0 hidden xl:block">
        <Image
          src="/images/history/hero-bg-practitioner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative hidden h-[720px] w-full overflow-hidden xl:block">
        <div className="absolute top-0 right-0 aspect-[1440/720] h-full">
          <div
            className="absolute"
            style={{
              left: `${historyPicGeometry.left}%`,
              top: `${historyPicGeometry.top}%`,
              width: `${historyPicGeometry.width}%`,
              height: `${historyPicGeometry.height}%`,
            }}
          >
            <Image
              src="/images/history/history-pic-1.png"
              alt="Aerial view of Chito-Ryu practitioners in formation before a ceremonial hall"
              fill
              sizes="(min-width: 1024px) 68vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-background relative px-5 py-8 md:hidden xl:absolute xl:inset-0 xl:block xl:bg-transparent xl:px-20 xl:pt-[120px]">
        <div className="relative xl:w-[630px]">
          <p className="text-brand-accent text-xl font-semibold uppercase xl:text-sm">
            home / about / history
          </p>
          <div className="bg-primary mt-2 h-[3px] w-[60px] xl:h-0.5 xl:w-[86px]" />
          {/* Gil's desktop hero copy has moved on from mobile's — mobile
              frame (507:346) still literally reads "History of Chito Ryu" as
              of this sync, so these render different text per breakpoint
              rather than picking one. */}
          <h1 className="font-heading mt-2 text-[32px] leading-[1.15] font-semibold text-[#1f2937] xl:hidden">
            History of Chito Ryu
          </h1>
          <h1 className="font-heading mt-3 hidden text-5xl font-semibold text-[#1f2937] xl:block">
            A thousand years,
            <br />
            one lineage.
          </h1>
          <p className="mt-6 max-w-[480px] text-base leading-[1.5] text-[#4b5563] xl:hidden">
            A tradition spanning over one thousand years, born in China and elevated in Okinawa and
            Japan.
          </p>
          <p className="mt-4 hidden max-w-[480px] text-lg leading-[1.6] text-[#4b5563] xl:block">
            From Fujian&apos;s temple courtyards to Chitose Sensei&apos;s dojo in Kumamoto — the
            story of how Chito Ryu came to be.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap xl:mt-8">
            <Link
              href={`/${lang}/login`}
              className="bg-primary-dark text-primary-foreground hover:bg-primary inline-flex h-[49px] w-full items-center justify-center gap-2 px-8 py-4 text-sm font-bold transition-colors sm:w-auto xl:h-auto xl:text-base"
            >
              Join our Community
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/dojo-directory`}
              className="border-brand-accent text-brand-accent hover:bg-brand-accent inline-flex h-[49px] w-full items-center justify-center gap-2 border bg-white/80 px-8 py-4 text-sm font-semibold transition-colors hover:text-white sm:w-auto xl:h-auto xl:text-base"
            >
              Find our Dojo
              <MapPinSolid className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

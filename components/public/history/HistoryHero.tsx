import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    <section className="relative overflow-hidden md:h-[406px] lg:h-[720px]">
      {/* Below md: Figma's mobile hero is just a flat 240px banner photo, not
          the layered bg + repositioned crop used at md+ (that composition is
          desktop-canvas math and doesn't translate to a narrow viewport). */}
      <div className="relative h-[240px] w-full md:hidden">
        <Image
          src="/images/history/history-pic-1.png"
          alt="Aerial view of Chito-Ryu practitioners in formation before a ceremonial hall"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/images/history/hero-bg-practitioner.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative hidden h-full w-full overflow-hidden md:block">
        <div className="absolute top-0 right-0 h-full aspect-[1440/720]">
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

      <div className="bg-background relative px-5 py-6 md:absolute md:inset-0 md:bg-transparent md:px-10 md:pt-20 lg:px-20 lg:pt-[120px]">
        <div className="relative md:w-[480px] lg:w-[630px]">
          <p className="text-brand-accent text-sm font-semibold uppercase">
            home / about / history
          </p>
          <div className="bg-primary mt-2 h-0.5 w-[86px]" />
          <h1 className="font-heading mt-3 text-3xl font-semibold text-[#1f2937] sm:text-4xl lg:text-5xl">
            History of Chito Ryu
          </h1>
          <p className="mt-4 max-w-[480px] text-base leading-[1.6] text-[#4b5563] lg:text-lg">
            A tradition spanning over one thousand years, born in China and elevated in Okinawa
            and Japan.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:mt-8">
            <Link
              href={`/${lang}/login`}
              className="bg-primary-dark text-primary-foreground hover:bg-primary inline-flex w-full items-center justify-center gap-2 px-8 py-4 text-base font-bold transition-colors sm:w-auto"
            >
              Join our Community
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/dojo-directory`}
              className="border-brand-accent text-brand-accent hover:bg-brand-accent inline-flex w-full items-center justify-center gap-2 border bg-white/80 px-8 py-4 text-base font-semibold transition-colors hover:text-white sm:w-auto"
            >
              Find our Dojo
              <MapPin className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

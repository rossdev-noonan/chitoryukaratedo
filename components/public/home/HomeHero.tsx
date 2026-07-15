"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeHeroProps {
  lang: Locale;
  dictionary: Dictionary;
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// Gil's Figma prototype encodes the enso's slide-in with a custom decaying-oscillation
// ease (spring-like overshoot). Reproduced exactly from the exported motion data
// (get_motion_context on node 152:126) so the circle settles the way Gil designed it.
const ensoSlideEase = (t: number) =>
  1 - Math.exp(-t * 7.6657) * (Math.cos(t * 6.7605) + 1.1339 * Math.sin(t * 6.7605));

// Layer geometry copied 1:1 from Figma (canvas 1440x720), expressed as percentages of
// an aspect-ratio-locked wrapper so every layer stays pixel-aligned at every breakpoint.
const heroLayers = {
  center: { left: 45.972, top: 12.222, width: 38.889, height: 121.111 },
  left: { left: 28.264, top: 21.667, width: 37.153, height: 124.444 },
  right: { left: 65.417, top: 21.667, width: 40.417, height: 102.222 },
  enso: { left: 41.319, top: 1.528, width: 51.361, height: 102.722 },
} as const;

export function HomeHero({ lang, dictionary }: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : undefined;

  return (
    <section className="relative md:h-[406px] lg:h-[720px]">
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:absolute md:inset-0 md:h-full">
        {/* Ambient ink-wash backdrop: Gil's real texture export, present
            from the very start and stays visible underneath the circle/photos. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 md:-right-[39px] lg:right-0"
          initial={initial ?? { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/images/homepage/hero-bg-texture-real.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[91%_center] md:object-right"
          />
        </motion.div>

        {/* Image stack: matches Gil's real Figma layer structure exactly (enso circle,
            left/center/right practitioner cutouts are separate assets, not one flattened
            photo), so nothing can drift out of alignment the way a merged photo could. */}
        <div className="absolute inset-0 aspect-[1440/720] md:-right-[39px] lg:right-0">
          <motion.div
            className="pointer-events-none absolute z-10"
            style={{
              left: `${heroLayers.enso.left}%`,
              top: `${heroLayers.enso.top}%`,
              width: `${heroLayers.enso.width}%`,
              height: `${heroLayers.enso.height}%`,
            }}
            initial={initial ?? { opacity: 0, scale: 0.1, x: "-180%", rotate: 261.3 }}
            animate={{ opacity: 1, scale: 1, x: "0%", rotate: 81.3 }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 1, ease: easeOutExpo },
              x: { duration: 2, ease: ensoSlideEase },
              rotate: { duration: 10, ease: "linear" },
            }}
          >
            <Image src="/images/homepage/hero-enso.png" alt="" fill sizes="50vw" />
          </motion.div>

          <motion.div
            className="absolute z-20"
            style={{
              left: `${heroLayers.right.left}%`,
              top: `${heroLayers.right.top}%`,
              width: `${heroLayers.right.width}%`,
              height: `${heroLayers.right.height}%`,
            }}
            initial={initial ?? { opacity: 0, x: "35%" }}
            animate={{ opacity: 1, x: "0%" }}
            transition={{ delay: 0.62, duration: 0.55, ease: easeOutExpo }}
          >
            <Image
              src="/images/homepage/hero-right.png"
              alt=""
              fill
              sizes="40vw"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute z-30"
            style={{
              left: `${heroLayers.left.left}%`,
              top: `${heroLayers.left.top}%`,
              width: `${heroLayers.left.width}%`,
              height: `${heroLayers.left.height}%`,
            }}
            initial={initial ?? { opacity: 0, x: "-35%" }}
            animate={{ opacity: 1, x: "0%" }}
            transition={{ delay: 0.62, duration: 0.55, ease: easeOutExpo }}
          >
            <Image
              src="/images/homepage/hero-left.png"
              alt=""
              fill
              sizes="38vw"
              className="object-contain"
            />
          </motion.div>

          <motion.div
            className="absolute z-40"
            style={{
              left: `${heroLayers.center.left}%`,
              top: `${heroLayers.center.top}%`,
              width: `${heroLayers.center.width}%`,
              height: `${heroLayers.center.height}%`,
            }}
            initial={initial ?? { opacity: 0, y: "20%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ delay: 0.62, duration: 0.55, ease: easeOutExpo }}
          >
            <Image
              src="/images/homepage/hero-center.png"
              alt="Three Chito-Ryu Karate-Do practitioners in fighting stances"
              fill
              priority
              sizes="39vw"
              className="object-contain"
            />
          </motion.div>
        </div>
      </div>

      <div className="bg-background relative px-5 py-6 md:absolute md:inset-0 md:bg-transparent md:px-10 md:pt-20 lg:px-20 lg:pt-[120px]">
        <div className="md:w-full lg:w-[720px] lg:max-w-[50vw]">
          <motion.h1
            className="font-heading text-2xl leading-normal font-medium md:w-[311px] md:text-[28px] lg:w-[720px] lg:text-5xl"
            initial={initial ?? { x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.16, duration: 0.56, ease: easeOutExpo }}
          >
            <span className="text-foreground block">{dictionary.home.heroTitleLine1}</span>
            <span className="mt-0 block lg:mt-4">
              <span className="text-primary">{dictionary.home.heroTitleHighlight}</span>{" "}
              <span className="text-foreground">{dictionary.home.heroTitleLine2}</span>
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground mt-4 max-w-[230px] text-xs leading-normal lg:mt-10 lg:max-w-[480px] lg:text-lg lg:leading-[1.6]"
            initial={initial ?? { y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: easeOutExpo }}
          >
            {dictionary.home.heroDescription}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-8 lg:mt-10"
            initial={initial ?? { y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.76, duration: 0.5, ease: easeOutExpo }}
          >
            <Link
              href={`/${lang}/about`}
              className="bg-primary-dark text-primary-foreground inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold transition-opacity hover:opacity-90"
            >
              {dictionary.home.aboutChitoRyu}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${lang}/dojo-directory`}
              className="border-brand-accent text-brand-accent inline-flex items-center justify-center gap-2 border bg-white/80 px-8 py-4 text-base font-semibold transition-colors hover:bg-white"
            >
              {dictionary.home.findADojo}
              <MapPin className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute -top-5 left-6 flex items-center gap-2 md:hidden lg:static lg:mt-7 lg:flex"
            initial={initial ?? { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.02, duration: 0.4, ease: easeOutExpo }}
            style={{ transformOrigin: "left" }}
          >
            <span className="bg-primary h-1 w-10 rounded-sm" />
            <span className="bg-brand-accent h-1 w-6 rounded-sm" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

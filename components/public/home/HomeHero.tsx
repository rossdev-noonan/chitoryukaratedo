"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeHeroProps {
  lang: Locale;
  dictionary: Dictionary;
}

const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const SLIDE_INTERVAL_MS = 7000;

// Gil's Figma prototype encodes the enso's slide-in with a custom decaying-oscillation
// ease (spring-like overshoot). Reproduced exactly from the exported motion data
// (get_motion_context on node 152:126) so the circle settles the way Gil designed it.
const ensoSlideEase = (t: number) =>
  1 - Math.exp(-t * 7.6657) * (Math.cos(t * 6.7605) + 1.1339 * Math.sin(t * 6.7605));

// Layer geometry copied 1:1 from Figma (canvas 1440x720) for each slide variant, expressed
// as percentages of an aspect-ratio-locked wrapper so every layer stays pixel-aligned at
// every breakpoint. The enso circle's position is shared across both slides (see below) so
// it never re-renders or shifts when the slide changes, per Ross's feedback that it should
// arrive once and hold its final position while the practitioner photos change on top of it.
const ensoLayer = { left: 41.319, top: 1.528, width: 51.361, height: 102.722 };

interface TitleSegment {
  text: string;
  color: "primary" | "foreground";
}

interface HeroSlide {
  titleLine1: TitleSegment[];
  titleLine2: TitleSegment[];
  description: string;
  photos: {
    center: { src: string; geometry: { left: number; top: number; width: number; height: number } };
    left: { src: string; geometry: { left: number; top: number; width: number; height: number } };
    right: { src: string; geometry: { left: number; top: number; width: number; height: number } };
  };
}

function useHeroSlides(dictionary: Dictionary): HeroSlide[] {
  return [
    {
      titleLine1: [{ text: dictionary.home.heroTitleLine1, color: "foreground" }],
      titleLine2: [
        { text: dictionary.home.heroTitleHighlight, color: "primary" },
        { text: ` ${dictionary.home.heroTitleLine2}`, color: "foreground" },
      ],
      description: dictionary.home.heroDescription,
      photos: {
        center: {
          src: "/images/homepage/hero-center.png",
          geometry: { left: 45.972, top: 12.222, width: 38.889, height: 121.111 },
        },
        left: {
          src: "/images/homepage/hero-left.png",
          geometry: { left: 28.264, top: 21.667, width: 37.153, height: 124.444 },
        },
        right: {
          src: "/images/homepage/hero-right.png",
          geometry: { left: 65.417, top: 21.667, width: 40.417, height: 102.222 },
        },
      },
    },
    {
      titleLine1: [{ text: dictionary.home.heroSlide2Title1, color: "foreground" }],
      titleLine2: [{ text: dictionary.home.heroSlide2Title2, color: "primary" }],
      description: dictionary.home.heroSlide2Description,
      photos: {
        center: {
          src: "/images/homepage/hero-center-2.png",
          geometry: { left: 48.611, top: 11.111, width: 38.889, height: 121.111 },
        },
        left: {
          src: "/images/homepage/hero-left-2.png",
          geometry: { left: 30.903, top: 20.556, width: 37.153, height: 124.444 },
        },
        right: {
          src: "/images/homepage/hero-right-2.png",
          geometry: { left: 64.167, top: 27.083, width: 40.417, height: 102.222 },
        },
      },
    },
  ];
}

export function HomeHero({ lang, dictionary }: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : undefined;
  const slides = useHeroSlides(dictionary);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, slides.length]);

  const slide = slides[activeSlide];

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
            photo). The enso is rendered once, outside the slide crossfade, so it never
            re-runs its entrance or shifts position when the active slide changes. */}
        <div className="absolute inset-0 aspect-[1440/720] md:-right-[39px] lg:right-0">
          <motion.div
            className="pointer-events-none absolute z-10"
            style={{
              left: `${ensoLayer.left}%`,
              top: `${ensoLayer.top}%`,
              width: `${ensoLayer.width}%`,
              height: `${ensoLayer.height}%`,
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

          <AnimatePresence mode="sync">
            <motion.div
              key={`right-${activeSlide}`}
              className="absolute z-20"
              style={{
                left: `${slide.photos.right.geometry.left}%`,
                top: `${slide.photos.right.geometry.top}%`,
                width: `${slide.photos.right.geometry.width}%`,
                height: `${slide.photos.right.geometry.height}%`,
              }}
              initial={initial ?? { opacity: 0, x: "35%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0 }}
              transition={{ delay: activeSlide === 0 ? 0.62 : 0, duration: 0.55, ease: easeOutExpo }}
            >
              <Image
                src={slide.photos.right.src}
                alt=""
                fill
                sizes="40vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="sync">
            <motion.div
              key={`left-${activeSlide}`}
              className="absolute z-30"
              style={{
                left: `${slide.photos.left.geometry.left}%`,
                top: `${slide.photos.left.geometry.top}%`,
                width: `${slide.photos.left.geometry.width}%`,
                height: `${slide.photos.left.geometry.height}%`,
              }}
              initial={initial ?? { opacity: 0, x: "-35%" }}
              animate={{ opacity: 1, x: "0%" }}
              exit={{ opacity: 0 }}
              transition={{ delay: activeSlide === 0 ? 0.62 : 0, duration: 0.55, ease: easeOutExpo }}
            >
              <Image
                src={slide.photos.left.src}
                alt=""
                fill
                sizes="38vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="sync">
            <motion.div
              key={`center-${activeSlide}`}
              className="absolute z-40"
              style={{
                left: `${slide.photos.center.geometry.left}%`,
                top: `${slide.photos.center.geometry.top}%`,
                width: `${slide.photos.center.geometry.width}%`,
                height: `${slide.photos.center.geometry.height}%`,
              }}
              initial={initial ?? { opacity: 0, y: "20%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0 }}
              transition={{ delay: activeSlide === 0 ? 0.62 : 0, duration: 0.55, ease: easeOutExpo }}
            >
              <Image
                src={slide.photos.center.src}
                alt="Three Chito-Ryu Karate-Do practitioners"
                fill
                priority
                sizes="39vw"
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-background relative px-5 py-6 md:absolute md:inset-0 md:bg-transparent md:px-10 md:pt-20 lg:px-20 lg:pt-[120px]">
        <div className="relative md:w-full lg:w-[720px] lg:max-w-[50vw]">
          <AnimatePresence mode="sync">
            <motion.div
              key={`text-${activeSlide}`}
              className="relative"
              initial={initial ?? { x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0, position: "absolute", top: 0, left: 0 }}
              transition={{ delay: activeSlide === 0 ? 0.16 : 0, duration: 0.56, ease: easeOutExpo }}
            >
              <h1 className="font-heading text-2xl leading-normal font-medium md:w-[311px] md:text-[28px] lg:w-[720px] lg:text-5xl">
                <span className="block">
                  {slide.titleLine1.map((segment, index) => (
                    <span
                      key={index}
                      className={segment.color === "primary" ? "text-primary" : "text-foreground"}
                    >
                      {segment.text}
                    </span>
                  ))}
                </span>
                <span className="mt-0 block lg:mt-4">
                  {slide.titleLine2.map((segment, index) => (
                    <span
                      key={index}
                      className={segment.color === "primary" ? "text-primary" : "text-foreground"}
                    >
                      {segment.text}
                    </span>
                  ))}
                </span>
              </h1>

              <p className="text-muted-foreground mt-4 max-w-[230px] text-xs leading-normal lg:mt-10 lg:max-w-[480px] lg:text-lg lg:leading-[1.6]">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

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
            className="absolute -top-5 left-6 flex items-center gap-2 md:hidden lg:static lg:mt-7 lg:flex"
            initial={initial ?? { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1.02, duration: 0.4, ease: easeOutExpo }}
            style={{ transformOrigin: "left" }}
          >
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === activeSlide}
                onClick={() => setActiveSlide(index)}
                className={`h-1 rounded-sm transition-all ${
                  index === activeSlide ? "bg-primary w-10" : "bg-brand-accent w-6"
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

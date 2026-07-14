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

export function HomeHero({ lang, dictionary }: HomeHeroProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : undefined;

  return (
    <section className="relative md:h-[406px] lg:h-[720px]">
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:absolute md:inset-0 md:h-full">
        {/* Ambient ink-wash backdrop: present from the very start and stays
            visible underneath the circle/photo — approximates the faint
            gray texture in Gil's reference video (a light wash that's
            already there before anything else appears), reusing the same
            hero photo so it's always in sync, just blurred + desaturated
            rather than a separately extracted asset. */}
        <motion.div
          aria-hidden
          className="absolute inset-0 md:-right-[39px] lg:right-0"
          initial={initial ?? { opacity: 0 }}
          animate={{ opacity: 0.16 }}
          transition={{ duration: 0.3 }}
          style={{ filter: "grayscale(1) blur(28px)", transform: "scale(1.15)" }}
        >
          <Image
            src="/images/homepage/hero-practitioner.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[91%_center] md:object-right"
          />
        </motion.div>

        <div className="pointer-events-none absolute top-1/2 left-[70%] aspect-square w-[70%] max-w-[700px] -translate-x-1/2 -translate-y-1/2 sm:w-[58%] md:w-[49%]">
          <motion.div
            className="relative h-full w-full"
            initial={initial ?? { scale: 0, opacity: 0, rotate: -140 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <span
              className="bg-primary block h-full w-full"
              style={{
                WebkitMaskImage: "url(/images/homepage/hero-brush-mask.png)",
                maskImage: "url(/images/homepage/hero-brush-mask.png)",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 md:-right-[39px] lg:right-0"
          initial={initial ?? { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.62, duration: 0.55, ease: easeOutExpo }}
        >
          <Image
            src="/images/homepage/hero-practitioner.png"
            alt="Three Chito-Ryu Karate-Do practitioners in fighting stances"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[91%_center] md:object-right"
          />
        </motion.div>
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

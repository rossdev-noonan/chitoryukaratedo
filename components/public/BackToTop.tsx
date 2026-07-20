"use client";

import { ArrowUp } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Rough proxy for "past the hero section" — hero heights vary slightly per
// page, but a fraction of the viewport height reads as "scrolled away from
// the top" everywhere without needing to measure each page's actual hero.
const SHOW_THRESHOLD_RATIO = 0.8;
const SPIN_DURATION_S = 20;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * SHOW_THRESHOLD_RATIO);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })}
          aria-label="Back to top"
          className="fixed right-4 bottom-4 z-50 h-11 w-11 cursor-pointer rounded-full bg-white/95 shadow-[0_4px_10px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-transform hover:scale-105 sm:right-6 sm:bottom-6 sm:h-14 sm:w-14"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <span className="relative block h-full w-full p-1.5 sm:p-2">
            <motion.span
              className="absolute inset-0 block"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: SPIN_DURATION_S, repeat: Infinity, ease: "linear" }
              }
            >
              <Image src="/images/homepage/hero-enso.png" alt="" fill sizes="56px" />
            </motion.span>
            <ArrowUp className="absolute inset-0 m-auto h-5 w-5 text-white" />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

const callouts = [
  {
    id: "hands",
    label: "Hands",
    meaning: "Open hands — technique guided by control.",
    path: "M 150 126 C 190 130, 190 202, 330 211",
    dot: [330, 211],
    side: "left",
  },
  {
    id: "sun",
    label: "Sun",
    meaning: "The red sun at the centre of the emblem.",
    path: "M 364 72 C 410 110, 430 170, 410 259",
    dot: [410, 259],
    side: "top",
  },
  {
    id: "chito",
    label: "Chito Ryu",
    meaning: "千唐流 — thousand-year Tang lineage.",
    path: "M 650 118 C 590 104, 585 150, 535 157 M 650 118 C 670 166, 632 203, 610 214",
    dot: [535, 157],
    side: "right",
  },
  {
    id: "karate",
    label: "Karate-do",
    meaning: "空手道 — the way of the empty hand.",
    path: "M 176 420 C 230 390, 240 330, 362 313",
    dot: [362, 313],
    side: "left",
  },
  {
    id: "universe",
    label: "Universe",
    meaning: "The enclosing circle represents the universe.",
    path: "M 656 420 C 584 429, 550 393, 566 354",
    dot: [566, 354],
    side: "right",
  },
] as const;

export function AnimatedEmblemMeaning() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const shouldAnimate = reduceMotion ? true : inView;

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[800/500] w-full max-w-[900px]"
      aria-label="Interactive explanation of the Chito-Ryu emblem"
    >
      <div className="absolute top-1/2 left-1/2 aspect-square w-[43%] -translate-x-1/2 -translate-y-1/2">
        <Image
          src="/brand/chito-ryu-logo.svg"
          alt="Chito-Ryu emblem"
          fill
          sizes="390px"
          className="object-contain"
        />
      </div>

      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden="true"
      >
        {callouts.map((callout, index) => (
          <g key={callout.id}>
            <motion.path
              d={callout.path}
              fill="none"
              stroke={active === callout.id ? "#a3271f" : "#b08d47"}
              strokeWidth={active === callout.id ? 3 : 2}
              strokeLinecap="round"
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={
                shouldAnimate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }
              }
              transition={{ delay: index * 0.32, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.circle
              cx={callout.dot[0]}
              cy={callout.dot[1]}
              r={active === callout.id ? 6 : 4}
              fill={active === callout.id ? "#a3271f" : "#b08d47"}
              initial={reduceMotion ? false : { scale: 0 }}
              animate={shouldAnimate ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: index * 0.32 + 0.72, duration: 0.25 }}
            />
          </g>
        ))}
      </svg>

      {callouts.map((callout, index) => {
        const positions = {
          hands: "left-[2%] top-[18%]",
          sun: "left-[40%] top-[2%]",
          chito: "right-[1%] top-[15%]",
          karate: "left-[1%] bottom-[4%]",
          universe: "right-[1%] bottom-[4%]",
        } as const;
        return (
          <motion.button
            key={callout.id}
            type="button"
            onClick={() => setActive(active === callout.id ? null : callout.id)}
            onFocus={() => setActive(callout.id)}
            onBlur={() => setActive(null)}
            aria-expanded={active === callout.id}
            className={`absolute ${positions[callout.id]} ring-brand-accent max-w-[34%] rounded-sm bg-white/90 px-2 py-1 text-left shadow-sm focus-visible:ring-2 focus-visible:outline-none sm:bg-transparent sm:shadow-none`}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ delay: index * 0.32 + 0.76, duration: 0.35 }}
          >
            <span
              className={`font-heading block text-sm italic sm:text-xl ${active === callout.id ? "text-primary-dark" : "text-foreground"}`}
            >
              {callout.label}
            </span>
            <span
              className={`text-muted-foreground mt-1 text-[10px] leading-snug sm:block sm:text-xs ${active === callout.id ? "block opacity-100" : "hidden opacity-0 sm:block"}`}
            >
              {callout.meaning}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

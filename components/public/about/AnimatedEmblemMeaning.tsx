"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

const callouts = [
  {
    id: "sun",
    label: "Sun",
    symbol: "日",
    title: "The Sun",
    meaning: "The red sun at the centre of the emblem.",
    path: "M 248 34 C 292 72, 306 170, 290 250",
    dots: [[290, 250]],
  },
  {
    id: "hands",
    label: "Hands",
    symbol: "手",
    title: "Hands Joined in Peace",
    meaning: "The five lines on each side represent people joining hands in peace.",
    path: "M 83 94 C 76 154, 94 209, 145 223",
    dots: [[145, 223]],
  },
  {
    id: "chito",
    label: "Chito Ryu",
    symbol: "千唐流",
    title: "千唐流 — Chito Ryu",
    meaning: "千唐流 — the thousand-year Tang lineage.",
    path:
      "M 486 67 C 432 57, 385 91, 337 151 M 486 67 C 470 98, 425 145, 375 185 M 486 67 C 526 128, 477 190, 413 221",
    dots: [
      [337, 151],
      [375, 185],
      [413, 221],
    ],
  },
  {
    id: "karate",
    label: "Karate-do",
    symbol: "空手道",
    title: "空手道 — Karate-do",
    meaning: "空手道 — the way of the empty hand.",
    path: "M 95 374 C 111 330, 145 284, 201 272 M 108 392 C 152 380, 190 347, 228 316",
    dots: [
      [201, 272],
      [228, 316],
    ],
  },
  {
    id: "universe",
    label: "Universe",
    symbol: "宇宙",
    title: "The Universe",
    meaning: "The enclosing circle represents the universe and our shared world.",
    path: "M 490 384 C 431 403, 382 410, 355 378",
    dots: [[355, 378]],
  },
] as const;

type CalloutId = (typeof callouts)[number]["id"];

const positions: Record<CalloutId, string> = {
  sun: "left-[44%] top-[3%] -translate-x-1/2",
  hands: "left-0 top-[18%]",
  chito: "right-[-5%] top-[10%] sm:right-0",
  karate: "bottom-0 left-0",
  universe: "right-0 bottom-0",
};

const selectorOrder: CalloutId[] = ["sun", "chito", "hands", "universe", "karate"];

export function AnimatedEmblemMeaning() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<CalloutId | null>(null);
  const shouldAnimate = Boolean(reduceMotion || inView);
  const activeCallout = callouts.find((callout) => callout.id === active);

  return (
    <section
      ref={ref}
      className="overflow-hidden bg-[#fffefc] px-4 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16"
      aria-labelledby="crest-meaning-title"
    >
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-brand-accent text-[11px] font-semibold tracking-[0.38em] uppercase sm:text-xs">
          Chito Ryu Karate-do
        </p>
        <h3
          id="crest-meaning-title"
          className="font-heading text-foreground mt-4 text-[34px] leading-[1.08] font-medium sm:text-5xl"
        >
          The Crest &amp; Its Meaning
        </h3>
        <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base">
          Select any element to reveal the symbolism behind the Chito Ryu emblem.
        </p>
      </header>

      <div className="mx-auto mt-8 grid max-w-5xl items-center gap-7 lg:mt-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(260px,0.85fr)] lg:gap-12">
        <div
          className="relative mx-auto aspect-[580/430] w-full max-w-[650px]"
          aria-label="Interactive explanation of the Chito-Ryu emblem"
        >
          <div className="absolute top-[58%] left-1/2 aspect-square w-[64%] -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="absolute inset-0"
              initial={
                reduceMotion
                  ? false
                  : { clipPath: "circle(0% at 50% 50%)", opacity: 1 }
              }
              animate={
                shouldAnimate
                  ? {
                      clipPath: reduceMotion
                        ? "circle(75% at 50% 50%)"
                        : [
                            "circle(0% at 50% 50%)",
                            "circle(17% at 50% 50%)",
                            "circle(17% at 50% 50%)",
                            "circle(75% at 50% 50%)",
                          ],
                      opacity: 1,
                    }
                  : { clipPath: "circle(0% at 50% 50%)", opacity: 1 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      clipPath: {
                        duration: 2.25,
                        times: [0, 0.2, 0.34, 1],
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }
              }
            >
              <Image
                src="/brand/chito-ryu-logo.svg"
                alt="Chito-Ryu emblem"
                fill
                priority={false}
                sizes="(min-width: 1024px) 410px, 64vw"
                className="object-contain"
              />
            </motion.div>
          </div>

          <svg
            viewBox="0 0 580 430"
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            aria-hidden="true"
          >
            {callouts.map((callout, index) => {
              const isActive = active === callout.id;
              return (
                <g key={callout.id}>
                  <motion.path
                    d={callout.path}
                    fill="none"
                    stroke="#c5a24d"
                    strokeWidth={isActive ? 4 : 2.2}
                    strokeLinecap="round"
                    initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
                    animate={
                      shouldAnimate
                        ? { pathLength: 1, opacity: active && !isActive ? 0.22 : 1 }
                        : { pathLength: 0, opacity: 0 }
                    }
                    transition={{
                      delay: reduceMotion ? 0 : 2.15 + index * 0.1,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                  {callout.dots.map((dot, dotIndex) => (
                    <motion.circle
                      key={`${callout.id}-${dotIndex}`}
                      cx={dot[0]}
                      cy={dot[1]}
                      r={isActive ? 6.5 : 4}
                      fill={isActive ? "#e62432" : "#c5a24d"}
                      stroke={isActive ? "#fffefc" : "transparent"}
                      strokeWidth={isActive ? 2.5 : 0}
                      initial={reduceMotion ? false : { scale: 0 }}
                      animate={
                        shouldAnimate
                          ? { scale: 1, opacity: active && !isActive ? 0.22 : 1 }
                          : { scale: 0, opacity: 0 }
                      }
                      transition={{
                        delay: reduceMotion ? 0 : 2.55 + index * 0.1 + dotIndex * 0.05,
                        duration: 0.22,
                      }}
                      style={{ transformOrigin: `${dot[0]}px ${dot[1]}px` }}
                    />
                  ))}
                </g>
              );
            })}
          </svg>

          {callouts.flatMap((callout) => {
            const isActive = active === callout.id;
            return callout.dots.map((dot, dotIndex) => (
              <button
                key={`${callout.id}-dot-${dotIndex}`}
                type="button"
                onClick={() => setActive((current) => (current === callout.id ? null : callout.id))}
                aria-label={`Show ${callout.label} meaning`}
                aria-pressed={isActive}
                aria-controls="crest-detail"
                className="absolute z-10 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:ring-2 focus-visible:ring-[#c5a24d] focus-visible:ring-offset-2 focus-visible:outline-none"
                style={{
                  left: `${(dot[0] / 580) * 100}%`,
                  top: `${(dot[1] / 430) * 100}%`,
                }}
              />
            ));
          })}

          {callouts.map((callout, index) => {
            const isActive = active === callout.id;
            return (
              <motion.button
                key={callout.id}
                type="button"
                onClick={() => setActive((current) => (current === callout.id ? null : callout.id))}
                aria-pressed={isActive}
                aria-controls="crest-detail"
                className={`absolute ${positions[callout.id]} px-2 py-1 text-left text-sm font-medium tracking-wide text-[#b9953f] transition-colors hover:text-[#846a2d] focus-visible:text-[#715824] focus-visible:outline-none sm:text-lg`}
                initial={reduceMotion ? false : { opacity: 0, y: 7 }}
                animate={
                  shouldAnimate
                    ? { opacity: active && !isActive ? 0.25 : 1, y: 0 }
                    : { opacity: 0, y: 7 }
                }
                transition={{ delay: reduceMotion ? 0 : 2.45 + index * 0.1, duration: 0.35 }}
              >
                {callout.label}
              </motion.button>
            );
          })}
        </div>

        <div
          id="crest-detail"
          className={`relative flex min-h-[150px] items-center justify-center px-7 py-8 transition-[background-color,border-color,border-radius,box-shadow] duration-300 lg:min-h-[190px] ${
            activeCallout
              ? "rounded-xl border border-[#e4dac8] bg-[#f8f4ed] text-left shadow-[0_18px_42px_rgba(45,38,27,0.25)]"
              : "border border-dashed border-[#e8e1d3] bg-white/65 text-center"
          }`}
          aria-live="polite"
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeCallout ? (
              <motion.div
                key={activeCallout.id}
                className="w-full"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-5 h-px w-6 bg-[#c5a24d]" aria-hidden="true" />
                <p className="text-[10px] font-semibold tracking-[0.25em] text-[#b9953f] uppercase">
                  {activeCallout.label}
                </p>
                <h4 className="font-heading text-foreground mt-2 text-xl font-medium">
                  {activeCallout.title}
                </h4>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {activeCallout.meaning}
                </p>
                {(activeCallout.id === "chito" || activeCallout.id === "karate") && (
                  <p className="font-heading mt-6 text-2xl text-[#cbb77e]" aria-hidden="true">
                    {activeCallout.id === "chito" ? "千唐流" : "空手道"}
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.div key="empty" initial={false} animate={{ opacity: 1 }}>
                <p className="text-brand-accent text-[10px] font-semibold tracking-[0.25em] uppercase">
                  Select an element
                </p>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  Choose any label or gold dot on the crest diagram.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.nav
        aria-label="Crest elements"
        className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5 sm:mt-12 sm:gap-3"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: reduceMotion ? 0 : 2.8, duration: 0.45 }}
      >
        {selectorOrder.map((id) => {
          const callout = callouts.find((item) => item.id === id)!;
          const isActive = active === callout.id;
          return (
            <button
              key={`${callout.id}-selector`}
              type="button"
              onClick={() => setActive((current) => (current === callout.id ? null : callout.id))}
              aria-pressed={isActive}
              aria-controls="crest-detail"
              className={`flex min-h-10 items-center gap-2 rounded-full border px-4 py-2 text-xs transition-[color,background-color,border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-[#c5a24d] focus-visible:ring-offset-2 focus-visible:outline-none sm:text-sm ${
                isActive
                  ? "border-[#c5a24d] bg-[#f8f1df] text-[#715824] shadow-sm"
                  : "border-[#eee4d3] bg-white text-[#81786f] hover:border-[#d7c28e] hover:text-[#715824]"
              }`}
            >
              <span
                className={`size-2 rounded-full ${isActive ? "bg-[#e62432]" : "bg-[#332d2a]"}`}
                aria-hidden="true"
              />
              <span className="font-medium">{callout.label}</span>
              <span className={isActive ? "text-[#b9953f]" : "text-[#c6bfb7]"}>
                {callout.symbol}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </section>
  );
}

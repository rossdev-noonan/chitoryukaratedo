"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface BrushRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Scroll-in-view reveal, with a hard timeout fallback: if the viewport
// observer never fires for any reason (already on screen at load, browser
// quirk, etc.), the image still reveals itself instead of staying invisible.
const FALLBACK_REVEAL_MS = 1200;

export function BrushReveal({ children, delay = 0, className }: BrushRevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [fallbackTriggered, setFallbackTriggered] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setFallbackTriggered(true), FALLBACK_REVEAL_MS);
    return () => clearTimeout(id);
  }, []);

  const shouldShow = Boolean(reduceMotion) || inView || fallbackTriggered;

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={
        shouldShow
          ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
          : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
      }
      transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: shouldShow ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

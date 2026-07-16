"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Scroll-in-view reveal with a hard timeout fallback: if the viewport
// observer never fires for any reason (already on screen at load, browser
// quirk, etc.), content still reveals itself instead of staying hidden.
const FALLBACK_REVEAL_MS = 1200;

export function useRevealInView<T extends HTMLElement>(amount = 0.2) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  const [fallbackTriggered, setFallbackTriggered] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setFallbackTriggered(true), FALLBACK_REVEAL_MS);
    return () => clearTimeout(id);
  }, []);

  return { ref, shouldShow: Boolean(reduceMotion) || inView || fallbackTriggered };
}

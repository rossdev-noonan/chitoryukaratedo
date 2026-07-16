"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { useRevealInView } from "@/lib/hooks/use-reveal-in-view";

const OFFSET_PX = 48;
const easeOutExpo = [0.16, 1, 0.3, 1] as const;

interface SlideFadeRevealProps {
  children: ReactNode;
  direction: "from-left" | "from-right";
  delay?: number;
  className?: string;
}

export function SlideFadeReveal({
  children,
  direction,
  delay = 0,
  className,
}: SlideFadeRevealProps) {
  const { ref, shouldShow } = useRevealInView<HTMLDivElement>();
  const startX = direction === "from-left" ? -OFFSET_PX : OFFSET_PX;

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={shouldShow ? { x: 0, opacity: 1 } : { x: startX, opacity: 0 }}
      transition={{ duration: 0.9, ease: easeOutExpo, delay: shouldShow ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}

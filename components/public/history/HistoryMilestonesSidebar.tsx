"use client";

import { useEffect, useState } from "react";

import { historySidebarMilestones } from "@/lib/history-content";

export function HistoryMilestonesSidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const targets = historySidebarMilestones
      .map((milestone) => document.getElementById(milestone.id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const marker = window.innerHeight * 0.38;
      let nextIndex = 0;

      targets.forEach((target, index) => {
        if (target.getBoundingClientRect().top <= marker) nextIndex = index;
      });

      setActiveIndex(nextIndex);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const updateFromHash = () => {
      const hashIndex = historySidebarMilestones.findIndex(
        (milestone) => `#${milestone.id}` === window.location.hash,
      );
      if (hashIndex >= 0) setActiveIndex(hashIndex);
      else requestUpdate();
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", updateFromHash);
    updateFromHash();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

  return (
    <div className="sticky top-20 py-6 lg:top-20 lg:px-20 lg:pt-[129px] lg:pb-16">
      <div className="bg-primary hidden h-0.5 w-10 lg:block" />
      <h2 className="font-heading mt-4 hidden text-[28px] leading-none font-medium text-black lg:block">
        Key Milestones
      </h2>

      <ol className="relative mt-2 flex flex-col gap-3 lg:mt-7 lg:gap-6 lg:pl-9">
        <li aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          <span className="bg-brand-accent/20 absolute top-[55px] bottom-[55px] left-5 w-px" />
          <span
            className="bg-primary absolute top-[55px] left-5 w-px origin-top transition-[height] duration-700 ease-out"
            style={{ height: `${(activeIndex / (historySidebarMilestones.length - 1)) * 402}px` }}
          />
        </li>
        {historySidebarMilestones.map((milestone, index) => {
          const isActive = index === activeIndex;
          const isRevealed = index <= activeIndex;
          return (
            <li
              key={milestone.id}
              className={`relative flex h-10 gap-3 transition-all duration-500 lg:h-[110px] lg:gap-10 ${
                isRevealed
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="relative z-10 flex w-10 shrink-0 items-center justify-center lg:w-6">
                <a
                  href={`#${milestone.id}`}
                  title={`${milestone.title} — ${milestone.year}`}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={isRevealed ? 0 : -1}
                  className={`font-heading flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-base transition-all duration-300 lg:h-[55px] lg:w-[55px] lg:text-[28px] ${
                    isActive
                      ? "border-primary bg-primary text-white shadow-[0_0_0_5px_rgba(193,18,31,0.08)]"
                      : "border-brand-accent/40 bg-background text-brand-accent"
                  }`}
                >
                  {milestone.char}
                </a>
              </div>
              <div className="hidden flex-col justify-center gap-2.5 lg:flex">
                <p
                  className={`text-base font-bold ${isActive ? "text-primary" : "text-brand-accent"}`}
                >
                  {milestone.year}
                </p>
                <p className="font-heading text-xl font-semibold whitespace-nowrap text-black">
                  {milestone.title}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

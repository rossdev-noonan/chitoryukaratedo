"use client";

import { useEffect, useRef, useState } from "react";

const milestones = [
  { id: "origin-in-china", char: "起", year: "c. 1000 CE", title: "Origin in China" },
  { id: "tang-dynasty", char: "唐", year: "618-907", title: "Tang Dynasty" },
  { id: "tsuyoshi-chitose", char: "千", year: "1898–1984", title: "Chitose" },
  { id: "international-federation", char: "連", year: "1984-present", title: "Federation" },
];

export function HistoryMobileMilestones() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"normal" | "pinned" | "hidden">("normal");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = milestones
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const update = () => {
      const marker = window.innerHeight * 0.38;
      let nextIndex = 0;
      targets.forEach((target, index) => {
        if (target.getBoundingClientRect().top <= marker) nextIndex = index;
      });
      setActiveIndex(nextIndex);

      const wrapper = wrapperRef.current;
      const endTarget = document.getElementById("history-mobile-cta");
      if (!wrapper || !endTarget) return;

      const start = wrapper.getBoundingClientRect().top + window.scrollY;
      const end = endTarget.getBoundingClientRect().top + window.scrollY;
      const headerEdge = window.scrollY + 56;

      if (headerEdge < start) setMode("normal");
      else if (headerEdge + 100 < end) setMode("pinned");
      else setMode("hidden");
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const pinned = mode === "pinned";

  return (
    <div ref={wrapperRef} className="relative h-[170px] w-full">
      <section
        className={`bg-secondary-background z-30 w-full overflow-hidden transition-[height,box-shadow] duration-300 ${
          pinned
            ? "fixed top-14 right-0 left-0 h-[100px] shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
            : mode === "hidden"
              ? "invisible fixed top-14 right-0 left-0 h-[100px]"
              : "relative h-[170px]"
        }`}
      >
        <p
          className={`absolute top-[29px] left-5 text-base font-semibold text-black transition-opacity duration-200 ${
            mode === "normal" ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          Key Milestones <span className="ml-2 text-[10px] font-normal">TAP TO JUMP</span>
        </p>

        <div
          className={`bg-brand-accent/50 absolute left-[32px] h-px w-[347px] transition-[top] duration-300 ${
            mode === "normal" ? "top-[85px]" : "top-[15px]"
          }`}
        />
        <div
          className={`bg-primary absolute left-[32px] h-px transition-[top,width] duration-500 ease-out ${
            mode === "normal" ? "top-[85px]" : "top-[15px]"
          }`}
          style={{ width: `${activeIndex * 99}px` }}
        />

        <nav
          className={`absolute left-[14px] flex gap-[13px] transition-[top] duration-300 ${
            mode === "normal" ? "top-[70px]" : "top-0"
          }`}
          aria-label="History milestones"
        >
          {milestones.map((milestone, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            return (
              <a
                key={milestone.id}
                href={`#${milestone.id}`}
                aria-current={isActive ? "true" : undefined}
                className="flex w-[86px] shrink-0 flex-col items-start gap-2"
              >
                <span
                  className={`font-heading ml-[3px] flex h-7 w-7 items-center justify-center rounded-full border text-sm transition-colors duration-300 ${
                    isActive
                      ? "border-primary bg-primary text-[#faf9f7] shadow-[0_0_0_2px_rgba(176,141,71,0.45)]"
                      : isPast
                        ? "border-primary bg-secondary-background text-primary"
                        : "border-brand-accent bg-secondary-background text-brand-accent"
                  }`}
                >
                  {milestone.char}
                </span>
                <span className="flex flex-col gap-1 whitespace-nowrap">
                  <span
                    className={`text-[10px] ${isActive || isPast ? "text-primary" : "text-brand-accent"}`}
                  >
                    {milestone.year}
                  </span>
                  <span className="font-heading text-[11px] font-bold text-black">
                    {milestone.title}
                  </span>
                </span>
              </a>
            );
          })}
        </nav>
      </section>
    </div>
  );
}

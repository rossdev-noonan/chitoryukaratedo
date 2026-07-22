"use client";

import { useEffect, useState } from "react";

const items = [
  { id: "story", label: "The Story" },
  { id: "philosophy", label: "Philosophy" },
  { id: "leadership", label: "Leadership" },
  { id: "worldwide", label: "Worldwide" },
];

export function AboutSectionNav() {
  const [active, setActive] = useState("story");

  useEffect(() => {
    const sections = items
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const storySection = sections.find((section) => section.id === "story");
    const syncTopState = () => {
      if (storySection && window.scrollY < storySection.offsetTop - 160) setActive("story");
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.35] },
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", syncTopState, { passive: true });
    syncTopState();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", syncTopState);
    };
  }, []);

  return (
    <nav
      aria-label="About page sections"
      className="bg-secondary-background/95 sticky top-14 z-30 border-y border-[#a1824a] backdrop-blur md:top-20"
    >
      <div className="mx-auto flex h-[62px] max-w-[1440px] [scrollbar-width:none] items-center justify-start gap-[13px] overflow-x-auto px-[14px] md:h-[72px] md:justify-center md:gap-[41px] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              className={`shrink-0 rounded-full px-3 py-2 text-xs transition-colors md:px-5 md:text-base ${
                isActive
                  ? "bg-brand-accent text-background font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

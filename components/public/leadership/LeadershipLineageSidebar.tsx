"use client";

import { useEffect, useRef, useState } from "react";

export interface LeadershipLineageEntry {
  id: string;
  mark: string;
  sidebarRole: string;
  name: string;
}

interface LeadershipLineageSidebarProps {
  entries: readonly LeadershipLineageEntry[];
}

export function LeadershipLineageSidebar({ entries }: LeadershipLineageSidebarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const selectedIndexRef = useRef<number | null>(null);
  const selectionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const targets = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);

    if (targets.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;

      // Keep a clicked entry selected while its smooth scroll is in flight.
      // Without this lock, intermediate scroll events can immediately restore
      // the preceding entry before the requested section reaches the marker.
      if (selectedIndexRef.current !== null) {
        setActiveIndex(selectedIndexRef.current);
        return;
      }

      const marker = window.innerHeight * 0.38 + 4;
      let nextIndex = 0;

      targets.forEach((target, index) => {
        if (target.getBoundingClientRect().top <= marker) nextIndex = index;
      });

      // The last profile cannot always cross the marker on tall displays
      // because the document runs out of scroll room. Reaching the page end
      // must therefore activate Sandaime explicitly.
      const documentHeight = document.documentElement.scrollHeight;
      const isAtPageEnd = window.scrollY + window.innerHeight >= documentHeight - 2;
      if (isAtPageEnd) nextIndex = targets.length - 1;

      setActiveIndex(nextIndex);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const updateFromHash = () => {
      const hashIndex = entries.findIndex((entry) => `#${entry.id}` === window.location.hash);
      if (hashIndex >= 0) setActiveIndex(hashIndex);
      else requestUpdate();
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", updateFromHash);
    updateFromHash();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (selectionTimeoutRef.current) window.clearTimeout(selectionTimeoutRef.current);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, [entries]);

  const selectEntry = (id: string, index: number) => {
    selectedIndexRef.current = index;
    if (selectionTimeoutRef.current) window.clearTimeout(selectionTimeoutRef.current);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveIndex(index);

    selectionTimeoutRef.current = window.setTimeout(() => {
      selectedIndexRef.current = null;
      selectionTimeoutRef.current = null;
      window.dispatchEvent(new Event("scroll"));
    }, 1000);
  };

  const progress = entries.length > 1 ? activeIndex / (entries.length - 1) : 0;

  return (
    <>
      <aside className="bg-secondary-background before:bg-secondary-background relative hidden self-stretch before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-screen before:content-[''] md:block xl:hidden">
        <nav className="sticky top-20 flex flex-col items-center py-10" aria-label="Soke lineage">
          <div
            className="text-brand-accent flex h-[77px] w-[60px] items-center justify-center text-[34px]"
            aria-hidden
          >
            ›
          </div>
          <ol className="relative mt-2 flex flex-col gap-[69px]">
            <li aria-hidden className="pointer-events-none absolute inset-0">
              <span className="bg-brand-accent/20 absolute top-7 bottom-7 left-1/2 w-px -translate-x-1/2" />
              <span
                className="bg-primary absolute top-7 left-1/2 w-px origin-top -translate-x-1/2 transition-[height] duration-700 ease-out"
                style={{ height: `${progress * 250}px` }}
              />
            </li>
            {entries.map((entry, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={entry.id} className="relative z-10">
                  <a
                    href={`#${entry.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      selectEntry(entry.id, index);
                    }}
                    aria-label={`${entry.sidebarRole}: ${entry.name}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`font-heading flex size-14 items-center justify-center rounded-full border text-2xl transition-colors duration-300 ${
                      isActive
                        ? "bg-primary border-transparent text-white shadow-[0_0_0_6px_rgba(176,141,71,0.38)]"
                        : "border-brand-accent/40 bg-secondary-background text-brand-accent"
                    }`}
                  >
                    {entry.mark}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>

      <aside className="bg-secondary-background before:bg-secondary-background relative hidden self-stretch before:pointer-events-none before:absolute before:inset-y-0 before:right-full before:w-screen before:content-[''] xl:block">
        <div className="sticky top-20 px-20 pt-[129px] pb-16">
          <div className="bg-primary h-0.5 w-10" />
          <h2 className="font-heading mt-4 text-[28px] leading-none font-medium text-black">
            The Lineage
          </h2>
          <ol className="relative mt-7 flex flex-col gap-6">
            <li aria-hidden className="pointer-events-none absolute inset-0">
              <span className="bg-brand-accent/20 absolute top-[55px] bottom-[55px] left-[27px] w-px" />
              <span
                className="bg-primary absolute top-[55px] left-[27px] w-px origin-top transition-[height] duration-700 ease-out"
                style={{ height: `${progress * 268}px` }}
              />
            </li>
            {entries.map((entry, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={entry.id} className="relative flex h-[110px] gap-10">
                  <div className="relative z-10 flex w-[55px] shrink-0 items-center justify-center">
                    <a
                      href={`#${entry.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        selectEntry(entry.id, index);
                      }}
                      aria-label={`${entry.sidebarRole}: ${entry.name}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`font-heading flex size-[55px] items-center justify-center rounded-full border text-[28px] transition-colors duration-300 ${
                        isActive
                          ? "bg-primary border-transparent text-white shadow-[0_0_0_6px_rgba(176,141,71,0.38)]"
                          : "border-brand-accent/40 bg-secondary-background text-brand-accent"
                      }`}
                    >
                      {entry.mark}
                    </a>
                  </div>
                  <div className="flex flex-col justify-center gap-2.5">
                    <p
                      className={`text-base font-bold ${
                        isActive ? "text-primary" : "text-brand-accent"
                      }`}
                    >
                      {entry.sidebarRole}
                    </p>
                    <p className="font-heading text-xl font-semibold whitespace-nowrap text-black">
                      {entry.name}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </aside>
    </>
  );
}

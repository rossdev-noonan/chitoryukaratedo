"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CountryFlag } from "@/components/public/CountryFlag";
import type { Dojo } from "@/lib/directory";
import type { FeaturedCountry } from "@/lib/countries-featured";
import type { Locale } from "@/lib/i18n/locales";

interface DojoWorldMapProps {
  lang: Locale;
  countries: FeaturedCountry[];
  dojosBySlug: Record<string, Dojo[]>;
  noDojosLabel: string;
}

export function DojoWorldMap({ lang, countries, dojosBySlug, noDojosLabel }: DojoWorldMapProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selected = countries.find((country) => country.slug === selectedSlug) ?? null;
  const selectedDojos = selected ? (dojosBySlug[selected.slug] ?? []) : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {countries.map((country) => (
          <button
            key={country.slug}
            type="button"
            aria-pressed={country.slug === selectedSlug}
            aria-label={country.name}
            onClick={() =>
              setSelectedSlug((current) => (current === country.slug ? null : country.slug))
            }
            className={`flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border text-xl transition-transform hover:scale-110 ${
              country.slug === selectedSlug
                ? "border-primary bg-primary/10 scale-110"
                : "border-border bg-background"
            }`}
          >
            <span className="h-[22px] w-[22px]">
              <CountryFlag country={country} />
            </span>
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-8 aspect-[1100/480] w-full max-w-5xl overflow-hidden rounded-xl">
        <Image
          src="/images/homepage/world-map.png"
          alt="World map showing Chito-Ryu dojo regions"
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />

        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.slug}
              className="absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${selected.xPct}%`, top: `${selected.yPct}%` }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <div className="relative flex flex-col items-center">
                <span className="relative flex h-4 w-4">
                  <motion.span
                    className="bg-primary absolute inline-flex h-full w-full rounded-full"
                    animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="bg-primary relative inline-flex h-4 w-4 rounded-full" />
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selected && (
            <motion.div
              role="dialog"
              aria-modal="false"
              aria-label={selected.name}
              className="border-border bg-background absolute z-10 w-64 -translate-x-1/2 rounded-lg border p-4 shadow-lg"
              style={{
                left: `${Math.min(Math.max(selected.xPct, 18), 82)}%`,
                top: `${Math.min(selected.yPct + 8, 78)}%`,
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <span className="h-4 w-4">
                    <CountryFlag country={selected} />
                  </span>
                  {selected.name}
                </span>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setSelectedSlug(null)}
                  className="text-muted-foreground hover:text-foreground text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="mt-3 flex max-h-40 flex-col gap-2 overflow-y-auto">
                {selectedDojos.length === 0 ? (
                  <p className="text-muted-foreground text-xs">{noDojosLabel}</p>
                ) : (
                  selectedDojos.map((dojo) => (
                    <Link
                      key={dojo.slug}
                      href={`/${lang}/dojo/${dojo.slug}`}
                      className="hover:bg-black/[0.03]"
                    >
                      <p className="text-xs font-semibold">{dojo.name}</p>
                      {dojo.city && <p className="text-muted-foreground text-xs">{dojo.city}</p>}
                    </Link>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

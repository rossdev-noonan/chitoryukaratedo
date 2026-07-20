"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";

interface OriginsAccordionProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function OriginsAccordion({ lang, dictionary }: OriginsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-8">
      <div className="border-border flex flex-col divide-y border-t">
        {dictionary.home.accordion.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.title} className="border-border border-b">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-bold tracking-wide uppercase"
              >
                {item.title}
                {isOpen ? (
                  <Minus className="text-primary h-3 w-3 shrink-0" />
                ) : (
                  <Plus className="text-primary h-3 w-3 shrink-0" />
                )}
              </button>
              {isOpen && <p className="text-muted-foreground pb-4 text-sm">{item.body}</p>}
            </div>
          );
        })}
      </div>
      <Link
        href={`/${lang}/history`}
        className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-bold hover:underline"
      >
        {dictionary.home.originsLearnMoreLink}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

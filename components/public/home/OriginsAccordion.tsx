"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { originsAccordionItems } from "@/lib/homepage-content";

export function OriginsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-border mt-8 flex flex-col divide-y border-t">
      {originsAccordionItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="border-border border-b">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold"
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
  );
}

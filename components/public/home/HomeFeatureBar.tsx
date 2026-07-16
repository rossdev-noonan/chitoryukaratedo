import { Fragment } from "react";

import { trustBarSubLabels } from "@/lib/homepage-content";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="border-border flex flex-wrap items-center justify-center gap-x-[55px] gap-y-6 border bg-white px-5 py-10">
        {dictionary.home.trustBar.map((item, index) => (
          <Fragment key={item.label}>
            <div className="flex flex-col gap-1">
              <p className="font-heading flex items-baseline gap-2">
                <span className="text-primary text-4xl font-bold sm:text-[40px]">
                  {item.value}
                </span>
                <span className="text-brand-accent text-sm">{trustBarSubLabels[index]}</span>
              </p>
              <p className="text-foreground mt-1 text-sm font-bold">{item.label}</p>
              <p className="text-muted-foreground text-xs">{item.description}</p>
            </div>
            {index < dictionary.home.trustBar.length - 1 && (
              <div className="border-border hidden h-[67px] border-l sm:block" aria-hidden />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

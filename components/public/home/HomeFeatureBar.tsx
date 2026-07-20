import { Fragment } from "react";

import { trustBarSubLabels } from "@/lib/homepage-content";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

function StatCard({
  value,
  subLabel,
  label,
  description,
}: {
  value: string;
  subLabel: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-heading flex items-baseline gap-2">
        <span className="text-primary text-4xl font-bold sm:text-[40px]">{value}</span>
        <span className="text-brand-accent text-sm">{subLabel}</span>
      </p>
      <p className="text-foreground mt-1 text-sm font-bold">{label}</p>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      {/* Below `lg` each stat gets its own card (Gil's fix for tablet/mobile
          responsiveness — the single continuous bar was cramped/scrolling at
          those widths); at `lg` and up it's one unified bar. */}
      <div className="border-border bg-border grid grid-cols-2 gap-px border sm:grid-cols-4 lg:hidden">
        {dictionary.home.trustBar.map((item, index) => (
          <div key={item.label} className="bg-white p-5">
            <StatCard
              value={item.value}
              subLabel={trustBarSubLabels[index]}
              label={item.label}
              description={item.description}
            />
          </div>
        ))}
      </div>

      <div className="border-border hidden border bg-white lg:block">
        <div className="flex w-max min-w-full items-center justify-center gap-x-[55px] gap-y-6 px-5 py-10">
          {dictionary.home.trustBar.map((item, index) => (
            <Fragment key={item.label}>
              <div className="w-[199px] shrink-0">
                <StatCard
                  value={item.value}
                  subLabel={trustBarSubLabels[index]}
                  label={item.label}
                  description={item.description}
                />
              </div>
              {index < dictionary.home.trustBar.length - 1 && (
                <div className="border-border h-[67px] shrink-0 border-l" aria-hidden />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

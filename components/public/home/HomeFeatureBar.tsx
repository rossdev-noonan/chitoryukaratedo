import { trustBarSubLabels } from "@/lib/homepage-content";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

// Matches Gil's Figma "Stats-bar" (node 435:824) literally: four separate
// bordered white cards side by side, not one continuous bar with dividers.
// That's true at every breakpoint in Figma, not just tablet/mobile — the
// grid here just controls how many sit per row as the viewport narrows.
export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-[11px]">
        {dictionary.home.trustBar.map((item, index) => (
          <div
            key={item.label}
            className="border-border flex h-36 w-full items-center justify-center border bg-white p-5 sm:w-[240px]"
          >
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
          </div>
        ))}
      </div>
    </section>
  );
}

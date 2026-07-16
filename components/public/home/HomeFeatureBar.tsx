import { trustBarSubLabels } from "@/lib/homepage-content";
import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
      <div className="border-border divide-border grid grid-cols-1 divide-y border bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {dictionary.home.trustBar.map((item, index) => (
          <div key={item.label} className="flex flex-col gap-1 p-6">
            <p className="font-heading flex items-baseline gap-2">
              <span className="text-primary text-4xl font-bold sm:text-[40px]">{item.value}</span>
              <span className="text-muted-foreground text-sm">{trustBarSubLabels[index]}</span>
            </p>
            <p className="text-foreground mt-1 text-sm font-bold">{item.label}</p>
            <p className="text-muted-foreground text-xs">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

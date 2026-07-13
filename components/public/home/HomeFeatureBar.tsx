import { Landmark, Globe2, Target, Users } from "lucide-react";

import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

const ICONS = [Landmark, Globe2, Target, Users];

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="border-border bg-background grid grid-cols-1 divide-y border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {dictionary.home.featureBar.map((item, index) => {
          const Icon = ICONS[index];
          return (
            <div key={item.title} className="flex items-start gap-4 p-6 lg:p-10">
              <Icon className="text-primary h-8 w-8 shrink-0" />
              <div>
                <p className="font-heading font-bold">{item.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

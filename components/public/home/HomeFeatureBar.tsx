import type { Dictionary } from "@/lib/i18n/types";

interface HomeFeatureBarProps {
  dictionary: Dictionary;
}

const ICONS = [
  "/images/homepage/icons/feature-origins.svg",
  "/images/homepage/icons/feature-community.svg",
  "/images/homepage/icons/feature-teaching.svg",
  "/images/homepage/icons/feature-development.png",
];

export function HomeFeatureBar({ dictionary }: HomeFeatureBarProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="border-border bg-background flex flex-col gap-8 border px-6 py-8 sm:flex-row sm:gap-0 lg:px-20 lg:py-12">
        {dictionary.home.featureBar.map((item, index) => (
          <div key={item.title} className="flex flex-1 items-start gap-4">
            {index > 0 && (
              <div className="border-accent hidden self-stretch border-l sm:block" />
            )}
            <div className="flex flex-1 items-start gap-4 sm:pl-6">
              {/* eslint-disable-next-line @next/next/no-img-element -- small
                  decorative vector/transparent icons, no benefit from next/image's
                  raster optimization pipeline and SVGs aren't optimized by default */}
              <img
                src={ICONS[index]}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <div>
                <p className="text-foreground font-bold">{item.title}</p>
                <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

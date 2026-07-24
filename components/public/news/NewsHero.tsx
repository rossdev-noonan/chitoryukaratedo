// Desktop headline uses the Cormorant Garamond serif per Figma (723:5000,
// 44px) — a one-off editorial treatment distinct from the site's usual
// font-heading (Noto Serif JP), which the mobile frame (731:1137) still
// uses at 24px. Both are literal per-breakpoint, not a mistake.
export function NewsHero() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 md:px-10 xl:px-[190px] xl:pt-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[10px] leading-normal xl:text-[11px]">
          <span className="text-[#706963]">News &amp; Events</span>
          <span className="text-[#706963]">/</span>
          <span className="font-semibold text-[#8e3224] xl:text-[#8d261e]">News</span>
        </nav>

        <div className="mt-5 flex flex-col items-start gap-2 xl:mt-6 xl:gap-4">
          <h1 className="font-heading text-2xl leading-tight font-medium text-[#1f2937] xl:hidden">
            Federation News &amp; Updates
          </h1>
          <h1 className="font-cormorant hidden text-[44px] leading-[1.15] font-medium text-[#1c1412] xl:block">
            Federation News &amp; Updates
          </h1>
          <p className="max-w-[358px] text-xs leading-[1.5] text-[#4b5563] xl:max-w-[835px] xl:text-sm xl:leading-[20px] xl:text-[#6e6560]">
            Announcements, dojo milestones, and messages from the Soke — from across the global
            Chito Ryu community.
          </p>
        </div>
      </div>
    </section>
  );
}

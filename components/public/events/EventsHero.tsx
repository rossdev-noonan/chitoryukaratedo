// Breadcrumb color is a literal one-off from Figma (#8d261e / #706963) that
// doesn't match the shared .public-hero-breadcrumb class used elsewhere
// (different size/color on this page), so it's inlined rather than reused.
export function EventsHero() {
  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-6 sm:px-6 md:px-10 xl:px-[190px] xl:pt-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-[11px] leading-normal">
          <span className="text-[#706963]">News &amp; Events</span>
          <span className="text-[#706963]">/</span>
          <span className="font-semibold text-[#8d261e]">Events</span>
        </nav>

        <div className="mt-3 flex flex-col items-start gap-1.5 xl:mt-4 xl:gap-4">
          <p className="text-[12px] font-bold tracking-wide text-[#b08d47] uppercase">events</p>
          <div className="bg-primary h-0.5 w-[60px]" />
        </div>

        <h1 className="public-hero-title font-heading mt-3 text-2xl font-medium text-[#2a2521] xl:mt-4">
          Gradings, Seminars &amp; Competitions
        </h1>
        <p className="mt-3 max-w-[799px] text-xs leading-[1.5] text-[#706963] xl:mt-4 xl:text-sm">
          Find upcoming Chito Ryu events across the federation — from local dan gradings to the
          international Soke Cup.
        </p>
      </div>
    </section>
  );
}

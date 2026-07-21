interface HistorySectionTitleProps {
  year: string;
  children: string;
}

export function HistorySectionTitle({ year, children }: HistorySectionTitleProps) {
  return (
    <div className="flex flex-col items-start gap-4 py-5 sm:min-h-[92px] sm:flex-row sm:items-center">
      <span className="bg-brand-accent flex w-[108px] shrink-0 items-center justify-center rounded-[2px] px-3 py-1 text-base font-bold whitespace-nowrap text-[#faf9f7]">
        {year}
      </span>
      <h2 className="font-heading text-[28px] leading-none font-medium text-[#1f2937] sm:text-[32px]">
        {children}
      </h2>
    </div>
  );
}

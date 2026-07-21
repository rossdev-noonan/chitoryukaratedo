import { historyOriginsDescription } from "@/lib/history-content";

export function HistoryOrigins() {
  return (
    <div className="flex w-full flex-col items-start py-10">
      <p className="text-brand-accent text-xl font-semibold tracking-[2px] uppercase">Origins</p>
      <div className="bg-primary mt-[11px] h-[3px] w-[86px]" />
      <h2 className="font-heading mt-[11px] text-[32px] leading-none font-medium text-[#1f2937]">
        The Origin of Chito Ryu
      </h2>
      <p className="mt-6 w-full text-base leading-[1.7] text-[#1f2937]">
        {historyOriginsDescription}
      </p>
    </div>
  );
}

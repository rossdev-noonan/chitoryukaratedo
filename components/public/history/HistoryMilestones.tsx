import { historyMilestones } from "@/lib/history-content";

export function HistoryMilestones() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
      <div className="border-brand-accent border-t-[3px] px-4 py-8 sm:px-6 lg:px-16 lg:py-10">
        <div className="flex flex-col gap-2">
          <div className="bg-primary h-0.5 w-10" />
          <h2 className="font-heading text-3xl font-semibold text-black sm:text-4xl">
            Key Milestones
          </h2>
        </div>

        <ol className="mt-10 flex flex-col gap-8">
          {historyMilestones.map((milestone, index) => (
            <li key={milestone.year} className="relative flex gap-6 pl-2">
              <div className="relative flex w-4 shrink-0 justify-center">
                <span className="bg-primary relative z-10 mt-1.5 h-2.5 w-2.5 rounded-full" />
                {index < historyMilestones.length - 1 && (
                  <span className="border-border absolute top-4 bottom-[-2rem] left-1/2 -translate-x-1/2 border-l" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:gap-8">
                <p className="w-[110px] shrink-0 text-xl font-semibold text-black sm:text-2xl">
                  {milestone.year}
                </p>
                <div>
                  <p className="text-xl font-semibold text-black sm:text-2xl">{milestone.title}</p>
                  <p className="mt-2 leading-[1.6] text-black">{milestone.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

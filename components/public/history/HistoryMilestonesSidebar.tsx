import { historySidebarMilestones } from "@/lib/history-content";

// The compact "Key Milestones" rail that runs alongside Origins/Origin-in-
// China/Tang-Dynasty (Figma's new "sidebar" frame) — replaces the old
// full-width Key Milestones section with descriptions.
export function HistoryMilestonesSidebar() {
  return (
    <div className="lg:sticky lg:top-24">
      <div className="bg-primary h-0.5 w-10" />
      <h2 className="font-heading mt-4 text-3xl font-semibold text-black">Key Milestones</h2>

      <ol className="mt-10 flex flex-col gap-8">
        {historySidebarMilestones.map((milestone, index) => (
          <li key={index} className="relative flex gap-4">
            <div className="relative flex w-14 shrink-0 flex-col items-center">
              <span className="border-border bg-background text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-heading text-xl">
                {milestone.char}
              </span>
              {index < historySidebarMilestones.length - 1 && (
                <span className="border-border absolute top-14 bottom-[-2rem] border-l" />
              )}
            </div>
            <div className="flex flex-col justify-center gap-1">
              <p className="text-muted-foreground text-sm">{milestone.year}</p>
              <p className="text-lg font-semibold text-black">{milestone.title}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

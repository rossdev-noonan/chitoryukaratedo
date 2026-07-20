import Image from "next/image";

import { HistoryMilestonesSidebar } from "@/components/public/history/HistoryMilestonesSidebar";
import { HistoryOrigins } from "@/components/public/history/HistoryOrigins";
import {
  historyChinaLineageByline,
  historyChinaLineageHeading,
  historyChinaLineageParagraphs,
  historyChinaLineagePortrait,
  historyGenerationsHeading,
  historyGenerationsParagraphs,
  historyGenerationsPortrait,
  historyTangDynastyHeading,
  historyTangDynastyParagraph,
  historyTangDynastyPortrait,
} from "@/lib/history-content";
import { CaptionedPhoto } from "@/components/public/history/HistoryPhotoHelpers";

// Wraps Origins, Origin-in-China/Generations, and Tang Dynasty in a two-
// column layout with a sticky "Key Milestones" rail — Figma's new "body"
// frame (sidebar + contents), which replaced the old full-width Key
// Milestones section. Tsuyoshi Chitose and International Federation stay
// full-width below this (HistoryBiography), since Figma's "contents" column
// stops after Tang Dynasty.
export function HistoryOriginsAndLineage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
      <div className="lg:grid lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
        <HistoryMilestonesSidebar />

        <div className="mt-16 flex flex-col gap-8 lg:mt-0">
          <HistoryOrigins />

          <article className="border-primary-dark border-t-[3px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
              <div className="relative h-[360px] w-full shrink-0 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[380px] lg:h-[500px] lg:w-[400px]">
                <Image
                  src={historyChinaLineagePortrait}
                  alt="Historic mural depicting Chinese martial arts practice"
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-semibold text-black sm:text-4xl">
                  {historyChinaLineageHeading}
                </h2>
                <p className="mt-4 leading-[1.6] font-semibold whitespace-pre-line text-black">
                  {historyChinaLineageByline}
                </p>
                <div className="mt-6 flex flex-col gap-4">
                  {historyChinaLineageParagraphs.map((paragraph, index) => (
                    <p key={index} className="leading-[1.6] text-black">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
              <div className="lg:w-[360px] lg:shrink-0">
                <h3 className="text-2xl font-semibold text-black">{historyGenerationsHeading}</h3>
                <div className="mt-5 flex flex-col gap-4">
                  {historyGenerationsParagraphs.map((paragraph, index) => (
                    <p key={index} className="leading-[1.6] text-black">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <CaptionedPhoto
                src={historyGenerationsPortrait.src}
                alt={historyGenerationsPortrait.caption}
                caption={historyGenerationsPortrait.caption}
                circular
              />
            </div>
          </article>

          <article className="border-primary-dark border-t-[3px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
              <div className="lg:w-[360px] lg:shrink-0">
                <h2 className="font-heading text-3xl font-semibold text-black sm:text-4xl">
                  {historyTangDynastyHeading}
                </h2>
                <p className="mt-5 leading-[1.7] text-black">{historyTangDynastyParagraph}</p>
              </div>
              <div className="relative h-[300px] w-full shrink-0 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[380px] lg:h-[420px] lg:w-[400px]">
                <Image
                  src={historyTangDynastyPortrait}
                  alt="Illustration of Tang dynasty martial artists training before a temple"
                  fill
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

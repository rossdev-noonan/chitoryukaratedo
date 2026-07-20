import Image from "next/image";

import { HistoryBiography } from "@/components/public/history/HistoryBiography";
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

export function HistoryOriginsAndLineage() {
  return (
    <section className="bg-background w-full">
      <div className="grid grid-cols-[56px_minmax(0,1fr)] items-start gap-4 px-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-6 sm:px-6 lg:grid-cols-[491px_minmax(0,849px)] lg:gap-6 lg:px-0">
        <aside className="self-stretch">
          <HistoryMilestonesSidebar />
        </aside>

        <div className="flex min-w-0 flex-col gap-2 py-10 lg:px-10">
          <HistoryOrigins />

          <article id="origin-in-china" className="scroll-mt-[38vh] pt-10 lg:pt-[60px]">
            <div>
              <h2 className="font-heading text-4xl font-semibold text-black sm:text-5xl">
                {historyChinaLineageHeading}
              </h2>
              <p className="mt-8 leading-[1.6] font-semibold whitespace-pre-line text-black">
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
            <div className="relative mt-6 h-[360px] w-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[455px] lg:h-[537px]">
              <Image
                src={historyChinaLineagePortrait}
                alt="Historic mural depicting Chinese martial arts practice"
                fill
                sizes="(min-width: 1024px) 769px, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-black">{historyGenerationsHeading}</h3>
              <div className="mt-8 flex flex-col gap-4">
                {historyGenerationsParagraphs.map((paragraph, index) => (
                  <p key={index} className="leading-[1.6] text-black">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-6">
                <CaptionedPhoto
                  src={historyGenerationsPortrait.src}
                  alt={historyGenerationsPortrait.caption}
                  caption={historyGenerationsPortrait.caption}
                />
              </div>
            </div>
          </article>

          <article id="tang-dynasty" className="scroll-mt-[38vh] pt-16">
            <h2 className="font-heading text-4xl font-semibold text-black sm:text-5xl">
              {historyTangDynastyHeading}
            </h2>
            <p className="mt-8 leading-[1.7] text-black">{historyTangDynastyParagraph}</p>
            <div className="mt-6 flex justify-center">
              <div className="relative h-[300px] w-full max-w-[628px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[380px] lg:h-[422px]">
                <Image
                  src={historyTangDynastyPortrait}
                  alt="Illustration of Tang dynasty martial artists training before a temple"
                  fill
                  sizes="(min-width: 1024px) 628px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </article>

          <HistoryBiography />
        </div>
      </div>
    </section>
  );
}

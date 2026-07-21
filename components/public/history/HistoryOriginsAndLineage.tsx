import { HistoryBiography } from "@/components/public/history/HistoryBiography";
import { HistoryMilestonesSidebar } from "@/components/public/history/HistoryMilestonesSidebar";
import { HistoryOrigins } from "@/components/public/history/HistoryOrigins";
import { HistoryPhoto } from "@/components/public/history/HistoryPhotoHelpers";
import { HistorySectionTitle } from "@/components/public/history/HistorySectionTitle";
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

export function HistoryOriginsAndLineage() {
  return (
    <section className="bg-background w-full">
      <div className="mx-auto grid w-full max-w-[1364px] grid-cols-[56px_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-6 md:w-[calc(100%_-_40px)] md:max-w-[794px] md:grid-cols-[89px_minmax(0,670px)] md:gap-6 xl:w-full xl:max-w-[1364px] xl:grid-cols-[491px_minmax(0,849px)]">
        <aside className="bg-secondary-background self-stretch">
          <HistoryMilestonesSidebar />
        </aside>

        <div className="flex min-w-0 flex-col gap-2.5 px-4 py-2.5 sm:px-6 md:w-full md:bg-white md:px-5 xl:w-auto xl:px-10">
          <HistoryOrigins />

          <article
            id="origin-in-china"
            className="scroll-mt-[38vh] border-t-[3px] border-[#c8a24a] py-[5px]"
          >
            <div className="flex flex-col gap-6 py-5">
              <HistorySectionTitle year="c. 1000 CE">
                {historyChinaLineageHeading}
              </HistorySectionTitle>
              <p className="leading-[1.6] whitespace-pre-line text-black">
                {historyChinaLineageByline}
              </p>
              <div className="mt-6 flex flex-col gap-6">
                {historyChinaLineageParagraphs.map((paragraph, index) => (
                  <p key={index} className="leading-[1.6] text-black">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <HistoryPhoto
              src={historyChinaLineagePortrait}
              alt="Historic mural depicting Chinese martial arts practice"
              frameClassName="aspect-[769/537] w-full"
            />

            <div className="mt-14 py-10">
              <h3 className="text-2xl leading-none font-semibold text-black">
                {historyGenerationsHeading}
              </h3>
              <div className="mt-8 flex flex-col gap-6">
                {historyGenerationsParagraphs.map((paragraph, index) => (
                  <p key={index} className="leading-[1.6] text-black">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="w-full max-w-[737px] md:max-w-[593px] xl:max-w-[737px]">
              <HistoryPhoto
                src={historyGenerationsPortrait.src}
                alt={historyGenerationsPortrait.caption}
                caption={historyGenerationsPortrait.caption}
                frameClassName="aspect-[737/513] w-full"
              />
            </div>
          </article>

          <article
            id="tang-dynasty"
            className="scroll-mt-[38vh] border-t-[3px] border-[#c8a24a] py-[5px]"
          >
            <div className="flex flex-col gap-8 py-5">
              <HistorySectionTitle year="618-907">{historyTangDynastyHeading}</HistorySectionTitle>
              <p className="leading-[1.7] text-black">{historyTangDynastyParagraph}</p>
            </div>
            <div className="flex min-h-[412px] items-center justify-center py-5">
              <div className="w-full max-w-[628px] md:max-w-[478px] xl:max-w-[628px]">
                <HistoryPhoto
                  src={historyTangDynastyPortrait}
                  alt="Illustration of Tang dynasty martial artists training before a temple"
                  frameClassName="aspect-[628/422] w-full"
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

import { HistoryPhoto } from "@/components/public/history/HistoryPhotoHelpers";
import { HistorySectionTitle } from "@/components/public/history/HistorySectionTitle";
import {
  historyAragakiParagraph,
  historyDojoParagraph,
  historyDojoPhotoCaption,
  historyDojoSecondParagraph,
  historyDojoSecondPhotoCaption,
  historyDometrichParagraph,
  historyDometrichPhotoCaption,
  historyEarlyYearsCaption,
  historyEarlyYearsParagraph,
  historyFairmontParagraph,
  historyHirohitoSectionParagraphs,
  historyInternationalFederationClosingParagraphs,
  historyInternationalFederationHeading,
  historyInternationalFederationIntroParagraph,
  historyInternationalFederationPortrait,
  historyIntroParagraphs,
  historyMainParagraphs,
  historyPortraits,
  historySlomanskiParagraph,
  historySlomanskiPortrait,
  historyWarEraParagraph,
} from "@/lib/history-content";

function HistoryParagraph({ children }: { children: string }) {
  return <p className="leading-[1.6] text-black">{children}</p>;
}

export function HistoryBiography() {
  return (
    <div className="flex flex-col gap-2.5 md:px-5 xl:px-0">
      <article
        id="tsuyoshi-chitose"
        className="scroll-mt-[38vh] border-t-[3px] border-[#c8a24a] py-5"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-8 py-5">
            <HistorySectionTitle year="1898-1984">Tsuyoshi Chitose</HistorySectionTitle>
            <div className="flex flex-col leading-[1.6] text-black">
              {historyIntroParagraphs.map((paragraph, index) =>
                paragraph ? (
                  <p key={index}>{paragraph}</p>
                ) : (
                  <span key={index} className="h-6" aria-hidden />
                ),
              )}
            </div>
          </div>

          <HistoryPhoto
            src="/images/history/chitose-portrait.png"
            alt="Dr. Tsuyoshi Chitose"
            frameClassName="aspect-[772/553] w-full"
          />
        </div>

        <section className="mt-5">
          <div className="py-10">
            <h3 className="text-2xl leading-none font-semibold text-black">Early Years</h3>
            <p className="mt-8 leading-[1.6] text-black">{historyEarlyYearsParagraph}</p>
          </div>
          <HistoryPhoto
            src="/images/history/figma-okinawa-map.png"
            alt="Map of Okinawa marking the city of Naha"
            caption={historyEarlyYearsCaption}
            frameClassName="aspect-[772/513] w-full"
          />
          <div className="py-10">
            <HistoryParagraph>{historyAragakiParagraph}</HistoryParagraph>
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <HistoryPhoto
            src={historyPortraits.hirohito.src}
            alt={historyPortraits.hirohito.name}
            caption={historyPortraits.hirohito.name}
            subtitle={historyPortraits.hirohito.caption}
            frameClassName="aspect-[772/613.379] w-full"
          />
          <div className="ml-auto w-full max-w-[730px]">
            <HistoryPhoto
              src={historyPortraits.funakoshi.src}
              alt={historyPortraits.funakoshi.name}
              caption={historyPortraits.funakoshi.name}
              subtitle={historyPortraits.funakoshi.caption}
              frameClassName="aspect-[730/646] w-full"
            />
          </div>
          <div className="flex flex-col gap-6">
            {historyHirohitoSectionParagraphs.map((paragraph, index) => (
              <HistoryParagraph key={index}>{paragraph}</HistoryParagraph>
            ))}
          </div>
        </section>

        <div className="py-10">
          <HistoryParagraph>{historyWarEraParagraph}</HistoryParagraph>
        </div>

        <section className="flex flex-col gap-6 py-[17px]">
          <div className="py-10">
            <h3 className="text-2xl leading-none font-semibold text-black">
              Chitose Opens his own Dojo
            </h3>
            <p className="mt-8 leading-[1.6] text-black">{historyDojoParagraph}</p>
          </div>
          <HistoryPhoto
            src="/images/history/figma-backyard-training.png"
            alt="Chito Ryu Karate-Do practitioners training in a backyard dojo"
            caption={historyDojoPhotoCaption.title}
            subtitle={historyDojoPhotoCaption.subtitle}
            frameClassName="aspect-[772/513] w-full"
          />
          <HistoryPhoto
            src="/images/history/figma-funakoshi-1955.png"
            alt="Chitose and Professor Gichin Funakoshi, August 18, 1955"
            caption={historyDojoSecondPhotoCaption}
            frameClassName="aspect-[809/471] w-full xl:w-[calc(100%+37px)] xl:max-w-none xl:-translate-x-[18.5px]"
          />
          <HistoryParagraph>{historyDojoSecondParagraph}</HistoryParagraph>
        </section>

        <section className="mt-5 flex flex-col gap-5">
          <div className="py-10">
            <HistoryParagraph>{historyDometrichParagraph}</HistoryParagraph>
          </div>
          <HistoryPhoto
            src="/images/history/figma-osensei-dometrich.png"
            alt="O'Sensei with Dometrich"
            caption={historyDometrichPhotoCaption}
            frameClassName="aspect-[773/523] w-full"
          />
        </section>

        <div className="py-10">
          <HistoryParagraph>{historyFairmontParagraph}</HistoryParagraph>
        </div>

        <section className="flex flex-col gap-5">
          <HistoryPhoto
            src={historySlomanskiPortrait.src}
            alt={historySlomanskiPortrait.caption}
            caption={historySlomanskiPortrait.caption}
            frameClassName="aspect-[761/492] w-full max-w-[761px]"
          />
          <div className="py-10">
            <HistoryParagraph>{historySlomanskiParagraph}</HistoryParagraph>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          {historyMainParagraphs.map((paragraph, index) => (
            <HistoryParagraph key={index}>{paragraph}</HistoryParagraph>
          ))}
        </div>
      </article>

      <article
        id="international-federation"
        className="scroll-mt-[38vh] border-t-[3px] border-[#c8a24a] py-[5px]"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-8 py-5">
            <HistorySectionTitle year="1898-1984">
              {historyInternationalFederationHeading}
            </HistorySectionTitle>
            <HistoryParagraph>{historyInternationalFederationIntroParagraph}</HistoryParagraph>
          </div>
          <HistoryPhoto
            src={historyInternationalFederationPortrait.src}
            alt={historyInternationalFederationPortrait.name}
            caption={historyInternationalFederationPortrait.name}
            subtitle={historyInternationalFederationPortrait.caption}
            frameClassName="aspect-[771/539.336] w-full"
            imageClassName="object-contain"
          />
          <div className="flex flex-col gap-6 py-5">
            {historyInternationalFederationClosingParagraphs.map((paragraph, index) => (
              <HistoryParagraph key={index}>{paragraph}</HistoryParagraph>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

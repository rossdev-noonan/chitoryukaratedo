import Image from "next/image";

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
import { CaptionedPhoto, Portrait } from "@/components/public/history/HistoryPhotoHelpers";

export function HistoryBiography() {
  return (
    <div className="flex flex-col gap-16 pb-16 lg:pb-20">
      {/* Tsuyoshi Chitose (485:246) — the full article, restored */}
      <article id="tsuyoshi-chitose" className="scroll-mt-[38vh] pt-16">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-heading text-4xl font-semibold text-black sm:text-5xl">
              Tsuyoshi Chitose
            </h2>
            <div className="mt-8 flex flex-col gap-4">
              {historyIntroParagraphs.map((paragraph, index) =>
                paragraph ? (
                  <p key={index} className="leading-[1.6] text-black">
                    {paragraph}
                  </p>
                ) : (
                  <div key={index} aria-hidden />
                ),
              )}
            </div>
          </div>
          <div className="relative h-[360px] w-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[470px] lg:h-[553px]">
            <Image
              src="/images/history/chitose-portrait.png"
              alt="Dr. Tsuyoshi Chitose"
              fill
              sizes="(min-width: 1024px) 769px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-black">Early Years</h3>
            <p className="mt-5 leading-[1.6] text-black">{historyEarlyYearsParagraph}</p>
          </div>
          <CaptionedPhoto
            src="/images/history/era-photo.png"
            alt="Chito Ryu Karate-Do practitioners"
            caption={historyEarlyYearsCaption}
          />
        </div>

        <p className="mt-10 leading-[1.6] text-black">{historyAragakiParagraph}</p>

        <div className="mt-12 flex flex-col gap-8">
          <div className="flex flex-col gap-10 sm:flex-row">
            <Portrait
              src={historyPortraits.hirohito.src}
              name={historyPortraits.hirohito.name}
              caption={historyPortraits.hirohito.caption}
            />
            <Portrait
              src={historyPortraits.funakoshi.src}
              name={historyPortraits.funakoshi.name}
              caption={historyPortraits.funakoshi.caption}
            />
          </div>
          <div className="flex flex-col gap-6">
            {historyHirohitoSectionParagraphs.map((paragraph, index) => (
              <p key={index} className="leading-[1.6] text-black">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <p className="mt-10 leading-[1.6] text-black">{historyWarEraParagraph}</p>

        <div className="mt-12 flex flex-col gap-8">
          <div>
            <h3 className="text-2xl font-semibold text-black">Chitose Opens his own Dojo</h3>
            <p className="mt-5 leading-[1.6] text-black">{historyDojoParagraph}</p>
          </div>
          <CaptionedPhoto
            src="/images/history/era-photo.png"
            alt="Chito Ryu Karate-Do practitioners"
            caption={historyDojoPhotoCaption.title}
            subtitle={historyDojoPhotoCaption.subtitle}
          />
        </div>

        <div className="mt-12 flex flex-col gap-8">
          <CaptionedPhoto
            src="/images/history/funakoshi-1955.png"
            alt="Chitose and Professor Gichin Funakoshi, August 18, 1955"
            caption={historyDojoSecondPhotoCaption}
            circular
          />
          <p className="leading-[1.6] text-black">{historyDojoSecondParagraph}</p>
        </div>

        <div className="mt-12 flex flex-col gap-8">
          <p className="leading-[1.6] text-black">{historyDometrichParagraph}</p>
          <CaptionedPhoto
            src="/images/history/osensei-dometrich.png"
            alt="O'Sensei with Dometrich"
            caption={historyDometrichPhotoCaption}
            circular
          />
        </div>

        <p className="mt-10 leading-[1.6] text-black">{historyFairmontParagraph}</p>

        <div className="mt-12 flex flex-col gap-8">
          <CaptionedPhoto
            src={historySlomanskiPortrait.src}
            alt={historySlomanskiPortrait.caption}
            caption={historySlomanskiPortrait.caption}
            circular
          />
          <p className="leading-[1.6] text-black">{historySlomanskiParagraph}</p>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {historyMainParagraphs.map((paragraph, index) => (
            <p key={index} className="leading-[1.6] text-black">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {/* International Federation (505:1134) */}
      <article id="international-federation" className="scroll-mt-[38vh] pt-16">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="font-heading text-4xl font-semibold text-black sm:text-5xl">
              {historyInternationalFederationHeading}
            </h2>
            <p className="mt-6 leading-[1.6] text-black">
              {historyInternationalFederationIntroParagraph}
            </p>
          </div>
          <Portrait
            src={historyInternationalFederationPortrait.src}
            name={historyInternationalFederationPortrait.name}
            caption={historyInternationalFederationPortrait.caption}
          />
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {historyInternationalFederationClosingParagraphs.map((paragraph, index) => (
            <p key={index} className="leading-[1.6] text-black">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}

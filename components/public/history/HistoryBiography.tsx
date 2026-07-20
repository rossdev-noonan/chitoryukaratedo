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
    <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
      {/* Tsuyoshi Chitose (485:246) — the full article, restored */}
      <article className="border-primary-dark border-t-[3px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="relative h-[300px] w-full shrink-0 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[380px] lg:h-[408px] lg:w-[443px]">
            <Image
              src="/images/history/chitose-portrait.png"
              alt="Dr. Tsuyoshi Chitose"
              fill
              sizes="(min-width: 1024px) 443px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold text-black sm:text-4xl">
              Tsuyoshi Chitose
            </h2>
            <div className="mt-6 flex flex-col gap-4">
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
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:w-[467px] lg:shrink-0">
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

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex flex-col gap-10 sm:flex-row lg:w-[443px] lg:shrink-0 lg:flex-col">
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

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:w-[467px] lg:shrink-0">
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

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <CaptionedPhoto
            src="/images/history/funakoshi-1955.png"
            alt="Chitose and Professor Gichin Funakoshi, August 18, 1955"
            caption={historyDojoSecondPhotoCaption}
            circular
          />
          <p className="leading-[1.6] text-black lg:w-[467px] lg:shrink-0">
            {historyDojoSecondParagraph}
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <p className="leading-[1.6] text-black lg:w-[467px] lg:shrink-0">
            {historyDometrichParagraph}
          </p>
          <CaptionedPhoto
            src="/images/history/osensei-dometrich.png"
            alt="O'Sensei with Dometrich"
            caption={historyDometrichPhotoCaption}
            circular
          />
        </div>

        <p className="mt-10 leading-[1.6] text-black">{historyFairmontParagraph}</p>

        <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-10">
          <CaptionedPhoto
            src={historySlomanskiPortrait.src}
            alt={historySlomanskiPortrait.caption}
            caption={historySlomanskiPortrait.caption}
            circular
          />
          <p className="leading-[1.6] text-black lg:w-[467px] lg:shrink-0">
            {historySlomanskiParagraph}
          </p>
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
      <article className="border-primary-dark border-t-[3px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="lg:w-[521px] lg:shrink-0">
            <Portrait
              src={historyInternationalFederationPortrait.src}
              name={historyInternationalFederationPortrait.name}
              caption={historyInternationalFederationPortrait.caption}
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-semibold text-black sm:text-4xl">
              {historyInternationalFederationHeading}
            </h2>
            <p className="mt-6 leading-[1.6] text-black">
              {historyInternationalFederationIntroParagraph}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {historyInternationalFederationClosingParagraphs.map((paragraph, index) => (
            <p key={index} className="leading-[1.6] text-black">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </section>
  );
}

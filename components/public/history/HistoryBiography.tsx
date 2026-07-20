import Image from "next/image";

import {
  historyAragakiParagraph,
  historyChinaLineageByline,
  historyChinaLineageHeading,
  historyChinaLineageParagraphs,
  historyEarlyYearsCaption,
  historyEarlyYearsParagraph,
  historyHirohitoSectionParagraphs,
  historyPortraits,
  historyWarEraParagraph,
} from "@/lib/history-content";

function Portrait({
  src,
  name,
  caption,
}: {
  src: string;
  name: string;
  caption: string;
}) {
  return (
    <div>
      <div className="relative h-[280px] w-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[350px]">
        <Image src={src} alt={name} fill sizes="443px" className="object-cover" />
      </div>
      <p className="mt-4 text-center text-base font-semibold text-black">{name}</p>
      <p className="text-center text-xs text-black">{caption}</p>
    </div>
  );
}

function CaptionedPhoto({
  src,
  alt,
  caption,
  subtitle,
}: {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
}) {
  return (
    <div className="w-full min-w-0">
      <div className="relative h-[320px] w-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[420px] lg:h-[420px]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 713px, 100vw" className="object-cover" />
      </div>
      <p className="mt-4 text-center text-base font-semibold text-black">{caption}</p>
      {subtitle && <p className="text-center text-xs text-black">{subtitle}</p>}
    </div>
  );
}

export function HistoryBiography() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20">
      <article className="border-primary-dark border-t-[3px] px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <div className="relative h-[360px] w-full shrink-0 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[380px] lg:h-[644px] lg:w-[521px]">
            <Image
              src="/images/history/origin-china-portrait.png"
              alt="Dr. Tsuyoshi Chitose"
              fill
              sizes="(min-width: 1024px) 521px, 100vw"
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
      </article>
    </section>
  );
}

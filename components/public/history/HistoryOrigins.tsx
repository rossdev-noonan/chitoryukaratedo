import Image from "next/image";

import { SectionEyebrow } from "@/components/public/home/SectionEyebrow";
import {
  historyFounderCitation,
  historyMeaningDefinitions,
  historyOriginsDescription,
  historyWhatIsChitoRyuHeading,
  historyWhatIsChitoRyuParagraphs,
} from "@/lib/history-content";

export function HistoryOrigins() {
  return (
    <div className="text-center">
      <SectionEyebrow centered>Origins</SectionEyebrow>
      <div className="bg-primary mx-auto mt-2 h-0.5 w-[86px]" />
      <h2 className="font-heading mt-2 text-3xl font-bold sm:text-4xl">The Origin of Chito Ryu</h2>
      <p className="text-muted-foreground mx-auto mt-4 max-w-2xl leading-[1.7]">
        {historyOriginsDescription}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-10 text-left lg:grid-cols-[548fr_692fr] lg:items-center lg:gap-10">
        <div>
          <h3 className="text-primary text-2xl font-semibold">The Meaning of CHI, TO, RYU</h3>
          <p className="mt-5 leading-[1.7] text-black">
            O-Sensei was told by Arigaki Sensei that Karate-do originated approximately one
            thousand years ago in China. Based on this, O-Sensei named his style “Chito Ryu”,
            according to the origins of Karate-do.
          </p>
          <ul className="mt-6 flex flex-col gap-6">
            {historyMeaningDefinitions.map((item) => (
              <li key={item.term} className="relative pl-4 leading-[1.6] text-black">
                <span className="bg-primary absolute top-2.5 left-0 h-1 w-1 rounded-full" />
                <span className="text-primary font-bold">{`"${item.term}"`}</span> {item.definition}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="relative h-[380px] w-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)] sm:h-[420px] lg:h-[500px]">
            <Image
              src="/images/history/chito-ryu-emblem-diagram.png"
              alt="Diagram of the Chito Ryu emblem: Sun, Hands, Chito Ryu, Karate-do, Universe"
              fill
              sizes="(min-width: 1024px) 692px, 100vw"
              className="object-contain"
            />
          </div>
          <p className="mt-3 text-xs text-black">
            {historyFounderCitation.text}
            <a
              href={historyFounderCitation.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {historyFounderCitation.linkText}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-16 text-left lg:mt-20">
        <h3 className="text-primary text-2xl font-semibold">{historyWhatIsChitoRyuHeading}</h3>
        <div className="mt-6 flex flex-col gap-4">
          {historyWhatIsChitoRyuParagraphs.map((paragraph, index) => (
            <p key={index} className="leading-[1.7] text-black">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative mt-10 aspect-[1280/838] w-full shadow-[0px_20px_40px_0px_rgba(0,0,0,0.06)]">
          <Image
            src="/images/history/about-china-map.png"
            alt="Dr. Tsuyoshi Chitose gesturing before a map of North America"
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HistoryMobileMilestones } from "@/components/public/history/HistoryMobileMilestones";
import type { Locale } from "@/lib/i18n/locales";

interface HistoryMobileContentProps {
  lang: Locale;
}

function MobileSectionTitle({ year, children }: { year: string; children: string }) {
  return (
    <div className="flex h-[90px] w-full items-center gap-2">
      <span className="bg-brand-accent flex h-[25px] w-[94px] shrink-0 items-center justify-center rounded-sm px-3 py-1 text-sm font-semibold whitespace-nowrap text-[#faf9f7]">
        {year}
      </span>
      <h2 className="font-heading text-2xl leading-none font-medium whitespace-nowrap text-[#1f2937]">
        {children}
      </h2>
    </div>
  );
}

function MobileHistoryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={`relative w-full overflow-visible bg-transparent ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="350px"
        className="rounded-lg object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.06)]"
      />
    </div>
  );
}

function MobileCaption({ children, subtitle }: { children: string; subtitle?: string }) {
  return (
    <div className="text-center text-xs leading-[1.5] text-[#1f2937]">
      <p className="font-bold">{children}</p>
      {subtitle && <p className="text-[#4b5563]">{subtitle}</p>}
    </div>
  );
}

export function HistoryMobileContent({ lang }: HistoryMobileContentProps) {
  return (
    <div className="bg-background md:hidden">
      <section className="flex h-[315px] flex-col gap-5 px-5 py-10 text-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-brand-accent text-xl font-semibold uppercase">Origins</p>
          <div className="bg-primary h-[3px] w-[60px]" />
          <h2 className="font-heading text-[28px] leading-none font-semibold text-[#1f2937]">
            The Origin of Chito Ryu
          </h2>
        </div>
        <p className="text-base leading-[1.7] text-[#1f2937]">
          Discover the history, philosophy and leadership behind Chito Ryu Karate Do, founded
          by&nbsp;Dr. Tsuyoshi Chitose, and now practiced by generations of martial artists across
          the globe.
        </p>
      </section>

      <HistoryMobileMilestones />

      <article
        id="origin-in-china"
        className="border-brand-accent scroll-mt-[156px] border-t-[3px] p-5"
      >
        <MobileSectionTitle year="c. 1000 CE">Origin in China</MobileSectionTitle>
        <MobileHistoryImage
          src="/images/history/figma-origin-china.png"
          alt="Historic mural depicting Chinese martial arts practice"
          className="h-[217px]"
        />
        <div className="mt-[14px] space-y-[18px] text-xs leading-[1.5] text-[#4b5563]">
          <p>
            Chito Ryu&apos;s history as an organized school is generally dated to 1946, when the
            Yōseikan dojo was established in the town of Waifu, Kikuchi District, Kumamoto
            Prefecture. Its founder, the First Soke, was Chitose Tsuyoshin (1898–1984). He was 48
            years old at the time — just a year after the end of the Pacific War, while the wounds
            of the conflict were still fresh across Japan.
          </p>
          <p>
            Opening a dojo at 48 might seem late in life, but before the war, he had already opened
            and led the &quot;Okinawa Kenpō Miyako Tōde Research Institute&quot; on Miyako Island,
            Okinawa.
          </p>
        </div>
      </article>

      <section className="flex min-h-[480px] flex-col gap-[14px] p-5">
        <MobileHistoryImage
          src="/images/history/figma-matsumura-sokon.png"
          alt="Matsumura Sokon"
          className="h-[234px]"
        />
        <MobileCaption>Matsumura Sokon</MobileCaption>
        <h2 className="mt-1 text-base font-semibold text-[#1f2937]">Generations</h2>
        <p className="text-xs leading-[1.5] text-[#4b5563]">
          According to the First Soke, the first master of tōde was Chinen Peechin, who is said to
          have traveled to Fujian, China, around 1688 to study Chinese boxing. In 1726 he became a
          military attendant to King Shō Kei. The second generation is generally given as Matsumura
          Peechin (Matsumura Sōkon, 1809–1896, though his birth and death years are disputed).
        </p>
      </section>

      <article id="tang-dynasty" className="scroll-mt-[156px] p-5">
        <MobileSectionTitle year="618-907">Tang Dynasty</MobileSectionTitle>
        <p className="text-xs leading-[1.5] text-[#4b5563]">
          The empty-handed martial art known as karate originated in ancient China, crossed the sea
          to Okinawa, and there developed into a distinctive art called tōde (&quot;Chinese
          hand&quot;). Tōde flourished during China&apos;s Tang dynasty and, according to the
          teachings passed down by Master Arakaki, carried a thousand years of history behind it.
        </p>
        <MobileHistoryImage
          src="/images/history/figma-tang-dynasty.png"
          alt="Tang dynasty martial artists"
          className="mt-5 h-[240px]"
        />
      </article>

      <article id="tsuyoshi-chitose" className="scroll-mt-[156px] p-5">
        <MobileSectionTitle year="1898–1984">Tsuyoshi Chitose</MobileSectionTitle>
        <MobileHistoryImage
          src="/images/history/chitose-portrait.png"
          alt="Tsuyoshi Chitose"
          className="h-[320px]"
        />
        <p className="mt-[14px] text-xs leading-[1.35] font-semibold text-[#1f2937]">
          &quot;Chitose Tsuyoshi: A Bridge Through Time&quot; — by Michael Colling
        </p>
        <p className="mt-[14px] text-xs leading-[1.5] text-[#4b5563]">
          Chinen Tsuyoshi, later to be known by the name Chitose, was born in an era where the
          Okinawan fighting arts were quietly taught to those who knew the right people. His lineage
          can be traced back to Chinen Yamagushiku (1791-1881). He is a grandson of Matsumura Soken,
          well known into modern times as one of the most notable of his era.
        </p>
      </article>

      <section className="flex flex-col gap-[14px] p-5 pb-10">
        <h2 className="text-base font-semibold text-[#1f2937]">Early Years</h2>
        <p className="text-xs leading-[1.5] text-[#4b5563]">
          Chitose’s birthday was October 18th, 1898, in Naha City. During his early years in Okinawa
          he was known as Chinen Gua, and in later years when living in Japan he adopted the Chitose
          name for personal reasons, becoming Chitose Gochoku.
        </p>
        <MobileHistoryImage
          src="/images/history/figma-okinawa-map.png"
          alt="City of Naha, Okinawa"
          className="h-[240px]"
        />
        <MobileCaption>City of Naha, Okinawa</MobileCaption>
      </section>

      <section className="flex flex-col gap-8 px-5 pt-5 pb-10">
        <div className="flex flex-col gap-3">
          <MobileHistoryImage
            src="/images/history/figma-hirohito.png"
            alt="Crown Prince Hirohito"
            className="h-[260px]"
          />
          <MobileCaption subtitle="Emperor of Japan">Crown Prince Hirohito</MobileCaption>
        </div>
        <div className="flex flex-col gap-3">
          <MobileHistoryImage
            src="/images/history/figma-funakoshi.png"
            alt="Gichin Funakoshi"
            className="h-[260px]"
          />
          <MobileCaption subtitle='"Father of Modern Karate"'>Gichin Funakoshi</MobileCaption>
        </div>
      </section>

      <section className="flex flex-col gap-5 px-5 pt-5 pb-10">
        <h2 className="text-base font-semibold text-[#1f2937]">Chitose Opens his own Dojo</h2>
        <p className="text-xs leading-[1.5] text-[#4b5563]">
          When Chitose opened his dojo in 1946, he was at that point where two eras of karate were
          crossing, the old Te of Okinawa and the new systemized ways of post war Japan that were
          reshaping what was to be modern karate. He adopted the name &quot;Chito-Ryu&quot; by 1952,
          referring back to the Chinese Tang era.
        </p>
        <MobileHistoryImage
          src="/images/history/figma-backyard-training.png"
          alt="Backyard training at O-Sensei's home"
          className="h-[240px]"
        />
        <MobileCaption>Backyard training at O-Sensei&apos;s home</MobileCaption>
      </section>

      <section className="flex flex-col gap-3 px-5 pt-5 pb-10">
        <MobileHistoryImage
          src="/images/history/figma-funakoshi-1955.png"
          alt="Chitose and Gichin Funakoshi in 1955"
          className="h-[260px]"
        />
        <MobileCaption subtitle="(1955)">Chitose &amp; Gichin Funakoshi</MobileCaption>
      </section>

      <section className="flex flex-col gap-3 px-5 pt-5 pb-10">
        <MobileHistoryImage
          src="/images/history/figma-osensei-dometrich.png"
          alt="O'Sensei with Dometrich"
          className="h-[260px]"
        />
        <MobileCaption>O&apos;Sensei with Dometrich</MobileCaption>
      </section>

      <section className="flex flex-col gap-3 px-5 pt-5 pb-10">
        <MobileHistoryImage
          src="/images/history/figma-slomanski.png"
          alt='Henry "Hank" Slomanski'
          className="h-[260px]"
        />
        <MobileCaption>Henry &quot;Hank&quot; Slomanski</MobileCaption>
      </section>

      <article
        id="international-federation"
        className="border-brand-accent scroll-mt-[156px] border-t-[3px] p-5"
      >
        <MobileHistoryImage
          src="/images/history/figma-yasuhiro-chitose-mobile.png"
          alt="Yasuhiro Chitose"
          className="h-[260px]"
        />
        <h2 className="font-heading mt-[14px] text-[28px] leading-none font-semibold text-[#1f2937]">
          International Federation
        </h2>
        <p className="mt-[14px] text-sm leading-[1.6] text-[#4b5563]">
          On June 6th, 1984, Dr. Tsuyoshi Chitose passed away. In August, 1984, his youngest son
          Yasuhiro Chitose took on the leadership of the style his father founded, taking on his
          name Tsuyoshi. He is now regarded as “Soke” to all involved in the international
          organisation.
        </p>
      </article>

      <section
        id="history-mobile-cta"
        className="bg-primary-dark flex min-h-[213px] flex-col items-center justify-center gap-6 px-5 py-10 text-center"
      >
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-2xl font-medium text-white">Continue the lineage.</h2>
          <p className="text-xs leading-[1.5] text-white/80">
            Find a certified dojo near you and begin your journey.
          </p>
        </div>
        <Link
          href={`/${lang}/dojo-directory`}
          className="flex h-[49px] w-full items-center justify-center gap-2 rounded bg-white px-8 py-4 text-sm font-bold text-[#1f2937]"
        >
          Find a Dojo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </section>
    </div>
  );
}

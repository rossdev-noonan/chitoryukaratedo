import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MapPinSolid } from "@/components/public/icons/MapPinSolid";
import { LeadershipLineageSidebar } from "@/components/public/leadership/LeadershipLineageSidebar";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Three generations of Soke leadership in Chito-Ryu Karate-Do.",
};

const biography =
  "Chinen Tsuyoshi, later to be known by the name Chitose, among others as was custom to his culture, was born in an era where the Okinawan fighting arts were quietly taught to those who knew the right people. His lineage can be traced back to Chinen Yamagushiku (also known as Chinen Peichin and Aburaya Yamaki), 1791–1881. He is a grandson of Matsumura Soken, well known into modern times as one of the most notable of his era. With this family background, Chitose was destined to follow the path he spent a lifetime studying. As a boy, Chitose saw karate enter the Okinawan school system under Itosu Anko, then witnessed Funakoshi Gichin introduce the art to Japan and its later worldwide acceptance as servicemen carried their training home and opened dojos of their own.";

const lineage = [
  {
    id: "shodai",
    mark: "初",
    sidebarRole: "Shodai • Founder",
    role: "Shodai Soke • Founder",
    shortRole: "Founder",
    years: "1898–1984",
    name: "Tsuyoshi Chitose",
    photoSrc: "/images/leadership/shodai-soke-figma.png",
  },
  {
    id: "nidaime",
    mark: "二",
    sidebarRole: "Nidaime · 2nd Gen",
    role: "Nidaime Soke • 2nd Generation Soke",
    shortRole: "2nd Generation",
    years: "1986–2023",
    name: "Tsuyoshi Chitose",
    photoSrc: "/images/leadership/nidaime-soke-figma.png",
  },
  {
    id: "sandaime",
    mark: "三",
    sidebarRole: "Sandaime · 3rd Gen",
    role: "Sandaime Soke • 3rd Generation Soke",
    shortRole: "3rd Generation",
    years: "2023–Present",
    name: "Tsuyoshi Chitose",
    photoSrc: "/images/leadership/sandaime-soke-figma.png",
  },
] as const;

function LeadershipHero({ lang }: { lang: Locale }) {
  return (
    <section className="bg-background relative overflow-hidden xl:h-[720px]">
      <div className="absolute inset-0 hidden xl:block">
        <Image
          src="/images/history/hero-bg-practitioner.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px] xl:h-full">
        <div className="relative h-[240px] md:mx-10 md:mt-12 md:h-[339px] md:overflow-hidden md:rounded-lg xl:absolute xl:inset-0 xl:m-0 xl:h-full xl:rounded-none">
          <Image
            src="/images/history/hero-bg-practitioner.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="object-cover xl:hidden"
          />
          <div className="absolute inset-y-0 right-0 w-full xl:left-[34.8%] xl:w-[65.2%]">
            <Image
              src="/images/leadership/leadership-group.png"
              alt="Chito-Ryu International leadership group"
              fill
              priority
              sizes="(min-width: 1440px) 939px, (min-width: 1280px) 68vw, 100vw"
              className="object-cover xl:object-contain"
            />
          </div>
        </div>

        <div className="relative px-5 py-8 md:px-20 md:pt-8 md:pb-0 xl:w-[630px] xl:px-20 xl:pt-[120px] xl:pb-0">
          <p className="public-hero-breadcrumb text-brand-accent font-medium uppercase md:font-semibold">
            home / about / leadership
          </p>
          <div className="bg-primary mt-4 h-0.5 w-[60px] md:mt-[11px] md:w-[86px]" />
          <h1 className="public-hero-title font-heading text-foreground mt-4 text-2xl font-medium md:mt-3 md:font-semibold">
            Leadership
          </h1>
          <p className="text-muted-foreground mt-6 max-w-[480px] text-xs leading-[1.5] md:text-lg md:leading-[1.6] xl:mt-10">
            Three generations of Soke have guided Chito Ryu since its founding, each preserving the
            art&apos;s technical standards while carrying it to a wider world.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 xl:mt-10">
            <Link
              href={`/${lang}/login`}
              className="bg-primary-dark hover:bg-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white transition-colors md:text-base"
            >
              Join our Community
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={`/${lang}/dojo-directory`}
              className="text-brand-accent hover:bg-brand-accent inline-flex items-center justify-center gap-2 border border-[#d8cba8] bg-white/80 px-8 py-4 text-sm font-semibold transition-colors hover:text-white md:text-base"
            >
              Find our Dojo
              <MapPinSolid className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function LineageNavigator() {
  return (
    <nav className="bg-secondary-background px-5 py-4 md:hidden" aria-label="Soke lineage">
      <div className="mx-auto max-w-3xl">
        <p className="text-foreground text-base font-semibold">
          Lineage <span className="ml-4 text-[10px] font-normal uppercase">Tap to jump</span>
        </p>
        <div className="relative mt-4 flex items-start justify-between gap-2 before:absolute before:top-3.5 before:right-[12%] before:left-[12%] before:h-px before:bg-[#d8cba8]">
          {lineage.map((entry, index) => (
            <a
              key={entry.id}
              href={`#${entry.id}`}
              className="relative z-10 flex w-24 flex-col items-center gap-2 text-center"
            >
              <span
                className={`font-heading flex size-7 items-center justify-center rounded-full border text-sm ${
                  index === 0
                    ? "border-primary bg-primary text-white"
                    : "border-[#d8cba8] bg-[#faf6ec] text-[#b08d47]"
                }`}
              >
                {entry.mark}
              </span>
              <span className="text-[10px] leading-none text-[#b08d47] uppercase">
                {entry.shortRole}
              </span>
              <span className="font-heading text-foreground text-[11px] font-bold">
                {index === 0 ? "Shodai Soke" : index === 1 ? "Nidaime Soke" : "Sandaime Soke"}
              </span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function SokeProfile({ entry }: { entry: (typeof lineage)[number] }) {
  return (
    <article
      id={entry.id}
      className="scroll-mt-24 border-t border-[#d8cba8] py-10 md:px-10 md:py-14 xl:px-20"
    >
      <header className="relative flex flex-col items-center text-center md:items-start md:text-left">
        <span className="bg-brand-accent rounded-sm px-3 py-1 text-xs font-bold text-[#faf9f7] md:text-base">
          {entry.years}
        </span>
        <p className="text-primary mt-1 text-[10px] uppercase md:text-base">{entry.role}</p>
        <h2 className="font-heading text-foreground mt-1 text-xl font-medium md:text-[32px]">
          {entry.name}
        </h2>
        <span className="font-heading bg-primary absolute top-0 right-0 flex size-11 items-center justify-center rounded-full text-2xl text-white md:size-20 md:text-4xl">
          {entry.mark}
        </span>
      </header>

      <div className="relative mt-7 aspect-[1447/1024] w-full md:mt-10 md:aspect-auto md:h-[553px] xl:aspect-[1447/1024] xl:h-auto">
        <Image
          src={entry.photoSrc}
          alt={`${entry.name}, ${entry.role}`}
          fill
          sizes="(min-width: 1280px) 772px, (min-width: 768px) 680px, 350px"
          className="object-contain"
        />
      </div>
      <p className="mt-7 text-xs leading-[1.5] text-black md:mt-10 md:text-base md:leading-[1.6]">
        {biography}
      </p>
    </article>
  );
}

export default async function LeadershipPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <>
      <LeadershipHero lang={lang} />

      <section className="px-5 py-10 text-center md:hidden">
        <p className="text-brand-accent text-xs font-medium uppercase">Leadership</p>
        <div className="bg-primary mx-auto mt-2 h-0.5 w-[60px]" />
        <h2 className="font-heading text-foreground mt-4 text-2xl font-medium">Soke</h2>
        <p className="text-foreground mx-auto mt-5 max-w-3xl text-xs leading-[1.5] md:text-base md:leading-[1.7]">
          The title of Soke, head of the school, has passed through three generations since Chito
          Ryu was founded in 1946. Each Soke has been responsible for the same charge: preserve the
          technical and philosophical core of the art, while guiding its growth into new countries
          and new generations of practitioners.
        </p>
      </section>

      <LineageNavigator />

      <div className="w-full overflow-hidden bg-white">
        <div className="mx-auto grid w-full max-w-[1364px] md:w-[calc(100%-40px)] md:grid-cols-[89px_minmax(0,1fr)] md:gap-6 xl:w-full xl:grid-cols-[491px_minmax(0,849px)] xl:gap-0">
          <LeadershipLineageSidebar entries={lineage} />
          <main className="relative bg-white px-5 after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-screen after:bg-white after:content-[''] md:px-5 xl:px-0">
            <section className="hidden px-10 py-14 md:block">
              <p className="text-brand-accent text-xl font-semibold tracking-[0.1em] uppercase">
                Leadership
              </p>
              <div className="bg-primary mt-3 h-0.5 w-[86px]" />
              <h2 className="font-heading text-foreground mt-6 text-[32px] font-medium">Soke</h2>
              <p className="text-foreground mt-6 text-base leading-[1.7]">
                The title of Soke, head of the school, has passed through three generations since
                Chito Ryu was founded in 1946. Each Soke has been responsible for the same charge:
                preserve the technical and philosophical core of the art, while guiding its growth
                into new countries and new generations of practitioners.
              </p>
            </section>
            {lineage.map((entry) => (
              <SokeProfile key={entry.id} entry={entry} />
            ))}
          </main>
        </div>
      </div>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-16 xl:px-0 xl:py-20">
        <div className="bg-primary-dark flex min-h-[199px] flex-col items-start justify-center gap-8 px-6 py-12 md:min-h-[244px] md:items-center md:px-10 md:text-center xl:min-h-[199px] xl:flex-row xl:justify-between xl:px-20 xl:text-left">
          <div>
            <h2 className="font-heading text-2xl font-bold text-white md:text-[32px]">
              Continue the lineage.
            </h2>
            <p className="mt-2 text-xs text-white/80 md:text-sm">
              Find a certified Chito Ryu dojo near you and begin your journey.
            </p>
          </div>
          <Link
            href={`/${lang}/dojo-directory`}
            className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-white px-8 py-4 text-sm font-bold text-black transition-opacity hover:opacity-90"
          >
            Find a Dojo
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}

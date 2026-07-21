import type { Metadata } from "next";
import Image from "next/image";

import { AboutHero } from "@/components/public/about/AboutHero";
import { AboutSectionNav } from "@/components/public/about/AboutSectionNav";
import { AboutWorldMap } from "@/components/public/about/AboutWorldMap";
import { AnimatedEmblemMeaning } from "@/components/public/about/AnimatedEmblemMeaning";
import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "About Chito-Ryu",
  description:
    "Discover the story, philosophy, leadership, and worldwide community of Chito-Ryu Karate-Do.",
};

function SectionHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-brand-accent text-base font-semibold tracking-[0.1em] uppercase md:text-xl">
        {eyebrow}
      </p>
      <div className="bg-primary mt-4 h-0.5 w-[86px]" />
      <h2 className="font-heading text-foreground mt-6 text-[30px] font-medium md:text-[32px]">
        {children}
      </h2>
    </div>
  );
}

function Subheading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-foreground text-lg font-semibold uppercase md:text-xl">{children}</h3>;
}

function SectionShell({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      id={id}
      className="scroll-mt-[160px] border-t border-[#c8a24a] py-12 first:border-0 md:py-[50px]"
    >
      {children}
    </section>
  );
}

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;

  return (
    <>
      <AboutHero lang={lang} />
      <AboutSectionNav />

      <div className="mx-auto mb-[72px] w-[calc(100%-2rem)] max-w-[1364px] bg-white px-5 md:px-10">
        <SectionShell id="story">
          <SectionHeading eyebrow="Origin">The Story</SectionHeading>
          <div className="text-foreground mt-6 space-y-5 text-base leading-[1.7]">
            <Subheading>A Lineage Older Than a Name</Subheading>
            <p>
              Chito Ryu&apos;s roots reach back nearly a thousand years, to fighting traditions
              practiced in China&apos;s Fujian province — long before &quot;karate&quot; was a word
              anyone used. Over centuries, that knowledge crossed the East China Sea to Okinawa,
              carried by traders and travelers, and mingled with local striking and grappling arts
              already taking shape there.
            </p>
            <p>
              It wasn&apos;t until 1946 that this lineage was given its modern name. Dr. Tsuyoshi
              Chitose — a physician by training and a lifelong student of Okinawan karate — named
              his style Chito Ryu: &quot;Chi&quot; honoring the art&apos;s Chinese origins,
              &quot;To&quot; its Okinawan development, and &quot;Ryu&quot; simply meaning school.
              The name is, in effect, a short history lesson.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-foreground text-[28px] font-medium md:text-[32px]">
              What is Chito Ryu
            </h3>
            <div className="mt-6 space-y-5 text-base leading-[1.7] text-black">
              <p>
                The empty-handed martial art known as karate originated in ancient China, crossed
                the sea to Okinawa, and there developed into a distinctive art called <em>tōde</em>
                (&quot;Chinese hand&quot;). Tōde flourished during China&apos;s Tang dynasty and,
                according to the teachings passed down by Master Arakaki (mentor to the First Soke),
                carried a thousand years of history behind it. It was from this heritage that the
                First Soke coined the name &quot;Chito-ryu&quot; — combining <em>sen</em> (千,
                &quot;thousand,&quot; from &quot;a thousand years of history&quot;) with <em>tō</em>{" "}
                (唐, &quot;Tang,&quot; from the Tang dynasty).
              </p>
              <p>
                The techniques of Chito-ryu carry forward the excellent traditions cultivated over
                this long history. Grounded in physiology and medicine, and guided by the principles
                of <em>Wanin</em> (harmony and endurance) and <em>Rikihittatsu</em> (the will to
                achieve through strength), the school aims to develop people who are sound in both
                body and mind.
              </p>
              <p>
                It is our hope that practitioners will acquire correct knowledge of Chito-ryu karate
                and continue to teach, spread, and develop the art.
              </p>
            </div>
            <div className="relative mt-10 h-[300px] w-full shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:h-[537px]">
              <Image
                src="/images/about/tsuyoshi-chitose-map.png"
                alt="Dr. Tsuyoshi Chitose before a map of East Asia"
                fill
                sizes="(min-width: 1280px) 1284px, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </SectionShell>

        <SectionShell id="philosophy">
          <SectionHeading eyebrow="Philosophy">The Way of Chito Ryu</SectionHeading>
          <div className="mt-6 space-y-5 text-base leading-[1.7] text-black">
            <Subheading>More Than Karate. A Way of Life.</Subheading>
            <p>
              Chito Ryu was never meant to be only a fighting style. Chitose Sensei, drawing on his
              medical training, built the art around principles of safe, sustainable movement —
              technique that could be practiced for a lifetime, not just a competitive career.
            </p>
            <p>
              That same philosophy still shapes how Chito Ryu is taught today: self-discipline,
              physical fitness, mental resilience, and respect for others, in training open to
              everyone regardless of age, gender, or ability. A dojo is a place to build character
              as much as skill.
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-foreground text-xl font-semibold uppercase">
              The Meaning of <span className="text-primary">Chi, To, Ryu</span>
            </h3>
            <p className="mt-5 text-base leading-[1.7] text-black">
              O-Sensei was told by Arigaki Sensei that Karate-do originated approximately one
              thousand years ago in China. Based on this, O-Sensei named his style &quot;Chito
              Ryu&quot;, according to the origins of Karate-do.
            </p>
            <ul className="marker:text-primary mt-8 space-y-5 pl-5 text-base leading-[1.7] text-black">
              <li>
                <strong className="text-primary">&quot;CHI&quot;</strong> means &apos;one
                thousand&apos;.
              </li>
              <li>
                <strong className="text-primary">&quot;TO&quot;</strong> refers to China&apos;s Tang
                dynasty (618–907), where To-de is commonly thought to have sprung from.
              </li>
              <li>
                <strong className="text-primary">&quot;RYU&quot;</strong> is the Japanese word for
                style.
              </li>
            </ul>
            <div className="mt-10 border border-[#eee8dc] shadow-[0_20px_50px_rgba(68,52,24,0.08)]">
              <AnimatedEmblemMeaning />
            </div>
            <p className="mt-3 text-xs leading-[1.4] text-black">
              Diagram adapted from The Five Hills Karate Club.
            </p>
          </div>
        </SectionShell>

        <SectionShell id="leadership">
          <SectionHeading eyebrow="Leadership & Lineage">Leadership</SectionHeading>
          <div className="mt-6 space-y-5 text-base leading-[1.7] text-black">
            <Subheading>代々 — Passed Down Through the Generations</Subheading>
            <p>
              Since Chitose Sensei&apos;s founding, Chito Ryu has been guided by three generations
              of Soke leadership, each responsible for preserving the art&apos;s technical standards
              and philosophical core as it spread across the world.
            </p>
            <p>
              This is what separates a living martial art from a preserved museum piece: Chito Ryu
              is not frozen in 1946. It has grown — new dojos, new instructors, new practitioners —
              while its grading standards and founding principles remain unified across every
              country that practices it.
            </p>
          </div>
          <figure className="mt-10">
            <div className="relative h-[300px] w-full shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:h-[500px]">
              <Image
                src="/images/about/three-soke-generations.png"
                alt="The three generations of Chito-Ryu Soke leadership"
                fill
                sizes="(min-width: 1280px) 1284px, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-5 text-center text-xs text-black">
              The 3 Soke Generations of Chito Ryu
            </figcaption>
          </figure>
        </SectionShell>

        <SectionShell id="worldwide">
          <SectionHeading eyebrow="Global Community">Worldwide</SectionHeading>
          <div className="mt-6 space-y-5 text-base leading-[1.7] text-black">
            <Subheading>One Lineage, Twenty Countries</Subheading>
            <p>
              What began in a single dojo in Kumamoto now spans more than twenty countries and 300
              recognized dojos, united under the International Chito-Ryu Karate-Do Federation. From
              Tokyo to Toronto, Gold Coast to Glasgow, practitioners train under the same core
              curriculum — connected by the same thousand-year lineage, however far from its origin
              they stand.
            </p>
          </div>
          <div className="mt-[100px]">
            <AboutWorldMap />
          </div>
        </SectionShell>
      </div>

      <GlobalCommunityCTA lang={lang} />
      <div className="h-20" aria-hidden />
    </>
  );
}

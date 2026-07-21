import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MapPinSolid } from "@/components/public/icons/MapPinSolid";
import type { Locale } from "@/lib/i18n/locales";

export function AboutHero({ lang }: { lang: Locale }) {
  return (
    <section className="bg-background relative overflow-hidden xl:h-[720px]">
      <div className="relative h-[300px] xl:absolute xl:inset-0 xl:h-full">
        <Image
          src="/images/history/hero-bg-practitioner.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-full xl:left-[34.8%] xl:w-[65.2%]">
          <Image
            src="/images/about/honbu-dojo.png"
            alt="The Chito-Ryu Sohonbu dojo in Kumamoto, Japan"
            fill
            preload
            sizes="(min-width: 1280px) 66vw, 100vw"
            className="object-cover object-center xl:object-contain"
          />
        </div>
      </div>

      <div className="relative px-5 py-9 md:px-10 xl:w-[630px] xl:px-20 xl:pt-[120px] xl:pb-0">
        <p className="text-brand-accent text-sm font-semibold uppercase md:text-xl">home / about</p>
        <div className="bg-primary mt-[11px] h-0.5 w-[86px]" />
        <h1 className="font-heading text-foreground mt-3 text-[34px] leading-none font-semibold md:text-5xl">
          About Chito Ryu
        </h1>
        <p className="text-muted-foreground mt-6 max-w-[480px] text-base leading-[1.6] md:text-lg xl:mt-10">
          From Fujian&apos;s temple courtyards to Chitose Sensei&apos;s dojo in Kumamoto — the story
          of how Chito Ryu came to be.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 xl:mt-10">
          <Link
            href={`/${lang}/login`}
            className="bg-primary-dark hover:bg-primary inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white transition-colors"
          >
            Join our Community
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={`/${lang}/dojo-directory`}
            className="text-brand-accent hover:bg-brand-accent inline-flex items-center justify-center gap-2 border border-[#d8cba8] bg-white/80 px-8 py-4 text-base font-semibold transition-colors hover:text-white"
          >
            Find our Dojo
            <MapPinSolid className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

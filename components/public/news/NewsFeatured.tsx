import Image from "next/image";
import Link from "next/link";

import { newsFeaturedStory } from "@/lib/news-content";
import type { Locale } from "@/lib/i18n/locales";

export function NewsFeatured({ lang }: { lang: Locale }) {
  const story = newsFeaturedStory;

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 pb-6 sm:px-6 md:px-10 xl:px-[190px] xl:pt-6 xl:pb-6">
        <div className="flex flex-col items-start gap-2 xl:gap-4">
          <div className="bg-primary-dark h-0.5 w-10 xl:w-[63px]" />
          <h2 className="text-base font-semibold text-[#1f2937] xl:text-2xl">Featured Story</h2>
        </div>

        <Link
          href={`/${lang}/news`}
          className="group mt-3.5 flex flex-col overflow-hidden rounded-[6px] border border-[#e8e2d5] bg-white transition-colors hover:bg-black/[0.015] xl:mt-6 xl:h-[320px] xl:flex-row"
        >
          <div className="relative h-[160px] w-full shrink-0 bg-[#faf6ec] xl:h-full xl:w-[500px]">
            <Image
              src={story.bannerSrc.mobile}
              alt=""
              fill
              sizes="(min-width: 1280px) 500px, 100vw"
              className="object-contain xl:hidden"
            />
            <Image
              src={story.bannerSrc.desktop}
              alt=""
              fill
              sizes="500px"
              className="hidden object-contain xl:block"
            />
          </div>

          <div className="flex flex-1 flex-col items-start gap-2.5 p-4 xl:justify-center xl:gap-3.5 xl:p-[28px]">
            <span className="bg-brand-accent inline-flex items-start rounded px-2.5 py-1 text-[9px] font-bold tracking-[0.5px] text-[#faf9f7] xl:px-2.5 xl:text-[10px]">
              {story.tag}
            </span>
            <p className="font-heading text-sm leading-tight font-medium text-[#1c1412] xl:text-base xl:font-bold">
              {story.title}
            </p>
            <p className="text-[11px] text-[#4b5563]">{story.dateLocationLabel}</p>
            <p className="text-xs leading-[18px] text-[#4b5563] xl:text-[13px] xl:leading-[20px]">
              {story.description}
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}

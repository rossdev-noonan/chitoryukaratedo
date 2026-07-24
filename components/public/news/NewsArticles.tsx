import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { newsArticles } from "@/lib/news-content";
import type { Locale } from "@/lib/i18n/locales";

function ArticleCard({ article, lang }: { article: (typeof newsArticles)[number]; lang: Locale }) {
  return (
    <Link
      href={`/${lang}/news`}
      className="group flex w-full flex-col overflow-hidden rounded-[6px] border border-[#e8e2d5] bg-white transition-colors hover:bg-black/[0.015] xl:h-[320px] xl:w-[320px] xl:bg-[#faf6ef]"
    >
      <div className="relative h-[130px] w-full shrink-0 xl:h-[150px]">
        <Image
          src={article.visualSrc.mobile ?? article.visualSrc.desktop}
          alt=""
          fill
          sizes="(min-width: 1280px) 320px, 100vw"
          className="object-cover xl:hidden"
        />
        <Image
          src={article.visualSrc.desktop}
          alt=""
          fill
          sizes="320px"
          className="hidden object-cover xl:block"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2.5 p-3.5 xl:gap-3 xl:bg-white xl:p-4">
        <span className="bg-brand-accent inline-flex items-start rounded px-1.5 py-[3px] text-[8px] font-bold text-white xl:px-2 xl:py-1 xl:text-[9px] xl:tracking-[0.5px]">
          {article.tag}
        </span>
        <div className="flex flex-col items-start gap-0.5 xl:gap-1">
          <p className="text-[13px] leading-4 font-bold text-[#1c1412] xl:text-sm xl:leading-[18px]">
            {article.title}
          </p>
          {article.subtitle && (
            <p className="text-[11px] leading-[14px] text-[#6e6560] xl:text-xs xl:leading-4">
              {article.subtitle}
            </p>
          )}
        </div>
        <p className="text-[11px] text-[#8f857e]">{article.date}</p>
        <p className="text-primary-dark mt-auto text-xs font-semibold">Read more →</p>
      </div>
    </Link>
  );
}

export function NewsArticles({ lang }: { lang: Locale }) {
  const mobileArticles = newsArticles.filter((article) => article.showOnMobile);

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 md:px-10 xl:px-[190px] xl:py-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-2 xl:gap-4">
            <div className="bg-primary-dark h-0.5 w-10 xl:w-[63px]" />
            <h2 className="text-base font-semibold text-[#1f2937] xl:text-2xl">Latest Updates</h2>
          </div>
          <Link
            href={`/${lang}/news`}
            className="hidden items-center gap-2 text-sm font-bold text-[#a3271f] hover:underline xl:inline-flex"
          >
            View All
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-4 xl:hidden">
          {mobileArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </div>

        <div className="mt-6 hidden xl:flex xl:flex-wrap xl:gap-x-[50px] xl:gap-y-12">
          {newsArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} lang={lang} />
          ))}
        </div>

        <div className="mt-3 flex items-start justify-center pt-3 xl:hidden">
          <Link href={`/${lang}/news`} className="text-[13px] font-semibold text-[#a3271f]">
            View All News &amp; Updates →
          </Link>
        </div>

        <div className="mt-5 hidden items-start justify-center gap-2 xl:flex">
          <span className="bg-primary-dark flex size-7 items-center justify-center rounded text-xs font-semibold text-white">
            1
          </span>
          <span className="flex size-7 items-center justify-center rounded border border-[#e8e2d5] bg-white text-xs text-[#6e6560]">
            2
          </span>
          <span className="flex size-7 items-center justify-center rounded border border-[#e8e2d5] bg-white text-xs text-[#6e6560]">
            3
          </span>
          <span className="flex size-7 items-center justify-center rounded border border-[#e8e2d5] bg-white text-xs text-[#6e6560]">
            →
          </span>
        </div>
      </div>
    </section>
  );
}

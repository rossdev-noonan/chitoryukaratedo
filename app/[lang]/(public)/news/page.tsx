import type { Metadata } from "next";

import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import { NewsArticles } from "@/components/public/news/NewsArticles";
import { NewsFeatured } from "@/components/public/news/NewsFeatured";
import { NewsFilters } from "@/components/public/news/NewsFilters";
import { NewsHero } from "@/components/public/news/NewsHero";
import type { Locale } from "@/lib/i18n/locales";
import { getPublicFeaturedNews, getPublicNewsArticles } from "@/lib/news";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from Chito-Ryu International.",
};

interface NewsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params;
  const [featuredStory, articles] = await Promise.all([
    getPublicFeaturedNews(),
    getPublicNewsArticles(),
  ]);

  return (
    <>
      <NewsHero />
      <NewsFilters />
      {featuredStory && <NewsFeatured lang={lang} story={featuredStory} />}
      <NewsArticles lang={lang} articles={articles} />
      <div className="mt-4 xl:mt-8">
        <GlobalCommunityCTA lang={lang} />
      </div>
      <div className="h-16 xl:h-20" aria-hidden />
    </>
  );
}

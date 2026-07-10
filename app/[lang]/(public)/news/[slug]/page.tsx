import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/public/JsonLd";
import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";
import { getNewsPostBySlug } from "@/lib/sanity/content";

interface NewsDetailPageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const match = await getNewsPostBySlug(slug);
  if (!match) return { title: "News" };

  return {
    title: match.title,
    description: match.excerpt ?? `${match.title} — Chito-Ryu International news.`,
    alternates: localeAlternates(lang, `/news/${match.slug}`),
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} description={post.publishedAt} />
      <PlaceholderNotice source="Sanity" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: post.title,
          datePublished: post.publishedAt,
          ...(post.excerpt ? { description: post.excerpt } : {}),
        }}
      />
    </>
  );
}

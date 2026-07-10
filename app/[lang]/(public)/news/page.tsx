import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import type { Locale } from "@/lib/i18n/locales";
import { getNewsPosts } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from Chito-Ryu International.",
};

interface NewsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { lang } = await params;
  const posts = await getNewsPosts();

  return (
    <>
      <PageHeader title="News" />
      <ul className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-border border-b py-3">
            <Link
              href={`/${lang}/news/${post.slug}`}
              className="text-sm underline underline-offset-4"
            >
              {post.title}
            </Link>
            <span className="text-muted-foreground ml-2 text-xs">{post.publishedAt}</span>
          </li>
        ))}
      </ul>
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { mockNewsPosts } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from Chito-Ryu International.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader title="News" />
      <ul className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {mockNewsPosts.map((post) => (
          <li key={post.slug} className="border-border border-b py-3">
            <Link href={`/news/${post.slug}`} className="text-sm underline underline-offset-4">
              {post.title}
            </Link>
            <span className="text-muted-foreground ml-2 text-xs">{post.date}</span>
          </li>
        ))}
      </ul>
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

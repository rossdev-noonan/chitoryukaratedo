import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { mockNewsPosts } from "@/lib/mock-data";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = mockNewsPosts.find((p) => p.slug === slug);
  return { title: match?.title ?? "News" };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = mockNewsPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} description={post.date} />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

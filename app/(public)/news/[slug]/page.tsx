import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getNewsPostBySlug } from "@/lib/sanity/content";

interface NewsDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getNewsPostBySlug(slug);
  return { title: match?.title ?? "News" };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) notFound();

  return (
    <>
      <PageHeader title={post.title} description={post.publishedAt} />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

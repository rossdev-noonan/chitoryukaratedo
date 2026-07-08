import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getEventBySlug } from "@/lib/sanity/content";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getEventBySlug(slug);
  return { title: match?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  return (
    <>
      <PageHeader title={event.title} description={`${event.startDate} · ${event.location}`} />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

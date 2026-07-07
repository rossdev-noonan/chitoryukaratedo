import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { mockEvents } from "@/lib/mock-data";

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = mockEvents.find((e) => e.slug === slug);
  return { title: match?.title ?? "Event" };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = mockEvents.find((e) => e.slug === slug);

  if (!event) notFound();

  return (
    <>
      <PageHeader title={event.title} description={`${event.date} · ${event.location}`} />
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

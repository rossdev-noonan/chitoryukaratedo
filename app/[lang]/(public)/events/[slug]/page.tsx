import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/public/JsonLd";
import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";
import { getEventBySlug } from "@/lib/sanity/content";

interface EventDetailPageProps {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const match = await getEventBySlug(slug);
  if (!match) return { title: "Event" };

  return {
    title: match.title,
    description: match.location
      ? `${match.title} — ${match.location}, ${match.startDate}.`
      : `${match.title} — ${match.startDate}.`,
    alternates: localeAlternates(lang, `/events/${match.slug}`),
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) notFound();

  const subtitle = [event.startDate, event.location].filter(Boolean).join(" · ");

  return (
    <>
      <PageHeader title={event.title} description={subtitle || undefined} />
      <PlaceholderNotice source="Sanity" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: event.title,
          startDate: event.startDate,
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          eventStatus: "https://schema.org/EventScheduled",
          location: event.location
            ? { "@type": "Place", name: event.location }
            : { "@type": "VirtualLocation", url: process.env.NEXT_PUBLIC_SITE_URL },
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import type { Locale } from "@/lib/i18n/locales";
import { getEvents } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Chito-Ryu seminars, the Soke Cup, and travel schedule.",
};

interface EventsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { lang } = await params;
  const events = await getEvents();

  return (
    <>
      <PageHeader title="Events" />
      <ul className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {events.map((event) => (
          <li key={event.slug} className="border-border border-b py-3">
            <Link
              href={`/${lang}/events/${event.slug}`}
              className="text-sm underline underline-offset-4"
            >
              {event.title}
            </Link>
            <span className="text-muted-foreground ml-2 text-xs">
              {event.startDate} · {event.location}
            </span>
          </li>
        ))}
      </ul>
      <PlaceholderNotice source="Sanity" />
    </>
  );
}

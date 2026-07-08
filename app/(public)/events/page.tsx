import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getEvents } from "@/lib/sanity/content";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Chito-Ryu seminars, the Soke Cup, and travel schedule.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader title="Events" />
      <ul className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {events.map((event) => (
          <li key={event.slug} className="border-border border-b py-3">
            <Link href={`/events/${event.slug}`} className="text-sm underline underline-offset-4">
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

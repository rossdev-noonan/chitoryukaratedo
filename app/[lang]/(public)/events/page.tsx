import type { Metadata } from "next";

import { EventsFeatured } from "@/components/public/events/EventsFeatured";
import { EventsFilters } from "@/components/public/events/EventsFilters";
import { EventsHero } from "@/components/public/events/EventsHero";
import { EventsUpcoming } from "@/components/public/events/EventsUpcoming";
import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Chito-Ryu seminars, the Soke Cup, and travel schedule.",
};

interface EventsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function EventsPage({ params }: EventsPageProps) {
  const { lang } = await params;

  return (
    <>
      <EventsHero />
      <EventsFilters />
      <EventsFeatured lang={lang} />
      <EventsUpcoming lang={lang} />
      <div className="mt-4 xl:mt-8">
        <GlobalCommunityCTA lang={lang} />
      </div>
      <div className="h-16 xl:h-20" aria-hidden />
    </>
  );
}

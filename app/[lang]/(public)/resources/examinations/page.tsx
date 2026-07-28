import type { Metadata } from "next";

import { ExaminationsBrowser } from "@/components/public/ExaminationsBrowser";
import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import { getPublicUpcomingEvents } from "@/lib/events";
import type { Locale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Grading & Examinations",
  description:
    "How rank progresses in Chito Ryu: from first kyu grading to senior dan examination and how to prepare for yours.",
};

interface ExaminationsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function ExaminationsPage({ params }: ExaminationsPageProps) {
  const [{ lang }, upcomingEvents] = await Promise.all([params, getPublicUpcomingEvents()]);

  // Figma's mockup shows two "Dan Grading" example dates — prefer real
  // upcoming grading-tagged events over fabricating rows that don't exist in
  // Supabase, per this project's real-data-only policy. Falls back to the
  // next couple of upcoming events generally if none are tagged that way, so
  // the section still has something useful rather than looking broken.
  const gradingEvents = upcomingEvents.filter((event) =>
    event.tag.toLowerCase().includes("grading"),
  );
  const upcomingExamEvents = (gradingEvents.length > 0 ? gradingEvents : upcomingEvents).slice(
    0,
    3,
  );

  return (
    <>
      <ExaminationsBrowser lang={lang} upcomingExamEvents={upcomingExamEvents} />
      <GlobalCommunityCTA lang={lang} />
      <div className="h-16 xl:h-20" aria-hidden />
    </>
  );
}

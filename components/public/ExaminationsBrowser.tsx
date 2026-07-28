"use client";

import { ArrowRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { EventCard } from "@/components/public/events/EventsUpcoming";
import {
  examinationsBeltProgression,
  examinationsFaq,
  examinationsHowToApplySteps,
  examinationsRequirements,
  examinationsSidebarItems,
} from "@/lib/examinations-content";
import type { EventsUpcomingEvent } from "@/lib/events-content";
import type { Locale } from "@/lib/i18n/locales";

interface ExaminationsBrowserProps {
  lang: Locale;
  upcomingExamEvents: EventsUpcomingEvent[];
}

function KanjiBadge({ kanji }: { kanji: string }) {
  return (
    <span
      className="bg-brand-accent flex size-9 shrink-0 items-center justify-center rounded-full text-base text-white"
      aria-hidden="true"
    >
      {kanji}
    </span>
  );
}

export function ExaminationsBrowser({ lang, upcomingExamEvents }: ExaminationsBrowserProps) {
  const [activeSectionId, setActiveSectionId] = useState(examinationsSidebarItems[0]!.id);
  const [openRequirementIndex, setOpenRequirementIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const sectionRefs = useRef(new Map<string, HTMLElement>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveSectionId(visibleEntry.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const section of sectionRefs.current.values()) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  // Same click pattern as HistoryMilestonesSidebar / DownloadsBrowser: update
  // the active state immediately on click rather than waiting for the
  // IntersectionObserver to catch up once the smooth scroll settles.
  function handleSectionClick(event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) {
    event.preventDefault();
    sectionRefs.current.get(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${sectionId}`);
    setActiveSectionId(sectionId);
  }

  function registerSection(id: string, element: HTMLElement | null) {
    if (element) sectionRefs.current.set(id, element);
    else sectionRefs.current.delete(id);
  }

  return (
    <section className="pt-6 pb-16 md:pt-8 md:pb-20 xl:pt-10 xl:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:gap-8 md:px-8 xl:px-0">
        <nav
          aria-label="Breadcrumb"
          className="public-hero-breadcrumb flex flex-wrap items-center gap-1 text-[#706963]"
        >
          <Link href={`/${lang}/resources`} className="hover:text-primary-dark">
            Resources
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary-dark font-semibold">Examinations</span>
        </nav>

        <header className="flex flex-col gap-3">
          <h1 className="font-heading text-foreground text-[28px] leading-[1.2] font-medium md:text-[40px]">
            Grading &amp; Examinations
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-[1.5] xl:text-base">
            How rank progresses in Chito Ryu: from first kyu grading to senior dan examination and
            how to prepare for yours.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <a
              href="#upcoming-exams"
              onClick={(event) => handleSectionClick(event, "upcoming-exams")}
              className="bg-primary-dark rounded-[4px] px-7 py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              View Upcoming Exam Dates →
            </a>
            <Link
              href={`/${lang}/resources/downloads`}
              className="border-brand-accent text-brand-accent rounded-[4px] border px-7 py-3.5 text-center text-sm font-semibold transition-colors hover:bg-black/[0.02]"
            >
              Download Grading Syllabus
            </Link>
          </div>
        </header>

        <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-10">
          {/* Sidebar — sticky under the header, same persistent-nav pattern as
              HistoryMilestonesSidebar / DownloadsBrowser's desktop sidebar.
              Figma has no mobile variant for this nav — sections just flow
              linearly below the hero on small screens. */}
          <div className="bg-secondary-background sticky top-20 hidden w-[180px] shrink-0 flex-col gap-3 p-5 md:flex xl:w-[220px]">
            <p className="text-foreground text-[11px] font-bold uppercase">On This Page</p>
            <div className="flex flex-col gap-1 border-l border-[#d8cba8]">
              {examinationsSidebarItems.map((item) => {
                const isActive = activeSectionId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => handleSectionClick(event, item.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`py-2 pr-2 pl-4 text-sm transition-colors ${
                      isActive
                        ? "border-primary-dark text-primary-dark -ml-px border-l-2 font-semibold"
                        : "text-[#7a7370] hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-16">
            {/* Rank Overview */}
            <section
              id="rank-overview"
              ref={(element) => registerSection("rank-overview", element)}
              className="scroll-mt-24 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <KanjiBadge kanji="級" />
                <h2 className="font-heading text-foreground text-xl md:text-2xl">Rank Overview</h2>
              </div>
              <p className="text-muted-foreground text-[15px] leading-[1.6]">
                Chito Ryu rank progresses through two stages: <b className="text-foreground">kyu grades</b>{" "}
                for students working toward black belt, and <b className="text-foreground">dan grades</b>{" "}
                for black belt holders advancing within the system. Each grading tests kata, kihon
                (fundamentals), and kumite appropriate to that level.
              </p>
              <div className="divide-y divide-[#ebe1d0] overflow-hidden rounded-lg border border-[#d8cba8]">
                {examinationsBeltProgression.map((row) => (
                  <div
                    key={row.rankLabel}
                    className="flex flex-col gap-2 bg-white p-5 sm:flex-row sm:items-center sm:gap-8"
                  >
                    <div className="flex shrink-0 items-center gap-4 sm:w-[220px]">
                      <span
                        className={`h-3.5 w-16 shrink-0 rounded-full border-[1.5px] ${row.beltPillClassName}`}
                        aria-hidden="true"
                      />
                      <p className="text-foreground text-[15px] font-bold whitespace-nowrap">
                        {row.rankLabel}
                      </p>
                    </div>
                    <p className="text-muted-foreground flex-1 text-sm leading-[1.5]">
                      {row.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section
              id="requirements"
              ref={(element) => registerSection("requirements", element)}
              className="scroll-mt-24 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <KanjiBadge kanji="要" />
                <h2 className="font-heading text-foreground text-xl md:text-2xl">
                  Requirements by Rank
                </h2>
              </div>
              <p className="text-muted-foreground text-[15px] leading-[1.6]">
                Minimum training time and prerequisites vary by rank. Expand a category below for
                details.
              </p>
              <div className="flex flex-col gap-px">
                {examinationsRequirements.map((item, index) => {
                  const isOpen = openRequirementIndex === index;
                  return (
                    <div key={item.title} className="border border-[#e5dccb]">
                      <button
                        type="button"
                        onClick={() => setOpenRequirementIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                      >
                        <span className="text-foreground text-base font-bold">{item.title}</span>
                        {isOpen ? (
                          <Minus className="text-primary-dark h-4 w-4 shrink-0" />
                        ) : (
                          <Plus className="text-primary-dark h-4 w-4 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="flex flex-col gap-4 px-5 pb-6 pl-7 text-sm">
                          {item.intro && (
                            <p className="text-[#706963] font-semibold">{item.intro}</p>
                          )}
                          <ul className="flex flex-col gap-2.5">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="text-muted-foreground flex gap-3">
                                <span className="text-primary-dark" aria-hidden="true">
                                  •
                                </span>
                                <span className="flex-1 leading-[1.5]">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* How to Apply */}
            <section
              id="how-to-apply"
              ref={(element) => registerSection("how-to-apply", element)}
              className="scroll-mt-24 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <KanjiBadge kanji="申" />
                  <h2 className="font-heading text-foreground text-xl md:text-2xl">
                    How to Apply
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm leading-[1.5]">
                  Grading applications are submitted through your head instructor, not directly to
                  the federation.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {examinationsHowToApplySteps.map((step) => (
                  <div key={step.number} className="bg-secondary-background flex flex-col gap-4 p-6">
                    <span className="text-brand-accent text-xs font-bold">{step.number}</span>
                    <p className="font-heading text-foreground text-base font-bold">{step.title}</p>
                    <p className="text-muted-foreground text-[13px] leading-[1.5]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Syllabus banner */}
            <div className="flex flex-col gap-5 bg-[#2c353f] p-8 sm:p-10">
              <div className="flex flex-col gap-2.5">
                <p className="text-lg font-bold text-white">Need the full syllabus first?</p>
                <p className="text-sm leading-[1.5] text-[#d1d6e0]">
                  Download the <span className="font-semibold">official grading syllabus</span> for
                  your rank before applying.
                </p>
              </div>
              <Link
                href={`/${lang}/resources/downloads`}
                className="bg-brand-accent inline-flex w-fit items-center rounded-[4px] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Go to Downloads →
              </Link>
            </div>

            {/* Upcoming Exam Dates */}
            <section
              id="upcoming-exams"
              ref={(element) => registerSection("upcoming-exams", element)}
              className="scroll-mt-24 flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <KanjiBadge kanji="日" />
                  <h2 className="font-heading text-foreground text-xl md:text-2xl">
                    Upcoming Exam Dates
                  </h2>
                </div>
                <p className="text-muted-foreground text-sm leading-[1.5]">
                  Gradings scheduled across the federation. National and dojo-level dates may vary
                  — confirm with your instructor.
                </p>
              </div>
              {upcomingExamEvents.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {upcomingExamEvents.map((event) => (
                    <Link key={event.slug} href={`/${lang}/events/${event.slug}`}>
                      <EventCard
                        month={event.month}
                        day={event.day}
                        title={event.title}
                        location={event.location}
                        tag={event.tag}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground border border-dashed border-[#d1d5db] bg-white px-6 py-8 text-center text-sm">
                  No exam dates are scheduled right now — check the Events page for what&apos;s
                  coming up.
                </p>
              )}
              <Link
                href={`/${lang}/events`}
                className="text-primary-dark inline-flex w-fit items-center gap-2 text-sm font-bold hover:underline"
              >
                View All Events
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>

            {/* FAQ */}
            <section
              id="faq"
              ref={(element) => registerSection("faq", element)}
              className="scroll-mt-24 flex flex-col gap-6"
            >
              <div className="flex items-center gap-4">
                <KanjiBadge kanji="問" />
                <h2 className="font-heading text-foreground text-xl md:text-2xl">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="flex flex-col">
                {examinationsFaq.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={item.question} className="border-b border-[#e5dccb] py-5">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 text-left"
                      >
                        <span className="text-foreground text-[15px] font-semibold">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <Minus className="text-brand-accent h-4 w-4 shrink-0" />
                        ) : (
                          <Plus className="text-brand-accent h-4 w-4 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <p className="text-muted-foreground mt-4 text-sm leading-[1.6]">
                          {item.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

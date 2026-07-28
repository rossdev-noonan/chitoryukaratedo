// Static content matching Gil's Figma Examinations page design (node
// 750:8133 desktop / 759:1074 mobile / 762:1098 tablet), hardcoded until
// Sanity is provisioned — same pattern as lib/downloads-content.ts and
// lib/events-content.ts.

export interface ExaminationsSidebarItem {
  id: string;
  label: string;
}

export const examinationsSidebarItems: ExaminationsSidebarItem[] = [
  { id: "rank-overview", label: "Rank Overview" },
  { id: "requirements", label: "Requirements" },
  { id: "how-to-apply", label: "How to Apply" },
  { id: "upcoming-exams", label: "Upcoming Exams" },
  { id: "faq", label: "FAQ" },
];

export interface BeltProgressionRow {
  rankLabel: string;
  description: string;
  beltPillClassName: string;
}

// beltPillClassName values trace directly to the hex Figma specifies per row
// (belt-pill fill + border) — kept as literal colors rather than forced onto
// an existing token, since none of these exactly match an established one
// except the primary-dark red row.
export const examinationsBeltProgression: BeltProgressionRow[] = [
  {
    rankLabel: "9th – 6th Kyu",
    description: "Foundational stances, basic kata, and fundamental strikes",
    beltPillClassName: "bg-[#eaddc9] border-[#d8cba8]",
  },
  {
    rankLabel: "5th – 3rd Kyu",
    description: "Intermediate kata, combination techniques, controlled kumite",
    beltPillClassName: "bg-brand-accent border-brand-accent",
  },
  {
    rankLabel: "2nd – 1st Kyu",
    description: "Advanced kata, pre-black belt readiness assessment",
    beltPillClassName: "bg-foreground border-foreground",
  },
  {
    rankLabel: "1st – 5th Dan",
    description: "Black belt — full syllabus, teaching ability assessed from 3rd Dan",
    beltPillClassName: "bg-primary-dark border-primary-dark",
  },
  {
    rankLabel: "6th Dan and above",
    description: "Senior grading by federation panel invitation only",
    beltPillClassName: "bg-brand-accent border-brand-accent",
  },
];

export interface RequirementsAccordionItem {
  title: string;
  intro?: string;
  bullets: string[];
}

// The 1st–5th Dan / 6th Dan items are collapsed-only in Figma with no
// expanded content given — their single bullet reuses the exact same
// description already shown for that rank band in the Rank Overview table
// above, rather than inventing new policy detail Gil hasn't specified.
export const examinationsRequirements: RequirementsAccordionItem[] = [
  {
    title: "Kyu Grading Requirements",
    intro: "Open to all active students in good standing with their dojo.",
    bullets: [
      "Minimum training period between grades, set by head instructor",
      "Demonstrated proficiency in the kata assigned to current level",
      "Instructor recommendation required",
    ],
  },
  {
    title: "1st – 5th Dan Requirements",
    bullets: ["Black belt — full syllabus, teaching ability assessed from 3rd Dan"],
  },
  {
    title: "6th Dan and Above",
    bullets: ["Senior grading by federation panel invitation only"],
  },
];

export interface HowToApplyStep {
  number: string;
  title: string;
  description: string;
}

export const examinationsHowToApplySteps: HowToApplyStep[] = [
  {
    number: "01",
    title: "Instructor Sign-Off",
    description: "Your instructor confirms you meet the training and time requirements for your next grade.",
  },
  {
    number: "02",
    title: "Submit Application",
    description: "Your dojo submits the grading application form on your behalf, with any required fee.",
  },
  {
    number: "03",
    title: "Attend Grading",
    description: "Grade at a scheduled dojo, national, or federation-level examination date.",
  },
  {
    number: "04",
    title: "Certificate Issued",
    description: "Upon passing, your new rank is recorded and a federation certificate is issued.",
  },
];

export interface ExaminationsFaqItem {
  question: string;
  answer: string;
}

export const examinationsFaq: ExaminationsFaqItem[] = [
  {
    question: "How often can I grade?",
    answer:
      "Minimum time between grades increases at higher ranks. Your instructor sets the pace based on your readiness, not a fixed calendar.",
  },
  {
    question: "What happens if I don't pass?",
    answer:
      "Your instructor will discuss what to work on and when you'll be ready to try again — grading is part of ongoing training, not a one-time pass or fail.",
  },
  {
    question: "Are gradings the same in every country?",
    answer:
      "The federation's rank framework and syllabus are standardized worldwide. Exam scheduling and local logistics are set by your country or dojo.",
  },
];

// The two upcoming exam dates Figma shows are real rows already in
// lib/events-content.ts (eventsUpcoming) — referenced by slug here rather
// than duplicated, so this stays in sync with the Events page.
export const examinationsUpcomingEventSlugs = ["canada-dan-grading", "australian-dan-grading"];

// Static content matching Gil's Figma Events page design (node 719:1523 /
// 725:998), hardcoded until Sanity is provisioned — same pattern as
// lib/homepage-content.ts. Isolated here so swapping this for live Sanity
// event queries later only means changing the functions that read this file.

export interface EventsFeaturedEvent {
  title: string;
  dateRangeLabel: string;
  month: string;
  day: string;
  addressLine1: string;
  addressLine2: string;
  tagsDesktop: string[];
  tagsMobile: string[];
  posterSrc: {
    desktop: string;
    mobile: string;
  };
}

export const eventsFeaturedEvent: EventsFeaturedEvent = {
  title: "15th Chito Ryu Karate Soke Cup",
  dateRangeLabel: "13th-15th August 2026",
  month: "AUG",
  day: "13",
  addressLine1: "Gold Coast Sport and Leisure Centre 296 Nerang Broadbeach Road,",
  addressLine2: "Gold Coast, Australia",
  tagsDesktop: [
    "International Meeting",
    "Opening/Closing Ceremony",
    "Competition",
    "Dan Gradings",
    "International Clinic",
    "After Party",
  ],
  tagsMobile: ["International Meeting", "Ceremony", "Competition"],
  posterSrc: {
    desktop: "/images/events/featured-poster-desktop.png",
    mobile: "/images/events/featured-poster-mobile.png",
  },
};

export interface EventsUpcomingEvent {
  slug: string;
  title: string;
  location: string;
  tag: string;
  month: string;
  day: string;
  monthGroupId: string;
  monthGroupLabel: string;
  showOnMobile: boolean;
}

export const eventsUpcoming: EventsUpcomingEvent[] = [
  {
    slug: "canada-dan-grading",
    title: "Canada Dan Grading",
    location: "Ontario, Canada",
    tag: "Dan Grading",
    month: "SEP",
    day: "15",
    monthGroupId: "month-sep-2026",
    monthGroupLabel: "SEPTEMBER 2026",
    showOnMobile: true,
  },
  {
    slug: "japan-dojo-visit",
    title: "Japan Dojo Visit",
    location: "Kumamoto, Japan",
    tag: "Dojo Visit",
    month: "OCT",
    day: "16",
    monthGroupId: "month-oct-2026",
    monthGroupLabel: "OCTOBER 2026",
    showOnMobile: true,
  },
  {
    slug: "australian-dan-grading",
    title: "Australian Dan Grading",
    location: "Sydney, Australia",
    tag: "Dan Grading",
    month: "NOV",
    day: "17",
    monthGroupId: "month-nov-2026",
    monthGroupLabel: "NOVEMBER 2026",
    showOnMobile: true,
  },
  {
    slug: "european-instructors-seminar",
    title: "European Instructors Seminar",
    location: "Glasgow, Scotland",
    tag: "Seminar",
    month: "NOV",
    day: "28",
    monthGroupId: "month-nov-2026",
    monthGroupLabel: "NOVEMBER 2026",
    showOnMobile: false,
  },
];

export interface EventsMonthOption {
  id: string;
  label: string;
}

// Desktop sidebar and mobile chip selector list slightly different month
// ranges in Figma (desktop: Sep-Nov, mobile: Sep-Dec) — kept literal per
// breakpoint rather than unified, matching each frame exactly.
export const eventsMonthsDesktop: EventsMonthOption[] = [
  { id: "month-sep-2026", label: "SEP 2026" },
  { id: "month-oct-2026", label: "OCT 2026" },
  { id: "month-nov-2026", label: "NOV 2026" },
];

export const eventsMonthsMobile: EventsMonthOption[] = [
  { id: "month-sep-2026", label: "SEP 2026" },
  { id: "month-oct-2026", label: "OCT 2026" },
  { id: "month-nov-2026", label: "NOV 2026" },
  { id: "month-dec-2026", label: "DEC 2026" },
];

export const eventsFilterChipsDesktop = [
  "All Events",
  "Dan Gradings",
  "Seminars",
  "Competitions",
  "Dojo Visits",
];

export const eventsFilterChipsMobile = ["All Events", "Dan Gradings", "Seminars", "Competitions"];

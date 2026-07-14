import type { Dictionary } from "@/lib/i18n/types";

export interface NavItem {
  href: string;
  label: string;
}

export interface NavGroup {
  label: string;
  children: NavItem[];
}

export type NavEntry = { type: "link"; href: string; label: string } | ({ type: "group" } & NavGroup);

// Grouped per Gil's 2026-07-14 Figma dropdown mockups (About/Community/News &
// Events/Resources dropdowns spelled out explicitly above the header frame) —
// supersedes the earlier guess at what "Community" and "Resources" contained.
export function getPrimaryNavGroups(dictionary: Dictionary): NavEntry[] {
  return [
    {
      type: "group",
      label: dictionary.nav.about,
      children: [
        { href: "/about", label: dictionary.nav.about },
        { href: "/history", label: dictionary.nav.history },
        { href: "/leadership", label: dictionary.nav.leadership },
      ],
    },
    {
      type: "group",
      label: dictionary.nav.community,
      children: [
        { href: "/dojo-directory", label: dictionary.nav.dojoDirectory },
        { href: "/teachers", label: dictionary.nav.teachers },
      ],
    },
    {
      type: "group",
      label: dictionary.nav.newsEventsGroup,
      children: [
        { href: "/news", label: dictionary.nav.news },
        { href: "/events", label: dictionary.nav.events },
      ],
    },
    {
      type: "group",
      label: dictionary.nav.resources,
      children: [
        { href: "/resources/downloads", label: dictionary.footer.downloads },
        { href: "/resources", label: dictionary.footer.examinations },
        { href: "/resources", label: dictionary.footer.technicalDocuments },
        { href: "/resources", label: dictionary.footer.rulesAndGuidelines },
      ],
    },
    { type: "link", href: "/contact", label: dictionary.nav.contact },
  ];
}

export function getFooterLegalItems(dictionary: Dictionary): NavItem[] {
  return [
    { href: "/privacy", label: dictionary.footer.privacy },
    { href: "/terms", label: dictionary.footer.terms },
  ];
}

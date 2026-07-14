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

// Grouped into 6 top-level entries per Gil's 2026-07-14 Figma header —
// accepting the grouping proposal sent 2026-07-13 (see handover-to-gil.md).
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
    { type: "link", href: "/teachers", label: dictionary.nav.community },
    { type: "link", href: "/dojo-directory", label: dictionary.nav.dojoDirectory },
    {
      type: "group",
      label: dictionary.nav.newsEventsGroup,
      children: [
        { href: "/news", label: dictionary.nav.news },
        { href: "/events", label: dictionary.nav.events },
      ],
    },
    { type: "link", href: "/resources", label: dictionary.nav.resources },
    { type: "link", href: "/contact", label: dictionary.nav.contact },
  ];
}

export function getFooterLegalItems(dictionary: Dictionary): NavItem[] {
  return [
    { href: "/privacy", label: dictionary.footer.privacy },
    { href: "/terms", label: dictionary.footer.terms },
  ];
}

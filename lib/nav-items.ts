import type { Dictionary } from "@/lib/i18n/types";

export interface NavItem {
  href: string;
  label: string;
}

export function getPrimaryNavItems(dictionary: Dictionary): NavItem[] {
  return [
    { href: "/about", label: dictionary.nav.about },
    { href: "/history", label: dictionary.nav.history },
    { href: "/leadership", label: dictionary.nav.leadership },
    { href: "/dojo-directory", label: dictionary.nav.dojoDirectory },
    { href: "/teachers", label: dictionary.nav.teachers },
    { href: "/news", label: dictionary.nav.news },
    { href: "/events", label: dictionary.nav.events },
    { href: "/resources", label: dictionary.nav.resources },
    { href: "/contact", label: dictionary.nav.contact },
  ];
}

export function getFooterLegalItems(dictionary: Dictionary): NavItem[] {
  return [
    { href: "/privacy", label: dictionary.footer.privacy },
    { href: "/terms", label: dictionary.footer.terms },
  ];
}

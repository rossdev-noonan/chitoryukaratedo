export interface NavItem {
  href: string;
  label: string;
}

export const primaryNavItems: NavItem[] = [
  { href: "/about", label: "About" },
  { href: "/history", label: "History" },
  { href: "/leadership", label: "Leadership" },
  { href: "/dojo-directory", label: "Dojo Directory" },
  { href: "/teachers", label: "Teachers" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export const footerLegalItems: NavItem[] = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

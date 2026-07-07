export interface AdminNavItem {
  href: string;
  label: string;
}

export const adminNavItems: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/dojos", label: "Dojos" },
  { href: "/admin/teachers", label: "Teachers" },
  { href: "/admin/approvals", label: "Approvals" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/resources", label: "Resources" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

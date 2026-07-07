import Link from "next/link";

import { adminNavItems } from "@/lib/admin-nav-items";

export function AdminSidebar() {
  return (
    <nav aria-label="Admin" className="border-border w-40 shrink-0 border-r p-4 text-sm">
      <ul className="flex flex-col gap-2">
        {adminNavItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-muted-foreground hover:text-foreground">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

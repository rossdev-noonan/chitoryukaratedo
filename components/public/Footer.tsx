import Link from "next/link";

import { footerLegalItems } from "@/lib/nav-items";

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} Chito-Ryu International / ICKF</p>

        <nav aria-label="Legal and administrative" className="flex items-center gap-4">
          {footerLegalItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/login" className="hover:text-foreground">
            Admin
          </Link>
        </nav>
      </div>
    </footer>
  );
}

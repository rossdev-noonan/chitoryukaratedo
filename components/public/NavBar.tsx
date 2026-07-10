"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { primaryNavItems } from "@/lib/nav-items";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/chito-ryu-logo.svg"
            alt="Chito-Ryu International"
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <span className="font-heading leading-tight">
            <span className="text-muted-foreground block text-xs">千唐流国際</span>
            <span className="text-foreground block text-sm font-semibold">
              Chito Ryu International
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-primary text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-primary text-primary-foreground hidden rounded-md px-6 py-2.5 text-sm font-bold transition-opacity hover:opacity-90 lg:inline-block"
          >
            Join Us
          </Link>

          <button
            type="button"
            className="text-foreground lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-border flex flex-col gap-1 border-t px-4 py-3 lg:hidden"
        >
          {primaryNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-foreground/80 hover:text-primary py-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="bg-primary text-primary-foreground mt-2 rounded-md px-6 py-2.5 text-center text-sm font-bold"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Us
          </Link>
        </nav>
      )}
    </header>
  );
}

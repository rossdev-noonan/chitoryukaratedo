"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { LanguagePicker } from "@/components/public/LanguagePicker";
import { NavDropdown } from "@/components/public/NavDropdown";
import type { Locale } from "@/lib/i18n/locales";
import type { Dictionary } from "@/lib/i18n/types";
import { getPrimaryNavGroups } from "@/lib/nav-items";

interface NavBarProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function NavBar({ lang, dictionary }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navGroups = getPrimaryNavGroups(dictionary);

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
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-2.5 sm:px-6 lg:h-20 lg:px-10">
        <Link href={`/${lang}`} className="flex items-center gap-3">
          <Image
            src="/brand/chito-ryu-logo.svg"
            alt="Chito-Ryu International"
            width={48}
            height={48}
            className="h-12 w-12 lg:h-10 lg:w-10"
          />
          <span className="font-heading leading-tight">
            <span className="text-muted-foreground block text-sm lg:text-xs">千唐流国際</span>
            <span className="text-primary block text-[10px] font-bold tracking-wide uppercase sm:hidden">
              Chito Ryu
            </span>
            <span className="text-foreground hidden text-sm font-semibold sm:block">
              Chito Ryu International
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navGroups.map((entry) =>
            entry.type === "group" ? (
              <NavDropdown key={entry.label} lang={lang} group={entry} />
            ) : (
              <Link
                key={entry.href}
                href={`/${lang}${entry.href}`}
                className="text-foreground/80 hover:text-primary after:bg-brand-accent relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4">
          <LanguagePicker lang={lang} dictionary={dictionary} />

          <Link
            href={`/${lang}/login`}
            className="bg-primary text-primary-foreground px-5 py-3 text-sm font-bold whitespace-nowrap transition-opacity hover:opacity-90 sm:px-6 sm:py-2.5"
          >
            {dictionary.nav.joinUs}
          </Link>

          <button
            type="button"
            className="text-foreground lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">
              {isMenuOpen ? dictionary.nav.closeMenu : dictionary.nav.openMenu}
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-border flex flex-col gap-1 border-t px-4 py-3 lg:hidden"
        >
          {navGroups.map((entry) =>
            entry.type === "group" ? (
              <div key={entry.label} className="border-border/60 border-b py-1 last:border-b-0">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileGroup((open) => (open === entry.label ? null : entry.label))
                  }
                  aria-expanded={openMobileGroup === entry.label}
                  className="text-foreground/80 flex w-full items-center justify-between py-2 text-sm font-medium"
                >
                  {entry.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openMobileGroup === entry.label ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openMobileGroup === entry.label && (
                  <div className="flex flex-col gap-1 pb-2 pl-4">
                    {entry.children.map((item) => (
                      <Link
                        key={item.label}
                        href={`/${lang}${item.href}`}
                        className="text-foreground/70 hover:text-primary py-1.5 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={entry.href}
                href={`/${lang}${entry.href}`}
                className="text-foreground/80 hover:text-primary py-2 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}

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
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 md:justify-start md:px-8 xl:justify-between xl:px-0">
        <Link
          href={`/${lang}`}
          className="flex shrink-0 items-center gap-3"
          aria-label="International Chito Ryu Karate Do Federation"
        >
          <span className="relative block h-[40px] w-[48px] shrink-0 sm:h-[72px] sm:w-[88px]">
            <Image
              src="/brand/chito-ryu-logo.svg"
              alt="Chito-Ryu International"
              fill
              sizes="(max-width: 639px) 48px, 88px"
              priority
              className="object-contain"
            />
          </span>

          <span className="flex min-w-0 flex-col items-start text-left font-sans leading-tight">
            <span className="text-foreground block whitespace-nowrap text-[10px] font-semibold tracking-[0.02em] sm:text-[14px] md:text-[11px] xl:text-[13px]">
              INTERNATIONAL CHITO RYU
            </span>

            <span className="text-foreground block whitespace-nowrap text-[10px] font-semibold tracking-[0.02em] sm:text-[14px] md:text-[11px] xl:text-[13px]">
              KARATE DO FEDERATION
            </span>

            {/* Sized proportionate to the English lines above, matching
              Gil's Figma ratio (mobile: same size as English; desktop: ~4:3
              larger — the Japanese line reads small next to full-size
              English otherwise). */}
            <span className="text-foreground mt-0.5 block whitespace-nowrap text-[10px] font-normal sm:text-[14px] md:text-[15px] xl:text-[17px]">
              國際千唐流空手道連盟
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-3 md:ml-[48px] md:flex xl:ml-0 xl:gap-6 md:[&>*:nth-child(3)]:hidden xl:[&>*:nth-child(3)]:flex"
          aria-label="Primary"
        >
          {navGroups.map((entry) =>
            entry.type === "group" ? (
              <NavDropdown key={entry.label} lang={lang} group={entry} />
            ) : (
              <Link
                key={entry.href}
                href={`/${lang}${entry.href}`}
                className="text-foreground/80 hover:text-primary after:bg-brand-accent-light relative text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3 md:ml-3 xl:ml-0 xl:gap-4">
          <div className="order-2">
            <LanguagePicker lang={lang} dictionary={dictionary} />
          </div>

          <Link
            href={`/${lang}/login`}
            className="bg-primary-dark text-primary-foreground hover:bg-primary order-1 inline-block px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors md:px-6"
          >
            <span className="xl:hidden">Join</span>
            <span className="hidden xl:inline">{dictionary.nav.joinUs}</span>
          </Link>

          <button
            type="button"
            className="text-foreground order-3 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}

            <span className="sr-only">
              {isMenuOpen
                ? dictionary.nav.closeMenu
                : dictionary.nav.openMenu}
            </span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-border flex flex-col gap-1 border-t px-4 py-3 md:hidden"
        >
          {navGroups.map((entry) =>
            entry.type === "group" ? (
              <div
                key={entry.label}
                className="border-border/60 border-b py-1 last:border-b-0"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileGroup((open) =>
                      open === entry.label ? null : entry.label,
                    )
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

          <Link
            href={`/${lang}/login`}
            className="bg-primary-dark text-primary-foreground hover:bg-primary mt-2 px-6 py-3 text-center text-sm font-bold transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {dictionary.nav.joinUs}
          </Link>
        </nav>
      )}
    </header>
  );
}
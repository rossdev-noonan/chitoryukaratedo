"use client";

import { Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/lib/i18n/types";
import { locales, localeNames, type Locale } from "@/lib/i18n/locales";

interface LanguagePickerProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function LanguagePicker({ lang, dictionary }: LanguagePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  const segments = pathname.split("/");
  segments[1] = "__LOCALE__";
  const pathTemplate = segments.join("/");

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative" onMouseEnter={() => setIsOpen(true)}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="text-foreground/80 hover:text-primary flex items-center"
      >
        <Globe className="h-5 w-5" />
        <span className="sr-only">{dictionary.nav.language}</span>
      </button>

      {isOpen && (
        <ul
          role="menu"
          aria-label={dictionary.nav.language}
          className="border-border bg-background absolute top-full right-0 z-50 mt-2 w-40 border shadow-sm"
        >
          {locales.map((locale) => (
            <li key={locale} role="none">
              <Link
                role="menuitem"
                href={pathTemplate.replace("__LOCALE__", locale)}
                onClick={() => setIsOpen(false)}
                aria-current={locale === lang ? "true" : undefined}
                className={`block px-4 py-2 text-sm ${
                  locale === lang
                    ? "bg-muted text-foreground font-semibold"
                    : "text-foreground/80 hover:bg-muted"
                }`}
              >
                {localeNames[locale]}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

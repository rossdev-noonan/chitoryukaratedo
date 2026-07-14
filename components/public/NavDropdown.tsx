"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { NavGroup } from "@/lib/nav-items";
import type { Locale } from "@/lib/i18n/locales";

interface NavDropdownProps {
  lang: Locale;
  group: NavGroup;
}

export function NavDropdown({ lang, group }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="text-foreground/80 hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
      >
        {group.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <ul
          role="menu"
          aria-label={group.label}
          className="border-border bg-background absolute top-full left-0 z-50 mt-2 w-56 border shadow-sm"
        >
          {group.children.map((item) => (
            <li key={item.href} role="none">
              <Link
                role="menuitem"
                href={`/${lang}${item.href}`}
                onClick={() => setIsOpen(false)}
                className="text-foreground/80 hover:bg-muted hover:text-primary block px-4 py-2.5 text-sm"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

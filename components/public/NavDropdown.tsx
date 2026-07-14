"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { NavGroup } from "@/lib/nav-items";
import type { Locale } from "@/lib/i18n/locales";

interface NavDropdownProps {
  lang: Locale;
  group: NavGroup;
}

export function NavDropdown({ lang, group }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openMenu = useCallback(() => {
    clearCloseTimer();
    setIsOpen(true);
  }, [clearCloseTimer]);

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    setIsOpen(false);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setIsOpen(false), 180);
  }, [clearCloseTimer]);

  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeMenu, isOpen]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerEnter={openMenu}
      onPointerMove={() => {
        if (!isOpen) openMenu();
      }}
      onPointerLeave={scheduleClose}
    >
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        onFocus={openMenu}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
          }
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="text-foreground/80 hover:text-primary after:bg-brand-accent relative flex items-center gap-1 text-sm font-medium transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:after:scale-x-100"
      >
        {group.label}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 z-50 w-56 pt-2"
          onPointerEnter={openMenu}
          onPointerLeave={scheduleClose}
        >
          <ul
            role="menu"
            aria-label={group.label}
            className="border-border bg-background w-full border shadow-sm"
          >
            {group.children.map((item) => (
              <li key={item.label} role="none">
                <Link
                  role="menuitem"
                  href={`/${lang}${item.href}`}
                  onClick={closeMenu}
                  className="text-foreground/80 hover:bg-muted hover:text-primary block px-4 py-2.5 text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

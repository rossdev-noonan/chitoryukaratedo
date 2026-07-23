"use client";

import { ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  getRankCategory,
  TeacherAvatar,
  TeacherCard,
  TeacherRankBadge,
  type TeacherRegistryEntry,
} from "@/components/public/TeacherCard";
import type { Locale } from "@/lib/i18n/locales";

interface TeacherRegistryProps {
  teachers: TeacherRegistryEntry[];
  lang: Locale;
  initialQuery?: string;
}

type RankFilter = "All" | "Hanshi" | "Kyoshi" | "Renshi";
type SortOrder = "name-asc" | "name-desc" | "country";
type ViewMode = "grid" | "list";

const rankFilters: RankFilter[] = ["All", "Hanshi", "Kyoshi", "Renshi"];

function searchableValue(teacher: TeacherRegistryEntry) {
  return [teacher.nameNative, teacher.nameRomaji, teacher.dojoName, teacher.countryName]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
}

function TeacherProfileModal({
  teacher,
  lang,
  onClose,
}: {
  teacher: TeacherRegistryEntry;
  lang: Locale;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousActiveElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose]);

  const displayName = teacher.nameRomaji || teacher.nameNative || "This teacher";
  const contactHref = teacher.dojoEmail
    ? `mailto:${teacher.dojoEmail}`
    : teacher.dojoSlug
      ? `/${lang}/dojo/${teacher.dojoSlug}`
      : `/${lang}/dojo-directory`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 sm:p-6"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-profile-title"
        className="bg-background flex max-h-[calc(100dvh-2rem)] min-h-[580px] w-full max-w-[419px] flex-col overflow-hidden rounded-sm shadow-[0_8px_24px_rgba(0,0,0,0.11)] sm:min-h-[628px]"
      >
        <div className="bg-foreground relative flex flex-col items-start gap-4 px-6 py-7">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-[22px] right-[18px] rounded-full border border-white/80 p-0.5 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close teacher profile</span>
          </button>
          <TeacherAvatar teacher={teacher} size="modal" />
          <div className="w-full min-w-0">
            <h2
              id="teacher-profile-title"
              className="font-heading truncate text-2xl leading-normal font-bold text-[#c8a24a]"
            >
              {teacher.nameNative || displayName}
            </h2>
            <p className="text-background mt-1 truncate text-sm">{displayName}</p>
          </div>
        </div>

        <div className="bg-background flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-6">
          <div>
            <TeacherRankBadge rank={teacher.rank} />
          </div>
          <dl className="text-[13px] leading-normal">
            <div className="border-foreground/10 flex items-center justify-between gap-4 border-b py-2.5">
              <dt className="text-muted-foreground">Dojo</dt>
              <dd className="text-foreground text-right font-semibold">
                {teacher.dojoName || "Not provided"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-muted-foreground">Country</dt>
              <dd className="text-foreground text-right font-semibold">
                {teacher.countryName || "Not provided"}
              </dd>
            </div>
          </dl>
          <p className="text-muted-foreground text-[13px] leading-[19px]">
            {displayName} is an approved, rank-verified instructor in the International Chito-Ryu
            Karate-Do Federation.
          </p>
          <div className="flex-1" />
          <Link
            href={contactHref}
            className="bg-primary-dark hover:bg-primary flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-semibold text-white shadow-[0_4px_6px_rgba(163,39,31,0.2)] transition-colors"
          >
            Contact This Dojo →
          </Link>
        </div>
      </section>
    </div>
  );
}

export function TeacherRegistry({ teachers, lang, initialQuery = "" }: TeacherRegistryProps) {
  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery.trim());
  const [rank, setRank] = useState<RankFilter>("All");
  const [sortOrder, setSortOrder] = useState<SortOrder>("name-asc");
  const [view, setView] = useState<ViewMode>("grid");
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRegistryEntry | null>(null);

  const visibleTeachers = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase();
    const filtered = teachers.filter((teacher) => {
      const matchesQuery = !normalizedQuery || searchableValue(teacher).includes(normalizedQuery);
      const matchesRank = rank === "All" || getRankCategory(teacher.rank) === rank;
      return matchesQuery && matchesRank;
    });

    return [...filtered].sort((left, right) => {
      if (sortOrder === "country") {
        return (left.countryName || "").localeCompare(right.countryName || "");
      }
      const comparison = (left.nameRomaji || left.nameNative || "").localeCompare(
        right.nameRomaji || right.nameNative || "",
      );
      return sortOrder === "name-desc" ? -comparison : comparison;
    });
  }, [query, rank, sortOrder, teachers]);

  return (
    <>
      <section className="px-4 pt-6 pb-10 sm:px-6 md:px-8 md:pt-8 md:pb-12 xl:px-0 xl:pt-10 xl:pb-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 xl:gap-8">
          <nav
            aria-label="Breadcrumb"
            className="public-hero-breadcrumb flex flex-wrap items-center gap-1 text-[#6b7280] xl:gap-1.5"
          >
            <Link href={`/${lang}`} className="hover:text-primary-dark">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span>Community</span>
            <span aria-hidden="true">/</span>
            <span className="text-primary-dark font-medium">Teacher Registry</span>
          </nav>

          <header className="flex flex-col gap-2 xl:gap-3">
            <h1 className="font-heading text-foreground text-2xl leading-[1.2] font-medium md:text-[40px] md:font-semibold">
              Teacher Registry
            </h1>
            <p className="text-muted-foreground text-base leading-normal">
              Search, filter, and explore verified instructors across the federation.
            </p>
          </header>

          <form
            className="flex flex-col gap-3 md:flex-row md:gap-6 xl:gap-2.5"
            onSubmit={(event) => {
              event.preventDefault();
              setQuery(inputValue.trim());
            }}
          >
            <label className="flex h-[46px] min-w-0 flex-1 items-center gap-2.5 border border-[#e5e7eb] bg-white px-4 md:h-[41px] md:px-5 xl:h-[46px] xl:gap-3 xl:px-6">
              <Search className="h-4 w-4 shrink-0 text-[#6b7280]" aria-hidden="true" />
              <span className="sr-only">Search teachers</span>
              <input
                type="search"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Search by name, romaji, or dojo..."
                className="text-foreground min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#6b7280] xl:text-[15px]"
              />
            </label>
            <button
              type="submit"
              className="bg-primary-dark text-background hover:bg-primary h-12 rounded-sm px-8 text-sm font-bold transition-colors md:h-[41px] md:w-[150px] xl:h-12 xl:w-auto"
            >
              Search
            </button>
          </form>

          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-4">
            <span className="text-[11px] font-bold text-[#6b7280] md:text-xs xl:text-[13px]">
              RANK
            </span>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {rankFilters.map((filter) => {
                const active = rank === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setRank(filter)}
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors md:px-3.5 md:py-2 xl:px-4 xl:text-[13px] ${
                      active
                        ? "border-brand-accent bg-brand-accent font-semibold text-white"
                        : "bg-background text-muted-foreground border-[#e5e7eb] hover:border-[#d8cba8]"
                    }`}
                  >
                    {!active && filter !== "All" && (
                      <span
                        className="bg-brand-accent h-1.5 w-1.5 rounded-full"
                        aria-hidden="true"
                      />
                    )}
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-px w-full bg-[#e5e7eb]" />

          <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-muted-foreground text-sm font-medium">
              {visibleTeachers.length} {visibleTeachers.length === 1 ? "teacher" : "teachers"} found
            </p>
            <div className="flex w-full items-center gap-3 md:w-auto">
              <label className="relative flex h-8 min-w-0 flex-1 items-center md:w-auto md:flex-none">
                <span className="sr-only">Sort teachers</span>
                <select
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                  className="text-foreground focus-visible:ring-primary h-8 w-full appearance-none rounded-md border border-[#d1d5db] bg-white pr-8 pl-3 text-xs font-medium outline-none focus-visible:ring-2 md:w-auto xl:text-[13px]"
                >
                  <option value="name-asc">Sort: Name (A-Z)</option>
                  <option value="name-desc">Sort: Name (Z-A)</option>
                  <option value="country">Sort: Country</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 h-3 w-3" />
              </label>
              <div className="hidden overflow-hidden rounded-md border border-[#d1d5db] md:flex">
                {(["grid", "list"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={view === mode}
                    onClick={() => setView(mode)}
                    className={`px-3 py-2 text-xs capitalize ${
                      view === mode
                        ? "bg-foreground font-semibold text-white"
                        : "text-muted-foreground bg-white font-medium hover:bg-[#f9fafb]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {visibleTeachers.length > 0 ? (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
                  : "grid grid-cols-1 gap-4"
              }
            >
              {visibleTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  view={view}
                  onSelect={setSelectedTeacher}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-[#d1d5db] bg-white px-6 py-12 text-center">
              <p className="font-heading text-foreground text-lg font-semibold">
                No teachers found
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Try a different name, dojo, or rank filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {selectedTeacher && (
        <TeacherProfileModal
          teacher={selectedTeacher}
          lang={lang}
          onClose={() => setSelectedTeacher(null)}
        />
      )}
    </>
  );
}

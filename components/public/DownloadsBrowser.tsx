"use client";

import { Download, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { DownloadCategoryId, DownloadDocumentRow, DownloadDocumentType } from "@/lib/downloads";
import { downloadCategories } from "@/lib/downloads-content";
import type { Locale } from "@/lib/i18n/locales";

interface DownloadsBrowserProps {
  lang: Locale;
  documents: DownloadDocumentRow[];
}

const TYPE_BADGE_CLASSES: Record<DownloadDocumentType, string> = {
  PDF: "bg-[#8a2e2b]",
  DOC: "bg-foreground",
  XLS: "bg-[#2c6a43]",
};

function formatUpdatedLabel(isoDate: string) {
  const formatted = new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `Updated ${formatted}`;
}

export function DownloadsBrowser({ lang, documents }: DownloadsBrowserProps) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState(downloadCategories[0]!.id);
  const sectionRefs = useRef(new Map<string, HTMLElement>());

  const normalizedQuery = query.trim().toLocaleLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const categoriesWithDocuments = useMemo(
    () =>
      downloadCategories.map((category) => ({
        ...category,
        documents: documents.filter((document) => document.categoryId === category.id),
      })),
    [documents],
  );

  const visibleCategories = useMemo(() => {
    if (!isSearching) return categoriesWithDocuments;
    return categoriesWithDocuments
      .map((category) => ({
        ...category,
        documents: category.documents.filter((document) =>
          document.title.toLocaleLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((category) => category.documents.length > 0);
  }, [categoriesWithDocuments, isSearching, normalizedQuery]);

  useEffect(() => {
    if (isSearching) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) setActiveCategoryId(visibleEntry.target.id as DownloadCategoryId);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    for (const section of sectionRefs.current.values()) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [isSearching]);

  // Same click pattern as HistoryMilestonesSidebar: update the active state
  // immediately on click instead of waiting for the IntersectionObserver to
  // catch up once the smooth scroll settles.
  function handleCategoryClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    categoryId: DownloadCategoryId,
  ) {
    event.preventDefault();
    sectionRefs.current.get(categoryId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${categoryId}`);
    setActiveCategoryId(categoryId);
  }

  return (
    <section className="pt-6 pb-16 md:pt-8 md:pb-20 xl:pt-10 xl:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:gap-6 md:px-8 xl:gap-8 xl:px-0">
        <nav
          aria-label="Breadcrumb"
          className="public-hero-breadcrumb flex flex-wrap items-center gap-1 text-[#706963]"
        >
          <Link href={`/${lang}/resources`} className="hover:text-primary-dark">
            Resources
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-primary-dark font-semibold">Downloads</span>
        </nav>

        <header className="flex flex-col gap-3">
          <h1 className="font-heading text-foreground text-[20px] leading-[1.2] font-medium md:text-[28px] xl:text-[40px]">
            Federation Documents &amp; Forms
          </h1>
          <p className="text-muted-foreground max-w-2xl text-xs leading-[1.5] md:text-sm xl:text-base">
            Grading syllabi, technical guidelines, membership forms, and official federation
            documents — organized by category, available to all members.
          </p>
        </header>

        <form
          className="flex items-center gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setQuery(inputValue);
          }}
        >
          <label className="flex h-11 min-w-0 flex-1 items-center border border-[#e4dccf] bg-white px-4">
            <Search className="mr-2 h-4 w-4 shrink-0 text-[#706963]" aria-hidden="true" />
            <span className="sr-only">Search documents</span>
            <input
              type="search"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Search federation documents, forms & syllabi..."
              className="text-foreground min-w-0 flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#706963]"
            />
          </label>
          <button
            type="submit"
            className="h-11 shrink-0 bg-[#8d261e] px-6 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            Search
          </button>
        </form>

        {!isSearching && (
          <>
            {/* Mobile category chips (no counts) — sticky under the header, same
                persistent-nav pattern as AboutSectionNav / History's mobile bar,
                so the active section stays visible while scrolling. */}
            <div className="bg-secondary-background/95 sticky top-14 z-30 -mx-4 flex gap-2 overflow-x-auto px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 md:hidden">
              {categoriesWithDocuments.map((category) => {
                const isActive = activeCategoryId === category.id;
                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    onClick={(event) => handleCategoryClick(event, category.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-primary-dark text-white"
                        : "text-muted-foreground border border-[#e4dccf] bg-white font-normal"
                    }`}
                  >
                    {category.title}
                  </a>
                );
              })}
            </div>

            {/* Tablet category chips (with counts) — same sticky treatment */}
            <div className="bg-secondary-background/95 sticky top-20 z-30 -mx-8 hidden gap-2 overflow-x-auto px-8 py-3 backdrop-blur md:flex xl:hidden">
              {categoriesWithDocuments.map((category) => {
                const isActive = activeCategoryId === category.id;
                return (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    onClick={(event) => handleCategoryClick(event, category.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-primary-dark text-white"
                        : "text-muted-foreground border border-[#e4dccf] bg-white font-normal"
                    }`}
                  >
                    {category.title} ({category.documents.length})
                  </a>
                );
              })}
            </div>
          </>
        )}

        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-10">
          {/* Desktop sidebar — sticky under the header, same persistent-nav
              pattern as HistoryMilestonesSidebar, so it stays visible as the
              (much taller) document list scrolls past it. */}
          {!isSearching && (
            <div className="bg-secondary-background sticky top-20 hidden w-[260px] shrink-0 flex-col gap-3 p-5 xl:flex">
              <p className="text-foreground text-[11px] font-bold uppercase">Categories</p>
              <div className="flex flex-col gap-1 border-l border-[#d8cba8]">
                {categoriesWithDocuments.map((category) => {
                  const isActive = activeCategoryId === category.id;
                  return (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      onClick={(event) => handleCategoryClick(event, category.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`flex items-center justify-between py-2 pr-2 pl-4 transition-colors ${
                        isActive
                          ? "border-primary-dark text-primary-dark -ml-px border-l-2 font-semibold"
                          : "text-[#7a7370] hover:text-foreground"
                      }`}
                    >
                      <span className="text-sm">{category.title}</span>
                      <span className="text-[11px] font-medium">
                        {String(category.documents.length).padStart(2, "0")}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col gap-12">
            {visibleCategories.length === 0 ? (
              <div className="border border-dashed border-[#d1d5db] bg-white px-6 py-12 text-center">
                <p className="font-heading text-foreground text-lg font-semibold">
                  No documents found
                </p>
                <p className="text-muted-foreground mt-2 text-sm">
                  Try a different search term.
                </p>
              </div>
            ) : (
              visibleCategories.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(element) => {
                    if (element) sectionRefs.current.set(category.id, element);
                    else sectionRefs.current.delete(category.id);
                  }}
                  className="scroll-mt-36 md:scroll-mt-40 xl:scroll-mt-24"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#a68042] text-sm text-white"
                        aria-hidden="true"
                      >
                        {category.kanji}
                      </span>
                      <h2 className="font-heading text-foreground text-xl md:text-2xl">
                        {category.title}
                      </h2>
                    </div>
                    <p className="pl-11 text-[13px] text-[#7a7370]">{category.description}</p>
                  </div>

                  {category.documents.length === 0 ? (
                    <p className="text-muted-foreground mt-5 border border-dashed border-[#d1d5db] bg-white px-5 py-6 text-sm">
                      No documents in this category yet.
                    </p>
                  ) : (
                    <div className="mt-5 overflow-hidden rounded-lg border border-[#e8e2d9] bg-white">
                      {category.documents.map((document) => (
                        <div
                          key={document.id}
                          className="flex flex-col gap-3 border-b border-[#e8e2d9] p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:p-[18px]"
                        >
                          <div className="flex min-w-0 flex-1 items-center gap-4">
                            <span
                              className={`flex h-8 w-9 shrink-0 items-center justify-center rounded text-[10px] font-extrabold text-white ${TYPE_BADGE_CLASSES[document.fileType]}`}
                            >
                              {document.fileType}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="text-foreground truncate text-sm font-semibold">
                                {document.title}
                              </p>
                              <div className="mt-1 flex items-center gap-1.5 text-xs whitespace-nowrap text-[#7a7370]">
                                {document.fileSizeLabel && <span>{document.fileSizeLabel}</span>}
                                {document.fileSizeLabel && <span aria-hidden="true">•</span>}
                                <span>{formatUpdatedLabel(document.updatedAt)}</span>
                              </div>
                            </div>
                          </div>

                          {document.fileUrl ? (
                            <>
                              {/* Mobile: full-width button */}
                              <a
                                href={document.fileUrl}
                                download
                                className="flex w-full items-center justify-center gap-1.5 rounded-full border border-[#e8e2d9] px-4 py-2 text-xs font-semibold text-[#7a7370] sm:hidden"
                              >
                                <Download className="h-3 w-3" aria-hidden="true" />
                                Download Document
                              </a>

                              {/* Tablet/desktop: compact pill button */}
                              <a
                                href={document.fileUrl}
                                download
                                className="hidden shrink-0 items-center gap-1.5 rounded-full border border-[#e8e2d9] px-4 py-2 text-xs font-medium text-[#7a7370] sm:flex"
                              >
                                <Download className="h-3 w-3" aria-hidden="true" />
                                Download
                              </a>
                            </>
                          ) : (
                            <span
                              aria-disabled="true"
                              className="flex w-full shrink-0 cursor-not-allowed items-center justify-center gap-1.5 rounded-full border border-dashed border-[#e8e2d9] px-4 py-2 text-xs font-medium text-[#a39a92] sm:w-auto"
                            >
                              Coming Soon
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Category structure matching Gil's Figma Downloads page design (node
// 742:6263 desktop / 745:1203 mobile / 746:1220 tablet). Kanji/title/
// description are fixed structural labels from the design, not editorial
// content, so they stay in code — the documents within each category are
// real rows in the download_documents table (see lib/downloads.ts and
// supabase/migrations/0012_download_documents.sql).

import type { DownloadCategoryId } from "@/lib/downloads";

export interface DownloadCategoryMeta {
  id: DownloadCategoryId;
  kanji: string;
  title: string;
  description: string;
}

export const downloadCategories: DownloadCategoryMeta[] = [
  {
    id: "grading-syllabus",
    kanji: "級",
    title: "Grading Syllabus",
    description: "Official kata, kumite, and requirements for each rank, kyu through dan.",
  },
  {
    id: "membership-forms",
    kanji: "申",
    title: "Membership Forms",
    description: "Registration, dojo affiliation, and instructor certification paperwork.",
  },
  {
    id: "technical-documents",
    kanji: "技",
    title: "Technical Documents",
    description: "Reference material on kata, kihon, and official terminology.",
  },
  {
    id: "rules-guidelines",
    kanji: "則",
    title: "Rules & Guidelines",
    description: "Competition rules, code of conduct, and federation bylaws.",
  },
];

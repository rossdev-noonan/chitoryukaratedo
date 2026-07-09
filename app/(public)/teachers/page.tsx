import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { SearchBox } from "@/components/public/SearchBox";
import { TeacherCard } from "@/components/public/TeacherCard";
import { getTeachers, searchTeachers } from "@/lib/directory";
import { checkSearchRateLimit } from "@/lib/rate-limit";

export const metadata: Metadata = {
  title: "Teacher Registry",
  description: "Approved and rank-verified Chito-Ryu teachers worldwide.",
  // Canonical always points at the unfiltered list — search-query variations
  // (?q=...) are the same underlying page, not distinct content to index.
  alternates: { canonical: "/teachers" },
};

interface TeachersPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function TeachersPage({ searchParams }: TeachersPageProps) {
  const { q } = await searchParams;

  let teachers;
  let rateLimited = false;
  if (q) {
    const withinLimit = await checkSearchRateLimit();
    if (withinLimit) {
      teachers = await searchTeachers(q);
    } else {
      rateLimited = true;
      teachers = await getTeachers();
    }
  } else {
    teachers = await getTeachers();
  }

  return (
    <>
      <PageHeader
        title="Teacher Registry"
        description="Search by Romaji, kana, or native name."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SearchBox placeholder="Search teachers…" initialQuery={q ?? ""} />
        {rateLimited && (
          <p className="mt-2 text-sm text-red-600">
            Too many searches — showing the full list. Try again in a minute.
          </p>
        )}
      </div>
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {teachers.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-sm">No teachers found.</p>
        ) : (
          teachers.map((teacher) => <TeacherCard key={teacher.slug} teacher={teacher} />)
        )}
      </div>
      <PlaceholderNotice source="Supabase (approved and rank-verified only)" />
    </>
  );
}

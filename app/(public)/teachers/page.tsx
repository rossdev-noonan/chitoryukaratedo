import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { SearchBox } from "@/components/public/SearchBox";
import { TeacherCard } from "@/components/public/TeacherCard";
import { getTeachers, searchTeachers } from "@/lib/directory";

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
  const teachers = q ? await searchTeachers(q) : await getTeachers();

  return (
    <>
      <PageHeader
        title="Teacher Registry"
        description="Search by Romaji, kana, or native name."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SearchBox placeholder="Search teachers…" initialQuery={q ?? ""} />
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

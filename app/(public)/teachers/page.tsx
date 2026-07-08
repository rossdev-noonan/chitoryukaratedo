import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { TeacherCard } from "@/components/public/TeacherCard";
import { getTeachers } from "@/lib/directory";

export const metadata: Metadata = {
  title: "Teacher Registry",
  description: "Approved and rank-verified Chito-Ryu teachers worldwide.",
};

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <>
      <PageHeader
        title="Teacher Registry"
        description="Search and filter are not wired up yet — list below is live but unstyled."
      />
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <TeacherCard key={teacher.slug} teacher={teacher} />
        ))}
      </div>
      <PlaceholderNotice source="Supabase (approved and rank-verified only)" />
    </>
  );
}

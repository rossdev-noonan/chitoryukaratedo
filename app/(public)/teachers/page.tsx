import type { Metadata } from "next";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { TeacherCard } from "@/components/public/TeacherCard";
import { mockTeachers } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Teacher Registry",
  description: "Approved and rank-verified Chito-Ryu teachers worldwide.",
};

export default function TeachersPage() {
  return (
    <>
      <PageHeader
        title="Teacher Registry"
        description="Search and filter are not wired up yet — list below is mock data."
      />
      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        {mockTeachers.map((teacher) => (
          <TeacherCard key={teacher.slug} teacher={teacher} />
        ))}
      </div>
      <PlaceholderNotice source="Supabase (approved and rank-verified only)" />
    </>
  );
}

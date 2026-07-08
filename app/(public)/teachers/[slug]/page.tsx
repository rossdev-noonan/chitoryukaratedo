import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getDojoById, getTeacherBySlug } from "@/lib/directory";

interface TeacherDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TeacherDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getTeacherBySlug(slug);
  return { title: match?.nameRomaji ?? "Teacher" };
}

export default async function TeacherDetailPage({ params }: TeacherDetailPageProps) {
  const { slug } = await params;
  const teacher = await getTeacherBySlug(slug);

  if (!teacher) notFound();

  const dojo = await getDojoById(teacher.dojoId);

  return (
    <>
      <PageHeader
        title={`${teacher.nameNative} / ${teacher.nameRomaji}`}
        description={teacher.rank ?? undefined}
      />
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <p className="text-muted-foreground text-sm">Dojo: {dojo?.name ?? "—"}</p>
      </div>
      <PlaceholderNotice source="Supabase (rank/license verified only)" />
    </>
  );
}

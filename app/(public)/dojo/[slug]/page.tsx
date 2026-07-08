import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getDojoBySlug, getTeachersByDojoId } from "@/lib/directory";

interface DojoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DojoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getDojoBySlug(slug);
  return { title: match?.name ?? "Dojo" };
}

export default async function DojoDetailPage({ params }: DojoDetailPageProps) {
  const { slug } = await params;
  const dojo = await getDojoBySlug(slug);

  if (!dojo) notFound();

  const affiliatedTeachers = await getTeachersByDojoId(dojo.id);

  return (
    <>
      <PageHeader title={dojo.name} description={`${dojo.city} · ${dojo.headInstructor}`} />
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <p className="text-muted-foreground text-sm">Contact: {dojo.contactEmail}</p>
        {affiliatedTeachers.length > 0 && (
          <>
            <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
              Affiliated teachers
            </h2>
            <ul className="mt-2">
              {affiliatedTeachers.map((teacher) => (
                <li key={teacher.slug} className="border-border border-b py-2 text-sm">
                  {teacher.nameRomaji} — {teacher.rank}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <PlaceholderNotice source="Supabase (approved records only, no private data)" />
    </>
  );
}

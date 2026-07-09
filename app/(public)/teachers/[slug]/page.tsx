import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/public/JsonLd";
import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getDojoById, getTeacherBySlug } from "@/lib/directory";

interface TeacherDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TeacherDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getTeacherBySlug(slug);
  if (!match) return { title: "Teacher" };

  const description = match.rank
    ? `${match.nameRomaji ?? match.nameNative ?? "Teacher"} — ${match.rank}, Chito-Ryu International.`
    : `Approved and rank-verified Chito-Ryu teacher profile.`;

  return {
    title: match.nameRomaji ?? match.nameNative ?? "Teacher",
    description,
    alternates: { canonical: `/teachers/${match.slug}` },
  };
}

export default async function TeacherDetailPage({ params }: TeacherDetailPageProps) {
  const { slug } = await params;
  const teacher = await getTeacherBySlug(slug);

  if (!teacher) notFound();

  const dojo = await getDojoById(teacher.dojoId);
  const displayName = [teacher.nameNative, teacher.nameRomaji].filter(Boolean).join(" / ");

  return (
    <>
      <PageHeader title={displayName || "Teacher"} description={teacher.rank ?? undefined} />
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        <p className="text-muted-foreground text-sm">Dojo: {dojo?.name ?? "—"}</p>
      </div>
      <PlaceholderNotice source="Supabase (rank/license verified only)" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: teacher.nameRomaji ?? teacher.nameNative ?? undefined,
          ...(teacher.rank ? { honorificSuffix: teacher.rank } : {}),
          ...(dojo ? { worksFor: { "@type": "SportsOrganization", name: dojo.name } } : {}),
        }}
      />
    </>
  );
}

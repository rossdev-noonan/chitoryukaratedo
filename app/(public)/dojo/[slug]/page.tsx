import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/public/JsonLd";
import { PageHeader } from "@/components/public/PageHeader";
import { PlaceholderNotice } from "@/components/public/PlaceholderNotice";
import { getDojoBySlug, getTeachersByDojoId } from "@/lib/directory";

interface DojoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DojoDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const match = await getDojoBySlug(slug);
  if (!match) return { title: "Dojo" };

  return {
    title: match.name,
    description: match.city
      ? `${match.name} — Chito-Ryu karate dojo in ${match.city}.`
      : `${match.name} — approved Chito-Ryu International dojo.`,
    alternates: { canonical: `/dojo/${match.slug}` },
  };
}

export default async function DojoDetailPage({ params }: DojoDetailPageProps) {
  const { slug } = await params;
  const dojo = await getDojoBySlug(slug);

  if (!dojo) notFound();

  const affiliatedTeachers = await getTeachersByDojoId(dojo.id);
  const subtitle = [dojo.city, dojo.headInstructor].filter(Boolean).join(" · ");

  return (
    <>
      <PageHeader title={dojo.name} description={subtitle || undefined} />
      <div className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
        {dojo.contactEmail && (
          <p className="text-muted-foreground text-sm">Contact: {dojo.contactEmail}</p>
        )}
        {affiliatedTeachers.length > 0 && (
          <>
            <h2 className="text-muted-foreground mt-8 text-sm font-medium tracking-wide uppercase">
              Affiliated teachers
            </h2>
            <ul className="mt-2">
              {affiliatedTeachers.map((teacher) => (
                <li key={teacher.slug} className="border-border border-b py-2 text-sm">
                  {[teacher.nameRomaji, teacher.rank].filter(Boolean).join(" — ")}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <PlaceholderNotice source="Supabase (approved records only, no private data)" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          name: dojo.name,
          ...(dojo.city ? { address: { "@type": "PostalAddress", addressLocality: dojo.city } } : {}),
          ...(dojo.contactEmail ? { email: dojo.contactEmail } : {}),
        }}
      />
    </>
  );
}

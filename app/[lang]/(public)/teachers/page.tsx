import type { Metadata } from "next";

import { GlobalCommunityCTA } from "@/components/public/GlobalCommunityCTA";
import type { TeacherRegistryEntry } from "@/components/public/TeacherCard";
import { TeacherRegistry } from "@/components/public/TeacherRegistry";
import { getApprovedDojos, getCountries, getTeachers } from "@/lib/directory";
import { localeAlternates } from "@/lib/i18n/alternates";
import type { Locale } from "@/lib/i18n/locales";

interface TeachersPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ params }: TeachersPageProps): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: "Teacher Registry",
    description: "Search and explore approved, rank-verified Chito-Ryu teachers worldwide.",
    alternates: localeAlternates(lang, "/teachers"),
  };
}

function getTeacherPhotoUrl(photoPath: string | null) {
  if (!photoPath) return null;
  if (/^https?:\/\//i.test(photoPath)) return photoPath;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return null;
  const encodedPath = photoPath.split("/").map(encodeURIComponent).join("/");
  return `${supabaseUrl}/storage/v1/object/public/teacher-photos-approved/${encodedPath}`;
}

export default async function TeachersPage({ params, searchParams }: TeachersPageProps) {
  const [{ lang }, { q }, teachers, countries, dojos] = await Promise.all([
    params,
    searchParams,
    getTeachers(),
    getCountries(),
    getApprovedDojos(),
  ]);

  const countryById = new Map(countries.map((country) => [country.id, country]));
  const dojoById = new Map(dojos.map((dojo) => [dojo.id, dojo]));
  const entries: TeacherRegistryEntry[] = teachers.map((teacher) => {
    const country = countryById.get(teacher.countryId);
    const dojo = dojoById.get(teacher.dojoId);
    return {
      id: teacher.id,
      slug: teacher.slug,
      nameNative: teacher.nameNative,
      nameRomaji: teacher.nameRomaji,
      rank: teacher.rank,
      dojoName: dojo?.name ?? null,
      dojoSlug: dojo?.slug ?? null,
      dojoEmail: dojo?.contactEmail ?? null,
      countryName: country?.name ?? null,
      photoUrl: getTeacherPhotoUrl(teacher.photoPath),
    };
  });

  return (
    <>
      <TeacherRegistry teachers={entries} lang={lang} initialQuery={q ?? ""} />
      <GlobalCommunityCTA lang={lang} />
      <div className="h-10 md:h-12 xl:h-20" aria-hidden="true" />
    </>
  );
}

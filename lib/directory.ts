import { continentForCountrySlug, type Continent } from "@/lib/continents";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface Country {
  id: string;
  slug: string;
  name: string;
  hasOwnFederationSite: boolean;
  federationSiteUrl: string | null;
  federationName: string | null;
  representative: string | null;
}

export interface Dojo {
  id: string;
  slug: string;
  name: string;
  countryId: string;
  city: string | null;
  headInstructor: string | null;
  contactEmail: string | null;
}

export interface Teacher {
  id: string;
  slug: string;
  nameNative: string | null;
  nameRomaji: string | null;
  rank: string | null;
  dojoId: string;
  countryId: string;
  photoPath: string | null;
}

interface CountryRow {
  id: string;
  slug: string;
  name: string;
  has_own_federation_site: boolean;
  federation_site_url: string | null;
  federation_name: string | null;
  representative: string | null;
}

interface DojoRow {
  id: string;
  slug: string;
  name: string;
  country_id: string;
  city: string | null;
  head_instructor: string | null;
  contact_email: string | null;
}

interface TeacherRow {
  id: string;
  slug: string;
  name_native: string | null;
  name_romaji_final: string | null;
  rank: string | null;
  dojo_id: string;
  country_id: string;
  photo_path: string | null;
}

function toCountry(row: CountryRow): Country {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    hasOwnFederationSite: row.has_own_federation_site,
    federationSiteUrl: row.federation_site_url,
    federationName: row.federation_name,
    representative: row.representative,
  };
}

function toDojo(row: DojoRow): Dojo {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    countryId: row.country_id,
    city: row.city,
    headInstructor: row.head_instructor,
    contactEmail: row.contact_email,
  };
}

function toTeacher(row: TeacherRow): Teacher {
  return {
    id: row.id,
    slug: row.slug,
    nameNative: row.name_native,
    nameRomaji: row.name_romaji_final,
    rank: row.rank,
    dojoId: row.dojo_id,
    countryId: row.country_id,
    photoPath: row.photo_path,
  };
}

const COUNTRY_COLUMNS =
  "id, slug, name, has_own_federation_site, federation_site_url, federation_name, representative";
const DOJO_COLUMNS = "id, slug, name, country_id, city, head_instructor, contact_email";
const TEACHER_COLUMNS =
  "id, slug, name_native, name_romaji_final, rank, dojo_id, country_id, photo_path";

export async function getCountries(): Promise<Country[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("countries").select(COUNTRY_COLUMNS).order("name");
  return (data ?? []).map(toCountry);
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("countries")
    .select(COUNTRY_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  return data ? toCountry(data) : null;
}

export async function getDojosByCountryId(countryId: string): Promise<Dojo[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("dojos")
    .select(DOJO_COLUMNS)
    .eq("country_id", countryId)
    .order("name");
  return (data ?? []).map(toDojo);
}

// Real dojo counts per continent for the homepage map, derived from live
// Supabase data (never fabricated) — countries not in continentForCountrySlug
// are excluded rather than guessed at.
export async function getDojoCountsByContinent(): Promise<Record<Continent, number>> {
  const supabase = await createSupabaseServerClient();
  const [{ data: countries }, { data: dojos }] = await Promise.all([
    supabase.from("countries").select("id, slug"),
    supabase.from("dojos").select("country_id"),
  ]);

  const continentByCountryId = new Map(
    (countries ?? []).map((c) => [c.id, continentForCountrySlug(c.slug)]),
  );

  const counts: Record<Continent, number> = {
    northAmerica: 0,
    southAmerica: 0,
    europe: 0,
    africa: 0,
    asia: 0,
    australia: 0,
  };

  for (const dojo of dojos ?? []) {
    const continent = continentByCountryId.get(dojo.country_id);
    if (continent) counts[continent] += 1;
  }

  return counts;
}

export async function getApprovedDojos(limit?: number): Promise<Dojo[]> {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("dojos").select(DOJO_COLUMNS).order("name");
  if (limit) query = query.limit(limit);
  const { data } = await query;
  return (data ?? []).map(toDojo);
}

export async function getDojoBySlug(slug: string): Promise<Dojo | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("dojos").select(DOJO_COLUMNS).eq("slug", slug).maybeSingle();
  return data ? toDojo(data) : null;
}

export async function getDojoById(id: string): Promise<Dojo | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("dojos").select(DOJO_COLUMNS).eq("id", id).maybeSingle();
  return data ? toDojo(data) : null;
}

export async function getTeachers(): Promise<Teacher[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("teachers")
    .select(TEACHER_COLUMNS)
    .order("name_romaji_final");
  return (data ?? []).map(toTeacher);
}

// PostgREST's .or() filter syntax uses "," to separate conditions and "()"
// for grouping/negation — strip those from user input so a search term
// containing them can't break the filter string. This is a syntax safety
// measure, not a security boundary: PostgREST still parameterizes the
// actual ILIKE value, so this cannot enable SQL injection either way.
function sanitizeSearchTerm(raw: string): string {
  return raw.trim().replace(/[,()]/g, "");
}

export async function searchTeachers(query: string): Promise<Teacher[]> {
  const term = sanitizeSearchTerm(query);
  if (!term) return getTeachers();

  const supabase = await createSupabaseServerClient();
  const pattern = `%${term}%`;
  const { data } = await supabase
    .from("teachers")
    .select(TEACHER_COLUMNS)
    .or(
      `name_romaji_final.ilike.${pattern},name_kana.ilike.${pattern},name_native.ilike.${pattern}`,
    )
    .order("name_romaji_final");
  return (data ?? []).map(toTeacher);
}

export async function getTeacherBySlug(slug: string): Promise<Teacher | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("teachers")
    .select(TEACHER_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  return data ? toTeacher(data) : null;
}

export async function getTeachersByDojoId(dojoId: string): Promise<Teacher[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("teachers")
    .select(TEACHER_COLUMNS)
    .eq("dojo_id", dojoId)
    .order("name_romaji_final");
  return (data ?? []).map(toTeacher);
}

export async function searchDojosByCountryId(countryId: string, query: string): Promise<Dojo[]> {
  const term = sanitizeSearchTerm(query);
  if (!term) return getDojosByCountryId(countryId);

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("dojos")
    .select(DOJO_COLUMNS)
    .eq("country_id", countryId)
    .ilike("name", `%${term}%`)
    .order("name");
  return (data ?? []).map(toDojo);
}

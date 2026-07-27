import type { ApprovalStatus } from "@/lib/approvals";
import type { NewsArticle, NewsFeaturedStory } from "@/lib/news-content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface NewsPostRow {
  slug: string;
  tag: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  date_location_label: string | null;
  published_at: string;
  image_desktop: string;
  image_mobile: string | null;
  show_on_mobile: boolean;
}

const NEWS_COLUMNS =
  "slug, tag, title, subtitle, description, date_location_label, published_at, image_desktop, image_mobile, show_on_mobile";

function formatNewsDate(publishedAt: string): string {
  return new Date(`${publishedAt}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function toNewsArticle(row: NewsPostRow): NewsArticle {
  return {
    slug: row.slug,
    tag: row.tag,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    date: formatNewsDate(row.published_at),
    visualSrc: { desktop: row.image_desktop, mobile: row.image_mobile ?? undefined },
    showOnMobile: row.show_on_mobile,
  };
}

function toFeaturedStory(row: NewsPostRow): NewsFeaturedStory {
  return {
    tag: row.tag,
    title: row.title,
    dateLocationLabel: row.date_location_label ?? formatNewsDate(row.published_at),
    description: row.description ?? "",
    bannerSrc: { desktop: row.image_desktop, mobile: row.image_mobile ?? row.image_desktop },
  };
}

export async function getPublicFeaturedNews(): Promise<NewsFeaturedStory | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("news_posts")
    .select(NEWS_COLUMNS)
    .eq("featured", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle<NewsPostRow>();

  return data ? toFeaturedStory(data) : null;
}

export async function getPublicNewsArticles(): Promise<NewsArticle[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("news_posts")
    .select(NEWS_COLUMNS)
    .eq("featured", false)
    .order("published_at", { ascending: false });

  return ((data ?? []) as NewsPostRow[]).map(toNewsArticle);
}

export interface PublicNewsPost {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string | null;
}

export async function getNewsPostBySlug(slug: string): Promise<PublicNewsPost | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("news_posts")
    .select("slug, title, published_at, description")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    publishedAt: data.published_at,
    excerpt: data.description,
  };
}

export interface PublicNewsSlug {
  slug: string;
  publishedAt: string;
}

// Every approved post's slug + date, featured or not — for the sitemap.
// Separate from getPublicNewsArticles()/getPublicFeaturedNews() because those
// return display-shaped data (and the featured story's display type has no
// slug at all, since its card links back to /news rather than its own page).
export async function getAllPublicNewsSlugs(): Promise<PublicNewsSlug[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("news_posts").select("slug, published_at");

  return (data ?? []).map((row) => ({ slug: row.slug, publishedAt: row.published_at }));
}

export interface AdminNewsRow {
  id: string;
  slug: string;
  title: string;
  tag: string;
  publishedAt: string;
  countryId: string | null;
  status: ApprovalStatus;
}

export async function getAllNewsForAdmin(): Promise<AdminNewsRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("news_posts")
    .select("id, slug, title, tag, published_at, country_id, status")
    .is("deleted_at", null)
    .order("published_at", { ascending: false });

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    tag: row.tag,
    publishedAt: row.published_at,
    countryId: row.country_id,
    status: row.status,
  }));
}

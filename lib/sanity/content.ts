import { sanityClient } from "./client";

export interface NewsPost {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string | null;
}

export interface EventItem {
  slug: string;
  title: string;
  startDate: string;
  location: string | null;
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  return sanityClient.fetch(
    `*[_type == "newsPost"] | order(publishedAt desc) {
      "slug": slug.current,
      title,
      publishedAt,
      excerpt
    }`,
  );
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  return sanityClient.fetch(
    `*[_type == "newsPost" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      publishedAt,
      excerpt
    }`,
    { slug },
  );
}

export async function getEvents(): Promise<EventItem[]> {
  return sanityClient.fetch(
    `*[_type == "event"] | order(startDate asc) {
      "slug": slug.current,
      title,
      startDate,
      location
    }`,
  );
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  return sanityClient.fetch(
    `*[_type == "event" && slug.current == $slug][0] {
      "slug": slug.current,
      title,
      startDate,
      location
    }`,
    { slug },
  );
}

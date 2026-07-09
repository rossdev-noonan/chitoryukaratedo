import type { MetadataRoute } from "next";

import { getCountries, getDojosByCountryId, getTeachers } from "@/lib/directory";
import { getEvents, getNewsPosts } from "@/lib/sanity/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chitoryukaratedo.com";

const staticRoutes = [
  "",
  "/about",
  "/history",
  "/leadership",
  "/dojo-directory",
  "/teachers",
  "/news",
  "/events",
  "/resources",
  "/resources/soke-cup-rules",
  "/resources/bogu-kumite",
  "/resources/downloads",
  "/sohonbu-experience",
  "/contact",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const [countries, teachers, newsPosts, events] = await Promise.all([
    getCountries(),
    getTeachers(),
    getNewsPosts(),
    getEvents(),
  ]);

  const dojoLists = await Promise.all(
    countries
      .filter((country) => !country.hasOwnFederationSite)
      .map((country) => getDojosByCountryId(country.id)),
  );
  const dojos = dojoLists.flat();

  const countryEntries: MetadataRoute.Sitemap = countries.map((country) => ({
    url: `${siteUrl}/dojo-directory/${country.slug}`,
    lastModified: new Date(),
  }));

  const dojoEntries: MetadataRoute.Sitemap = dojos.map((dojo) => ({
    url: `${siteUrl}/dojo/${dojo.slug}`,
    lastModified: new Date(),
  }));

  const teacherEntries: MetadataRoute.Sitemap = teachers.map((teacher) => ({
    url: `${siteUrl}/teachers/${teacher.slug}`,
    lastModified: new Date(),
  }));

  const newsEntries: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${siteUrl}/news/${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  const eventEntries: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.startDate),
  }));

  return [
    ...staticEntries,
    ...countryEntries,
    ...dojoEntries,
    ...teacherEntries,
    ...newsEntries,
    ...eventEntries,
  ];
}

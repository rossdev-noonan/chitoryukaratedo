import type { MetadataRoute } from "next";

import { getCountries, getDojosByCountryId, getTeachers } from "@/lib/directory";
import { locales } from "@/lib/i18n/locales";
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

function withLocaleAlternates(path: string, lastModified: Date): MetadataRoute.Sitemap[number][] {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${siteUrl}/${locale}${path}`]),
  );

  return locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    lastModified,
    alternates: { languages },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries = staticRoutes.flatMap((path) => withLocaleAlternates(path, now));

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

  const countryEntries = countries.flatMap((country) =>
    withLocaleAlternates(`/dojo-directory/${country.slug}`, now),
  );

  const dojoEntries = dojos.flatMap((dojo) => withLocaleAlternates(`/dojo/${dojo.slug}`, now));

  const teacherEntries = teachers.flatMap((teacher) =>
    withLocaleAlternates(`/teachers/${teacher.slug}`, now),
  );

  const newsEntries = newsPosts.flatMap((post) =>
    withLocaleAlternates(`/news/${post.slug}`, new Date(post.publishedAt)),
  );

  const eventEntries = events.flatMap((event) =>
    withLocaleAlternates(`/events/${event.slug}`, new Date(event.startDate)),
  );

  return [
    ...staticEntries,
    ...countryEntries,
    ...dojoEntries,
    ...teacherEntries,
    ...newsEntries,
    ...eventEntries,
  ];
}

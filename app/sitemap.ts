import type { MetadataRoute } from "next";

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

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}

import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chitoryukaratedo.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/login", "/accept-invite", "/reset-password", "/api"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

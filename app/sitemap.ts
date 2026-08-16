import type { MetadataRoute } from "next";
import { publicRoutes, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route.startsWith("/blog/") || route.startsWith("/projects/") ? "monthly" : "weekly",
    priority:
      route === "" ? 1 :
      route === "/tools" ? 0.9 :
      route.startsWith("/tools/") ? 0.85 :
      route.startsWith("/projects/") || route.startsWith("/blog/") ? 0.8 : 0.7,
  }));
}

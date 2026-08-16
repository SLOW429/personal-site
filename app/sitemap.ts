import type { MetadataRoute } from "next";
import { publicRoutes, siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicRoutes.flatMap((route) =>
    (Object.keys(siteConfig.locales) as Array<keyof typeof siteConfig.locales>).map((locale) => {
      const localizedUrl = `${siteConfig.url}${locale === "en" ? route : `/ar${route}`}`;
      const alternate = (pathLocale: "en" | "ar") => `${siteConfig.url}${pathLocale === "en" ? route : `/ar${route}`}`;
      return {
        url: localizedUrl,
        lastModified,
        changeFrequency: route.startsWith("/blog/") || route.startsWith("/projects/") ? "monthly" : "weekly",
        priority:
          route === "" ? 1 :
          route === "/tools" ? 0.9 :
          route.startsWith("/tools/") ? 0.85 :
          route.startsWith("/projects/") || route.startsWith("/blog/") ? 0.8 : 0.7,
        alternates: { languages: { en: alternate("en"), ar: alternate("ar"), "x-default": alternate("en") } },
      };
    }),
  );
}

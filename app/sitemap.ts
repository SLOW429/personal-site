import type { MetadataRoute } from "next";

const baseUrl = "https://slows.dev";
const locales = ["en", "ar", "tr"] as const;
const localized = (route: string) => locales.map((locale) => ({
  url: locale === "en" ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`,
  alternates: {
    languages: {
      en: `${baseUrl}${route}`,
      ar: `${baseUrl}/ar${route}`,
      tr: `${baseUrl}/tr${route}`,
      "x-default": `${baseUrl}${route}`,
    },
  },
}));

const toolRoutes = [
  "/tools/json-formatter",
  "/tools/base64",
  "/tools/seo-preview",
  "/tools/image-compressor",
];
const blogRoutes = [
  "/blog/building-slow-dev-into-a-personal-platform",
  "/blog/designing-local-first-developer-tools",
];
const projectRoutes = [
  "/projects/hr-bot",
  "/projects/discord-bot",
  "/projects/chat-platform",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    "/about",
    "/projects",
    "/services",
    "/tools",
    "/blog",
    "/creator",
    "/gaming",
    "/now",
    "/uses",
    "/links",
    "/contact",
    ...toolRoutes,
    ...blogRoutes,
    ...projectRoutes,
  ];

  return routes.flatMap((route) => {
    const changeFrequency = route === "" ? "weekly" : route.startsWith("/blog/") || route.startsWith("/projects/") ? "monthly" : "weekly";
    const priority = route === "" ? 1 : route === "/tools" ? 0.9 : route.startsWith("/tools/") || route.startsWith("/blog/") || route.startsWith("/projects/") ? 0.8 : 0.7;

    return localized(route).map((entry) => ({
      ...entry,
      lastModified,
      changeFrequency,
      priority,
    }));
  });
}

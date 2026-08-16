import type { MetadataRoute } from "next";

const baseUrl = "https://slows.dev";
const locales = ["en", "ar", "tr"] as const;
const localizedRoutes = ["/about", "/services", "/tools"] as const;

const toolRoutes = [
  "/tools/json-formatter",
  "/tools/base64",
  "/tools/seo-preview",
  "/tools/image-compressor",
  "/tools/uuid-generator",
  "/tools/jwt-decoder",
  "/tools/url-encoder",
  "/tools/timestamp",
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

const localizedHome: MetadataRoute.Sitemap[number] = {
  url: `${baseUrl}/ar`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 1,
  alternates: {
    languages: {
      en: baseUrl,
      ar: `${baseUrl}/ar`,
      tr: `${baseUrl}/tr`,
      "x-default": baseUrl,
    },
  },
};

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
    "/docs",
    "/status",
    ...toolRoutes,
    ...blogRoutes,
    ...projectRoutes,
  ];

  const baseEntries = routes.flatMap((route) => {
    const changeFrequency = route === "" ? "weekly" : route.startsWith("/blog/") || route.startsWith("/projects/") ? "monthly" : "weekly";
    const priority = route === "" ? 1 : route === "/tools" ? 0.9 : route.startsWith("/tools/") || route.startsWith("/blog/") || route.startsWith("/projects/") ? 0.8 : 0.7;

    if (!localizedRoutes.includes(route as (typeof localizedRoutes)[number])) {
      return [{ url: `${baseUrl}${route}`, lastModified, changeFrequency, priority }];
    }

    return locales.map((locale) => ({
      url: locale === "en" ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${baseUrl}${route}`,
          ar: `${baseUrl}/ar${route}`,
          tr: `${baseUrl}/tr${route}`,
          "x-default": `${baseUrl}${route}`,
        },
      },
    }));
  });

  return [
    ...baseEntries,
    localizedHome,
    { ...localizedHome, url: `${baseUrl}/tr` },
  ];
}

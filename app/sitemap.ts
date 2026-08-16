import type { MetadataRoute } from "next";

const baseUrl = "https://slows.dev";
const locales = ["en", "ar"] as const;
const routes = [
  "", "/about", "/projects", "/projects/hr-bot", "/projects/discord-bot", "/projects/chat-platform",
  "/services", "/tools", "/tools/json-formatter", "/tools/base64", "/tools/seo-preview", "/tools/image-compressor",
  "/tools/uuid-generator", "/tools/jwt-decoder", "/tools/url-encoder", "/tools/timestamp", "/blog",
  "/blog/building-slow-dev-into-a-personal-platform", "/blog/designing-local-first-developer-tools", "/creator", "/gaming", "/now", "/uses", "/links", "/contact", "/docs", "/status",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap((route) => locales.map((locale) => ({
    url: locale === "en" ? `${baseUrl}${route}` : `${baseUrl}/ar${route}`,
    lastModified,
    changeFrequency: route.startsWith("/blog/") || route.startsWith("/projects/") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route === "/tools" ? 0.9 : route.startsWith("/tools/") ? 0.85 : route.startsWith("/projects/") || route.startsWith("/blog/") ? 0.8 : 0.7,
    alternates: { languages: { en: `${baseUrl}${route}`, ar: `${baseUrl}/ar${route}`, "x-default": `${baseUrl}${route}` } },
  })));
}

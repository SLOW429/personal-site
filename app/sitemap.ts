import type { MetadataRoute } from "next";

const baseUrl = "https://slows.dev";
const toolRoutes = [
  "/tools/json-formatter",
  "/tools/base64",
  "/tools/seo-preview",
  "/tools/image-compressor",
];

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : route.startsWith("/tools/") ? "monthly" : "monthly",
    priority: route === "" ? 1 : route === "/tools" ? 0.9 : route.startsWith("/tools/") ? 0.8 : 0.7,
  }));
}

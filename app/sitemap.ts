import type { MetadataRoute } from "next";

const baseUrl = "https://slows.dev";

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
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}

import type { MetadataRoute } from "next";

const baseUrl = "https://slows.dev";
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

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/tools"
          ? 0.9
          : route.startsWith("/tools/") || route.startsWith("/blog/") || route.startsWith("/projects/")
            ? 0.8
            : 0.7,
  }));
}

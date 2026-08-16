export const siteConfig = {
  name: "SLOW.DEV",
  shortName: "SLOW",
  url: "https://slows.dev",
  description: "SLOW.DEV — developer tools, projects, services, content, gaming, and creator features.",
  author: "SLOW",
  social: {
    github: "https://github.com/SLOW429",
    youtube: "https://www.youtube.com/@SLOW429",
    kick: "https://kick.com/3azf-valo",
    discord: "https://discord.gg/MvVxreJXMq",
  },
  assets: { icon: "/avatar-poster.jpg", ogImage: "/banner-poster.jpg" },
} as const;

export const navigation = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Tools", "/tools"],
  ["Blog", "/blog"],
  ["Creator", "/creator"],
  ["Gaming", "/gaming"],
] as const;

export const navigationLabels = {
  About: "About", Projects: "Projects", Services: "Services", Tools: "Tools", Blog: "Blog", Creator: "Creator", Gaming: "Gaming",
  Contact: "Contact", Start: "Start a Project", Open: "Open navigation", Close: "Close navigation",
} as const;

export const toolSlugs = [
  "json-formatter", "base64", "seo-preview", "meta-tag-generator", "image-compressor",
  "uuid-generator", "jwt-decoder", "url-encoder", "timestamp", "qr-generator",
] as const;

export const publicRoutes = [
  "", "/about", "/projects", "/projects/hr-bot", "/projects/discord-bot", "/projects/chat-platform",
  "/services", "/tools", ...toolSlugs.map((slug) => `/tools/${slug}`),
  "/blog", "/blog/building-slow-dev-into-a-personal-platform", "/blog/designing-local-first-developer-tools",
  "/creator", "/gaming", "/now", "/uses", "/links", "/contact", "/docs", "/status",
] as const;

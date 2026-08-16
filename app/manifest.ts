import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SLOW.DEV",
    short_name: "SLOW",
    description: "SLOW.DEV — developer tools, projects, services, gaming, and creator features.",
    start_url: "/",
    display: "standalone",
    background_color: "#060a13",
    theme_color: "#060a13",
    orientation: "portrait-primary",
    lang: "en",
    dir: "ltr",
    icons: [
      { src: "/avatar-poster.jpg", sizes: "512x512", type: "image/jpeg", purpose: "any maskable" },
    ],
  };
}

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
<<<<<<< HEAD
      { src: "/avatar-poster.jpg", sizes: "128x128", type: "image/jpeg", purpose: "any" },
=======
      { src: "/avatar-poster.jpg", sizes: "512x512", type: "image/jpeg", purpose: "any maskable" },
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
    ],
  };
}

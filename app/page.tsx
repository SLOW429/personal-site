import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/home-experience";

export const metadata: Metadata = {
  title: "SLOW429 — Developer, Creator & Voiceover Artist",
  description: "SLOW429 builds software, developer tools, automation systems, creator experiences, and voice-led content.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SLOW429 — Developer, Creator & Voiceover Artist",
    description: "Software, tools, automation, creator work and experiments from SLOW.DEV.",
    url: "https://slows.dev/",
    siteName: "SLOW.DEV",
    images: [{ url: "/banner-poster.jpg", width: 1600, height: 565, alt: "SLOW.DEV" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOW429 — Developer, Creator & Voiceover Artist",
    description: "Software, tools, automation, creator work and experiments from SLOW.DEV.",
    images: ["/banner-poster.jpg"],
  },
};

export default function HomePage() {
  return <HomeExperience />;
}

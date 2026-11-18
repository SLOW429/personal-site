import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software, automation, bots, and real-time experiments by SLOW, with project case studies and architecture notes.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | SLOW.DEV",
    description:
      "Selected software, automation, bots, and real-time experiments by SLOW.",
    url: "https://slows.dev/projects",
    type: "website",
    images: ["/banner-poster.jpg"],
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

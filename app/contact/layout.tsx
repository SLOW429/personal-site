import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Prepare a clear project brief for SLOW: what you need, timeline, current setup, and budget.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

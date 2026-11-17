import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact SLOW about freelance development, full-stack projects, automation, and web experiences.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import HomeExpansion from "@/components/home/home-expansion";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slows.dev"),
  title: {
    default: "SLOW — Developer, Creator & Builder",
    template: "%s | SLOW",
  },
  description:
    "SLOW.DEV — a personal hub for software projects, developer tools, AI experiments, services, content, gaming, and streaming.",
  keywords: ["SLOW", "SLOW429", "developer", "creator", "developer tools", "web development", "AI", "automation"],
  authors: [{ name: "SLOW" }],
  icons: {
    icon: "/avatar-poster.jpg",
    shortcut: "/avatar-poster.jpg",
    apple: "/avatar-poster.jpg",
  },
  openGraph: {
    title: "SLOW — Developer, Creator & Builder",
    description: "Software, useful tools, AI experiments, content, gaming, and digital products.",
    url: "https://slows.dev",
    siteName: "SLOW",
    images: [{ url: "/banner-poster.jpg", width: 1600, height: 565 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOW — Developer, Creator & Builder",
    description: "Software, useful tools, AI experiments, content, gaming, and digital products.",
    images: ["/banner-poster.jpg"],
  },
};

export const viewport = {
  themeColor: "#060a13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <div className="flex min-h-screen flex-1 flex-col pt-16">{children}</div>
        <HomeExpansion />
        <SiteFooter />
      </body>
    </html>
  );
}

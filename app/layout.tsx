import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import HomeExpansion from "@/components/home/home-expansion";
import { DevelopmentNotice } from "@/components/layout/development-notice";

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

const siteUrl = "https://slows.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SLOW — Developer, Creator & Builder",
    template: "%s | SLOW",
  },
  description:
    "SLOW.DEV — a personal hub for software projects, developer tools, AI experiments, services, content, gaming, and streaming.",
  keywords: ["SLOW", "SLOW429", "developer", "creator", "developer tools", "web development", "AI", "automation"],
  authors: [{ name: "SLOW" }],
  alternates: { canonical: "/" },
  icons: {
    icon: "/avatar-poster.jpg",
    shortcut: "/avatar-poster.jpg",
    apple: "/avatar-poster.jpg",
  },
  openGraph: {
    title: "SLOW — Developer, Creator & Builder",
    description: "Software, useful tools, AI experiments, content, gaming, and digital products.",
    url: siteUrl,
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "SLOW",
      alternateName: "SLOW429",
      url: siteUrl,
      jobTitle: "Developer, Creator & Builder",
      sameAs: [
        "https://github.com/SLOW429",
        "https://www.youtube.com/@SLOW429",
        "https://kick.com/3azf-valo",
        "https://discord.gg/MvVxreJXMq",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "SLOW.DEV",
      description: "Personal platform for software, tools, services, content, gaming, and creator work.",
      publisher: { "@id": `${siteUrl}/#person` },
      inLanguage: "en",
    },
  ],
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
        <DevelopmentNotice />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteHeader />
        <div className="flex min-h-screen flex-1 flex-col pt-16">{children}</div>
        <HomeExpansion />
        <SiteFooter />
      </body>
    </html>
  );
}

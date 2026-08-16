import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import HomeExpansion from "@/components/home/home-expansion";
import { GlobalVisuals } from "@/components/layout/global-visuals";
import PwaRegister from "@/components/layout/pwa-register";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "SLOW — Developer, Creator & Builder", template: "%s | SLOW" },
  description: siteConfig.description,
  keywords: ["SLOW", "SLOW429", "developer", "developer tools", "web development", "automation", "AI", "gaming", "creator"],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: siteConfig.assets.icon, shortcut: siteConfig.assets.icon, apple: siteConfig.assets.icon },
  openGraph: {
    title: "SLOW — Developer, Creator & Builder",
    description: "Software, useful tools, AI experiments, services, gaming, and creator work.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.assets.ogImage, width: 1600, height: 565, alt: siteConfig.name }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOW — Developer, Creator & Builder",
    description: "Software, tools, services, gaming, and creator work from SLOW.DEV.",
    images: [siteConfig.assets.ogImage],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060a13" },
    { media: "(prefers-color-scheme: light)", color: "#eef5fc" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "SLOW",
      alternateName: "SLOW429",
      url: siteConfig.url,
      jobTitle: "Developer, Creator & Builder",
      sameAs: Object.values(siteConfig.social),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <GlobalVisuals />
        <SiteHeader />
        <div className="relative z-10 flex min-h-screen flex-1 flex-col pt-16">{children}</div>
        <HomeExpansion />
        <SiteFooter />
        <PwaRegister />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}

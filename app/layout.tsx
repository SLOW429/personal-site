import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import HomeExpansion from "@/components/home/home-expansion";
import { GlobalVisuals } from "@/components/layout/global-visuals";
import { isLocale, localeDirections, type Locale } from "@/lib/i18n";

const siteUrl = "https://slows.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SLOW — Developer, Creator & Builder", template: "%s | SLOW" },
  description: "SLOW.DEV — developer tools, projects, services, content, gaming, and creator features.",
  keywords: ["SLOW", "SLOW429", "developer", "developer tools", "web development", "automation", "AI", "gaming", "creator"],
  authors: [{ name: "SLOW" }],
  creator: "SLOW",
  publisher: "SLOW",
  alternates: { canonical: "/", languages: { en: siteUrl, ar: `${siteUrl}/ar`, tr: `${siteUrl}/tr`, "x-default": siteUrl } },
  robots: { index: true, follow: true },
  icons: { icon: "/avatar-poster.jpg", shortcut: "/avatar-poster.jpg", apple: "/avatar-poster.jpg" },
  openGraph: {
    title: "SLOW — Developer, Creator & Builder",
    description: "Software, useful tools, AI experiments, services, gaming, and creator work.",
    url: siteUrl,
    siteName: "SLOW.DEV",
    images: [{ url: "/banner-poster.jpg", width: 1600, height: 565, alt: "SLOW.DEV" }],
    locale: "en_US",
    alternateLocale: ["ar_AR", "tr_TR"],
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "SLOW — Developer, Creator & Builder", description: "Software, tools, services, gaming, and creator work from SLOW.DEV.", images: ["/banner-poster.jpg"] },
};

export const viewport = { themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#060a13" }, { media: "(prefers-color-scheme: light)", color: "#eef5fc" }] };

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", "@id": `${siteUrl}/#person`, name: "SLOW", alternateName: "SLOW429", url: siteUrl, jobTitle: "Developer, Creator & Builder", sameAs: ["https://github.com/SLOW429", "https://www.youtube.com/@SLOW429", "https://kick.com/3azf-valo", "https://discord.gg/MvVxreJXMq"] },
    { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: "SLOW.DEV", url: siteUrl, description: "Developer tools, projects, services, content, gaming, and creator features.", publisher: { "@id": `${siteUrl}/#person` }, inLanguage: ["en", "ar", "tr"] },
  ],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-site-locale");
  const locale: Locale = isLocale(headerLocale) ? headerLocale : "en";
  return (
    <html lang={locale} dir={localeDirections[locale]} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <GlobalVisuals />
        <SiteHeader />
        <div className="relative z-10 flex min-h-screen flex-1 flex-col pt-16">{children}</div>
        <HomeExpansion />
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}

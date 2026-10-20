import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import PwaRegister from "@/components/layout/pwa-register";
<<<<<<< HEAD
import { LocaleProvider } from "@/components/layout/locale-provider";
=======
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SLOW429 — Developer, Creator & Voiceover Artist",
    template: "%s | SLOW.DEV",
  },
  description:
    "SLOW429 builds software, developer tools, automation systems, creator experiences, and voice-led content.",
  keywords: [
    "SLOW429",
    "SLOW.DEV",
    "developer",
    "creator",
    "voiceover artist",
    "developer tools",
    "automation",
    "AI",
    "gaming",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: siteConfig.assets.icon,
    shortcut: siteConfig.assets.icon,
    apple: siteConfig.assets.icon,
  },
  openGraph: {
    title: "SLOW429 — Developer, Creator & Voiceover Artist",
    description:
      "Software, tools, automation, creator work and experiments from SLOW.DEV.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.assets.ogImage,
<<<<<<< HEAD
        width: 680,
        height: 240,
=======
        width: 1600,
        height: 565,
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOW429 — Developer, Creator & Voiceover Artist",
    description:
      "Software, tools, automation, creator work and experiments from SLOW.DEV.",
    images: [siteConfig.assets.ogImage],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
<<<<<<< HEAD
  themeColor: "#060a13",
=======
  themeColor: "#05070d",
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: "SLOW429",
      url: siteConfig.url,
      jobTitle: "Developer, Creator & Voiceover Artist",
      sameAs: Object.values(siteConfig.social),
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      description:
        "Software, tools, automation, creator work and experiments from SLOW.DEV.",
      publisher: { "@id": `${siteConfig.url}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
<<<<<<< HEAD
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
        <LocaleProvider>
=======
    <html lang="en" dir="ltr" className="h-full antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
        <SiteHeader />
        <div className="flex min-h-screen flex-col pt-16">
          <div className="flex-1">{children}</div>
        </div>
        <SiteFooter />
        <PwaRegister />
        <script
          type="application/ld+json"
<<<<<<< HEAD
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        </LocaleProvider>
=======
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
>>>>>>> b9f0c72aee7db334f2a2f0fe520cea678ccfce84
      </body>
    </html>
  );
}

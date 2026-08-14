import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import HomeExpansion from "@/components/home/home-expansion";
import { DevelopmentNotice } from "@/components/layout/development-notice";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["500", "600", "700", "800", "900"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = "https://slows.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SLOW — Developer, Creator & Builder", template: "%s | SLOW" },
  description: "SLOW.DEV is currently under development.",
  alternates: { canonical: "/" },
};

export const viewport = { themeColor: "#060a13" };

function MaintenancePage() {
  return (
    <main className="min-h-screen bg-[#060a13] px-6 text-white">
      <div className="flex min-h-screen items-center justify-center text-center">
        <section className="max-w-2xl">
          <p className="text-5xl md:text-7xl">🚧</p>
          <p className="mt-8 text-xs uppercase tracking-[0.4em] text-[#d9edff]">SLOW.DEV</p>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">الموقع تحت التطوير</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/65 md:text-lg">
            بنبني SLOW.DEV حاليًا ونجهزه بكل الأدوات والمشاريع والمحتوى الجديد. هنرجع قريبًا بشكل أفضل.
          </p>
        </section>
      </div>
    </main>
  );
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SLOW.DEV",
  url: siteUrl,
  description: "SLOW.DEV is currently under development.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const maintenanceMode = true;
  return (
    <html lang="ar" className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {maintenanceMode ? (
          <>
            <MaintenancePage />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
          </>
        ) : (
          <>
            <DevelopmentNotice />
            <SiteHeader />
            <div className="flex min-h-screen flex-1 flex-col pt-16">{children}</div>
            <HomeExpansion />
            <SiteFooter />
          </>
        )}
      </body>
    </html>
  );
}

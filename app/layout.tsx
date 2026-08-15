import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import HomeExpansion from "@/components/home/home-expansion";
import { DevelopmentNotice } from "@/components/layout/development-notice";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { CommandPalette } from "@/components/layout/command-palette";
import { isLocale, localeDirections, maintenanceCopy, type Locale } from "@/lib/i18n";

const siteUrl = "https://slows.dev";
const PREVIEW_COOKIE = "slow_preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "SLOW — Developer, Creator & Builder", template: "%s | SLOW" },
  description: "SLOW.DEV is currently under development.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: false },
};

export const viewport = { themeColor: "#060a13" };

function MaintenancePage({ locale }: { locale: Locale }) {
  const copy = maintenanceCopy[locale];

  return (
    <main className="min-h-screen bg-[#060a13] px-6 text-white">
      <div className="flex min-h-screen items-center justify-center text-center">
        <section className="max-w-2xl">
          <p className="text-5xl md:text-7xl">🚧</p>
          <p className="mt-8 text-xs uppercase tracking-[0.4em] text-[#d9edff]">{copy.eyebrow}</p>
          <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-7xl">{copy.title}</h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/65 md:text-lg">{copy.body}</p>
          <div className="mt-10">
            <LanguageSwitcher />
          </div>
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const requestCookies = await cookies();
  const headerLocale = requestHeaders.get("x-site-locale");
  const locale: Locale = isLocale(headerLocale) ? headerLocale : "en";
  const previewHeader = requestHeaders.get("x-site-preview") === "1";
  const previewCookie = Boolean(process.env.SLOW_PREVIEW_KEY) && requestCookies.get(PREVIEW_COOKIE)?.value === process.env.SLOW_PREVIEW_KEY;
  const previewEnabled = previewHeader || previewCookie;
  const maintenanceMode = !previewEnabled;

  return (
    <html lang={locale} dir={localeDirections[locale]} className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {maintenanceMode ? (
          <>
            <MaintenancePage locale={locale} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
          </>
        ) : (
          <>
            <DevelopmentNotice />
            <SiteHeader />
            <CommandPalette locale={locale} />
            <div className="flex min-h-screen flex-1 flex-col pt-16">{children}</div>
            <HomeExpansion />
            <SiteFooter />
          </>
        )}
      </body>
    </html>
  );
}

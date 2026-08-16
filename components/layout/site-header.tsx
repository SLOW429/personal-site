"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import MobileNav from "./mobile-nav";
import { LanguageSwitcher } from "./language-switcher";
import { SiteSearch } from "./site-search";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { navigation, navigationLabels } from "@/lib/site-config";

function localeFromPath(pathname: string): Locale {
  return isLocale(pathname.split("/").filter(Boolean)[0]) ? "ar" : "en";
}

export function SiteHeader() {
  const pathname = usePathname() || "/";
  const locale = localeFromPath(pathname);
  const copy = navigationLabels[locale];
  const previousLocale = useRef<Locale | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    if (previousLocale.current !== null && previousLocale.current !== locale) {
      window.dispatchEvent(new CustomEvent("slow:locale-change", { detail: locale }));
    }
    previousLocale.current = locale;
  }, [locale]);

  return (
    <header className="fixed inset-x-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <Link href={localizedPath("/", locale)} className="shrink-0 font-display text-xl font-bold tracking-tight text-[var(--foreground)]">
          SLOW<span className="text-[var(--gold)]">.</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {navigation.map(([key, href]) => (
            <Link key={href} href={localizedPath(href, locale)} className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]">
              {copy[key]}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <SiteSearch locale={locale} />
          <div className="hidden sm:block"><LanguageSwitcher /></div>
          <Link href={localizedPath("/contact", locale)} className="hidden rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--gold)] hover:text-[var(--gold-light)] lg:inline-flex">
            {copy.Contact}
          </Link>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}

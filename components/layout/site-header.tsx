"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "./mobile-nav";
import { SiteSearch } from "./site-search";
import { LanguageSwitcher } from "./language-switcher";
import { useLocale } from "./locale-provider";
import { navigation } from "@/lib/site-config";

export function SiteHeader() {
  const { t } = useLocale();
  const pathname = usePathname();

  function isCurrentRoute(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.07] bg-[#060a13]/75 shadow-[0_8px_32px_rgba(0,0,0,.12)] backdrop-blur-2xl supports-[backdrop-filter]:bg-[#060a13]/60" style={{ top: "env(safe-area-inset-top, 0px)" }}>
      <Link
        href="#site-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-[#d9edff] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#071018]"
      >
        {t("accessibility.skipToContent")}
      </Link>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="SLOW.DEV home" className="shrink-0 font-display text-xl font-black tracking-tight text-white">SLOW<span className="text-[#7ec4ff]">.</span></Link>
        <nav aria-label={t("nav.primary")} className="hidden items-center gap-0.5 xl:flex">
          {navigation.map(([key, href]) => {
            const current = isCurrentRoute(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={current ? "page" : undefined}
                className={`relative rounded-xl px-2.5 py-2 text-[13px] transition ${
                  current
                    ? "bg-white/[0.055] text-white after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-[#8fd3ff]"
                    : "text-white/50 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {t(key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <SiteSearch />
          <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} className="hidden rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-semibold text-white/75 transition hover:-translate-y-0.5 hover:border-white/20 hover:text-white md:inline-flex">{t("nav.startProject")}</Link>
          <LanguageSwitcher />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

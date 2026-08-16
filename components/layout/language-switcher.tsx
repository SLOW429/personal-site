"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, localizedPath, type Locale } from "@/lib/i18n";

const localeOrder: Locale[] = ["en", "ar", "tr"];

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";

  return (
    <nav aria-label="Language" className="flex items-center gap-1 rounded-full border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-1 backdrop-blur-xl">
      {localeOrder.map((locale) => (
        <Link
          key={locale}
          href={localizedPath(pathname, locale)}
          className="rounded-full px-2.5 py-1.5 text-[11px] font-semibold text-[var(--muted)] transition hover:bg-[var(--card-bg-hover)] hover:text-[var(--foreground)] aria-[current=page]:bg-[var(--gold)] aria-[current=page]:text-[#071018]"
          hrefLang={locale}
          aria-current={pathname === localizedPath(pathname, locale) ? "page" : undefined}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </nav>
  );
}

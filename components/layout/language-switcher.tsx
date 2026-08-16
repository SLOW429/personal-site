"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeLabels, localizedPath, type Locale } from "@/lib/i18n";

const localeOrder: Locale[] = ["en", "ar", "tr"];

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const router = useRouter();

  function switchLocale(locale: Locale) {
    const nextPath = localizedPath(pathname, locale);
    if (nextPath === pathname) return;
    router.push(nextPath, { scroll: false });
    router.refresh();
  }

  return (
    <nav aria-label="Language" className="flex items-center gap-1 rounded-full border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-1 backdrop-blur-xl">
      {localeOrder.map((locale) => {
        const active = pathname === localizedPath(pathname, locale);
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchLocale(locale)}
            className={`rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition hover:bg-[var(--card-bg-hover)] hover:text-[var(--foreground)] ${active ? "bg-[var(--gold)] text-[#071018]" : "text-[var(--muted)]"}`}
            aria-current={active ? "page" : undefined}
          >
            {localeLabels[locale]}
          </button>
        );
      })}
    </nav>
  );
}

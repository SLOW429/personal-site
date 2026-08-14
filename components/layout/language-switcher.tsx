"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, localizedPath, type Locale } from "@/lib/i18n";

const localeOrder: Locale[] = ["en", "ar", "tr"];

export function LanguageSwitcher() {
  const pathname = usePathname() || "/";

  return (
    <nav aria-label="Language" className="flex flex-wrap justify-center gap-2">
      {localeOrder.map((locale) => (
        <Link
          key={locale}
          href={localizedPath(pathname, locale)}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/75 transition hover:border-white/30 hover:bg-white/10 hover:text-white"
          hrefLang={locale}
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </nav>
  );
}

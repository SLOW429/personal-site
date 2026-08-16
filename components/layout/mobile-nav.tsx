"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";
import { localizedPath, type Locale } from "@/lib/i18n";
import { navigation, navigationLabels } from "@/lib/site-config";

export default function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const copy = navigationLabels[locale];

  return (
    <div className="md:hidden">
      <button type="button" aria-label={open ? copy.Close : copy.Open} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="relative z-[60] rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] p-2 text-[var(--foreground)]">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-[var(--card-border)] bg-[var(--background)]/95 px-4 py-4 shadow-2xl backdrop-blur-xl">
          <nav aria-label="Mobile" className="mx-auto grid max-w-6xl gap-1">
            {navigation.map(([key, href]) => (
              <Link key={href} href={localizedPath(href, locale)} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--card-bg-soft)] hover:text-[var(--foreground)]">
                {copy[key]}
              </Link>
            ))}
            <Link href={localizedPath("/contact", locale)} onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-[var(--gold)] px-4 py-3 text-center text-sm font-semibold text-[#071018]">
              {copy.Start}
            </Link>
            <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-3">
              <span className="text-xs font-medium text-[var(--muted)]">{copy.Language}</span>
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { localizedPath, type Locale } from "@/lib/i18n";

const links = [
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Tools", "/tools"],
  ["Blog", "/blog"],
  ["Creator", "/creator"],
  ["Gaming", "/gaming"],
] as const;

const labels: Record<Locale, Record<string, string>> = {
  en: { About: "About", Projects: "Projects", Services: "Services", Tools: "Tools", Blog: "Blog", Creator: "Creator", Gaming: "Gaming", Start: "Start a Project", Open: "Open navigation", Close: "Close navigation" },
  ar: { About: "من نحن", Projects: "المشاريع", Services: "الخدمات", Tools: "الأدوات", Blog: "المدونة", Creator: "صانع المحتوى", Gaming: "الألعاب", Start: "ابدأ مشروعًا", Open: "فتح القائمة", Close: "إغلاق القائمة" },
  tr: { About: "Hakkımda", Projects: "Projeler", Services: "Hizmetler", Tools: "Araçlar", Blog: "Blog", Creator: "İçerik", Gaming: "Oyun", Start: "Proje Başlat", Open: "Menüyü aç", Close: "Menüyü kapat" },
};

export default function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const copy = labels[locale];

  return (
    <div className="md:hidden">
      <button type="button" aria-label={open ? copy.Close : copy.Open} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] p-2 text-[var(--foreground)]">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-16 border-b border-[var(--card-border)] bg-[var(--background)]/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
          <nav aria-label="Mobile" className="mx-auto grid max-w-6xl gap-1">
            {links.map(([key, href]) => (
              <Link key={href} href={localizedPath(href, locale)} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--card-bg-soft)] hover:text-[var(--foreground)]">
                {copy[key]}
              </Link>
            ))}
            <Link href={localizedPath("/contact", locale)} onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-[var(--gold)] px-4 py-3 text-center text-sm font-semibold text-[#071018]">
              {copy.Start}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

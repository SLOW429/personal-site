"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/i18n";

const items = [
  ["Home", "/"], ["About", "/about"], ["Projects", "/projects"], ["Services", "/services"], ["Tools", "/tools"], ["Blog", "/blog"], ["Creator Hub", "/creator"], ["Gaming", "/gaming"], ["Now", "/now"], ["Docs", "/docs"], ["Status", "/status"], ["Contact", "/contact"],
] as const;

const labels: Record<Locale, Record<string, string>> = {
  en: { Home: "Home", About: "About", Projects: "Projects", Services: "Services", Tools: "Tools", Blog: "Blog", "Creator Hub": "Creator Hub", Gaming: "Gaming", Now: "Now", Docs: "Docs", Status: "Status", Contact: "Contact", Search: "Search SLOW.DEV...", None: "No results." },
  ar: { Home: "الرئيسية", About: "من نحن", Projects: "المشاريع", Services: "الخدمات", Tools: "الأدوات", Blog: "المدونة", "Creator Hub": "مركز المحتوى", Gaming: "الألعاب", Now: "الآن", Docs: "التوثيق", Status: "الحالة", Contact: "تواصل معنا", Search: "ابحث في SLOW.DEV...", None: "لا توجد نتائج." },
  tr: { Home: "Ana sayfa", About: "Hakkımda", Projects: "Projeler", Services: "Hizmetler", Tools: "Araçlar", Blog: "Blog", "Creator Hub": "İçerik Merkezi", Gaming: "Oyun", Now: "Şimdi", Docs: "Dokümantasyon", Status: "Durum", Contact: "İletişim", Search: "SLOW.DEV içinde ara...", None: "Sonuç bulunamadı." },
};

export function CommandPalette({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const copy = labels[locale];

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? items.filter(([label, href]) => `${copy[label]} ${label} ${href}`.toLowerCase().includes(needle)) : items;
  }, [query, copy]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/65 p-4 backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
      <div className="mx-auto mt-[12vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] shadow-[0_25px_120px_rgba(0,0,0,0.5)]" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--card-border)] p-4">
          <Search size={18} className="text-[var(--gold)]" />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.Search} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
          <kbd className="rounded-lg border border-[var(--card-border)] px-2 py-1 text-[10px] text-[var(--muted)]">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {filtered.map(([label, href]) => (
            <Link key={href} href={localizedPath(href, locale)} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition hover:bg-[var(--card-bg-hover)]">
              <span>{copy[label]}</span>
              <ArrowRight size={15} className="text-[var(--muted)]" />
            </Link>
          ))}
          {!filtered.length && <p className="px-4 py-8 text-center text-sm text-[var(--muted)]">{copy.None}</p>}
        </div>
      </div>
    </div>
  );
}

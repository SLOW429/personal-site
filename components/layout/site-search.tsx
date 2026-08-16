"use client";

import Link from "next/link";
import { Search, ArrowRight, Command, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { localizedPath, type Locale } from "@/lib/i18n";
import { searchIndex } from "@/lib/search-index";

const labels = {
  en: { button: "Search", placeholder: "Search projects, tools, articles...", empty: "No results", hint: "Type to search" },
  ar: { button: "بحث", placeholder: "ابحث في المشاريع والأدوات والمقالات...", empty: "لا توجد نتائج", hint: "اكتب للبحث" },
} satisfies Record<Locale, Record<string, string>>;

export function SiteSearch({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const copy = labels[locale];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return searchIndex.slice(0, 8);
    return searchIndex.filter((item) => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(needle)).slice(0, 12);
  }, [query]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={copy.button} className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] px-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--gold)]">
        <Search size={16} />
        <span className="hidden lg:inline">{copy.button}</span>
        <kbd className="hidden rounded-md border border-[var(--card-border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)] sm:inline-flex"><Command size={10} />K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-[2000] bg-black/65 p-4 backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
          <div className="mx-auto mt-[8vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[var(--card-border)] p-4">
              <Search size={18} className="text-[var(--gold)]" />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
              <button type="button" onClick={() => setOpen(false)} aria-label={locale === "ar" ? "إغلاق" : "Close"} className="rounded-lg p-2 text-[var(--muted)] hover:bg-[var(--card-bg-hover)]"><X size={17} /></button>
            </div>
            <div className="max-h-[65vh] overflow-y-auto p-2">
              {results.map((item) => (
                <Link key={item.href} href={localizedPath(item.href, locale)} onClick={() => setOpen(false)} className="group flex items-start gap-4 rounded-2xl px-4 py-3 transition hover:bg-[var(--card-bg-hover)]">
                  <span className="mt-0.5 min-w-14 rounded-full border border-[var(--card-border)] px-2 py-1 text-center text-[10px] uppercase tracking-wider text-[var(--gold)]">{item.type}</span>
                  <span className="min-w-0 flex-1"><span className="block font-semibold text-[var(--foreground)]">{item.title}</span><span className="mt-1 block text-xs leading-5 text-[var(--muted)]">{item.description}</span></span>
                  <ArrowRight size={15} className="mt-1 shrink-0 text-[var(--muted)] transition group-hover:translate-x-1 group-hover:text-[var(--gold)]" />
                </Link>
              ))}
              {!results.length && <p className="px-4 py-12 text-center text-sm text-[var(--muted)]">{copy.empty}</p>}
              {!query && <p className="px-4 pb-3 pt-2 text-center text-[11px] text-[var(--muted)]">{copy.hint} · Ctrl/Cmd + K</p>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

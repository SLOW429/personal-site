"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { localizedPath, type Locale } from "@/lib/i18n";

const items = [
  ["Home", "/"],
  ["About", "/about"],
  ["Projects", "/projects"],
  ["Services", "/services"],
  ["Tools", "/tools"],
  ["Blog", "/blog"],
  ["Creator Hub", "/creator"],
  ["Gaming", "/gaming"],
  ["Now", "/now"],
  ["Docs", "/docs"],
  ["Status", "/status"],
  ["Contact", "/contact"],
] as const;

export function CommandPalette({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

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
    return needle ? items.filter(([label, href]) => `${label} ${href}`.toLowerCase().includes(needle)) : items;
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/65 p-4 backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
      <div className="mx-auto mt-[12vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] shadow-[0_25px_120px_rgba(0,0,0,0.5)]" onMouseDown={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[var(--card-border)] p-4">
          <Search size={18} className="text-[var(--gold)]" />
          <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search SLOW.DEV..." className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]" />
          <kbd className="rounded-lg border border-[var(--card-border)] px-2 py-1 text-[10px] text-[var(--muted)]">ESC</kbd>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {filtered.map(([label, href]) => (
            <Link key={href} href={localizedPath(href, locale)} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition hover:bg-[var(--card-bg-hover)]">
              <span>{label}</span>
              <ArrowRight size={15} className="text-[var(--muted)]" />
            </Link>
          ))}
          {!filtered.length && <p className="px-4 py-8 text-center text-sm text-[var(--muted)]">No results.</p>}
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowLeft, ArrowRight, Command, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { searchIndex } from "@/lib/search-index";
import { useLocale } from "./locale-provider";

export function SiteSearch() {
  const router = useRouter();
  const { locale, t, text } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(locale);
    const localized = searchIndex.map((item, index) => ({
      ...item,
      index,
      title: text(item.title),
      description: text(item.description),
      searchTitle: `${item.title} ${text(item.title)}`.toLocaleLowerCase(locale),
      searchKeywords: `${item.keywords} ${text(item.keywords)}`.toLocaleLowerCase(locale),
      searchDescription: `${item.description} ${text(item.description)}`.toLocaleLowerCase(locale),
    }));

    if (!needle) return localized.slice(0, 8);

    return localized
      .map((item) => {
        const score =
          item.searchTitle === needle ? 100 :
          item.searchTitle.startsWith(needle) ? 80 :
          item.searchTitle.includes(needle) ? 60 :
          item.searchKeywords.includes(needle) ? 40 :
          item.searchDescription.includes(needle) ? 20 :
          item.type.toLocaleLowerCase(locale).includes(needle) ? 10 : 0;
        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((left, right) => right.score - left.score || left.index - right.index)
      .slice(0, 12);
  }, [locale, query, text]);
  const selectedIndex = results.length ? activeIndex % results.length : 0;

  useEffect(() => {
    const onShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      } else if (event.key === "Escape" && open) {
        close();
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());

    const onTab = (event: globalThis.KeyboardEvent) => {
      const dialog = dialogRef.current;
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onTab);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onTab);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      } else {
        triggerRef.current?.focus();
      }
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      document.getElementById(`site-search-result-${selectedIndex}`)?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [open, selectedIndex]);

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((current) => (current + direction + results.length) % results.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const selected = results[selectedIndex] ?? results[0];
      if (selected) {
        router.push(selected.href);
        close();
      }
    }
  }

  const DirectionArrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("search.button")}
        aria-keyshortcuts="Control+K Meta+K"
        className="inline-flex h-10 items-center gap-2 rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] px-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--gold)] hover:bg-white/[0.07]"
      >
        <Search size={16} />
        <span className="hidden lg:inline">{t("search.button")}</span>
        <kbd dir="ltr" className="hidden items-center gap-0.5 rounded-md border border-[var(--card-border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)] sm:inline-flex"><Command size={10} />K</kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[2000] overflow-y-auto bg-black/65 p-3 backdrop-blur-md sm:p-5"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("search.button")}
            className="mx-auto mt-[max(1.5rem,8vh)] w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] shadow-[0_32px_120px_rgba(0,0,0,.55)]"
          >
            <div className="flex items-center gap-3 border-b border-[var(--card-border)] p-3 sm:p-4">
              <Search size={18} className="text-[var(--gold)]" />
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                aria-label={t("search.placeholder")}
                aria-autocomplete="list"
                aria-expanded="true"
                aria-controls="site-search-results"
                aria-activedescendant={results[selectedIndex] ? `site-search-result-${selectedIndex}` : undefined}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={t("search.placeholder")}
                maxLength={120}
                className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
              />
              <button type="button" onClick={close} aria-label={t("search.close")} className="shrink-0 rounded-lg p-2 text-[var(--muted)] transition hover:bg-[var(--card-bg-hover)] hover:text-white"><X size={17} /></button>
            </div>
            <div id="site-search-results" role="listbox" aria-label={t("search.button")} className="max-h-[min(65vh,36rem)] overflow-y-auto p-2">
              {results.map((item, index) => {
                const active = selectedIndex === index;
                return (
                  <Link
                    key={item.href}
                    id={`site-search-result-${index}`}
                    href={item.href}
                    role="option"
                    aria-selected={active}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onClick={close}
                    className={`group flex items-start gap-3 rounded-2xl px-3 py-3 transition sm:gap-4 sm:px-4 ${
                      active ? "bg-white/[0.07]" : "hover:bg-[var(--card-bg-hover)]"
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 rounded-full border border-[var(--card-border)] px-2 py-1 text-center text-[10px] uppercase tracking-wider text-[var(--gold)]">{item.type}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-[var(--foreground)]">{item.title}</span>
                      <span className="mt-1 block text-xs leading-5 text-[var(--muted)]">{item.description}</span>
                    </span>
                    <DirectionArrow
                      size={15}
                      className={`mt-1 shrink-0 text-[var(--muted)] transition ${
                        locale === "ar" ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
                      } group-hover:text-[var(--gold)]`}
                    />
                  </Link>
                );
              })}
              {!results.length && <p className="px-4 py-12 text-center text-sm text-[var(--muted)]">{t("search.empty")}</p>}
              {!query && (
                <p className="px-4 pb-3 pt-2 text-center text-[11px] text-[var(--muted)]">
                  {t("search.hint")} · <span dir="ltr">Ctrl/Cmd + K</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

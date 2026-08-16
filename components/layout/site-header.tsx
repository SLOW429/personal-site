import { headers } from "next/headers";
import Link from "next/link";
import MobileNav from "./mobile-nav";
import { LanguageSwitcher } from "./language-switcher";
import { SiteSearch } from "./site-search";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

const links = [["About", "/about"], ["Projects", "/projects"], ["Services", "/services"], ["Tools", "/tools"], ["Blog", "/blog"], ["Creator", "/creator"]] as const;

export async function SiteHeader() {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get("x-site-locale");
  const locale: Locale = isLocale(headerLocale) ? headerLocale : "en";
  const labelMap: Record<Locale, Record<string, string>> = {
    en: { About: "About", Projects: "Projects", Services: "Services", Tools: "Tools", Blog: "Blog", Creator: "Creator", Contact: "Contact" },
    ar: { About: "من نحن", Projects: "المشاريع", Services: "الخدمات", Tools: "الأدوات", Blog: "المدونة", Creator: "صانع المحتوى", Contact: "تواصل معنا" },
    tr: { About: "Hakkımda", Projects: "Projeler", Services: "Hizmetler", Tools: "Araçlar", Blog: "Blog", Creator: "İçerik", Contact: "İletişim" },
  };
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <Link href={localizedPath("/", locale)} className="shrink-0 font-display text-xl font-bold tracking-tight text-[var(--foreground)]">SLOW<span className="text-[var(--gold)]">.</span></Link>
        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {links.map(([key, href]) => <Link key={href} href={localizedPath(href, locale)} className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]">{labelMap[locale][key]}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <SiteSearch locale={locale} />
          <div className="hidden sm:block"><LanguageSwitcher /></div>
          <Link href={localizedPath("/contact", locale)} className="hidden rounded-xl border border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--gold)] hover:text-[var(--gold-light)] lg:inline-flex">{labelMap[locale].Contact}</Link>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}

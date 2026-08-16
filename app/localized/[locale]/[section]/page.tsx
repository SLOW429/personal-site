import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sectionCopy } from "@/lib/section-i18n";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

const validSections = ["about", "services", "tools"] as const;
type Section = (typeof validSections)[number];

export function generateStaticParams() {
  return validSections.flatMap((section) => ["ar", "tr"].map((locale) => ({ locale, section })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }): Promise<Metadata> {
  const { locale: rawLocale, section: rawSection } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en" || !validSections.includes(rawSection as Section)) return {};
  const locale = rawLocale as Exclude<Locale, "en">;
  const page = sectionCopy[locale][rawSection];
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `/${locale}/${rawSection}`,
      languages: {
        en: `https://slows.dev/${rawSection}`,
        ar: `https://slows.dev/ar/${rawSection}`,
        tr: `https://slows.dev/tr/${rawSection}`,
        "x-default": `https://slows.dev/${rawSection}`,
      },
    },
    openGraph: {
      title: `${page.title} | SLOW`,
      description: page.description,
      url: `https://slows.dev/${locale}/${rawSection}`,
    },
  };
}

export default async function LocalizedSectionPage({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale: rawLocale, section: rawSection } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en" || !validSections.includes(rawSection as Section)) notFound();

  const locale = rawLocale as Exclude<Locale, "en">;
  const page = sectionCopy[locale][rawSection];

  return (
    <main className="min-h-[70vh] px-5 py-16 md:py-24" dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <section className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV / {rawSection}</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl">{page.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{page.description}</p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--foreground)]/80">{page.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {page.groups.map((group) => (
            <article key={group.title} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[0_0_60px_rgba(126,196,255,0.05)] backdrop-blur-xl">
              <h2 className="font-display text-xl font-bold text-[var(--foreground)]">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="border-s-[var(--gold)]/40 border-s ps-4 text-sm leading-6 text-[var(--muted)]">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {page.links.map(([label, href]) => (
            <Link key={href} href={localizedPath(href, locale)} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-5 py-3 font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--gold)]">
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

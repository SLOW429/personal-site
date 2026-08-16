import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getHomeContent } from "@/lib/home-content";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "tr" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en") return {};
  const content = getHomeContent(rawLocale);
  return {
    title: `SLOW — ${content.eyebrow}`,
    description: content.description,
    alternates: {
      canonical: `/${rawLocale}`,
      languages: {
        en: "https://slows.dev/",
        ar: "https://slows.dev/ar",
        tr: "https://slows.dev/tr",
        "x-default": "https://slows.dev/",
      },
    },
    openGraph: {
      title: `SLOW — ${content.eyebrow}`,
      description: content.description,
      url: `https://slows.dev/${rawLocale}`,
    },
  };
}

export default async function LocalizedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale) || rawLocale === "en") notFound();
  const locale = rawLocale as Exclude<Locale, "en">;
  const content = getHomeContent(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";

  const links = [
    [content.primaryCta, "/projects"],
    [content.secondaryCta, "/contact"],
    [content.toolsTitle, "/tools"],
    [content.creatorTitle, "/creator"],
  ] as const;

  return (
    <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <section className="flex min-h-[72vh] items-center">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / {content.eyebrow}</p>
            <h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">{content.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{content.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              {links.map(([label, href], index) => (
                <Link key={href} href={`/${locale}${href}`} className={index < 2 ? "rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]" : "rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold"}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-5 pb-24 md:grid-cols-2">
          {[
            [content.projectsTitle, content.projectsDescription, "/projects"],
            [content.creatorTitle, content.creatorDescription, "/creator"],
            [content.toolsTitle, content.toolsDescription, "/tools"],
            [content.servicesTitle, content.servicesDescription, "/services"],
          ].map(([title, description, href]) => (
            <Link key={href} href={`/${locale}${href}`} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--gold)]">
              <h2 className="font-display text-2xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-[var(--muted)]">{description}</p>
            </Link>
          ))}
        </section>

        <section className="rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-8 text-center md:p-12">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV</p>
          <h2 className="mt-4 font-display text-4xl font-bold">{content.contactCta}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--muted)]">{content.description}</p>
          <Link href={`/${locale}/contact`} className="mt-7 inline-flex rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">{content.secondaryCta}</Link>
        </section>
      </div>
    </main>
  );
}

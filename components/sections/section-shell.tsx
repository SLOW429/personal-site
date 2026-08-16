import Link from "next/link";

export type SectionGroup = { title: string; items: string[] };
export type SectionLink = [label: string, href: string];
export type SectionContent = {
  title: string;
  description: string;
  intro: string;
  groups: SectionGroup[];
  links: SectionLink[];
};

function ActionLink({ label, href }: SectionLink) {
  const external = /^https?:\/\//.test(href);
  const className = "rounded-2xl bg-gradient-to-r from-[var(--gold-light)] to-[var(--gold)] px-5 py-3 font-semibold text-[#071018] transition hover:-translate-y-0.5";

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>{label}</a>
  ) : (
    <Link href={href} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-5 py-3 font-semibold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--gold)]">
      {label}
    </Link>
  );
}

export function SectionShell({ section, content }: { section: string; content: SectionContent }) {
  return (
    <main dir="ltr" lang="en" className="min-h-[70vh] px-5 py-16 md:py-24">
      <section className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV / {section}</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-[var(--foreground)] md:text-6xl">{content.title}</h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">{content.description}</p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--foreground)]/80">{content.intro}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {content.groups.map((group) => (
            <article key={group.title} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-[0_0_60px_rgba(126,196,255,0.05)] backdrop-blur-xl">
              <h2 className="font-display text-xl font-bold text-[var(--foreground)]">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="border-l border-[var(--gold)]/40 pl-4 text-sm leading-6 text-[var(--muted)]">{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {content.links.map(([label, href]) => <ActionLink key={`${label}-${href}`} label={label} href={href} />)}
        </div>
      </section>
    </main>
  );
}

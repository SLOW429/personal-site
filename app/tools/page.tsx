import type { Metadata } from "next";
import Link from "next/link";
import ToolSuite from "../../components/tools/tool-suite";
import QrGenerator from "../../components/tools/qr-generator";

export const metadata: Metadata = {
  title: "SLOW Tools | Free Developer Utilities",
  description: "Fast, privacy-friendly tools from SLOW for developers, creators, and everyday web work.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "SLOW Tools | Free Developer Utilities",
    description: "Fast, privacy-friendly browser tools for formatting, encoding, timestamps, QR codes, and more.",
    url: "https://slows.dev/tools",
  },
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW TOOLS</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Useful tools. No signup. No nonsense.</h1>
          <p className="mt-6 text-lg leading-8 text-[var(--muted)]">A growing collection of fast browser-based utilities. The first tools run locally in your browser whenever possible, so your input does not need to leave your device.</p>
        </header>

        <div className="mt-12"><ToolSuite /></div>
        <div className="mt-6"><QrGenerator /></div>

        <section className="mt-16 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Built in public</p>
          <h2 className="mt-3 text-2xl font-semibold">Every tool gets a real route and a useful job.</h2>
          <p className="mt-3 max-w-3xl leading-7 text-[var(--muted)]">More SEO helpers, image utilities, creator tools, and developer utilities can be added without changing the core architecture.</p>
          <Link href="/contact" className="mt-6 inline-flex rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)]">Suggest a tool</Link>
        </section>
      </div>
    </main>
  );
}

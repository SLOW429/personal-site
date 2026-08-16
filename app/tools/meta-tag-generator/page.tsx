import type { Metadata } from "next";
import MetaTagGenerator from "@/components/tools/meta-tag-generator";

export const metadata: Metadata = {
  title: "Next.js Meta Tag Generator | SLOW Tools",
  description: "Generate a copy-ready Next.js App Router metadata object.",
  alternates: { canonical: "/tools/meta-tag-generator" },
};

export default function MetaTagGeneratorPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW TOOLS / SEO</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">Next.js Meta Tag Generator</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">Generate metadata you can paste directly into a Next.js App Router page.</p>
        <div className="mt-10"><MetaTagGenerator /></div>
      </div>
    </main>
  );
}

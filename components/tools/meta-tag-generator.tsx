"use client";

import { useMemo, useState } from "react";
import { LocalizedCopy } from "@/components/layout/localized-text";
import { useLocale } from "@/components/layout/locale-provider";

export default function MetaTagGenerator() {
  const { text } = useLocale();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("https://example.com");
  const [siteName, setSiteName] = useState("My Site");
  const [image, setImage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

  const code = useMemo(() => `export const metadata = {\n  title: ${JSON.stringify(title || "Your Page Title")},\n  description: ${JSON.stringify(description || "Your meta description")},\n  alternates: { canonical: ${JSON.stringify(url)} },\n  openGraph: {\n    title: ${JSON.stringify(title || "Your Page Title")},\n    description: ${JSON.stringify(description || "Your meta description")},\n    url: ${JSON.stringify(url)},\n    siteName: ${JSON.stringify(siteName)},\n    type: "website",${image ? `\n    images: [{ url: ${JSON.stringify(image)} }],` : ""}\n  },\n};`, [title, description, url, siteName, image]);

  async function copy() {
    setCopyError("");
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopyError("Clipboard access is unavailable. Copy the generated code manually.");
    }
  }

  return <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
    <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]"><LocalizedCopy source="SEO" /></p>
    <h2 className="mt-2 text-2xl font-semibold"><LocalizedCopy source="Next.js Meta Tag Generator" /></h2>
    <p className="mt-2 text-sm leading-6 text-[var(--muted)]"><LocalizedCopy source="Generate a copy-ready metadata object for a Next.js App Router page." /></p>
    <div className="mt-5 grid gap-3">
      <input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={title} onChange={e => setTitle(e.target.value)} placeholder={text("Page title")} />
      <textarea className="min-h-24 rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm outline-none focus:border-[var(--gold)]" value={description} onChange={e => setDescription(e.target.value)} placeholder={text("Meta description")} />
      <input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={url} onChange={e => setUrl(e.target.value)} placeholder={text("Canonical URL")} />
      <input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={siteName} onChange={e => setSiteName(e.target.value)} placeholder={text("Site name")} />
      <input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={image} onChange={e => setImage(e.target.value)} placeholder={text("Optional OG image URL")} />
    </div>
    <div className="mt-4 flex gap-2"><button type="button" onClick={copy} className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold hover:border-[var(--gold)]">{copied ? text("Copied") : text("Copy metadata")}</button></div>
    {copyError && <p role="alert" className="mt-3 text-xs text-red-300">{text(copyError)}</p>}
    <pre className="mt-4 max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-xs leading-6">{code}</pre>
  </div>;
}

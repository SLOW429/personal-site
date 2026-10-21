"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import QrGenerator from "./qr-generator";
import ImageCompressorTool from "./image-compressor";

const inputClass =
  "min-h-40 w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none transition focus:border-[var(--gold)]";
const buttonClass =
  "rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  async function copy() {
    if (!value) return;
    setError("");
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
      setError("Clipboard access is unavailable. Copy the result manually.");
    }
  }
  return <div><button type="button" onClick={copy} disabled={!value} className={buttonClass}>{copied ? "Copied" : "Copy"}</button>{error && <p role="alert" className="mt-2 text-xs text-red-300">{error}</p>}</div>;
}

function ToolCard({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return <article className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl"><p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{eyebrow}</p><h2 className="mt-2 text-2xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{description}</p>{children}</article>;
}

function JsonTool() {
  const [input, setInput] = useState('{"hello":"world","items":[1,2,3]}'); const [output, setOutput] = useState(""); const [error, setError] = useState("");
  function format() { try { setOutput(JSON.stringify(JSON.parse(input), null, 2)); setError(""); } catch (err) { setOutput(""); setError(err instanceof Error ? err.message : "Invalid JSON"); } }
  return <ToolCard eyebrow="Developer" title="JSON Formatter" description="Validate and pretty-print JSON locally in your browser."><textarea aria-label="JSON input" className={`${inputClass} mt-6`} value={input} onChange={e => setInput(e.target.value)} /><div className="mt-3 flex flex-wrap gap-2"><button type="button" className={buttonClass} onClick={format}>Format & Validate</button><button type="button" className={buttonClass} onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</button><CopyButton value={output} /></div>{error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}{output && <pre className="mt-4 max-h-80 overflow-auto rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm leading-6">{output}</pre>}</ToolCard>;
}

function Base64Tool() {
  const [input, setInput] = useState(""); const [mode, setMode] = useState<"encode" | "decode">("encode");
  const output = useMemo(() => { if (!input) return ""; try { if (mode === "encode") return btoa(unescape(encodeURIComponent(input))); return new TextDecoder().decode(Uint8Array.from(atob(input), c => c.charCodeAt(0))); } catch { return "Invalid Base64 input"; } }, [input, mode]);
  return <ToolCard eyebrow="Developer" title="Base64 Encoder / Decoder" description="Convert text without sending it to a server."><div className="mt-5 flex gap-2"><button type="button" className={buttonClass} onClick={() => setMode("encode")}>Encode</button><button type="button" className={buttonClass} onClick={() => setMode("decode")}>Decode</button></div><textarea aria-label="Base64 input" className={`${inputClass} mt-4`} value={input} onChange={e => setInput(e.target.value)} placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."} /><div className="mt-3 flex flex-wrap gap-2"><CopyButton value={output.includes("Invalid Base64") ? "" : output} /><button type="button" className={buttonClass} onClick={() => setInput("")}>Clear</button></div><pre className="mt-4 min-h-28 whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm leading-6">{output || "Your result will appear here."}</pre></ToolCard>;
}

function TimestampTool() {
  const [value, setValue] = useState("1700000000"); const parsed = Number(value); const date = Number.isFinite(parsed) && value.trim() !== "" ? new Date(parsed < 1e12 ? parsed * 1000 : parsed) : null; const iso = date && !Number.isNaN(date.getTime()) ? date.toISOString() : "Invalid timestamp";
  return <ToolCard eyebrow="Developer" title="Timestamp Converter" description="Convert Unix timestamps to readable UTC dates."><input aria-label="Unix timestamp" className="mt-5 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-mono text-sm outline-none focus:border-[var(--gold)]" value={value} onChange={e => setValue(e.target.value)} inputMode="numeric" /><div className="mt-3 flex flex-wrap gap-2"><button type="button" className={buttonClass} onClick={() => setValue(String(Math.floor(Date.now() / 1000)))}>Use current time</button><CopyButton value={iso === "Invalid timestamp" ? "" : iso} /></div><div className="mt-4 rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5"><p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">UTC</p><p className="mt-2 break-words font-mono text-sm">{iso}</p></div></ToolCard>;
}

function SeoPreviewTool() {
  const [title, setTitle] = useState("SLOW.DEV — Developer, Creator & Builder"); const [description, setDescription] = useState("Useful developer tools, projects, services, gaming and creator content from SLOW."); const [url, setUrl] = useState("https://slows.dev"); const [image, setImage] = useState("https://slows.dev/banner-poster.jpg");
  return <ToolCard eyebrow="SEO" title="SEO & Social Preview" description="Preview a basic search result and social card before publishing a page."><div className="mt-5 grid gap-3"><input className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={title} onChange={e => setTitle(e.target.value)} placeholder="Page title"/><textarea className="min-h-28 w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm leading-6 outline-none focus:border-[var(--gold)]" value={description} onChange={e => setDescription(e.target.value)} placeholder="Meta description"/><input className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com/page"/><input className="w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" value={image} onChange={e => setImage(e.target.value)} placeholder="Social image URL"/></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5"><p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Search preview</p><p className="mt-3 text-xl font-semibold text-[var(--gold-light)]">{title || "Untitled page"}</p><p className="mt-1 break-all text-xs text-emerald-300">{url || "https://example.com"}</p><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description || "Add a description to preview the result."}</p><div className="mt-4 flex gap-3 text-xs text-[var(--muted)]"><span>{title.length} title chars</span><span>{description.length} description chars</span></div></div><div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)]">{image ? <Image src={image} alt="Social preview" width={1200} height={630} unoptimized className="h-40 w-full object-cover"/> : <div className="flex h-40 items-center justify-center text-sm text-[var(--muted)]">No image URL</div>}<div className="p-5"><p className="font-semibold">{title || "Social title"}</p><p className="mt-2 text-sm text-[var(--muted)]">{description || "Social description"}</p></div></div></div></ToolCard>;
}

function UrlTool() {
  const [input, setInput] = useState("https://slows.dev/?q=hello world&lang=ar"); const [mode, setMode] = useState<"encode" | "decode">("encode"); const result = useMemo(() => { try { return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input); } catch { return "Invalid URL-encoded input"; } }, [input, mode]);
  return <ToolCard eyebrow="Developer" title="URL Encoder / Decoder" description="Safely encode or decode query text and URL components in your browser."><div className="mt-5 flex gap-2"><button className={buttonClass} onClick={() => setMode("encode")}>Encode</button><button className={buttonClass} onClick={() => setMode("decode")}>Decode</button></div><textarea className={`${inputClass} mt-4`} value={input} onChange={e => setInput(e.target.value)} /><div className="mt-3 flex flex-wrap gap-2"><CopyButton value={result.includes("Invalid URL") ? "" : result}/><button className={buttonClass} onClick={() => setInput("")}>Clear</button></div><pre className="mt-4 min-h-24 whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm">{result || "Your result will appear here."}</pre></ToolCard>;
}

function UuidTool() {
  const [value, setValue] = useState(""); return <ToolCard eyebrow="Developer" title="UUID Generator" description="Generate a standards-based UUID locally without an API call."><div className="mt-5 flex flex-wrap gap-2"><button className={buttonClass} onClick={() => setValue(crypto.randomUUID())}>Generate UUID</button><CopyButton value={value}/></div><div className="mt-4 rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5 font-mono text-sm break-all">{value || "Click Generate UUID"}</div></ToolCard>;
}

function MetaTagTool() {
  const [title, setTitle] = useState(""); const [description, setDescription] = useState(""); const [url, setUrl] = useState("https://example.com"); const [image, setImage] = useState(""); const [siteName, setSiteName] = useState("My Site"); const code = `export const metadata = {\n  title: ${JSON.stringify(title || "Your Page Title")},\n  description: ${JSON.stringify(description || "Your meta description")},\n  alternates: { canonical: ${JSON.stringify(url)} },\n  openGraph: {\n    title: ${JSON.stringify(title || "Your Page Title")},\n    description: ${JSON.stringify(description || "Your meta description")},\n    url: ${JSON.stringify(url)},\n    siteName: ${JSON.stringify(siteName)},${image ? `\n    images: [{ url: ${JSON.stringify(image)} }],` : ""}\n    type: "website",\n  },\n};`;
  return <ToolCard eyebrow="SEO" title="Next.js Meta Generator" description="Generate a copy-ready metadata object for a Next.js App Router page."><div className="mt-5 grid gap-3"><input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Page title"/><textarea className="min-h-24 rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Meta description"/><input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm" value={url} onChange={e=>setUrl(e.target.value)} placeholder="Canonical URL"/><input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm" value={siteName} onChange={e=>setSiteName(e.target.value)} placeholder="Site name"/><input className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm" value={image} onChange={e=>setImage(e.target.value)} placeholder="Optional OG image URL"/></div><div className="mt-4"><CopyButton value={code}/></div><pre className="mt-4 overflow-auto rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-xs leading-6">{code}</pre></ToolCard>;
}

export default function ToolSuite() {
  return <div className="grid gap-6 lg:grid-cols-2"><JsonTool/><Base64Tool/><TimestampTool/><SeoPreviewTool/><UrlTool/><UuidTool/><MetaTagTool/><ToolCard eyebrow="Image" title="Image Compressor" description="Convert an image to WebP locally and preview the size reduction before downloading."><ImageCompressorTool /></ToolCard><QrGenerator/></div>;
}

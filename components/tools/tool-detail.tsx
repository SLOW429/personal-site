"use client";

import { useMemo, useState } from "react";

const input = "mt-4 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm outline-none focus:border-[var(--gold)]";
const button = "rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)] disabled:opacity-40";

function Copy({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return <button className={button} disabled={!value} onClick={async () => { try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200); } catch {} }}>{copied ? "Copied" : "Copy"}</button>;
}

function Json() {
  const [value, setValue] = useState('{"hello":"world","items":[1,2,3]}');
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  function format() { try { setOutput(JSON.stringify(JSON.parse(value), null, 2)); setError(""); } catch (e) { setOutput(""); setError(e instanceof Error ? e.message : "Invalid JSON"); } }
  return <><textarea className={`${input} min-h-56 resize-y`} value={value} onChange={e => setValue(e.target.value)} aria-label="JSON input" /><div className="mt-3 flex gap-2"><button className={button} onClick={format}>Format & Validate</button><Copy value={output}/></div>{error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}{output && <pre className="mt-4 max-h-[28rem] overflow-auto rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm leading-6">{output}</pre>}</>;
}

function Base64() {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const result = useMemo(() => { try { if (!value) return ""; if (mode === "encode") return btoa(unescape(encodeURIComponent(value))); return new TextDecoder().decode(Uint8Array.from(atob(value), c => c.charCodeAt(0))); } catch { return "Invalid Base64 input"; } }, [value, mode]);
  return <><div className="mt-4 flex gap-2"><button className={button} onClick={() => setMode("encode")}>Encode</button><button className={button} onClick={() => setMode("decode")}>Decode</button></div><textarea className={`${input} min-h-56 resize-y`} value={value} onChange={e => setValue(e.target.value)} placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."}/><div className="mt-3"><Copy value={result.startsWith("Invalid") ? "" : result}/></div><pre className="mt-4 min-h-32 whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm">{result || "Your result will appear here."}</pre></>;
}

function Seo() {
  const [title, setTitle] = useState("SLOW.DEV — Developer, Creator & Builder");
  const [description, setDescription] = useState("Useful developer tools, projects, services, gaming and creator content from SLOW.");
  const [url, setUrl] = useState("https://slows.dev");
  const [image, setImage] = useState("https://slows.dev/banner-poster.jpg");
  return <><div className="mt-4 grid gap-3"><input className={input} value={title} onChange={e => setTitle(e.target.value)} placeholder="Page title"/><textarea className={`${input} min-h-28`} value={description} onChange={e => setDescription(e.target.value)} placeholder="Meta description"/><input className={input} value={url} onChange={e => setUrl(e.target.value)} placeholder="Canonical URL"/><input className={input} value={image} onChange={e => setImage(e.target.value)} placeholder="Social image URL"/></div><div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5"><p className="text-xs uppercase tracking-[.25em] text-[var(--muted)]">Search preview</p><p className="mt-3 text-xl font-semibold text-[var(--gold-light)]">{title || "Untitled page"}</p><p className="mt-1 break-all text-xs text-emerald-300">{url}</p><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description}</p><p className="mt-4 text-xs text-[var(--muted)]">{title.length} title chars · {description.length} description chars</p></div><div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)]">{image ? <img src={image} alt="Social preview" className="h-44 w-full object-cover"/> : <div className="h-44"/>}<div className="p-5"><p className="font-semibold">{title || "Social title"}</p><p className="mt-2 text-sm text-[var(--muted)]">{description || "Social description"}</p></div></div></div></>;
}

function ImageCompressor() {
  const [quality, setQuality] = useState(.8);
  const [source, setSource] = useState<{url:string,size:number}|null>(null);
  const [result, setResult] = useState<{url:string,size:number}|null>(null);
  function compress(file: File) { const url = URL.createObjectURL(file); setSource({url,size:file.size}); const img = new Image(); img.onload = () => { const canvas = document.createElement("canvas"); canvas.width=img.naturalWidth; canvas.height=img.naturalHeight; const ctx=canvas.getContext("2d"); if(!ctx)return; ctx.drawImage(img,0,0); canvas.toBlob(blob => { if(blob) setResult({url:URL.createObjectURL(blob),size:blob.size}); },"image/webp",quality); }; img.src=url; }
  const savings = source && result ? Math.max(0, Math.round((1-result.size/source.size)*100)) : 0;
  return <><label className="mt-4 block rounded-2xl border border-dashed border-[var(--card-border-strong)] p-6 text-center cursor-pointer"><input type="file" accept="image/*" className="sr-only" onChange={e => { const f=e.target.files?.[0]; if(f) compress(f); }}/><span className="font-semibold">Choose an image</span><span className="mt-2 block text-sm text-[var(--muted)]">Everything stays in your browser.</span></label><label className="mt-5 block text-sm">Quality <strong>{Math.round(quality*100)}%</strong><input type="range" min="0.2" max="1" step="0.05" value={quality} onChange={e=>setQuality(Number(e.target.value))} className="mt-2 w-full"/></label>{source && <img src={source.url} alt="Original" className="mt-5 max-h-72 w-full rounded-2xl object-contain"/>}{source && result && <div className="mt-5 grid gap-3 sm:grid-cols-3 text-sm"><div>Original<br/><b>{Math.round(source.size/1024)} KB</b></div><div>WebP<br/><b>{Math.round(result.size/1024)} KB</b></div><div>Saved<br/><b>{savings}%</b></div></div>}{result && <a href={result.url} download="slow-compressed.webp" className="mt-5 inline-flex rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[#071018]">Download WebP</a>}</>;
}

const tools = {
  "json-formatter": { title: "JSON Formatter & Validator", description: "Format, validate, and inspect JSON locally without uploading your data.", Component: Json },
  "base64": { title: "Base64 Encoder & Decoder", description: "Encode and decode UTF-8 text locally in your browser.", Component: Base64 },
  "seo-preview": { title: "SEO & Social Preview", description: "Preview titles, descriptions, URLs, and social images before publishing.", Component: Seo },
  "image-compressor": { title: "Image Compressor", description: "Compress images to WebP locally and download the result without uploading files.", Component: ImageCompressor },
} as const;

export type ToolSlug = keyof typeof tools;

export default function ToolDetail({ slug }: { slug: ToolSlug }) {
  const tool = tools[slug];
  return <main className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-5xl"><p className="text-xs uppercase tracking-[.35em] text-[var(--gold)]">SLOW TOOLS</p><h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">{tool.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{tool.description}</p><section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-6 md:p-8"><tool.Component /></section><section className="mt-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6"><h2 className="text-xl font-semibold">Privacy-first by design</h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]">These tools are designed to process your input in the browser. SLOW does not need your text or images to provide the result.</p></section></div></main>;
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ImageCompressorTool from "./image-compressor";
import { LocalizedCopy } from "@/components/layout/localized-text";
import { useLocale } from "@/components/layout/locale-provider";

const input = "mt-4 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm outline-none focus:border-[var(--gold)]";
const button = "rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)] disabled:opacity-40";

function Copy({ value }: { value: string }) {
  const { text } = useLocale();
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  async function copy() {
    setError("");
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setError("Clipboard access is unavailable. Copy the result manually.");
    }
  }

  return (
    <div>
      <button type="button" className={button} disabled={!value} onClick={copy}>
        {copied ? text("Copied") : text("Copy")}
      </button>
      {error && <p role="alert" className="mt-2 text-xs text-red-300">{text(error)}</p>}
    </div>
  );
}

function Json() {
  const { text } = useLocale();
  const [value, setValue] = useState('{"hello":"world","items":[1,2,3]}');
  const [error, setError] = useState("");
  const [output, setOutput] = useState("");
  function format() {
    try { setOutput(JSON.stringify(JSON.parse(value), null, 2)); setError(""); }
    catch { setOutput(""); setError("Invalid JSON"); }
  }
  return <>
    <textarea className={`${input} min-h-56 resize-y`} value={value} onChange={e => setValue(e.target.value)} aria-label={text("JSON input")} />
    <div className="mt-3 flex gap-2"><button className={button} onClick={format}><LocalizedCopy source="Format & Validate" /></button><Copy value={output} /></div>
    {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{text(error)}</p>}
    {output && <pre className="mt-4 max-h-[28rem] overflow-auto rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm leading-6">{output}</pre>}
  </>;
}

function Base64() {
  const { text } = useLocale();
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const result = useMemo(() => {
    try {
      if (!value) return "";
      if (mode === "encode") return btoa(unescape(encodeURIComponent(value)));
      return new TextDecoder().decode(Uint8Array.from(atob(value), c => c.charCodeAt(0)));
    } catch { return "Invalid Base64 input"; }
  }, [value, mode]);
  return <>
    <div className="mt-4 flex gap-2"><button className={button} onClick={() => setMode("encode")}><LocalizedCopy source="Encode" /></button><button className={button} onClick={() => setMode("decode")}><LocalizedCopy source="Decode" /></button></div>
    <textarea className={`${input} min-h-56 resize-y`} value={value} onChange={e => setValue(e.target.value)} placeholder={text(mode === "encode" ? "Text to encode..." : "Base64 to decode...")} />
    <div className="mt-3"><Copy value={result.startsWith("Invalid") ? "" : result} /></div>
    <pre className="mt-4 min-h-32 whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm">{text(result || "Your result will appear here.")}</pre>
  </>;
}

function Seo() {
  const { text } = useLocale();
  const [title, setTitle] = useState("SLOW.DEV — Developer, Creator & Builder");
  const [description, setDescription] = useState("Useful developer tools, projects, services, gaming and creator content from SLOW.");
  const [url, setUrl] = useState("https://slows.dev");
  const [image, setImage] = useState("https://slows.dev/banner-poster.jpg");
  return <>
    <div className="mt-4 grid gap-3"><input className={input} value={title} onChange={e => setTitle(e.target.value)} placeholder={text("Page title")}/><textarea className={`${input} min-h-28`} value={description} onChange={e => setDescription(e.target.value)} placeholder={text("Meta description")}/><input className={input} value={url} onChange={e => setUrl(e.target.value)} placeholder={text("Canonical URL")}/><input className={input} value={image} onChange={e => setImage(e.target.value)} placeholder={text("Social image URL")}/></div>
    <div className="mt-5 grid gap-4 lg:grid-cols-2"><div className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5"><p className="text-xs uppercase tracking-[.25em] text-[var(--muted)]">{text("Search preview")}</p><p className="mt-3 text-xl font-semibold text-[var(--gold-light)]">{title || text("Untitled page")}</p><p className="mt-1 break-all text-xs text-emerald-300">{url}</p><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{description || text("Add a description to preview the result.")}</p><p className="mt-4 text-xs text-[var(--muted)]">{title.length} {text("title chars")} · {description.length} {text("description chars")}</p></div><div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)]">{image ? <Image src={image} alt={text("Social preview")} width={1200} height={630} unoptimized className="h-44 w-full object-cover"/> : <div className="h-44"/>}<div className="p-5"><p className="font-semibold">{title || text("Social title")}</p><p className="mt-2 text-sm text-[var(--muted)]">{description || text("Social description")}</p></div></div></div>
  </>;
}

function UUID() {
  const { text } = useLocale();
  const [value, setValue] = useState("");
  return <><button className={`${button} mt-4`} onClick={() => setValue(crypto.randomUUID())}><LocalizedCopy source="Generate UUID v4" /></button><div className="mt-4 rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5 font-mono text-sm break-all">{value || text("Click generate to create a UUID.")}</div><div className="mt-3"><Copy value={value}/></div></>;
}

function Jwt() {
  const { text } = useLocale();
  const [value, setValue] = useState("");
  const [output, setOutput] = useState("");
  function decode() {
    try {
      const [header, payload] = value.split(".");
      if (!header || !payload) throw new Error("JWT must contain header.payload.signature");
      const parse = (part: string) => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(part.replace(/-/g,"+").replace(/_/g,"/")), c => c.charCodeAt(0))));
      setOutput(JSON.stringify({ header: parse(header), payload: parse(payload), note: "Decoded locally. Signature was not verified." }, null, 2));
    } catch { setOutput("Invalid JWT"); }
  }
  return <><textarea className={`${input} min-h-40 resize-y`} value={value} onChange={e=>setValue(e.target.value)} placeholder={text("Paste a JWT...")}/><div className="mt-3 flex gap-2"><button className={button} onClick={decode}><LocalizedCopy source="Decode locally" /></button><Copy value={output}/></div><pre className="mt-4 max-h-[30rem] overflow-auto whitespace-pre-wrap rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm">{output ? text(output) : text("JWT payload will appear here.")}</pre><p className="mt-3 text-xs text-amber-300/80"><LocalizedCopy source="This tool decodes only. It does not verify signatures." /></p></>;
}

function UrlCodec() {
  const { text } = useLocale();
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const output = useMemo(() => { try { return value ? (mode === "encode" ? encodeURIComponent(value) : decodeURIComponent(value)) : ""; } catch { return "Invalid URL-encoded input"; } }, [value, mode]);
  return <><div className="mt-4 flex gap-2"><button className={button} onClick={()=>setMode("encode")}><LocalizedCopy source="Encode" /></button><button className={button} onClick={()=>setMode("decode")}><LocalizedCopy source="Decode" /></button></div><textarea className={`${input} min-h-40 resize-y`} value={value} onChange={e=>setValue(e.target.value)} placeholder={text("Text or URL...")}/><pre className="mt-4 min-h-28 whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm">{text(output || "Result will appear here.")}</pre><div className="mt-3"><Copy value={output.startsWith("Invalid") ? "" : output}/></div></>;
}

function Timestamp() {
  const { text } = useLocale();
  const [value, setValue] = useState("1700000000");
  const result = useMemo(() => {
    const n = Number(value);
    if (!Number.isFinite(n) || value.trim() === "") return "Invalid timestamp";
    const date = new Date(n < 1e12 ? n * 1000 : n);
    if (Number.isNaN(date.getTime())) return "Invalid timestamp";
    return `${date.toISOString()}\n\nUnix seconds: ${Math.floor(date.getTime() / 1000)}\nUnix milliseconds: ${date.getTime()}`;
  }, [value]);
  return <><input className={input} value={value} onChange={e=>setValue(e.target.value)} placeholder={text("Unix timestamp or milliseconds")}/><pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm">{result === "Invalid timestamp" ? text(result) : result}</pre><div className="mt-3"><Copy value={result}/></div></>;
}

const tools = {
  "json-formatter": { title: "JSON Formatter & Validator", description: "Format, validate, and inspect JSON locally without uploading your data.", Component: Json },
  base64: { title: "Base64 Encoder & Decoder", description: "Encode and decode UTF-8 text locally in your browser.", Component: Base64 },
  "seo-preview": { title: "SEO & Social Preview", description: "Preview titles, descriptions, URLs, and social images before publishing.", Component: Seo },
  "image-compressor": { title: "Image Compressor", description: "Compress images to WebP locally and download the result without uploading files.", Component: ImageCompressorTool },
  "uuid-generator": { title: "UUID Generator", description: "Generate UUID v4 identifiers locally in your browser.", Component: UUID },
  "jwt-decoder": { title: "JWT Decoder", description: "Decode JWT header and payload locally without sending tokens to a server.", Component: Jwt },
  "url-encoder": { title: "URL Encoder & Decoder", description: "Encode and decode URL components locally in your browser.", Component: UrlCodec },
  "timestamp": { title: "Unix Timestamp Converter", description: "Convert Unix timestamps between seconds, milliseconds, and ISO dates.", Component: Timestamp },
} as const;

export type ToolSlug = keyof typeof tools;

export default function ToolDetail({ slug }: { slug: ToolSlug }) {
  const { text } = useLocale();
  const tool = tools[slug];
  return <main className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-5xl"><p className="text-xs uppercase tracking-[.35em] text-[var(--gold)]"><LocalizedCopy source="SLOW TOOLS" /></p><h1 className="mt-4 font-display text-4xl font-bold md:text-6xl">{text(tool.title)}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{text(tool.description)}</p><section className="mt-10 rounded-[2rem] border border-[var(--card-border-strong)] bg-[var(--card-bg)] p-6 md:p-8"><tool.Component /></section><section className="mt-8 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6"><h2 className="text-xl font-semibold"><LocalizedCopy source="Privacy-first by design" /></h2><p className="mt-2 text-sm leading-6 text-[var(--muted)]"><LocalizedCopy source="These tools are designed to process your input in the browser. SLOW does not need your text, tokens, or images to provide the result." /></p></section></div></main>;
}

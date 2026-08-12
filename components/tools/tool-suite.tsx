"use client";

import { useMemo, useState } from "react";

const inputClass =
  "min-h-44 w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm leading-6 text-[var(--foreground)] outline-none transition focus:border-[var(--gold)]";
const buttonClass =
  "rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40";

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={copy} disabled={!value} className={buttonClass}>
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function JsonTool() {
  const [input, setInput] = useState('{"hello":"world","items":[1,2,3]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  function format() {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
      setError("");
    } catch (err) {
      setOutput("");
      setError(err instanceof Error ? err.message : "Invalid JSON");
    }
  }

  return (
    <article className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Developer</p>
          <h2 className="mt-2 text-2xl font-semibold">JSON Formatter</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Validate and pretty-print JSON locally in your browser.</p>
        </div>
        <span className="rounded-full border border-[var(--card-border)] px-3 py-1 text-xs text-[var(--muted)]">Local</span>
      </div>

      <textarea aria-label="JSON input" className={`${inputClass} mt-6`} value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={format}>Format & Validate</button>
        <button type="button" className={buttonClass} onClick={() => { setInput(""); setOutput(""); setError(""); }}>Clear</button>
        <CopyButton value={output} />
      </div>

      {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
      {output && <pre className="mt-4 max-h-80 overflow-auto rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm leading-6">{output}</pre>}
    </article>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const output = useMemo(() => {
    if (!input) return "";
    try {
      if (mode === "encode") return btoa(unescape(encodeURIComponent(input)));
      const bytes = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      return "Invalid Base64 input";
    }
  }, [input, mode]);

  return (
    <article className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Developer</p>
        <h2 className="mt-2 text-2xl font-semibold">Base64 Encoder / Decoder</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Convert text without sending it to a server.</p>
      </div>

      <div className="mt-5 flex gap-2">
        <button type="button" className={buttonClass} onClick={() => setMode("encode")}>Encode</button>
        <button type="button" className={buttonClass} onClick={() => setMode("decode")}>Decode</button>
      </div>
      <textarea aria-label="Base64 input" className={`${inputClass} mt-4`} value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."} />
      <div className="mt-3 flex flex-wrap gap-2">
        <CopyButton value={output} />
        <button type="button" className={buttonClass} onClick={() => setInput("")}>Clear</button>
      </div>
      <pre className="mt-4 min-h-28 whitespace-pre-wrap break-words rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 font-mono text-sm leading-6">{output || "Your result will appear here."}</pre>
    </article>
  );
}

function TimestampTool() {
  const [value, setValue] = useState(String(Math.floor(Date.now() / 1000)));
  const parsed = Number(value);
  const date = Number.isFinite(parsed) && value !== "" ? new Date(parsed < 1e12 ? parsed * 1000 : parsed) : null;
  const iso = date && !Number.isNaN(date.getTime()) ? date.toISOString() : "Invalid timestamp";

  function setNow() {
    setValue(String(Math.floor(Date.now() / 1000)));
  }

  return (
    <article className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Developer</p>
        <h2 className="mt-2 text-2xl font-semibold">Timestamp Converter</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Convert Unix timestamps to readable UTC dates.</p>
      </div>

      <input aria-label="Unix timestamp" className="mt-5 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-mono text-sm outline-none focus:border-[var(--gold)]" value={value} onChange={(e) => setValue(e.target.value)} inputMode="numeric" />
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={setNow}>Use current time</button>
        <CopyButton value={iso === "Invalid timestamp" ? "" : iso} />
      </div>
      <div className="mt-4 rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">UTC</p>
        <p className="mt-2 break-words font-mono text-sm">{iso}</p>
      </div>
    </article>
  );
}

function SeoPreviewTool() {
  const [title, setTitle] = useState("SLOW.DEV — Developer, Creator & Builder");
  const [description, setDescription] = useState("Build software, create content, and explore useful tools with SLOW.");
  const [url, setUrl] = useState("https://slows.dev/tools/seo-preview");
  const [image, setImage] = useState("https://slows.dev/banner-poster.jpg");

  const titleLength = title.length;
  const descriptionLength = description.length;
  const titleStatus = titleLength >= 30 && titleLength <= 60;
  const descriptionStatus = descriptionLength >= 70 && descriptionLength <= 160;

  return (
    <article className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl lg:col-span-2">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">SEO</p>
          <h2 className="mt-2 text-2xl font-semibold">SEO & Open Graph Preview</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">Preview your title, description, URL, and social image locally before publishing. No data is uploaded.</p>
        </div>
        <span className="rounded-full border border-[var(--card-border)] px-3 py-1 text-xs text-[var(--muted)]">Client-side</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-medium">Title <span className={titleStatus ? "text-emerald-400" : "text-amber-300"}>{titleLength}/60</span>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]" />
          </label>
          <label className="block text-sm font-medium">Description <span className={descriptionStatus ? "text-emerald-400" : "text-amber-300"}>{descriptionLength}/160</span>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 min-h-28 w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm outline-none focus:border-[var(--gold)]" />
          </label>
          <label className="block text-sm font-medium">URL
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-mono text-xs outline-none focus:border-[var(--gold)]" />
          </label>
          <label className="block text-sm font-medium">Social image URL
            <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-2 w-full rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] px-4 py-3 font-mono text-xs outline-none focus:border-[var(--gold)]" />
          </label>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[var(--card-border)] bg-white p-5 text-black shadow-xl">
            <p className="truncate text-xs text-blue-700">{url || "https://example.com/page"}</p>
            <h3 className="mt-1 line-clamp-2 text-xl font-medium text-blue-800">{title || "Your page title"}</h3>
            <p className="mt-2 line-clamp-3 text-sm text-gray-600">{description || "Your search description will appear here."}</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)]">
            <div className="aspect-[1.91/1] bg-[var(--card-bg-soft)]">
              {image ? <img src={image} alt="Open Graph preview" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} /> : null}
            </div>
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Open Graph</p>
              <p className="mt-2 font-semibold">{title || "Your social title"}</p>
              <p className="mt-1 text-sm text-[var(--muted)]">{url || "https://example.com/page"}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ImageCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.8);
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");

  function compress() {
    if (!file) return;
    setWorking(true);
    setError("");

    const img = new Image();
    const sourceUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 2400 / Math.max(img.width, img.height));
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setError("Your browser could not create a canvas for compression.");
        URL.revokeObjectURL(sourceUrl);
        setWorking(false);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(sourceUrl);
        setWorking(false);
        if (!blob) {
          setError("Compression failed.");
          return;
        }
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setResultUrl(URL.createObjectURL(blob));
        setResultSize(blob.size);
      }, "image/webp", quality);
    };

    img.onerror = () => {
      URL.revokeObjectURL(sourceUrl);
      setWorking(false);
      setError("Could not read this image file.");
    };

    img.src = sourceUrl;
  }

  const ratio = file && resultSize ? Math.max(0, Math.round((1 - resultSize / file.size) * 100)) : null;

  return (
    <article className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl lg:col-span-2">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Images</p>
        <h2 className="mt-2 text-2xl font-semibold">Image Compressor</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Compress images to WebP directly in your browser. Files stay on your device.</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--card-border-strong)] bg-[var(--panel-bg-heavy)] p-6 text-center">
            <span className="font-semibold">Choose an image</span>
            <span className="mt-2 text-xs text-[var(--muted)]">PNG, JPG, JPEG, GIF or WebP</span>
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResultUrl(""); setResultSize(null); setError(""); }} />
          </label>

          {file && <p className="mt-3 text-sm text-[var(--muted)]">{file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB</p>}

          <label className="mt-5 block text-sm font-medium">WebP quality: <span className="text-[var(--gold)]">{Math.round(quality * 100)}%</span>
            <input type="range" min="0.4" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="mt-3 w-full" />
          </label>

          <button type="button" className={`${buttonClass} mt-4`} onClick={compress} disabled={!file || working}>{working ? "Compressing…" : "Compress image"}</button>
          {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">{error}</p>}
        </div>

        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Result</p>
          {resultUrl ? (
            <>
              <img src={resultUrl} alt="Compressed result" className="mt-4 max-h-64 w-full rounded-xl object-contain" />
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-[var(--card-border)] px-3 py-1">{(resultSize! / 1024 / 1024).toFixed(2)} MB</span>
                {ratio !== null && <span className="rounded-full border border-[var(--card-border)] px-3 py-1">{ratio}% smaller</span>}
              </div>
              <a href={resultUrl} download={`${file?.name.replace(/\.[^/.]+$/, "") ?? "image"}.webp`} className={`${buttonClass} mt-4 inline-flex`}>Download WebP</a>
            </>
          ) : (
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">The compressed preview will appear here.</p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ToolSuite() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <JsonTool />
      <Base64Tool />
      <TimestampTool />
      <SeoPreviewTool />
      <ImageCompressorTool />
      <article className="rounded-3xl border border-dashed border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Roadmap</p>
        <h2 className="mt-2 text-2xl font-semibold">More tools are coming</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Next candidates: QR generator, robots.txt generator, Meta Tag generator, URL encoder/decoder, UUID generator, JWT decoder, and image resizer.</p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
          <span className="rounded-full border border-[var(--card-border)] px-3 py-1">No API</span>
          <span className="rounded-full border border-[var(--card-border)] px-3 py-1">Privacy-friendly</span>
          <span className="rounded-full border border-[var(--card-border)] px-3 py-1">Fast</span>
        </div>
      </article>
    </div>
  );
}

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
      if (mode === "encode") {
        return btoa(unescape(encodeURIComponent(input)));
      }
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

export default function ToolSuite() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <JsonTool />
      <Base64Tool />
      <TimestampTool />
      <article className="rounded-3xl border border-dashed border-[var(--card-border-strong)] bg-[var(--card-bg-soft)] p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Coming next</p>
        <h2 className="mt-2 text-2xl font-semibold">SEO Preview</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">A browser-based SERP and Open Graph preview is next, followed by image compression and QR generation.</p>
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
          <span className="rounded-full border border-[var(--card-border)] px-3 py-1">No API</span>
          <span className="rounded-full border border-[var(--card-border)] px-3 py-1">Fast</span>
          <span className="rounded-full border border-[var(--card-border)] px-3 py-1">Privacy-friendly</span>
        </div>
      </article>
    </div>
  );
}

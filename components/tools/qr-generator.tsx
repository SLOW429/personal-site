"use client";

import { useMemo, useState } from "react";

const buttonClass = "rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--gold)] disabled:cursor-not-allowed disabled:opacity-40";

export default function QrGenerator() {
  const [value, setValue] = useState("https://slows.dev");
  const [size, setSize] = useState("360x360");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const qrUrl = useMemo(
    () => `https://api.qrserver.com/v1/create-qr-code/?size=${size}&margin=12&data=${encodeURIComponent(value)}`,
    [size, value],
  );

  async function copy() {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Creator / Utility</p>
      <h2 className="mt-2 text-2xl font-semibold">QR Code Generator</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Generate a QR code for a URL or text and download it as an image.</p>

      <textarea
        className="mt-5 min-h-28 w-full resize-y rounded-2xl border border-[var(--card-border)] bg-[var(--panel-bg-heavy)] p-4 text-sm outline-none focus:border-[var(--gold)]"
        value={value}
        onChange={(event) => { setValue(event.target.value); setGenerated(false); }}
        placeholder="Enter a URL or text..."
        aria-label="QR code content"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <select className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] px-4 py-2 text-sm" value={size} onChange={(event) => { setSize(event.target.value); setGenerated(false); }} aria-label="QR size">
          <option value="240x240">240 × 240</option>
          <option value="360x360">360 × 360</option>
          <option value="600x600">600 × 600</option>
        </select>
        <button className={buttonClass} disabled={!value.trim()} onClick={() => setGenerated(true)}>Generate QR</button>
        <button className={buttonClass} disabled={!generated} onClick={copy}>{copied ? "Copied" : "Copy image URL"}</button>
      </div>

      {generated && (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border border-[var(--card-border)] bg-white p-6">
          <img src={qrUrl} width={360} height={360} alt="Generated QR code" className="h-auto w-full max-w-[360px] rounded-xl" />
          <a href={qrUrl} target="_blank" rel="noreferrer" download="slow-qr.png" className="rounded-xl bg-[var(--gold)] px-4 py-2 font-semibold text-[#071018]">Download QR</a>
        </div>
      )}

      <p className="mt-4 text-xs leading-5 text-[var(--muted)]">The QR service is contacted only when you generate the code. Do not place secrets or private tokens in the content.</p>
    </div>
  );
}

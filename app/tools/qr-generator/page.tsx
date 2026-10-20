import type { Metadata } from "next";
import QrGenerator from "@/components/tools/qr-generator";

export const metadata: Metadata = {
  title: "QR Code Generator | SLOW Tools",
  description: "Generate downloadable QR codes for URLs and text.",
  alternates: { canonical: "/tools/qr-generator" },
  openGraph: {
    title: "QR Code Generator | SLOW Tools",
    description: "Generate downloadable QR codes for URLs and text.",
    url: "https://slows.dev/tools/qr-generator",
  },
};

export default function QrGeneratorPage() {
  return (
    <main className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW TOOLS / QR</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">QR Code Generator</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">Turn a URL or text into a downloadable QR code in seconds.</p>
        <div className="mt-10"><QrGenerator /></div>
      </div>
    </main>
  );
}

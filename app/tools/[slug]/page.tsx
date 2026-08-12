import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ToolDetail, { type ToolSlug } from "../../../components/tools/tool-detail";

const toolMeta = {
  "json-formatter": {
    title: "JSON Formatter & Validator",
    description: "Format and validate JSON locally in your browser. Free, fast, and privacy-friendly.",
  },
  base64: {
    title: "Base64 Encoder & Decoder",
    description: "Encode and decode UTF-8 text locally in your browser without sending it to a server.",
  },
  "seo-preview": {
    title: "SEO & Social Preview",
    description: "Preview SEO titles, meta descriptions, canonical URLs, and social cards before publishing.",
  },
  "image-compressor": {
    title: "Image Compressor",
    description: "Compress images to WebP in your browser and download the result without uploading your files.",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(toolMeta).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = toolMeta[slug as ToolSlug];
  if (!tool) return {};
  const url = `https://slows.dev/tools/${slug}`;
  return {
    title: `${tool.title} | SLOW Tools`,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: { title: `${tool.title} | SLOW Tools`, description: tool.description, url, type: "website" },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in toolMeta)) notFound();
  const key = slug as ToolSlug;
  const tool = toolMeta[key];
  const url = `https://slows.dev/tools/${slug}`;
  return (
    <>
      <ToolDetail slug={key} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.title,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }) }} />
      <div className="mx-auto -mt-10 max-w-5xl px-5 pb-16 text-sm text-[var(--muted)]"><Link href="/tools" className="hover:text-[var(--gold)]">← Back to SLOW Tools</Link></div>
    </>
  );
}

import { notFound } from "next/navigation";
import MetaTagGenerator from "@/components/tools/meta-tag-generator";

export default async function LocalizedMetaGenerator({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "ar") notFound();
  return (
    <main dir="rtl" lang="ar" className="min-h-screen px-5 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW TOOLS / SEO</p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">مولد Meta Tags لـ Next.js</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">أنشئ كود metadata جاهزًا للنسخ داخل صفحات Next.js.</p>
        <div className="mt-10"><MetaTagGenerator /></div>
      </div>
    </main>
  );
}

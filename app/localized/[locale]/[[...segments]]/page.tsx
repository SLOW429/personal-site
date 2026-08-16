import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ToolSuite from "@/components/tools/tool-suite";
import ToolDetail, { type ToolSlug } from "@/components/tools/tool-detail";
import { localizedPath } from "@/lib/i18n";

const content = {
  ar: {
    home: ["مطور • صانع محتوى • Builder", "أبني برمجيات وأدوات وتجارب مفيدة فعلًا.", "SLOW.DEV هو المكان الذي أجمع فيه المشاريع، الأدوات، تجارب الذكاء الاصطناعي، الخدمات، الألعاب، والمحتوى."],
    nav: { projects: "المشاريع", services: "الخدمات", tools: "الأدوات", blog: "المدونة", creator: "صانع المحتوى", contact: "تواصل معنا" },
    sections: {
      about: ["عن SLOW", "برمجيات وأتمتة وأدوات ومحتوى من مكان واحد.", "نبني أشياء مفيدة، نوثق طريقة العمل، ونحوّل التجربة إلى موارد قابلة للاستخدام."],
      projects: ["المشاريع", "مشاريع حقيقية في البرمجيات والأتمتة والأنظمة اللحظية.", "استكشف المشاريع ودراسات الحالة وروابط GitHub."],
      services: ["الخدمات", "تطوير الويب، الأتمتة، الذكاء الاصطناعي، الأداء، وSEO التقني.", "نبدأ من المشكلة والنتيجة ثم نبني الحل على خطوات واضحة."],
      tools: ["أدوات SLOW", "أدوات مجانية وسريعة للمطورين وصناع المحتوى.", "المعالجة تتم محليًا في المتصفح كلما أمكن."],
      blog: ["المدونة", "Build logs وملاحظات وتجارب من المشاريع الحقيقية.", "محتوى تقني نابع من العمل الفعلي، وليس حشوًا عامًا."],
      creator: ["Creator Hub", "الألعاب والبث المباشر والفيديوهات والمجتمع.", "كل القنوات الرسمية ومحتوى SLOW في مكان واحد."],
      gaming: ["Gaming", "الألعاب والبث والمجتمع في مكان واحد.", "تابع Kick وYouTube وDiscord من مكان واحد."],
      now: ["الآن", "ما أعمل عليه حاليًا.", "تتغير هذه الصفحة مع تقدم المشاريع والمحتوى."],
      uses: ["ما أستخدمه", "التقنيات والأدوات خلف SLOW.", "Next.js وReact وTypeScript وPython وGitHub وVercel وDocker."],
      links: ["الروابط", "كل الروابط الرسمية.", "GitHub وYouTube وKick وDiscord وغيرها."],
      contact: ["ابدأ مشروعًا", "حوّل فكرتك أو مشكلتك إلى brief واضح.", "البيانات تبقى في المتصفح حتى تختار مشاركتها."],
      docs: ["التوثيق", "ملاحظات ومراجع للمطورين حول SLOW.DEV وأدواته.", "توثيق عملي يركز على الاستخدام والبنية والخصوصية."],
      status: ["الحالة", "حالة خدمات SLOW.DEV والصحة التقنية العامة.", "هذه الصفحة مخصصة للمؤشرات العامة دون عرض أسرار أو بيانات داخلية."],
    },
  },
} as const;

type Locale = keyof typeof content;
const projectData = { "hr-bot": "HR-BOT", "discord-bot": "Discord Bot", "chat-platform": "Chat Platform" } as const;
const blogData = { "building-slow-dev-into-a-personal-platform": "Building SLOW.DEV Into a Personal Platform", "designing-local-first-developer-tools": "Why SLOW Tools Are Local-First" } as const;
const toolSlugs = ["json-formatter", "base64", "seo-preview", "image-compressor", "uuid-generator", "jwt-decoder", "url-encoder", "timestamp"] as ToolSlug[];

export function generateStaticParams() {
  const routes = ["", "about", "projects", "services", "tools", "blog", "creator", "gaming", "now", "uses", "links", "contact", "docs", "status"];
  return routes.map((route) => ({ locale: "ar", segments: route ? [route] : [] }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments?: string[] }> }): Promise<Metadata> {
  const { locale: rawLocale, segments = [] } = await params;
  if (rawLocale !== "ar") return {};
  const section = segments[0];
  const slug = segments[1];
  if (section === "projects" && slug && slug in projectData) return { title: `${projectData[slug as keyof typeof projectData]} | SLOW` };
  if (section === "blog" && slug && slug in blogData) return { title: `${blogData[slug as keyof typeof blogData]} | SLOW` };
  const page = section ? content.ar.sections[section as keyof typeof content.ar.sections] : content.ar.home;
  if (!page) return {};
  return { title: `${page[0]} | SLOW`, description: page[2], alternates: { canonical: localizedPath(section ? `/${section}` : "/", "ar") } };
}

export default async function LocalizedCatchAll({ params }: { params: Promise<{ locale: string; segments?: string[] }> }) {
  const { locale: rawLocale, segments = [] } = await params;
  if (rawLocale !== "ar") notFound();

  const locale: Locale = "ar";
  const dir = "rtl" as const;
  const section = segments[0];
  const slug = segments[1];
  const href = (path: string) => localizedPath(path, locale);

  if (section === "tools" && !slug) {
    const page = content.ar.sections.tools;
    return <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / TOOLS</p><h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{page[0]}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{page[1]}</p><div className="mt-12"><ToolSuite /></div></div></main>;
  }

  if (section === "tools" && slug && toolSlugs.includes(slug as ToolSlug)) {
    return <div dir={dir} lang={locale}><ToolDetail slug={slug as ToolSlug} /></div>;
  }

  if (section === "projects" && !slug) {
    return <LocalizedList title={content.ar.sections.projects[0]} description={content.ar.sections.projects[1]} items={Object.entries(projectData).map(([s, t]) => [t, href(`/projects/${s}`)])} />;
  }

  if (section === "blog" && !slug) {
    return <LocalizedList title={content.ar.sections.blog[0]} description={content.ar.sections.blog[1]} items={Object.entries(blogData).map(([s, t]) => [t, href(`/blog/${s}`)])} />;
  }

  if (section === "projects" && slug && slug in projectData) {
    return <Detail back={href("/projects")} title={projectData[slug as keyof typeof projectData]} eyebrow="دراسة حالة" body="مشروع حقيقي من رحلة SLOW موثق حول المشكلة والحل والبنية والنتائج." />;
  }

  if (section === "blog" && slug && slug in blogData) {
    return <Detail back={href("/blog")} title={blogData[slug as keyof typeof blogData]} eyebrow="المدونة" body="مقال من build logs الخاصة بـSLOW يشرح القرارات العملية والتجارب القابلة لإعادة الاستخدام." />;
  }

  const page = section ? content.ar.sections[section as keyof typeof content.ar.sections] : content.ar.home;
  if (!page) notFound();

  return <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><section className="flex min-h-[60vh] items-center"><div className="max-w-4xl"><p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV</p><h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">{page[0]}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{page[1]}</p><p className="mt-5 max-w-3xl leading-7 text-[var(--foreground)]/80">{page[2]}</p><div className="mt-9 flex flex-wrap gap-3"><Link href={href("/projects")} className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">{content.ar.nav.projects}</Link><Link href={href("/tools")} className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">{content.ar.nav.tools}</Link><Link href={href("/contact")} className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">{content.ar.nav.contact}</Link></div></div></section></div></main>;
}

function LocalizedList({ title, description, items }: { title: string; description: string; items: string[][] }) {
  return <main dir="rtl" lang="ar" className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><h1 className="font-display text-5xl font-bold md:text-7xl">{title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--muted)]">{description}</p><div className="mt-12 grid gap-5 md:grid-cols-3">{items.map(([label, link]) => <Link key={link} href={link} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6 transition hover:-translate-y-1 hover:border-[var(--gold)]"><h2 className="font-display text-2xl font-bold">{label}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">افتح الصفحة واستكشف التفاصيل والمحتوى المرتبط بها.</p></Link>)}</div></div></main>;
}

function Detail({ back, title, eyebrow, body }: { back: string; title: string; eyebrow: string; body: string }) {
  return <main dir="rtl" lang="ar" className="min-h-screen px-5 py-16 md:py-24"><article className="mx-auto max-w-4xl"><Link href={back} className="text-sm text-[var(--gold-light)]">← رجوع</Link><p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">{eyebrow}</p><h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{body}</p><div className="mt-10 grid gap-5 md:grid-cols-3">{["المشكلة", "الحل", "النتيجة"].map((label) => <section key={label} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6"><h2 className="font-semibold">{label}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{body}</p></section>)}</div></article></main>;
}

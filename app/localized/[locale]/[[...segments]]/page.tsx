import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolSuite } from "@/components/tools/tool-suite";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";

const content = {
  ar: {
    home: { eyebrow: "مطور • صانع محتوى • Builder", title: "أبني برمجيات وأدوات وتجارب مفيدة فعلًا.", description: "SLOW.DEV هو المكان الذي أجمع فيه المشاريع البرمجية، أدوات المطورين، تجارب الذكاء الاصطناعي، الخدمات، الألعاب، والمحتوى.", primary: "استكشف المشاريع", secondary: "ابدأ مشروعًا" },
    nav: { about: "من نحن", projects: "المشاريع", services: "الخدمات", tools: "الأدوات", blog: "المدونة", creator: "صانع المحتوى", gaming: "الألعاب", now: "الآن", uses: "ما أستخدمه", links: "الروابط", contact: "تواصل معنا" },
    sections: {
      about: ["عن SLOW", "أبني البرمجيات والأتمتة والأدوات والمحتوى من مكان واحد.", "الهدف: أشياء مفيدة، مشاريع حقيقية، وتوثيق يمكن الرجوع إليه.", [["نبني", ["تطبيقات الويب", "الأتمتة والبوتات", "تجارب AI", "أدوات المطورين"]], ["نصنع", ["محتوى تقني", "ألعاب وبث مباشر", "دراسات حالة", "تجارب وشروحات"]], ["نتواصل", ["GitHub", "Discord", "YouTube", "Kick"]]]],
      services: ["الخدمات", "تطوير الويب، الأتمتة، الذكاء الاصطناعي، الأداء، وSEO التقني.", "نبدأ من المشكلة والنتيجة المطلوبة، ثم نبني الحل على خطوات واضحة.", [["تطوير الويب", ["مواقع شخصية وتجارية", "Landing pages", "تطبيقات ويب", "تكاملات"]], ["Automation & AI", ["Discord bots", "أتمتة workflows", "تكاملات AI", "أدوات داخلية"]], ["الأداء وSEO", ["Core Web Vitals", "تحسين الوسائط", "Metadata", "Indexing"]]]],
      tools: ["أدوات SLOW", "أدوات مجانية وسريعة للمطورين وصناع المحتوى.", "المعالجة تتم محليًا في المتصفح كلما كان ذلك ممكنًا.", [["Developer", ["JSON", "Base64", "JWT", "UUID", "URL", "Timestamp"]], ["SEO", ["SEO Preview", "Meta Generator", "Canonical"]], ["Images", ["Image Compressor", "Utilities"]]]],
      blog: ["المدونة", "ملاحظات تقنية، build logs، دراسات وتجارب من المشاريع الحقيقية.", "محتوى نابع من العمل الفعلي، وليس حشوًا عامًا.", [["Engineering", ["Next.js", "TypeScript", "AI", "Automation"]], ["Build Logs", ["Projects", "Performance", "SEO"]]]],
      creator: ["Creator Hub", "الألعاب، البث المباشر، الفيديوهات، المقاطع، والمجتمع.", "كل القنوات الرسمية في مكان واحد.", [["القنوات", ["YouTube", "Kick", "Discord"]], ["المحتوى", ["Gaming", "Streams", "Clips", "Build content"]]]],
      gaming: ["Gaming", "الألعاب والبث والمجتمع في مكان واحد.", "تابع البثوث والمقاطع والجلسات القادمة.", [["Live", ["Kick", "YouTube"]], ["Community", ["Discord", "Sessions"]]]],
      now: ["الآن", "ما أعمل عليه حاليًا.", "هذه الصفحة تتغير مع تقدم المشاريع والمحتوى.", [["أبني", ["SLOW.DEV", "Developer Tools", "SEO & Performance"]], ["أصنع", ["Gaming content", "Streams", "Technical posts"]]]],
      uses: ["ما أستخدمه", "التقنيات والأدوات الموجودة خلف SLOW.", "القائمة تتغير مع تطور طريقة العمل.", [["Development", ["Next.js", "React", "TypeScript", "Python"]], ["Infrastructure", ["Vercel", "GitHub", "Docker"]]]],
      links: ["الروابط", "كل الروابط الرسمية في مكان واحد.", "استخدم هذه الصفحة كعنوان مشاركة واحد.", [["Developer", ["GitHub", "LinkedIn"]], ["Creator", ["YouTube", "Kick", "Discord"]]]],
      contact: ["ابدأ مشروعًا", "حول فكرتك أو مشكلتك إلى brief واضح يمكن العمل عليه.", "لا يوجد إرسال تلقائي؛ البيانات تبقى في متصفحك حتى تختار مشاركة الـbrief.", [["ابدأ", ["حدد النتيجة", "حدد الموعد", "حدد الميزانية"]], ["ثم", ["انسخ الـbrief", "أرسله عبر Discord"]]]],
    },
    blogPosts: [
      ["building-slow-dev-into-a-personal-platform", "تحويل SLOW.DEV إلى منصة شخصية", "كيف يتحول الموقع الشخصي إلى مكان للمشاريع والأدوات والمحتوى والمجتمع."],
      ["designing-local-first-developer-tools", "لماذا أدوات SLOW Local-First", "كيف تساعد المعالجة داخل المتصفح على السرعة والخصوصية وتقليل التكلفة."]
    ],
    projects: [
      ["hr-bot", "HR-BOT", "أتمتة Highrise والموسيقى باستخدام Python وDocker وCoolify."],
      ["discord-bot", "Discord Bot", "أدوات وإدارة وأتمتة لمجتمعات Discord."],
      ["chat-platform", "Chat Platform", "تجربة تواصل لحظي باستخدام Node.js وWebSockets."]
    ]
  },
  tr: {
    home: { eyebrow: "Geliştirici • İçerik Üreticisi • Builder", title: "Gerçekten faydalı yazılımlar, araçlar ve deneyimler geliştiriyorum.", description: "SLOW.DEV; projelerim, geliştirici araçlarım, AI deneylerim, hizmetlerim, oyun ve içerik çalışmalarım için tek merkezdir.", primary: "Projeleri keşfet", secondary: "Proje başlat" },
    nav: { about: "Hakkımda", projects: "Projeler", services: "Hizmetler", tools: "Araçlar", blog: "Blog", creator: "İçerik", gaming: "Oyun", now: "Şimdi", uses: "Kullandıklarım", links: "Bağlantılar", contact: "İletişim" },
    sections: {
      about: ["SLOW Hakkında", "Yazılım, otomasyon, araçlar ve içerik üretimini tek bir platformda birleştiriyorum.", "Amaç: faydalı işler, gerçek projeler ve paylaşılabilir teknik deneyimler.", [["Geliştir", ["Web uygulamaları", "Otomasyon ve botlar", "AI deneyleri", "Geliştirici araçları"]], ["Üret", ["Teknik içerik", "Oyun ve yayınlar", "Case study", "Deneyler"]]]],
      services: ["Hizmetler", "Web geliştirme, otomasyon, AI entegrasyonları, performans ve teknik SEO.", "Önce problemi ve hedefi netleştirip sonra çözümü küçük adımlarla geliştiriyoruz.", [["Web", ["Kurumsal siteler", "Landing pages", "Web uygulamaları", "Entegrasyonlar"]], ["Automation & AI", ["Discord botları", "Workflow otomasyonu", "AI entegrasyonları", "İç araçlar"]], ["SEO & Performance", ["Core Web Vitals", "Media optimization", "Metadata", "Indexing"]]]],
      tools: ["SLOW Araçları", "Geliştiriciler ve üreticiler için hızlı, ücretsiz tarayıcı araçları.", "Mümkün olan her yerde işlemler tarayıcıda yapılır.", [["Developer", ["JSON", "Base64", "JWT", "UUID", "URL", "Timestamp"]], ["SEO", ["SEO Preview", "Meta Generator", "Canonical"]], ["Images", ["Image Compressor", "Utilities"]]]],
      blog: ["Blog", "Gerçek projelerden build logları, teknik notlar ve deneyimler.", "İçerik gerçek çalışmalardan çıkar; gereksiz dolgu yok.", [["Engineering", ["Next.js", "TypeScript", "AI", "Automation"]], ["Build Logs", ["Projects", "Performance", "SEO"]]]],
      creator: ["Creator Hub", "Oyun, yayınlar, videolar, klipler ve topluluk.", "Resmi kanallar tek bir yerde.", [["Kanallar", ["YouTube", "Kick", "Discord"]], ["İçerik", ["Gaming", "Streams", "Clips", "Build content"]]]],
      gaming: ["Gaming", "Oyun, yayın ve topluluk tek yerde.", "Canlı yayınları, klipleri ve gelecek oturumları takip et.", [["Live", ["Kick", "YouTube"]], ["Community", ["Discord", "Sessions"]]]],
      now: ["Şimdi", "Şu anda üzerinde çalıştığım şeyler.", "Bu sayfa projeler ilerledikçe güncellenir.", [["Build", ["SLOW.DEV", "Developer Tools", "SEO & Performance"]], ["Create", ["Gaming content", "Streams", "Technical posts"]]]],
      uses: ["Kullandıklarım", "SLOW'un arkasındaki teknoloji ve araçlar.", "Çalışma şekli geliştikçe liste de değişir.", [["Development", ["Next.js", "React", "TypeScript", "Python"]], ["Infrastructure", ["Vercel", "GitHub", "Docker"]]]],
      links: ["Bağlantılar", "Tüm resmi bağlantılar tek yerde.", "Bu sayfayı paylaşılabilir merkez olarak kullan.", [["Developer", ["GitHub", "LinkedIn"]], ["Creator", ["YouTube", "Kick", "Discord"]]]],
      contact: ["Proje Başlat", "Fikrini veya problemini net bir proje brief'ine dönüştür.", "Otomatik gönderim yok; bilgiler paylaşmayı seçene kadar tarayıcıda kalır.", [["Başla", ["Hedefi belirle", "Süreyi belirle", "Bütçeyi belirle"]], ["Sonra", ["Brief'i kopyala", "Discord üzerinden gönder"]]]],
    },
    blogPosts: [
      ["building-slow-dev-into-a-personal-platform", "SLOW.DEV'i kişisel platforma dönüştürmek", "Kişisel sitenin proje, araç, içerik ve topluluk merkezi haline gelmesi."],
      ["designing-local-first-developer-tools", "SLOW Tools neden Local-First", "Tarayıcı içi işlemlerin hız, gizlilik ve maliyet avantajları."]
    ],
    projects: [
      ["hr-bot", "HR-BOT", "Python, Docker ve Coolify ile Highrise otomasyon ve müzik botu."],
      ["discord-bot", "Discord Bot", "Discord toplulukları için araçlar, yönetim ve otomasyon."],
      ["chat-platform", "Chat Platform", "Node.js ve WebSockets ile gerçek zamanlı iletişim deneyi."]
    ]
  }
} as const;

type Locale = keyof typeof content;

export function generateStaticParams() {
  const routes = ["", "about", "projects", "services", "tools", "blog", "creator", "gaming", "now", "uses", "links", "contact"];
  return (Object.keys(content) as Locale[]).flatMap((locale) => routes.map((route) => ({ locale, segments: route ? [route] : [] })));
}

function baseUrl(path: string, locale: Locale) {
  return localizedPath(path, locale);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; segments?: string[] }> }): Promise<Metadata> {
  const { locale: rawLocale, segments = [] } = await params;
  if (!(rawLocale in content)) return {};
  const locale = rawLocale as Locale;
  const section = segments[0] || "home";
  if (section === "projects" && segments[1]) {
    const p = content[locale].projects.find(([slug]) => slug === segments[1]);
    if (p) return { title: `${p[1]} | SLOW`, description: p[2], alternates: { canonical: baseUrl(`/projects/${p[0]}`, locale) } };
  }
  if (section === "blog" && segments[1]) {
    const p = content[locale].blogPosts.find(([slug]) => slug === segments[1]);
    if (p) return { title: `${p[1]} | SLOW`, description: p[2], alternates: { canonical: baseUrl(`/blog/${p[0]}`, locale) } };
  }
  const page = section === "home" ? content[locale].home : content[locale].sections[section as keyof typeof content[Locale]["sections"]];
  if (!page) return {};
  return { title: `${page[0]} | SLOW`, description: page[1], alternates: { canonical: baseUrl(section === "home" ? "/" : `/${section}`, locale) } };
}

export default async function LocalizedCatchAll({ params }: { params: Promise<{ locale: string; segments?: string[] }> }) {
  const { locale: rawLocale, segments = [] } = await params;
  if (!(rawLocale in content)) notFound();
  const locale = rawLocale as Locale;
  const dir = locale === "ar" ? "rtl" : "ltr";
  const section = segments[0] || "home";
  const href = (path: string) => localizedPath(path, locale);

  if (section === "tools" && !segments[1]) {
    const t = content[locale].sections.tools;
    return <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / TOOLS</p><h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{t[0]}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{t[1]}</p><div className="mt-12"><ToolSuite /></div></div></main>;
  }

  if (section === "projects" && segments[1]) {
    const p = content[locale].projects.find(([slug]) => slug === segments[1]);
    if (!p) notFound();
    return <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24"><article className="mx-auto max-w-4xl"><Link href={href("/projects")} className="text-sm text-[var(--gold-light)]">← {content[locale].nav.projects}</Link><p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Case Study</p><h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{p[1]}</h1><p className="mt-6 text-lg leading-8 text-[var(--muted)]">{p[2]}</p><div className="mt-10 grid gap-5 md:grid-cols-3"><div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6"><h2 className="font-semibold">{locale === "ar" ? "المشكلة" : "Problem"}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{locale === "ar" ? "تحويل احتياج حقيقي إلى نظام قابل للاستخدام والتطوير." : "Turning a real need into a maintainable, usable system."}</p></div><div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6"><h2 className="font-semibold">{locale === "ar" ? "الحل" : "Solution"}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{locale === "ar" ? "بناء نسخة عملية صغيرة ثم تطويرها على مراحل." : "Build a focused version first, then improve it in small steps."}</p></div><div className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-6"><h2 className="font-semibold">{locale === "ar" ? "النتيجة" : "Result"}</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">{locale === "ar" ? "بنية أوضح، نشر أسهل، ومساحة أفضل للتوسع." : "Clearer architecture, easier shipping, and room to grow."}</p></div></div></article></main>;
  }

  if (section === "blog" && segments[1]) {
    const p = content[locale].blogPosts.find(([slug]) => slug === segments[1]);
    if (!p) notFound();
    return <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24"><article className="mx-auto max-w-3xl"><Link href={href("/blog")} className="text-sm text-[var(--gold-light)]">← {content[locale].nav.blog}</Link><p className="mt-10 text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Blog</p><h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{p[1]}</h1><p className="mt-6 text-lg leading-8 text-[var(--muted)]">{p[2]}</p><div className="mt-10 rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7"><h2 className="text-2xl font-bold">{locale === "ar" ? "محتوى المقال" : "Article"}</h2><p className="mt-4 leading-8 text-[var(--muted)]">{locale === "ar" ? "هذا المقال جزء من build logs الخاصة بـSLOW، ويركز على القرارات العملية والتجارب التي يمكن تطبيقها في مشاريع أخرى." : "This article is part of SLOW's build logs, focusing on practical decisions and experiments that can be reused in other projects."}</p></div></article></main>;
  }

  const page = section === "home" ? null : content[locale].sections[section as keyof typeof content[Locale]["sections"]];
  if (section !== "home" && !page) notFound();

  if (section === "home") {
    const h = content[locale].home;
    return <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><section className="flex min-h-[72vh] items-center"><div className="max-w-4xl"><p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW / {h.eyebrow}</p><h1 className="mt-5 font-display text-5xl font-bold tracking-tight md:text-7xl">{h.title}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">{h.description}</p><div className="mt-9 flex flex-wrap gap-3"><Link href={href("/projects")} className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">{h.primary}</Link><Link href={href("/contact")} className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">{h.secondary}</Link><Link href={href("/tools")} className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">{content[locale].nav.tools}</Link></div></div></section><section className="grid gap-5 pb-24 md:grid-cols-2">{[[content[locale].nav.projects,"/projects"],[content[locale].nav.tools,"/tools"],[content[locale].nav.creator,"/creator"],[content[locale].nav.services,"/services"]].map(([title,path])=><Link key={path} href={href(path)} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg-soft)] p-7 transition hover:-translate-y-1 hover:border-[var(--gold)]"><h2 className="font-display text-2xl font-bold">{title}</h2><p className="mt-3 leading-7 text-[var(--muted)]">{h.description}</p></Link>)}</section></div></main>;
  }

  return <main dir={dir} lang={locale} className="min-h-screen px-5 py-16 md:py-24"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="text-xs uppercase tracking-[0.35em] text-[var(--gold)]">SLOW.DEV / {section}</p><h1 className="mt-4 font-display text-5xl font-bold md:text-7xl">{page![0]}</h1><p className="mt-6 text-lg leading-8 text-[var(--muted)]">{page![1]}</p><p className="mt-4 leading-7 text-[var(--foreground)]/80">{page![2]}</p></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{page![3].map((group: readonly [string, readonly string[]])=><section key={group[0]} className="rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 backdrop-blur-xl"><h2 className="text-xl font-bold">{group[0]}</h2><ul className="mt-5 space-y-3">{group[1].map((item)=> <li key={item} className="border-s border-[var(--gold)]/40 ps-4 text-sm leading-6 text-[var(--muted)]">{item}</li>)}</ul></section>)}</div><div className="mt-10 flex flex-wrap gap-3"><Link href={href("/projects")} className="rounded-xl bg-[var(--gold)] px-5 py-3 font-semibold text-[#071018]">{content[locale].nav.projects}</Link><Link href={href("/contact")} className="rounded-xl border border-[var(--card-border-strong)] px-5 py-3 font-semibold">{content[locale].nav.contact}</Link></div></div></main>;
}

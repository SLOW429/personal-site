import type { Locale } from "./i18n";

export const homeContent: Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  projectsTitle: string;
  projectsDescription: string;
  creatorTitle: string;
  creatorDescription: string;
  toolsTitle: string;
  toolsDescription: string;
  servicesTitle: string;
  servicesDescription: string;
  contactCta: string;
  aiAssistant: string;
  askPlaceholder: string;
  visitors: string;
}> = {
  en: {
    eyebrow: "Developer • Creator • Builder",
    title: "I build software, tools, and experiences that are actually useful.",
    description: "SLOW.DEV is my home for software projects, developer tools, AI experiments, services, gaming, content, and the journey behind them.",
    primaryCta: "Explore Projects",
    secondaryCta: "Start a Project",
    projectsTitle: "Selected Projects",
    projectsDescription: "Real software, automation, bots, and experiments from the SLOW journey.",
    creatorTitle: "Creator Hub",
    creatorDescription: "Gaming, livestreams, videos, clips, and the community behind SLOW.",
    toolsTitle: "SLOW Tools",
    toolsDescription: "Free utilities designed to solve small developer and creator problems quickly.",
    servicesTitle: "Services",
    servicesDescription: "Web development, automation, AI integrations, performance, and technical SEO.",
    contactCta: "Let's build something",
    aiAssistant: "SLOW AI Assistant",
    askPlaceholder: "Ask something...",
    visitors: "visitors",
  },
  ar: {
    eyebrow: "مطور • صانع محتوى • Builder",
    title: "أبني برمجيات وأدوات وتجارب مفيدة فعلًا.",
    description: "SLOW.DEV هو مكاني للمشاريع البرمجية وأدوات المطورين وتجارب الذكاء الاصطناعي والخدمات والألعاب والمحتوى وكل ما أتعلمه أثناء البناء.",
    primaryCta: "استكشف المشاريع",
    secondaryCta: "ابدأ مشروعًا",
    projectsTitle: "أهم المشاريع",
    projectsDescription: "برمجيات وأتمتة وبوتات وتجارب حقيقية من رحلة SLOW.",
    creatorTitle: "Creator Hub",
    creatorDescription: "الألعاب والبث المباشر والفيديوهات والمقاطع والمجتمع حول SLOW.",
    toolsTitle: "أدوات SLOW",
    toolsDescription: "أدوات مجانية لحل مشاكل المطورين وصناع المحتوى بسرعة وبسهولة.",
    servicesTitle: "الخدمات",
    servicesDescription: "تطوير مواقع، أتمتة، تكاملات AI، تحسين الأداء، وSEO تقني.",
    contactCta: "نبني حاجة سوا",
    aiAssistant: "مساعد SLOW الذكي",
    askPlaceholder: "اكتب سؤالك...",
    visitors: "زائر",
  },
  tr: {
    eyebrow: "Geliştirici • İçerik Üreticisi • Builder",
    title: "Gerçekten faydalı yazılımlar, araçlar ve deneyimler geliştiriyorum.",
    description: "SLOW.DEV; yazılım projelerim, geliştirici araçlarım, yapay zeka deneylerim, hizmetlerim, oyun içeriklerim ve üretim sürecimin merkezi.",
    primaryCta: "Projeleri keşfet",
    secondaryCta: "Proje başlat",
    projectsTitle: "Öne Çıkan Projeler",
    projectsDescription: "SLOW yolculuğundaki gerçek yazılım, otomasyon, bot ve deneyler.",
    creatorTitle: "Creator Hub",
    creatorDescription: "Oyun, canlı yayınlar, videolar, klipler ve SLOW topluluğu.",
    toolsTitle: "SLOW Araçları",
    toolsDescription: "Geliştirici ve içerik üreticilerinin küçük sorunlarını hızlıca çözmek için ücretsiz araçlar.",
    servicesTitle: "Hizmetler",
    servicesDescription: "Web geliştirme, otomasyon, AI entegrasyonları, performans ve teknik SEO.",
    contactCta: "Birlikte geliştirelim",
    aiAssistant: "SLOW AI Asistanı",
    askPlaceholder: "Bir şey sor...",
    visitors: "ziyaretçi",
  },
};

export function getHomeContent(locale: Locale) {
  return homeContent[locale];
}

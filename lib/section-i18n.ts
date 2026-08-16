import type { Locale } from "@/lib/i18n";

export const sectionCopy: Record<Locale, Record<string, {
  title: string;
  description: string;
  intro: string;
  groups: Array<{ title: string; items: string[] }>;
  links: Array<[string, string]>;
}>> = {
  en: {
    about: {
      title: "About SLOW",
      description: "SLOW is a developer, builder, and creator building software, automation, experiments, and a useful personal platform around slows.dev.",
      intro: "The goal is simple: build useful things, document the process, and turn the work into resources other people can actually use.",
      groups: [
        { title: "Build", items: ["Web applications", "Automation and bots", "AI experiments", "Developer utilities"] },
        { title: "Create", items: ["Technical content", "Gaming and streams", "Project write-ups", "Experiments and tutorials"] },
        { title: "Connect", items: ["GitHub", "Discord community", "Social platforms", "Future products and services"] },
      ],
      links: [["Projects", "/projects"], ["Services", "/services"], ["Now", "/now"]],
    },
    services: {
      title: "Services",
      description: "Practical development and automation help for people and businesses that need something built, improved, or connected.",
      intro: "The focus is on scoped projects with a clear outcome rather than vague consulting packages.",
      groups: [
        { title: "Web development", items: ["Personal and business websites", "Landing pages", "Custom web applications", "E-commerce and integrations"] },
        { title: "Automation & AI", items: ["Discord bots", "Workflow automation", "AI integrations", "Custom internal tools"] },
        { title: "Performance & SEO", items: ["Technical SEO audits", "Website performance improvements", "Core Web Vitals work", "Search indexing and metadata foundations"] },
      ],
      links: [["Start a Project", "/contact"], ["See Projects", "/projects"]],
    },
    tools: {
      title: "SLOW Tools",
      description: "Free, focused web utilities designed to solve small problems quickly without unnecessary friction.",
      intro: "The tools section is being built as a real utility platform. The first wave is intentionally small so every tool can be fast, accessible, and reliable.",
      groups: [
        { title: "Developer", items: ["JSON Formatter", "JSON Validator", "Base64 Encoder / Decoder", "UUID Generator"] },
        { title: "SEO", items: ["SEO Preview", "Meta Tag Generator", "Robots.txt Generator", "Canonical Checker"] },
        { title: "Images & Creator", items: ["Image Compressor", "Image Resizer", "QR Code Generator", "Creator utility experiments"] },
      ],
      links: [["Read the Blog", "/blog"], ["View Projects", "/projects"]],
    },
  },
  ar: {
    about: {
      title: "عن SLOW",
      description: "SLOW مطور وصانع ومبنٍ رقمي يعمل على البرمجيات والأتمتة والتجارب ومنصة شخصية مفيدة حول slows.dev.",
      intro: "الهدف بسيط: بناء أشياء مفيدة، توثيق طريقة العمل، وتحويل التجربة إلى موارد يستطيع الآخرون استخدامها فعليًا.",
      groups: [
        { title: "نبني", items: ["تطبيقات الويب", "الأتمتة والبوتات", "تجارب الذكاء الاصطناعي", "أدوات المطورين"] },
        { title: "نصنع", items: ["محتوى تقني", "الألعاب والبث المباشر", "توثيق المشاريع", "التجارب والشروحات"] },
        { title: "نتواصل", items: ["GitHub", "مجتمع Discord", "منصات التواصل", "منتجات وخدمات مستقبلية"] },
      ],
      links: [["المشاريع", "/ar/projects"], ["الخدمات", "/ar/services"], ["الآن", "/ar/now"]],
    },
    services: {
      title: "الخدمات",
      description: "خدمات عملية في التطوير والأتمتة للأشخاص والشركات التي تحتاج إلى بناء شيء أو تحسينه أو ربطه.",
      intro: "نركز على مشاريع واضحة النطاق والنتيجة بدل باقات استشارات عامة وغير محددة.",
      groups: [
        { title: "تطوير الويب", items: ["مواقع شخصية وتجارية", "صفحات الهبوط", "تطبيقات ويب مخصصة", "التجارة الإلكترونية والتكاملات"] },
        { title: "الأتمتة والذكاء الاصطناعي", items: ["بوتات Discord", "أتمتة سير العمل", "تكاملات الذكاء الاصطناعي", "أدوات داخلية مخصصة"] },
        { title: "الأداء وSEO", items: ["تدقيق SEO تقني", "تحسين أداء المواقع", "Core Web Vitals", "أساسيات الفهرسة والبيانات الوصفية"] },
      ],
      links: [["ابدأ مشروعًا", "/ar/contact"], ["شاهد المشاريع", "/ar/projects"]],
    },
    tools: {
      title: "أدوات SLOW",
      description: "أدوات ويب مجانية ومركزة لحل المشاكل الصغيرة بسرعة ومن دون تعقيد غير ضروري.",
      intro: "قسم الأدوات يتحول إلى منصة أدوات حقيقية. نبدأ بمجموعة صغيرة حتى تكون كل أداة سريعة وسهلة وموثوقة.",
      groups: [
        { title: "للمطورين", items: ["منسق JSON", "مدقق JSON", "ترميز وفك ترميز Base64", "مولد UUID"] },
        { title: "SEO", items: ["معاينة SEO", "مولد Meta Tags", "مولد Robots.txt", "فاحص Canonical"] },
        { title: "الصور وصانع المحتوى", items: ["ضغط الصور", "تغيير حجم الصور", "مولد QR", "تجارب أدوات صانع المحتوى"] },
      ],
      links: [["اقرأ المدونة", "/ar/blog"], ["شاهد المشاريع", "/ar/projects"]],
    },
  },
};

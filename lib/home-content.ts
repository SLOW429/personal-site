export const homeContent = {
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
} as const;

export function getHomeContent() {
  return homeContent;
}

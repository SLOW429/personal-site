export type Project = {
  slug: string;
  title: string;
  description: string;
  featured: boolean;
  techStack: string[];
  demoUrl?: string;
  githubUrl: string;
  caseStudy: {
    problem: string;
    solution: string;
    architecture: string[];
    results: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "hr-bot",
    title: "HR-BOT",
    description: "Highrise automation and music bot built around repeatable deployment, community workflows, and service automation.",
    featured: true,
    techStack: ["Python", "Docker", "Coolify"],
    githubUrl: "https://github.com/SLOW429/HR-BOT",
    caseStudy: {
      problem: "Automate recurring Highrise community and music workflows while keeping deployment and configuration predictable.",
      solution: "A Python-based bot service packaged with Docker and deployed through Coolify for repeatable infrastructure and easier iteration.",
      architecture: ["Python application layer", "Containerized runtime with Docker", "Coolify deployment and environment management"],
      results: ["Repeatable deployments", "Clear separation between application and infrastructure", "Foundation for additional automation modules"],
    },
  },
  {
    slug: "discord-bot",
    title: "Discord Bot",
    description: "Discord utility and management tooling designed around modular community automation.",
    featured: false,
    techStack: ["JavaScript", "Discord.js"],
    githubUrl: "https://github.com/SLOW429/discord-bot",
    caseStudy: {
      problem: "Reduce repetitive server-management work and expose useful community actions through a natural chat interface.",
      solution: "A Discord.js bot architecture centered around commands, moderation utilities, and automation modules.",
      architecture: ["Node.js runtime", "Discord.js gateway and command handling", "Modular feature structure for future commands"],
      results: ["Reusable automation surface for communities", "Easy path to add commands and integrations", "Practical foundation for richer server tooling"],
    },
  },
  {
    slug: "chat-platform",
    title: "Chat Platform",
    description: "Experimental real-time communication platform exploring low-latency messaging with Node.js and WebSockets.",
    featured: false,
    techStack: ["Node.js", "WebSockets"],
    githubUrl: "https://github.com/SLOW429/chat-platform",
    caseStudy: {
      problem: "Explore the architecture required for persistent client connections and near-real-time message delivery.",
      solution: "A Node.js server using WebSockets for bidirectional communication and event-driven message handling.",
      architecture: ["Node.js server runtime", "Persistent WebSocket connections", "Event-driven message delivery"],
      results: ["Hands-on understanding of connection lifecycle", "Real-time messaging foundation", "Base for future rooms, presence, and persistence"],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const projectTags = Array.from(new Set(projects.flatMap((project) => project.techStack))).sort();

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured?: boolean;
  sections: readonly [string, string][];
};

export const blogPosts = [
  {
    slug: "building-slow-dev-into-a-personal-platform",
    title: "Building SLOW.DEV Into a Personal Platform",
    description: "Why a personal portfolio is becoming a home for tools, services, content, gaming, and community.",
    date: "2026-08-12",
    category: "Build Log",
    tags: ["SLOW.DEV", "Architecture", "Creator Platform"],
    featured: true,
    sections: [
      ["The problem with a static portfolio", "A portfolio is useful for showing finished work, but it is not a great home for everything that happens between projects. SLOW.DEV is being expanded so projects, tools, services, content, and community can all point back to one place."],
      ["The new model", "The platform is organized around Build, Create, and Connect. Build covers projects, services, and tools. Create covers the blog, gaming, videos, and streams. Connect covers Discord, GitHub, and social channels."],
      ["Why tools matter", "Useful tools create a reason to return. The first SLOW Tools are deliberately small and local-first so they can be fast for visitors and inexpensive to operate."],
      ["What comes next", "The next stages are better case studies, creator integrations, more tools, and a stronger content pipeline that turns real work into useful articles rather than filler."],
    ],
  },
  {
    slug: "designing-local-first-developer-tools",
    title: "Why SLOW Tools Are Local-First",
    description: "A practical approach to browser tools that stay fast, private, and inexpensive to run.",
    date: "2026-08-12",
    category: "Engineering",
    tags: ["Developer Tools", "Privacy", "Performance"],
    sections: [
      ["Start with the smallest useful architecture", "Many developer utilities do not need a backend. JSON formatting, Base64 conversion, UUID generation, URL encoding, and image conversion can often happen directly in the browser."],
      ["Privacy is a product feature", "When input can stay on the device, the tool does not need to upload it just to produce a result. That reduces infrastructure and makes the privacy story much easier to understand."],
      ["Performance and cost", "Removing unnecessary API requests improves perceived speed and reduces recurring infrastructure work. The backend can then be reserved for features that genuinely need server-side processing."],
      ["A scalable path", "Local-first does not mean backend-free forever. SLOW Tools can later add APIs, accounts, or premium capabilities without changing the basic experience of the simple tools."],
    ],
  },
] as const satisfies readonly BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getReadingTime(post: BlogPost) {
  const words = post.sections.reduce((total, [, body]) => total + body.trim().split(/\s+/).length, 0);
  return Math.max(1, Math.ceil(words / 180));
}

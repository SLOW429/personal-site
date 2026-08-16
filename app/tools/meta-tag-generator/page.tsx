import type { Metadata } from "next";
import ToolDetail from "@/components/tools/tool-detail";

export const metadata: Metadata = {
  title: "Next.js Meta Tag Generator | SLOW Tools",
  description: "Generate a copy-ready Next.js App Router metadata object.",
  alternates: { canonical: "/tools/meta-tag-generator" },
};

export default function MetaTagGeneratorPage() {
  return <ToolDetail slug="meta-tag-generator" />;
}

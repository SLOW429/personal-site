import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://slows.dev"),
  title: {
    default: "SLOW — Developer, Creator & Builder",
    template: "%s | SLOW",
  },
  description:
    "SLOW is a developer and creator building software, AI experiments, automation, useful developer tools, and gaming content.",
  keywords: [
    "SLOW429",
    "SLOW",
    "developer",
    "creator",
    "builder",
    "web development",
    "AI",
    "automation",
    "developer tools",
    "gaming",
    "streaming",
  ],
  authors: [{ name: "Abdellatif Shaheen", url: "https://slows.dev" }],
  creator: "SLOW",
  publisher: "SLOW",
  icons: {
    icon: "/avatar-poster.jpg",
    shortcut: "/avatar-poster.jpg",
    apple: "/avatar-poster.jpg",
  },
  openGraph: {
    title: "SLOW — Developer, Creator & Builder",
    description:
      "Building software, AI experiments, automation, useful tools, and gaming content.",
    url: "https://slows.dev",
    siteName: "SLOW",
    images: [{ url: "/banner-poster.jpg", width: 1600, height: 565, alt: "SLOW — Developer, Creator & Builder" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOW — Developer, Creator & Builder",
    description:
      "Building software, AI experiments, automation, useful tools, and gaming content.",
    images: ["/banner-poster.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#060a13",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

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
  title: "SLOW — Abdellatif Shaheen | Developer & Creator",
  description:
    "Portfolio of Abdellatif Shaheen (SLOW) — developer, automation builder, and voiceover artist based in Qatar. Bots, real-time systems, and cinematic digital work.",
  keywords: ["SLOW429", "Abdellatif Shaheen", "developer portfolio", "Discord bots", "web developer Qatar"],
  authors: [{ name: "Abdellatif Shaheen" }],
  icons: {
    icon: "/avatar-poster.jpg",
    shortcut: "/avatar-poster.jpg",
    apple: "/avatar-poster.jpg",
  },
  openGraph: {
    title: "SLOW — Abdellatif Shaheen",
    description: "Developer • Creator • Voiceover Artist — building cinematic AI, automation, and digital systems.",
    url: "https://slows.dev",
    siteName: "SLOW",
    images: [{ url: "/banner-poster.jpg", width: 1600, height: 565 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SLOW — Abdellatif Shaheen",
    description: "Developer • Creator • Voiceover Artist",
    images: ["/banner-poster.jpg"],
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

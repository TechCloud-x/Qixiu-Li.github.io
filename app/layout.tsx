import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin-variable.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin-variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://techcloud-x.github.io/Qixiu-Li.github.io/"),
  title: "李奇烋 · Qixiu Li",
  description:
    "The trilingual research homepage of Qixiu Li (李奇烋), focused on reinforcement-learning post-training for VLMs and LLMs, intelligent agents, computer vision, and trustworthy AI.",
  keywords: [
    "Qixiu Li",
    "李奇烋",
    "reinforcement learning",
    "VLM",
    "LLM",
    "intelligent agents",
    "computer vision",
    "AI4Science",
    "trustworthy AI",
    "强化学习",
  ],
  authors: [{ name: "Qixiu Li", url: "https://github.com/TechCloud-x" }],
  creator: "Qixiu Li",
  alternates: {
    canonical: "https://techcloud-x.github.io/Qixiu-Li.github.io/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN", "fr_FR"],
    url: "https://techcloud-x.github.io/Qixiu-Li.github.io/",
    siteName: "LQX — Qixiu Li Research Homepage",
    title: "Qixiu Li — Reinforcement-Learning Post-Training & Intelligent Agents",
    description: "Open research on reinforcement-learning post-training for VLMs and LLMs, intelligent agents, computer vision, and trustworthy AI.",
    images: [
      {
        url: "/Qixiu-Li.github.io/visuals/social-card-4k.jpg",
        width: 3840,
        height: 2160,
        alt: "LQX — Qixiu Li, reinforcement-learning post-training and intelligent agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qixiu Li — Reinforcement-Learning Post-Training & Intelligent Agents",
    description: "Open research on reinforcement-learning post-training for VLMs and LLMs, intelligent agents, computer vision, and trustworthy AI.",
    images: ["/Qixiu-Li.github.io/visuals/social-card-4k.jpg"],
  },
  icons: {
    icon: "/Qixiu-Li.github.io/visuals/brand-lqx-4k.png",
    shortcut: "/Qixiu-Li.github.io/visuals/brand-lqx-4k.png",
    apple: "/Qixiu-Li.github.io/visuals/brand-lqx-4k.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

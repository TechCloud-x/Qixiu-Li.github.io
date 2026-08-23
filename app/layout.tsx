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
    "The trilingual research homepage of Qixiu Li (李奇烋), focused on reinforcement learning, intelligent agents, and reliable AI.",
  keywords: [
    "Qixiu Li",
    "李奇烋",
    "reinforcement learning",
    "intelligent agents",
    "reliable AI",
    "强化学习",
  ],
  authors: [{ name: "Qixiu Li", url: "https://github.com/TechCloud-x" }],
  creator: "Qixiu Li",
  alternates: {
    canonical: "https://techcloud-x.github.io/Qixiu-Li.github.io/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US", "fr_FR"],
    url: "https://techcloud-x.github.io/Qixiu-Li.github.io/",
    siteName: "LQX — Qixiu Li Research Homepage",
    title: "Qixiu Li — Reinforcement Learning & Intelligent Agents",
    description: "Open research, intelligent agents, and reproducible AI.",
    images: [
      {
        url: "/Qixiu-Li.github.io/visuals/social-card-4k.jpg",
        width: 3840,
        height: 2160,
        alt: "LQX — Qixiu Li, reinforcement learning and intelligent agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qixiu Li — Reinforcement Learning & Intelligent Agents",
    description: "Open research, intelligent agents, and reproducible AI.",
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
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

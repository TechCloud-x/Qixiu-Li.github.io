import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const themeBootstrap = `
  (() => {
    const root = document.documentElement;
    let savedTheme = null;

    try {
      savedTheme = window.localStorage.getItem("portfolio-theme");
    } catch {}

    const hasSavedTheme = savedTheme === "light" || savedTheme === "dark";
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    const theme = hasSavedTheme ? savedTheme : prefersDark ? "dark" : "light";

    root.dataset.theme = theme;
    root.dataset.themePreference = hasSavedTheme ? "user" : "system";
  })();
`;

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
    "The trilingual research homepage of Qixiu Li (李奇烋), focused on reinforcement-learning post-training for LMs, multimodal agents, and AI4Science for intelligent weather and ocean forecasting.",
  keywords: [
    "Qixiu Li",
    "李奇烋",
    "reinforcement learning",
    "VLM",
    "LLM",
    "multimodal agents",
    "computer vision",
    "AI4Science",
    "weather forecasting",
    "ocean forecasting",
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
    title: "Qixiu Li — Reinforcement-Learning Post-Training & Multimodal Agents",
    description: "Open research on reinforcement-learning post-training for LMs, multimodal agents, and AI4Science for intelligent weather and ocean forecasting.",
    images: [
      {
        url: "/Qixiu-Li.github.io/visuals/social-card-4k.jpg",
        width: 3840,
        height: 2160,
        alt: "LQX — Qixiu Li, reinforcement-learning post-training and multimodal agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qixiu Li — Reinforcement-Learning Post-Training & Multimodal Agents",
    description: "Open research on reinforcement-learning post-training for LMs, multimodal agents, and AI4Science for intelligent weather and ocean forecasting.",
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}

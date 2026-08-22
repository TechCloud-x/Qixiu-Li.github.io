"use client";

import { useEffect, useState } from "react";

type Locale = "zh" | "en" | "fr";

type ThemeTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

const locales: { id: Locale; label: string; short: string }[] = [
  { id: "zh", label: "中文", short: "中" },
  { id: "en", label: "English", short: "EN" },
  { id: "fr", label: "Français", short: "FR" },
];

const content = {
  zh: {
    skip: "跳到主要内容",
    nav: {
      about: "关于",
      projects: "项目",
      news: "动态",
      publications: "论文",
      experience: "履历",
      contact: "联系",
    },
    themeLight: "切换到深色模式",
    themeDark: "切换到浅色模式",
    menuOpen: "打开导航菜单",
    menuClose: "关闭导航菜单",
    heroEyebrow: "强化学习 · 智能决策 · 开放研究",
    heroTitleA: "让智能体",
    heroTitleB: "学会思考。",
    heroBody:
      "你好，我是李奇烋，一名关注强化学习、智能体与可靠人工智能的研究者和开发者。我整理前沿研究，也把想法变成可复现、可交流的开放项目。",
    explore: "探索我的工作",
    github: "GitHub",
    available: "欢迎研究交流与开源协作",
    portraitAlt: "李奇烋的 GitHub 头像",
    scroll: "向下滚动",
    aboutKicker: "01 / 关于我",
    aboutTitle: "研究复杂问题，\n构建清晰答案。",
    aboutBody:
      "我的兴趣位于强化学习、大模型智能体与智能决策的交叉点。我关心的不只是模型能否得到高分，更关心研究是否可靠、系统是否可复现，以及知识能否被更多人真正使用。",
    focusTitle: "研究方向",
    focus: ["强化学习", "大模型智能体", "多模态推理", "可靠与可复现 AI"],
    stats: [
      ["122", "篇 ICASSP 论文完成可复核筛选"],
      ["03", "种语言访问这份主页"],
      ["∞", "持续探索的开放问题"],
    ],
    projectsKicker: "02 / 精选项目",
    projectsTitle: "把研究地图，\n变成公共工具。",
    projectsIntro: "公开、可核验、可继续生长的研究整理与工程实践。",
    projects: [
      {
        index: "01",
        title: "ICASSP 2025–2026 RL Atlas",
        description:
          "对 122 篇强化学习相关论文进行可复核筛选、主题归类与代码完整性审计，连接论文、DOI 与公开实现。",
        meta: "文献综述 · 数据目录 · 2026",
        href: "https://github.com/TechCloud-x/ICASSP2025_6RL-Paper-main",
        action: "查看项目",
      },
      {
        index: "02",
        title: "RL Top Papers 2026",
        description:
          "持续整理 CVPR、AAAI、ACL 等顶级会议中的强化学习论文，让跨领域研究脉络更容易检索与比较。",
        meta: "研究索引 · 开放知识 · 2026",
        href: "https://github.com/TechCloud-x/RL-TOP-2026PAPER-main",
        action: "浏览目录",
      },
      {
        index: "03",
        title: "Personal Research Homepage",
        description:
          "一个支持中文、英文与法文、明暗主题以及滚动视差的开放学术主页，也是一份持续更新的数字简历。",
        meta: "Next.js · GitHub Pages · 2026",
        href: "https://github.com/TechCloud-x",
        action: "查看源码",
      },
    ],
    newsKicker: "03 / 新闻动态",
    newsTitle: "近期进展",
    news: [
      ["2026.08.22", "个人学术主页完成首次发布，支持三语访问与明暗主题。"],
      ["2026.08.14", "公开 ICASSP 2025–2026 强化学习论文综述与可复核目录。"],
      ["2026.08.14", "发布 2026 强化学习顶会论文索引，覆盖 CVPR、AAAI 与 ACL。"],
    ],
    publicationsKicker: "04 / 论文发表",
    publicationsTitle: "Selected Publications",
    publicationsIntro:
      "论文条目将以精选卡片呈现，包括会议信息、作者、摘要以及论文、项目和代码链接。",
    publicationEmptyTitle: "作者论文信息待补充",
    publicationEmptyBody:
      "这里仅展示经核验的作者论文。当前公开资料不足，因此暂不将文献整理项目误列为本人发表成果。",
    publicationEmptyTag: "VERIFIED RECORDS ONLY",
    update: "等待更新",
    experienceKicker: "05 / 履历与贡献",
    experienceTitle: "研究之外，\n保持长期投入。",
    patents: "专利",
    honors: "荣誉",
    education: "教育经历",
    services: "Services",
    pendingPatent: "暂无可核验的公开专利记录",
    pendingHonor: "暂无可核验的公开荣誉记录",
    pendingEducation: "院校、学位与时间信息待补充",
    serviceItems: [
      ["开放研究", "维护可复核的文献目录与研究地图"],
      ["知识整理", "将分散的论文、代码与元数据连接起来"],
      ["社区协作", "欢迎围绕强化学习与智能体开展交流"],
    ],
    contactKicker: "06 / 联系",
    contactTitle: "下一项研究，\n一起开始？",
    contactBody:
      "如果你正在研究强化学习、智能体或可靠 AI，欢迎分享问题、想法与合作机会。",
    contactAction: "在 GitHub 上联系我",
    footerLine: "为开放研究与好奇心而构建。",
    lastUpdated: "最近更新 · 2026 年 8 月",
  },
  en: {
    skip: "Skip to main content",
    nav: {
      about: "About",
      projects: "Projects",
      news: "News",
      publications: "Publications",
      experience: "Profile",
      contact: "Contact",
    },
    themeLight: "Switch to dark theme",
    themeDark: "Switch to light theme",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    heroEyebrow: "REINFORCEMENT LEARNING · AGENTS · OPEN RESEARCH",
    heroTitleA: "Teaching agents",
    heroTitleB: "to think.",
    heroBody:
      "Hi, I’m Qixiu Li, a researcher and developer exploring reinforcement learning, intelligent agents, and reliable AI. I map emerging research and turn ideas into open, reproducible work.",
    explore: "Explore my work",
    github: "GitHub",
    available: "Open to research conversations and collaboration",
    portraitAlt: "Qixiu Li’s GitHub profile picture",
    scroll: "Scroll to explore",
    aboutKicker: "01 / ABOUT",
    aboutTitle: "Complex questions.\nClear answers.",
    aboutBody:
      "My interests sit at the intersection of reinforcement learning, LLM agents, and intelligent decision-making. I care not only about model scores, but whether research is reliable, systems are reproducible, and knowledge becomes genuinely useful.",
    focusTitle: "Research focus",
    focus: ["Reinforcement learning", "LLM agents", "Multimodal reasoning", "Reliable & reproducible AI"],
    stats: [
      ["122", "ICASSP papers screened with traceable sources"],
      ["03", "languages available on this homepage"],
      ["∞", "open questions left to explore"],
    ],
    projectsKicker: "02 / SELECTED PROJECTS",
    projectsTitle: "Research maps,\nmade public.",
    projectsIntro: "Open, verifiable, and extensible research curation and engineering.",
    projects: [
      {
        index: "01",
        title: "ICASSP 2025–2026 RL Atlas",
        description:
          "A reproducible screen of 122 reinforcement-learning papers with topic synthesis, code-completeness audits, DOI links, and structured metadata.",
        meta: "Literature review · Dataset · 2026",
        href: "https://github.com/TechCloud-x/ICASSP2025_6RL-Paper-main",
        action: "View project",
      },
      {
        index: "02",
        title: "RL Top Papers 2026",
        description:
          "A living index of reinforcement-learning papers from CVPR, AAAI, ACL, and other major venues, built for quick cross-field discovery.",
        meta: "Research index · Open knowledge · 2026",
        href: "https://github.com/TechCloud-x/RL-TOP-2026PAPER-main",
        action: "Browse catalog",
      },
      {
        index: "03",
        title: "Personal Research Homepage",
        description:
          "A trilingual, theme-aware, parallax research profile—and a living digital résumé built in the open.",
        meta: "Next.js · GitHub Pages · 2026",
        href: "https://github.com/TechCloud-x",
        action: "View source",
      },
    ],
    newsKicker: "03 / NEWS",
    newsTitle: "Recent signals",
    news: [
      ["2026.08.22", "Launched this trilingual academic homepage with light and dark themes."],
      ["2026.08.14", "Published the reproducible ICASSP 2025–2026 reinforcement-learning review."],
      ["2026.08.14", "Released a 2026 top-conference RL index covering CVPR, AAAI, and ACL."],
    ],
    publicationsKicker: "04 / PUBLICATIONS",
    publicationsTitle: "Selected Publications",
    publicationsIntro:
      "Verified papers will appear as editorial cards with venue, authors, abstract, paper, project, and code links.",
    publicationEmptyTitle: "Author publications to be added",
    publicationEmptyBody:
      "Only verified author records belong here. Public information is currently insufficient, so literature-curation projects are not misrepresented as authored papers.",
    publicationEmptyTag: "VERIFIED RECORDS ONLY",
    update: "Awaiting update",
    experienceKicker: "05 / PROFILE & SERVICE",
    experienceTitle: "Beyond research,\nstay invested.",
    patents: "Patents",
    honors: "Honors",
    education: "Education",
    services: "Services",
    pendingPatent: "No publicly verifiable patent record yet",
    pendingHonor: "No publicly verifiable honor record yet",
    pendingEducation: "Institution, degree, and dates to be added",
    serviceItems: [
      ["Open research", "Maintaining traceable literature catalogs and research maps"],
      ["Knowledge curation", "Connecting papers, code, and structured metadata"],
      ["Community", "Open to conversations around RL and intelligent agents"],
    ],
    contactKicker: "06 / CONTACT",
    contactTitle: "The next question—\nshall we start?",
    contactBody:
      "If you work on reinforcement learning, agents, or reliable AI, I’d be glad to hear about your questions, ideas, and collaboration opportunities.",
    contactAction: "Connect on GitHub",
    footerLine: "Built for open research and curiosity.",
    lastUpdated: "Last updated · August 2026",
  },
  fr: {
    skip: "Aller au contenu principal",
    nav: {
      about: "À propos",
      projects: "Projets",
      news: "Actualités",
      publications: "Publications",
      experience: "Parcours",
      contact: "Contact",
    },
    themeLight: "Passer au thème sombre",
    themeDark: "Passer au thème clair",
    menuOpen: "Ouvrir le menu de navigation",
    menuClose: "Fermer le menu de navigation",
    heroEyebrow: "APPRENTISSAGE PAR RENFORCEMENT · AGENTS · RECHERCHE OUVERTE",
    heroTitleA: "Apprendre aux agents",
    heroTitleB: "à réfléchir.",
    heroBody:
      "Bonjour, je suis Qixiu Li, chercheur et développeur en apprentissage par renforcement, agents intelligents et IA fiable. Je cartographie la recherche émergente et transforme les idées en travaux ouverts et reproductibles.",
    explore: "Découvrir mes travaux",
    github: "GitHub",
    available: "Ouvert aux échanges et aux collaborations",
    portraitAlt: "Photo de profil GitHub de Qixiu Li",
    scroll: "Faire défiler",
    aboutKicker: "01 / À PROPOS",
    aboutTitle: "Questions complexes.\nRéponses claires.",
    aboutBody:
      "Mes intérêts se situent au croisement de l’apprentissage par renforcement, des agents LLM et de la décision intelligente. Au-delà des scores, je m’intéresse à la fiabilité, à la reproductibilité et à l’utilité réelle des connaissances.",
    focusTitle: "Axes de recherche",
    focus: ["Apprentissage par renforcement", "Agents LLM", "Raisonnement multimodal", "IA fiable et reproductible"],
    stats: [
      ["122", "articles ICASSP vérifiés à partir de sources traçables"],
      ["03", "langues disponibles sur ce site"],
      ["∞", "questions ouvertes à explorer"],
    ],
    projectsKicker: "02 / PROJETS SÉLECTIONNÉS",
    projectsTitle: "Des cartes de recherche,\nouvertes à tous.",
    projectsIntro: "Une curation et une ingénierie ouvertes, vérifiables et extensibles.",
    projects: [
      {
        index: "01",
        title: "Atlas RL ICASSP 2025–2026",
        description:
          "Une sélection reproductible de 122 articles avec synthèse thématique, audit du code, liens DOI et métadonnées structurées.",
        meta: "Revue de littérature · Données · 2026",
        href: "https://github.com/TechCloud-x/ICASSP2025_6RL-Paper-main",
        action: "Voir le projet",
      },
      {
        index: "02",
        title: "Articles RL majeurs 2026",
        description:
          "Un index vivant des articles d’apprentissage par renforcement publiés à CVPR, AAAI, ACL et dans d’autres conférences majeures.",
        meta: "Index scientifique · Savoir ouvert · 2026",
        href: "https://github.com/TechCloud-x/RL-TOP-2026PAPER-main",
        action: "Parcourir l’index",
      },
      {
        index: "03",
        title: "Page personnelle de recherche",
        description:
          "Un profil trilingue avec thèmes clair et sombre, parallaxe et CV numérique vivant, développé ouvertement.",
        meta: "Next.js · GitHub Pages · 2026",
        href: "https://github.com/TechCloud-x",
        action: "Voir le code",
      },
    ],
    newsKicker: "03 / ACTUALITÉS",
    newsTitle: "Signaux récents",
    news: [
      ["22.08.2026", "Mise en ligne de ce site académique trilingue avec thèmes clair et sombre."],
      ["14.08.2026", "Publication de la revue reproductible ICASSP 2025–2026 sur le RL."],
      ["14.08.2026", "Publication d’un index RL 2026 couvrant CVPR, AAAI et ACL."],
    ],
    publicationsKicker: "04 / PUBLICATIONS",
    publicationsTitle: "Publications sélectionnées",
    publicationsIntro:
      "Les articles vérifiés apparaîtront sous forme de cartes avec conférence, auteurs, résumé et liens vers l’article, le projet et le code.",
    publicationEmptyTitle: "Publications de l’auteur à compléter",
    publicationEmptyBody:
      "Seules les publications vérifiées figurent ici. Les informations publiques étant insuffisantes, les projets de curation ne sont pas présentés comme des articles de l’auteur.",
    publicationEmptyTag: "DONNÉES VÉRIFIÉES UNIQUEMENT",
    update: "Mise à jour à venir",
    experienceKicker: "05 / PARCOURS & SERVICE",
    experienceTitle: "Au-delà de la recherche,\ns’investir dans la durée.",
    patents: "Brevets",
    honors: "Distinctions",
    education: "Formation",
    services: "Services",
    pendingPatent: "Aucun brevet public vérifiable pour le moment",
    pendingHonor: "Aucune distinction publique vérifiable pour le moment",
    pendingEducation: "Établissement, diplôme et dates à compléter",
    serviceItems: [
      ["Recherche ouverte", "Maintien de catalogues traçables et de cartes scientifiques"],
      ["Curation du savoir", "Connexion des articles, du code et des métadonnées"],
      ["Communauté", "Échanges ouverts autour du RL et des agents intelligents"],
    ],
    contactKicker: "06 / CONTACT",
    contactTitle: "La prochaine question—\non commence ?",
    contactBody:
      "Vous travaillez sur le renforcement, les agents ou l’IA fiable ? Partageons questions, idées et possibilités de collaboration.",
    contactAction: "Me contacter sur GitHub",
    footerLine: "Conçu pour la recherche ouverte et la curiosité.",
    lastUpdated: "Dernière mise à jour · août 2026",
  },
} as const;

const visual = (name: string) => `visuals/${name}`;

function AssetIcon({
  name,
  className = "asset-icon",
}: {
  name: "external" | "language" | "network" | "publication" | "scroll" | "theme";
  className?: string;
}) {
  // Every interface icon is cropped from the generated 4K icon atlas.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={visual(`icon-${name}-4k.png`)} alt="" aria-hidden="true" />;
}

function Arrow() {
  return <AssetIcon name="external" className="link-icon" />;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("zh");
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[locale];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem("portfolio-locale") as Locale | null;
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const frame = window.requestAnimationFrame(() => {
      if (savedLocale && locales.some((item) => item.id === savedLocale)) {
        setLocale(savedLocale);
      }
      if (savedTheme === "dark") setDark(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : locale;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    window.localStorage.setItem("portfolio-locale", locale);
    window.localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
  }, [locale, dark]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const viewportHeight = window.innerHeight;
      const scrollRange = Math.max(document.documentElement.scrollHeight - viewportHeight, 1);
      const localLayers = document.querySelectorAll<HTMLElement>("[data-parallax]");
      const globalLayers = document.querySelectorAll<HTMLElement>("[data-parallax-global]");

      localLayers.forEach((layer) => {
        const rect = layer.getBoundingClientRect();
        const speed = Number(layer.dataset.parallax ?? 0.08);
        const distance = rect.top + rect.height / 2 - viewportHeight / 2;
        const offset = Math.max(-150, Math.min(150, distance * speed * -1));
        layer.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });

      globalLayers.forEach((layer) => {
        const speed = Number(layer.dataset.parallaxGlobal ?? -0.05);
        const offset = Math.max(-110, Math.min(110, window.scrollY * speed));
        layer.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });

      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${Math.min(window.scrollY / scrollRange, 1)}`,
      );
      ticking = false;
    };
    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const chooseLocale = (next: Locale) => {
    setLocale(next);
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const nextDark = !dark;
    const root = document.documentElement;
    const transitionDocument = document as ThemeTransitionDocument;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const applyTheme = () => {
      root.dataset.theme = nextDark ? "dark" : "light";
      setDark(nextDark);
    };

    root.dataset.themeSwitching = "true";
    if (transitionDocument.startViewTransition && !reducedMotion) {
      const transition = transitionDocument.startViewTransition(applyTheme);
      transition.finished.finally(() => {
        delete root.dataset.themeSwitching;
      });
      return;
    }

    applyTheme();
    window.setTimeout(() => {
      delete root.dataset.themeSwitching;
    }, 720);
  };

  const navItems = [
    ["about", t.nav.about],
    ["projects", t.nav.projects],
    ["news", t.nav.news],
    ["publications", t.nav.publications],
    ["experience", t.nav.experience],
    ["contact", t.nav.contact],
  ];

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>

      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="LQX — Qixiu Li home">
          <span className="brand-mark" aria-hidden="true">LQX</span>
          <span className="brand-name">Qixiu Li</span>
        </a>

        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {navItems.map(([href, label]) => (
            <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label="Language">
            <AssetIcon name="language" className="control-icon language-control-icon" />
            {locales.map((item) => (
              <button
                key={item.id}
                className={locale === item.id ? "active" : ""}
                onClick={() => chooseLocale(item.id)}
                aria-pressed={locale === item.id}
                title={item.label}
              >
                <span className="language-full">{item.label}</span>
                <span className="language-short">{item.short}</span>
              </button>
            ))}
          </div>
          <button
            className={`theme-toggle ${dark ? "is-dark" : "is-light"}`}
            onClick={toggleTheme}
            aria-label={dark ? t.themeDark : t.themeLight}
            title={dark ? t.themeDark : t.themeLight}
          >
            <AssetIcon name="theme" className="control-icon" />
          </button>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? t.menuClose : t.menuOpen}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-sticky">
            <div className="hero-media" data-parallax-global="-0.05" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visual("hero-orbit-4k.jpg")} alt="" />
            </div>
            <div className="hero-shade" aria-hidden="true" />
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow">{t.heroEyebrow}</p>
              <h1>
                <span>{t.heroTitleA}</span>
                <span className="gradient-text">{t.heroTitleB}</span>
              </h1>
              <div className="hero-lower">
                <p>{t.heroBody}</p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#projects">
                    {t.explore} <Arrow />
                  </a>
                  <a
                    className="button button-ghost"
                    href="https://github.com/TechCloud-x"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.github} <Arrow />
                  </a>
                </div>
              </div>
            </div>

            <aside className="hero-profile" data-parallax-global="0.035">
              <div className="profile-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://github.com/TechCloud-x.png?size=640" alt={t.portraitAlt} />
                <span className="profile-number">001</span>
                <span className="profile-caption">LQX / TECHCLOUD-X</span>
              </div>
              <div className="availability">
                <span className="status-dot" />
                {t.available}
              </div>
            </aside>

            <a className="scroll-cue" href="#about">
              <span>{t.scroll}</span>
              <AssetIcon name="scroll" className="scroll-icon" />
            </a>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="section-aura aura-violet" data-parallax="0.04" aria-hidden="true" />
          <div className="section-heading">
            <p className="eyebrow">{t.aboutKicker}</p>
            <h2 className="multiline">{t.aboutTitle}</h2>
          </div>
          <div className="about-layout">
            <div className="about-copy">
              <p>{t.aboutBody}</p>
            </div>
            <div className="focus-card" data-parallax="0.055">
              <AssetIcon name="network" className="focus-icon" />
              <p className="card-label">{t.focusTitle}</p>
              <ul>
                {t.focus.map((item, index) => (
                  <li key={item}>
                    <span>0{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="stats-grid">
            {t.stats.map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="project-panorama" data-parallax="0.07" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={visual("research-map-4k.jpg")} alt="" />
          </div>
          <div className="section-heading">
            <p className="eyebrow">{t.projectsKicker}</p>
            <h2 className="multiline">{t.projectsTitle}</h2>
            <p className="section-intro">{t.projectsIntro}</p>
          </div>
          <div className="project-grid">
            {t.projects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.title}>
                <div className="project-visual" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={visual(
                      ["research-map-4k.jpg", "hero-orbit-4k.jpg", "learning-signal-4k.jpg"][index],
                    )}
                    alt=""
                    data-parallax={index % 2 === 0 ? "0.065" : "-0.05"}
                  />
                  <span className="project-index">{project.index}</span>
                </div>
                <div className="project-content">
                  <p className="project-meta">{project.meta}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a
                    href={index === 2 ? "https://github.com/TechCloud-x/Qixiu-Li.github.io" : project.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.action} <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section news" id="news">
          <div className="news-heading">
            <p className="eyebrow">{t.newsKicker}</p>
            <h2>{t.newsTitle}</h2>
          </div>
          <div className="news-list">
            {t.news.map(([date, item], index) => (
              <article className="news-item" key={`${date}-${index}`}>
                <time>{date}</time>
                <p>{item}</p>
                <AssetIcon name="external" className="news-arrow" />
              </article>
            ))}
          </div>
        </section>

        <section className="section publications" id="publications">
          <div className="section-heading publications-heading">
            <p className="eyebrow">{t.publicationsKicker}</p>
            <h2>{t.publicationsTitle}</h2>
            <p className="section-intro">{t.publicationsIntro}</p>
          </div>
          <article className="publication-card publication-empty">
            <div className="publication-visual" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={visual("learning-signal-4k.jpg")} alt="" data-parallax="0.07" />
              <span className="paper-grid-label">PAPER / 00</span>
              <span className="paper-venue">TBA</span>
            </div>
            <div className="publication-copy">
              <span className="publication-tag">{t.publicationEmptyTag}</span>
              <h3>{t.publicationEmptyTitle}</h3>
              <p>{t.publicationEmptyBody}</p>
              <span className="publication-status">
                <span className="status-dot" /> {t.update}
              </span>
            </div>
          </article>
        </section>

        <section className="section experience" id="experience">
          <div className="section-aura aura-orange" data-parallax="-0.035" aria-hidden="true" />
          <div className="section-heading">
            <p className="eyebrow">{t.experienceKicker}</p>
            <h2 className="multiline">{t.experienceTitle}</h2>
          </div>
          <div className="experience-grid">
            <article className="experience-card compact-card">
              <div className="experience-card-title">
                <AssetIcon name="publication" className="experience-icon" />
                <span>01</span>
                <h3>{t.patents}</h3>
              </div>
              <p>{t.pendingPatent}</p>
              <span className="pending-line" />
            </article>
            <article className="experience-card compact-card accent-card">
              <div className="experience-card-title">
                <AssetIcon name="external" className="experience-icon" />
                <span>02</span>
                <h3>{t.honors}</h3>
              </div>
              <p>{t.pendingHonor}</p>
              <span className="pending-line" />
            </article>
            <article className="experience-card compact-card">
              <div className="experience-card-title">
                <AssetIcon name="language" className="experience-icon" />
                <span>03</span>
                <h3>{t.education}</h3>
              </div>
              <p>{t.pendingEducation}</p>
              <span className="pending-line" />
            </article>
            <article className="experience-card services-card">
              <div className="experience-card-title">
                <AssetIcon name="network" className="experience-icon" />
                <span>04</span>
                <h3>{t.services}</h3>
              </div>
              <ul>
                {t.serviceItems.map(([title, body]) => (
                  <li key={title}>
                    <strong>{title}</strong>
                    <span>{body}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-media" data-parallax="0.08" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={visual("hero-orbit-4k.jpg")} alt="" />
          </div>
          <div className="contact-inner">
            <p className="eyebrow">{t.contactKicker}</p>
            <h2 className="multiline">{t.contactTitle}</h2>
            <div className="contact-lower">
              <p>{t.contactBody}</p>
              <a href="https://github.com/TechCloud-x" target="_blank" rel="noreferrer">
                {t.contactAction} <Arrow />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">LQX</span>
          <span>{t.footerLine}</span>
        </div>
        <div className="footer-meta">
          <span>© 2026 Qixiu Li</span>
          <span>{t.lastUpdated}</span>
        </div>
      </footer>
    </>
  );
}

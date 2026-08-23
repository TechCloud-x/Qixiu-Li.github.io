"use client";

import { useEffect, useState } from "react";

type Locale = "zh" | "en" | "fr";

type ThemeTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

const locales: { id: Locale; label: string }[] = [
  { id: "zh", label: "中文" },
  { id: "en", label: "English" },
  { id: "fr", label: "Français" },
];

const publicationRecords = [
  {
    id: "slow-ocast",
    title:
      "Slow-OCast: Slow-Varying Motion Inspired Transfer Learning for Regional High-Resolution Ocean Environmental Forecasting",
    venue: "SIGKDD 2026",
    venueName: "32nd ACM SIGKDD Conference on Knowledge Discovery and Data Mining (SIGKDD 2026)",
    authors: ["Qixiu Li", "Xiang Zhu", "Xiaoyong Li", "Haolong Xiang", "Xiaolong Xu"],
    image: "publication-architecture-slow-ocast.webp",
    href: "https://dl.acm.org/doi/abs/10.1145/3770855.3819036",
  },
  {
    id: "phyoceancast",
    title: "PhyOceanCast: Global Ocean Forecasting with Physics-Informed Diffusion",
    venue: "CVPR 2026",
    venueName: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2026)",
    authors: ["Qixiu Li", "Xiang Zhu", "Xiaoyong Li", "Xiaolong Xu"],
    image: "publication-architecture-phyoceancast.webp",
    href:
      "https://openaccess.thecvf.com/content/CVPR2026/html/Li_PhyOceanCast_Global_Ocean_Forecasting_with_Physics-Informed_Diffusion_CVPR_2026_paper.html",
  },
  {
    id: "dolphin",
    title: "DOLPHIN: Diffusion Model-Based Approach for Coastal Sea Temperature Forecast Bias Correction",
    venue: "ISPA 2025",
    venueName: "IEEE International Symposium on Parallel and Distributed Processing with Applications (ISPA 2025)",
    authors: ["Qixiu Li", "Xiang Zhu", "Junxing Zhu", "Xiaoyong Li", "Xiaoli Ren", "Jingnan Wang", "Ruiqing Qi"],
    image: "publication-architecture-dolphin.webp",
    href: "https://ieeexplore.ieee.org/abstract/document/11245387",
  },
  {
    id: "ifg-net",
    title: "IFG-Net: Channel Info Fusion Guidance for Retinal Vessel Segmentation",
    venue: "UIC 2025",
    venueName: "IEEE International Conference on Ubiquitous Intelligence and Computing (UIC 2025)",
    authors: ["Qixiu Li", "Xiang Zhu", "Xiaoyong Li", "Chengcheng Shao", "Xiaoli Ren"],
    image: "publication-architecture-ifg-net-v2.webp",
    href: "https://ieeexplore.ieee.org/abstract/document/11394978",
  },
] as const;

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
        title: "吉林省文旅厅专项-文旅汇总平台",
        description:
          "面向吉林省文化和旅游资源的数据汇总与管理平台，支持文旅数据采集、信息管理、统计分析与可视化展示。",
        meta: "文旅数据 · 管理平台 · 开源项目",
        href: "https://gitee.com/custhitachi/tourismwms",
        action: "查看项目",
      },
    ],
    newsKicker: "03 / 新闻动态",
    newsTitle: "近期进展",
    news: [
      ["2026.08.14", "公开 ICASSP 2025–2026 强化学习论文综述与可复核目录。"],
      ["2026.08.14", "发布 2026 强化学习顶会论文索引，覆盖 CVPR、AAAI 与 ACL。"],
      ["2026.05.17", "一篇论文（Slow-OCast）被 SIGKDD 2026 接收！感谢所有合作者！"],
      ["2026.02.21", "一篇论文（PhyOceanCast）被 CVPR 2026 接收！感谢所有合作者！"],
      ["2025.08.31", "一篇论文（DOLPHIN）被 ISPA 2025 接收！感谢所有合作者！"],
      ["2025.06.10", "一篇论文（IFG-Net）被 UIC 2025 接收！感谢所有合作者！"],
    ],
    publicationsKicker: "04 / 论文发表",
    publicationsTitle: "Selected Publications",
    publicationsIntro:
      "精选展示四篇已接收论文，包含论文架构图、会议信息、作者与原文链接。",
    publicationTag: "精选论文",
    paperLinkLabel: "查看论文",
    paperAuthorsLabel: "作者",
    architectureAlt: "论文架构图",
    experienceKicker: "05 / 履历与贡献",
    experienceTitle: "研究之外，\n保持长期投入。",
    patents: "专利",
    patentLinkLabel: "查看专利",
    honors: "荣誉",
    education: "教育经历",
    services: "Services",
    patentItems: [
      {
        title: "一种多变量球面信息融合方法和系统",
        numberLabel: "专利号",
        number: "ZL 2025 1 1716023.7",
        publicationLabel: "公告号",
        publicationNumber: "CN121188717B",
        href: "https://www.patentguru.com/cn/search?q=CN121188717B",
      },
      {
        title: "一种基于时空相干的海洋变量预测方法和系统",
        numberLabel: "专利号",
        number: "ZL 2025 1 1726905.1",
        publicationLabel: "公告号",
        publicationNumber: "CN121188438B",
        href: "https://www.patentguru.com/cn/search?q=CN121188438B",
      },
      {
        title: "一种基于特征工程和兄长指导机制的有效波高预测方法",
        numberLabel: "专利号",
        number: "ZL 2025 1 0781011.6",
        publicationLabel: "公告号",
        publicationNumber: "CN120296702B",
        href: "https://www.patentguru.com/cn/search?q=CN120296702B",
      },
      {
        title: "一种预报数据的偏差订正方法和偏差订正系统",
        numberLabel: "专利号",
        number: "ZL 2025 1 1030042.4",
        publicationLabel: "公告号",
        publicationNumber: "CN120541441A",
        href: "https://www.patentguru.com/cn/search?q=CN120541441A",
      },
      {
        title: "一种基于物理约束的温度中期预测方法",
        numberLabel: "公告号",
        number: "CN 121559636 B",
        href: "https://www.patentguru.com/cn/search?q=CN121559636B",
      },
    ],
    honorItems: [
      { date: "2025", title: "2025 全球校园人工智能算法精英大赛", detail: "国家级一等奖" },
      { date: "2024.09", title: "新生奖学金" },
      {
        date: "2023.10",
        title: "国家奖学金",
        detail: "前 0.4%",
        links: [
          {
            href: "https://mp.weixin.qq.com/s?__biz=MzA5MDYwMTY2OA==&mid=2656728441&idx=1&sn=ddbb3e95905b25c6a125dced68610db5&chksm=8ba7f4d2bcd07dc4f9f54109db4c3d2a701994eac04491f0781152b8b511548c8d980a89e11c&scene=27",
            label: "新闻报道 01",
          },
          {
            href: "https://mp.weixin.qq.com/s?__biz=MzA5MDYwMTY2OA==&mid=2656727657&idx=1&sn=77229a854bde3eb18bafe50837d7f97e&chksm=8ba7f3c2bcd07ad41b75cb76d8fa745112fccb46310927af21924793bfb438bc69d030ad64aa&scene=27",
            label: "新闻报道 02",
          },
        ],
      },
      { date: "2022.12", title: "舜宇奖学金", detail: "每届 20 人，前 1%" },
    ],
    educationItems: [
      {
        date: "2020–2024",
        institution: "长春理工大学",
        degree: "数据科学与大数据技术 · 学士",
      },
      {
        date: "2024–至今",
        institution: "国防科技大学",
        degree: "硕士在读",
      },
    ],
    serviceItems: [
      ["AAAI 2026 审稿人", "学术同行评审服务"],
      ["ICML 2026 审稿人", "学术同行评审服务"],
      ["开放研究", "维护可复核的文献目录与研究地图"],
    ],
    contactKicker: "06 / 联系",
    contactTitle: "下一项研究，\n一起开始？",
    contactBody:
      "如果你正在研究强化学习、智能体或可靠 AI，欢迎分享问题、想法与合作机会。",
    emailAction: "发送邮件",
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
        title: "Jilin Provincial Department of Culture and Tourism Special Project — Cultural Tourism Aggregation Platform",
        description:
          "An open platform for aggregating and managing cultural-tourism resources across Jilin Province, with data collection, administration, analytics, and visualization.",
        meta: "Cultural tourism · Management platform · Open source",
        href: "https://gitee.com/custhitachi/tourismwms",
        action: "View project",
      },
    ],
    newsKicker: "03 / NEWS",
    newsTitle: "Recent signals",
    news: [
      ["2026.08.14", "Published the reproducible ICASSP 2025–2026 reinforcement-learning review."],
      ["2026.08.14", "Released a 2026 top-conference RL index covering CVPR, AAAI, and ACL."],
      ["2026.05.17", "Our paper Slow-OCast was accepted by SIGKDD 2026. Many thanks to all collaborators!"],
      ["2026.02.21", "Our paper PhyOceanCast was accepted by CVPR 2026. Many thanks to all collaborators!"],
      ["2025.08.31", "Our paper DOLPHIN was accepted by ISPA 2025. Many thanks to all collaborators!"],
      ["2025.06.10", "Our paper IFG-Net was accepted by UIC 2025. Many thanks to all collaborators!"],
    ],
    publicationsKicker: "04 / PUBLICATIONS",
    publicationsTitle: "Selected Publications",
    publicationsIntro:
      "Four accepted papers with architecture diagrams, venue details, verified author lists, and links to the original publications.",
    publicationTag: "SELECTED PUBLICATION",
    paperLinkLabel: "Paper",
    paperAuthorsLabel: "Authors",
    architectureAlt: "paper architecture diagram",
    experienceKicker: "05 / PROFILE & SERVICE",
    experienceTitle: "Beyond research,\nstay invested.",
    patents: "Patents",
    patentLinkLabel: "View patent record",
    honors: "Honors",
    education: "Education",
    services: "Services",
    patentItems: [
      {
        title: "A Multivariable Spherical Information Fusion Method and System",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 1716023.7",
        publicationLabel: "Publication No.",
        publicationNumber: "CN121188717B",
        href: "https://www.patentguru.com/cn/search?q=CN121188717B",
      },
      {
        title: "A Spatiotemporal Coherence-Based Method and System for Ocean Variable Prediction",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 1726905.1",
        publicationLabel: "Publication No.",
        publicationNumber: "CN121188438B",
        href: "https://www.patentguru.com/cn/search?q=CN121188438B",
      },
      {
        title: "An Effective Wave Height Prediction Method Based on Feature Engineering and a Senior Guidance Mechanism",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 0781011.6",
        publicationLabel: "Publication No.",
        publicationNumber: "CN120296702B",
        href: "https://www.patentguru.com/cn/search?q=CN120296702B",
      },
      {
        title: "A Forecast Data Bias Correction Method and Bias Correction System",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 1030042.4",
        publicationLabel: "Publication No.",
        publicationNumber: "CN120541441A",
        href: "https://www.patentguru.com/cn/search?q=CN120541441A",
      },
      {
        title: "A Physics-Constrained Medium-Range Temperature Prediction Method",
        numberLabel: "Publication No.",
        number: "CN 121559636 B",
        href: "https://www.patentguru.com/cn/search?q=CN121559636B",
      },
    ],
    honorItems: [
      {
        date: "2025",
        title: "2025 Global Campus AI Algorithm Elite Competition",
        detail: "National First Prize",
      },
      { date: "2024.09", title: "New Student Scholarship" },
      {
        date: "2023.10",
        title: "National Scholarship",
        detail: "Top 0.4%",
        links: [
          {
            href: "https://mp.weixin.qq.com/s?__biz=MzA5MDYwMTY2OA==&mid=2656728441&idx=1&sn=ddbb3e95905b25c6a125dced68610db5&chksm=8ba7f4d2bcd07dc4f9f54109db4c3d2a701994eac04491f0781152b8b511548c8d980a89e11c&scene=27",
            label: "News report 01",
          },
          {
            href: "https://mp.weixin.qq.com/s?__biz=MzA5MDYwMTY2OA==&mid=2656727657&idx=1&sn=77229a854bde3eb18bafe50837d7f97e&chksm=8ba7f3c2bcd07ad41b75cb76d8fa745112fccb46310927af21924793bfb438bc69d030ad64aa&scene=27",
            label: "News report 02",
          },
        ],
      },
      {
        date: "2022.12",
        title: "Sunny Optical Scholarship",
        detail: "20 recipients per cohort · Top 1%",
      },
    ],
    educationItems: [
      {
        date: "2020–2024",
        institution: "Changchun University of Science and Technology",
        degree: "B.Sc. in Data Science and Big Data Technology",
      },
      {
        date: "2024–Present",
        institution: "National University of Defense Technology",
        degree: "Master’s student",
      },
    ],
    serviceItems: [
      ["AAAI 2026 Reviewer", "Academic peer-review service"],
      ["ICML 2026 Reviewer", "Academic peer-review service"],
      ["Open research", "Maintaining traceable literature catalogs and research maps"],
    ],
    contactKicker: "06 / CONTACT",
    contactTitle: "The next question—\nshall we start?",
    contactBody:
      "If you work on reinforcement learning, agents, or reliable AI, I’d be glad to hear about your questions, ideas, and collaboration opportunities.",
    emailAction: "Email me",
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
        title: "Projet spécial du Département de la culture et du tourisme du Jilin — Plateforme d’agrégation touristique",
        description:
          "Une plateforme ouverte d’agrégation et de gestion des ressources culturelles et touristiques du Jilin, avec collecte, administration, analyse et visualisation des données.",
        meta: "Tourisme culturel · Gestion · Open source",
        href: "https://gitee.com/custhitachi/tourismwms",
        action: "Voir le projet",
      },
    ],
    newsKicker: "03 / ACTUALITÉS",
    newsTitle: "Signaux récents",
    news: [
      ["14.08.2026", "Publication de la revue reproductible ICASSP 2025–2026 sur le RL."],
      ["14.08.2026", "Publication d’un index RL 2026 couvrant CVPR, AAAI et ACL."],
      ["17.05.2026", "Notre article Slow-OCast a été accepté à SIGKDD 2026. Merci à toutes les personnes ayant collaboré !"],
      ["21.02.2026", "Notre article PhyOceanCast a été accepté à CVPR 2026. Merci à toutes les personnes ayant collaboré !"],
      ["31.08.2025", "Notre article DOLPHIN a été accepté à ISPA 2025. Merci à toutes les personnes ayant collaboré !"],
      ["10.06.2025", "Notre article IFG-Net a été accepté à UIC 2025. Merci à toutes les personnes ayant collaboré !"],
    ],
    publicationsKicker: "04 / PUBLICATIONS",
    publicationsTitle: "Publications sélectionnées",
    publicationsIntro:
      "Quatre articles acceptés avec schémas d’architecture, conférences, listes d’auteurs vérifiées et liens vers les publications originales.",
    publicationTag: "PUBLICATION SÉLECTIONNÉE",
    paperLinkLabel: "Article",
    paperAuthorsLabel: "Auteurs",
    architectureAlt: "schéma d’architecture de l’article",
    experienceKicker: "05 / PARCOURS & SERVICE",
    experienceTitle: "Au-delà de la recherche,\ns’investir dans la durée.",
    patents: "Brevets",
    patentLinkLabel: "Consulter le brevet",
    honors: "Distinctions",
    education: "Formation",
    services: "Services",
    patentItems: [
      {
        title: "Méthode et système de fusion d’informations multivariées sur une sphère",
        numberLabel: "N° de brevet",
        number: "ZL 2025 1 1716023.7",
        publicationLabel: "N° de publication",
        publicationNumber: "CN121188717B",
        href: "https://www.patentguru.com/cn/search?q=CN121188717B",
      },
      {
        title: "Méthode et système de prévision de variables océaniques fondés sur la cohérence spatio-temporelle",
        numberLabel: "N° de brevet",
        number: "ZL 2025 1 1726905.1",
        publicationLabel: "N° de publication",
        publicationNumber: "CN121188438B",
        href: "https://www.patentguru.com/cn/search?q=CN121188438B",
      },
      {
        title: "Méthode de prévision de la hauteur significative des vagues fondée sur l’ingénierie des caractéristiques et un mécanisme de guidage expert",
        numberLabel: "N° de brevet",
        number: "ZL 2025 1 0781011.6",
        publicationLabel: "N° de publication",
        publicationNumber: "CN120296702B",
        href: "https://www.patentguru.com/cn/search?q=CN120296702B",
      },
      {
        title: "Méthode de correction des biais de données prévisionnelles et système de correction des biais",
        numberLabel: "N° de brevet",
        number: "ZL 2025 1 1030042.4",
        publicationLabel: "N° de publication",
        publicationNumber: "CN120541441A",
        href: "https://www.patentguru.com/cn/search?q=CN120541441A",
      },
      {
        title: "Méthode de prévision de température à moyen terme fondée sur des contraintes physiques",
        numberLabel: "N° de publication",
        number: "CN 121559636 B",
        href: "https://www.patentguru.com/cn/search?q=CN121559636B",
      },
    ],
    honorItems: [
      {
        date: "2025",
        title: "Concours mondial universitaire d’élite en algorithmes d’IA 2025",
        detail: "Premier prix national",
      },
      { date: "09.2024", title: "Bourse des nouveaux étudiants" },
      {
        date: "10.2023",
        title: "Bourse nationale",
        detail: "Top 0,4 %",
        links: [
          {
            href: "https://mp.weixin.qq.com/s?__biz=MzA5MDYwMTY2OA==&mid=2656728441&idx=1&sn=ddbb3e95905b25c6a125dced68610db5&chksm=8ba7f4d2bcd07dc4f9f54109db4c3d2a701994eac04491f0781152b8b511548c8d980a89e11c&scene=27",
            label: "Article 01",
          },
          {
            href: "https://mp.weixin.qq.com/s?__biz=MzA5MDYwMTY2OA==&mid=2656727657&idx=1&sn=77229a854bde3eb18bafe50837d7f97e&chksm=8ba7f3c2bcd07ad41b75cb76d8fa745112fccb46310927af21924793bfb438bc69d030ad64aa&scene=27",
            label: "Article 02",
          },
        ],
      },
      {
        date: "12.2022",
        title: "Bourse Sunny Optical",
        detail: "20 lauréats par promotion · Top 1 %",
      },
    ],
    educationItems: [
      {
        date: "2020–2024",
        institution: "Université des sciences et technologies de Changchun",
        degree: "Licence en science des données et technologies du big data",
      },
      {
        date: "2024–Présent",
        institution: "Université nationale de technologie de défense",
        degree: "Master en cours",
      },
    ],
    serviceItems: [
      ["Évaluateur AAAI 2026", "Service d’évaluation scientifique par les pairs"],
      ["Évaluateur ICML 2026", "Service d’évaluation scientifique par les pairs"],
      ["Recherche ouverte", "Maintien de catalogues traçables et de cartes scientifiques"],
    ],
    contactKicker: "06 / CONTACT",
    contactTitle: "La prochaine question—\non commence ?",
    contactBody:
      "Vous travaillez sur le renforcement, les agents ou l’IA fiable ? Partageons questions, idées et possibilités de collaboration.",
    emailAction: "M’écrire",
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

function GitHubIcon({ className = "github-icon" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src="https://github.githubassets.com/favicons/favicon.svg"
      alt=""
      aria-hidden="true"
    />
  );
}

function GiteeIcon({ className = "gitee-icon" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={visual("gitee-icon.ico")} alt="" aria-hidden="true" />
  );
}

const highlightedVenues = new Set(["SIGKDD 2026", "CVPR 2026", "ISPA 2025", "UIC 2025"]);
const venuePattern = /(SIGKDD 2026|CVPR 2026|ISPA 2025|UIC 2025)/g;

function HighlightedNewsText({ text }: { text: string }) {
  return text.split(venuePattern).map((part, index) =>
    highlightedVenues.has(part) ? (
      <mark className="venue-highlight" key={`${part}-${index}`}>
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
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
          <a
            className="email-shortcut"
            href="mailto:lqx@nudt.edu.cn"
            aria-label={t.emailAction}
            title="lqx@nudt.edu.cn"
          >
            {/* Generated as a standalone 4K raster asset for consistent rendering. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={visual("email-icon-4k.png")} alt="" aria-hidden="true" />
          </a>
          <div className="language-switch" role="group" aria-label="Language">
            <AssetIcon name="language" className="control-icon language-control-icon" />
            <div className="language-options" data-locale={locale}>
              <span className="language-slider" aria-hidden="true" />
              {locales.map((item) => (
                <button
                  key={item.id}
                  className={locale === item.id ? "active" : ""}
                  onClick={() => chooseLocale(item.id)}
                  aria-pressed={locale === item.id}
                  title={item.label}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
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
            <div className="hero-light-grid" aria-hidden="true" />
            <div
              className="hero-light-orb hero-light-orb-primary"
              data-parallax-global="-0.045"
              aria-hidden="true"
            />
            <div
              className="hero-light-orb hero-light-orb-secondary"
              data-parallax-global="0.026"
              aria-hidden="true"
            />
            {dark && (
              <div className="hero-media hero-media-dark" data-parallax-global="-0.05" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={visual("hero-orbit-4k.jpg")} alt="" />
              </div>
            )}
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
                    {t.github} <GitHubIcon />
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
          <div
            className="scroll-frame project-scroll-frame"
            role="region"
            aria-label={t.projectsTitle.replace("\n", " ")}
            tabIndex={0}
          >
            <div className="project-grid">
              {t.projects.map((project, index) => (
                <article className={`project-card project-${index + 1}`} key={project.title}>
                  <div className="project-visual" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className={`repository-banner repository-banner-${index + 1}`}
                      src={visual(
                        [
                          "repository-icassp-banner.png",
                          "repository-rl-top-banner.png",
                          "repository-tourismwms-banner.png",
                        ][index],
                      )}
                      alt=""
                    />
                    <span className="project-index">{project.index}</span>
                  </div>
                  <div className="project-content">
                    <p className="project-meta">{project.meta}</p>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {project.action}{" "}
                      {project.href.includes("github.com") ? (
                        <GitHubIcon />
                      ) : project.href.includes("gitee.com") ? (
                        <GiteeIcon />
                      ) : (
                        <Arrow />
                      )}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section news" id="news">
          <div className="news-heading">
            <p className="eyebrow">{t.newsKicker}</p>
            <h2>{t.newsTitle}</h2>
          </div>
          <div
            className="scroll-frame news-scroll-frame"
            role="region"
            aria-label={t.newsTitle}
            tabIndex={0}
          >
            <div className="news-list">
              {t.news.map(([date, item], index) => (
                <article className="news-item" key={`${date}-${index}`}>
                  <time>{date}</time>
                  <p>
                    <HighlightedNewsText text={item} />
                  </p>
                  <AssetIcon name="external" className="news-arrow" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section publications" id="publications">
          <div className="section-heading publications-heading">
            <p className="eyebrow">{t.publicationsKicker}</p>
            <h2>{t.publicationsTitle}</h2>
            <p className="section-intro">{t.publicationsIntro}</p>
          </div>
          <div className="publication-list">
            {publicationRecords.map((paper, index) => (
              <article
                className="publication-card"
                data-parallax={index % 2 === 0 ? "0.018" : "-0.014"}
                key={paper.id}
              >
                <div className="publication-visual">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={visual(paper.image)} alt={`${paper.title} ${t.architectureAlt}`} />
                  <span className="paper-grid-label">PAPER / {String(index + 1).padStart(2, "0")}</span>
                  <span className="paper-venue">{paper.venue}</span>
                </div>
                <div className="publication-copy">
                  <span className="publication-tag">
                    {t.publicationTag} / {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{paper.title}</h3>
                  <p className="publication-venue-name">{paper.venueName}</p>
                  <p className="publication-authors" aria-label={t.paperAuthorsLabel}>
                    {paper.authors.map((author, authorIndex) => (
                      <span className={author === "Qixiu Li" ? "author-self" : undefined} key={author}>
                        {author}
                        {authorIndex < paper.authors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <a className="publication-link" href={paper.href} target="_blank" rel="noreferrer">
                    {t.paperLinkLabel}
                    <AssetIcon name="external" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience" id="experience">
          <div className="section-aura aura-orange" data-parallax="-0.035" aria-hidden="true" />
          <div className="section-heading">
            <p className="eyebrow">{t.experienceKicker}</p>
            <h2 className="multiline">{t.experienceTitle}</h2>
          </div>
          <div className="experience-grid">
            <article className="experience-card records-card patents-card">
              <div className="experience-card-title">
                <AssetIcon name="publication" className="experience-icon" />
                <span>01</span>
                <h3>{t.patents}</h3>
              </div>
              <ol className="record-list patent-list card-scroll-frame" tabIndex={0} aria-label={t.patents}>
                {t.patentItems.map((item, index) => (
                  <li key={item.number}>
                    <span className="record-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="patent-entry">
                      <strong>{item.title}</strong>
                      <div className="patent-meta-row">
                        <div className="patent-identifiers">
                          <span>
                            {item.numberLabel} · {item.number}
                          </span>
                          {"publicationNumber" in item && item.publicationNumber ? (
                            <span>
                              {item.publicationLabel} · {item.publicationNumber}
                            </span>
                          ) : null}
                        </div>
                        <a href={item.href} target="_blank" rel="noreferrer">
                          {t.patentLinkLabel}
                          <AssetIcon name="external" />
                        </a>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
            <article className="experience-card records-card honors-card accent-card">
              <div className="experience-card-title">
                <AssetIcon name="external" className="experience-icon" />
                <span>02</span>
                <h3>{t.honors}</h3>
              </div>
              <ul className="record-list honor-list card-scroll-frame" tabIndex={0} aria-label={t.honors}>
                {t.honorItems.map((item) => (
                  <li key={`${item.date}-${item.title}`}>
                    <time>{item.date}</time>
                    <div>
                      <strong>{item.title}</strong>
                      {"detail" in item && item.detail ? (
                        <div className="honor-detail-row">
                          <span>{item.detail}</span>
                          {"links" in item && item.links ? (
                            <div className="honor-links">
                              {item.links.map((link) => (
                                <a href={link.href} target="_blank" rel="noreferrer" key={link.href}>
                                  {link.label}
                                  <AssetIcon name="external" />
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
            <article className="experience-card records-card education-card">
              <div className="experience-card-title">
                <AssetIcon name="language" className="experience-icon" />
                <span>03</span>
                <h3>{t.education}</h3>
              </div>
              <ul className="record-list education-list">
                {t.educationItems.map((item) => (
                  <li key={`${item.date}-${item.institution}`}>
                    <time>{item.date}</time>
                    <div>
                      <strong>{item.institution}</strong>
                      <span>{item.degree}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
            <article className="experience-card services-card">
              <div className="experience-card-title">
                <AssetIcon name="network" className="experience-icon" />
                <span>04</span>
                <h3>{t.services}</h3>
              </div>
              <ul className="service-list card-scroll-frame" tabIndex={0} aria-label={t.services}>
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
              <div className="contact-actions">
                <a className="contact-email" href="mailto:lqx@nudt.edu.cn">
                  <span className="email-symbol" aria-hidden="true">@</span>
                  <span className="contact-link-copy">
                    <small>{t.emailAction}</small>
                    <strong>lqx@nudt.edu.cn</strong>
                  </span>
                </a>
                <a
                  className="contact-github"
                  href="https://github.com/TechCloud-x"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{t.contactAction}</span>
                  <GitHubIcon />
                </a>
              </div>
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

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
    id: "everest",
    title:
      "EVEREST: Endogenous Vision-Language Reinforcement Reasoning Exploration for Urban Socio-Semantic Segmentation",
    venue: "arXiv PREPRINT",
    venueName: "arXiv preprint · arXiv:2608.24640 [cs.MM] · Submitted 25 Aug 2026",
    authors: ["Qixiu Li", "Zhongzhi He", "Xiang Zhu", "Xiaoyong Li", "Jiarun Lin", "Weifeng Xu"],
    image: "publication-architecture-everest.png",
    href: "https://arxiv.org/abs/2608.24640",
  },
  {
    id: "slow-ocast",
    title:
      "Slow-OCast: Slow-Varying Motion Inspired Transfer Learning for Regional High-Resolution Ocean Environmental Forecasting",
    venue: "SIGKDD 2026",
    venueName: "ACM SIGKDD Conference on Knowledge Discovery and Data Mining (SIGKDD 2026)",
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

const newsDestinations = [
  { href: "#publication-everest", external: false },
  {
    href: "https://github.com/TechCloud-x/ICASSP2025_6RL-Paper-main",
    external: true,
  },
  {
    href: "https://github.com/TechCloud-x/RL-TOP-2026PAPER-main",
    external: true,
  },
  { href: "#publication-slow-ocast", external: false },
  { href: "#publication-phyoceancast", external: false },
  { href: "#publication-dolphin", external: false },
  { href: "#publication-ifg-net", external: false },
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
      "你好，我是李奇烋，目前是国防科技大学硕士研究生，也是一名主要聚焦于大模型强化学习后训练、智能体与可靠人工智能的研究者和开发者。我拥有极强的自我约束与学习能力：两个月自学雅思并取得 6.5 分；在 IO 赛下连续 5 小时使用英文解题并在不借助 AI 的情况下，完成 13 题算法编程；也是 NVIDIA 的 17.7K-star GitHub 开源项目 Training Transformer Models at Scale 的贡献者；已在 CVPR、SIGKDD 等顶级人工智能会议发表论文。我关注并整理前沿研究，也把想法转化为可复现、可交流的顶级论文与开放项目。",
    explore: "探索我的工作",
    github: "GitHub",
    available: "欢迎研究交流与开源协作",
    portraitAlt: "李奇烋的个人照片",
    scroll: "向下滚动",
    aboutKicker: "01 / 关于我",
    aboutTitle: "研究复杂问题，\n构建清晰答案。",
    aboutBody: [
      "我的兴趣围绕大模型后训练、多模态智能体与计算机视觉，同时也关注 AI4Science 相关工作。我重点关注 Coding Agent、大模型强化学习算法、视觉嵌入的高效表征与多模态意图理解。",
      "除学术论文外，我也积极参与开源研究与产业级系统研发。作为省科技厅医疗辅助合作项目成员，我参与构建颅底卵圆孔穿刺引导辅助机器人系统，负责优化卵圆孔靶点和皮肤入针点定位方法；该项目已通过吉林大学白求恩第二医院验收。作为省级项目“文旅汇总平台”的核心全栈开发人员，我参与政府部门数据审核、月报与年报数据统计汇总等全栈代码逻辑编写；该项目目前服务吉林省数千家旅游景点和服务公司。我也曾获得舜宇企业奖学金、国家奖学金等荣誉。",
    ],
    focusTitle: "研究方向",
    focus: ["大模型强化学习后训练", "多模态智能体", "计算机视觉高效表征", "AI4Science 与可靠 AI"],
    stats: [
      ["10+", "发表、投稿顶级会议论文"],
      ["5W+", "累计奖学金"],
      ["∞", "持续探索的开放问题"],
    ],
    projectsKicker: "02 / 精选项目",
    projectsTitle: "把研究地图，\n变成公共工具。",
    projectsIntro: "公开、可核验、可继续生长的研究整理与工程实践。",
    projects: [
      {
        index: "01",
        title: "EVEREST",
        description:
          "从数字地图、空间对齐的卫星图像与文本目标中恢复社会定义城市实体的像素级范围，并通过候选实例枚举、粗分割反馈与边界验证生成可执行的框点提示。",
        meta: "视觉语言推理 · 强化学习 · 城市分割",
        href: "https://github.com/TechCloud-x/EVEREST",
        action: "查看项目",
      },
      {
        index: "02",
        title: "ICASSP 2025–2026 RL Atlas",
        description:
          "对 122 篇强化学习相关论文进行可复核筛选、主题归类与代码完整性审计，连接论文、DOI 与公开实现。",
        meta: "文献综述 · 数据目录 · 2026",
        href: "https://github.com/TechCloud-x/ICASSP2025_6RL-Paper-main",
        action: "查看项目",
      },
      {
        index: "03",
        title: "RL Top Papers 2026",
        description:
          "持续整理 CVPR、AAAI、ACL 等顶级会议中的强化学习论文，让跨领域研究脉络更容易检索与比较。",
        meta: "研究索引 · 开放知识 · 2026",
        href: "https://github.com/TechCloud-x/RL-TOP-2026PAPER-main",
        action: "浏览目录",
      },
      {
        index: "04",
        title: "吉林省文旅厅专项-文旅汇总平台",
        description:
          "面向吉林省文化和旅游资源的数据汇总与管理平台，支持文旅数据采集、信息管理、统计分析与可视化展示。",
        meta: "文旅数据 · 管理平台 · 开源项目",
        href: "https://gitee.com/custhitachi/tourismwms",
        action: "查看项目",
      },
      {
        index: "05",
        title: "颅底卵圆孔穿刺辅助系统",
        description:
          "融合机器人引导、卵圆孔靶点与皮肤入针点定位，辅助颅底卵圆孔穿刺路径规划与可视化验证。",
        meta: "医疗机器人 · 计算机视觉 · 开源项目",
        href: "https://github.com/TechCloud-x/IGS",
        action: "查看项目",
      },
    ],
    newsKicker: "03 / 新闻动态",
    newsTitle: "近期\n进展",
    news: [
      ["2026.08.25", "我们的文章（EVEREST）已在 arXiv 上公开！"],
      ["2026.08.14", "公开 ICASSP 2025–2026 强化学习论文综述与可复核目录。"],
      ["2026.08.14", "发布 2026 强化学习顶会论文索引，覆盖 CVPR、AAAI 与 ACL。"],
      ["2026.05.17", "一篇论文（Slow-OCast）被 SIGKDD 2026 接收！感谢所有合作者！"],
      ["2026.02.21", "一篇论文（PhyOceanCast）被 CVPR 2026 接收！感谢所有合作者！"],
      ["2025.08.31", "一篇论文（DOLPHIN）被 ISPA 2025 接收！感谢所有合作者！"],
      ["2025.06.10", "一篇论文（IFG-Net）被 UIC 2025 接收！感谢所有合作者！"],
    ],
    publicationsKicker: "04 / 论文发表",
    publicationsTitle: "Selected Publications",
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
      { date: "2025.12", title: "2025 全球校园人工智能算法精英大赛", detail: "国家级一等奖" },
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
        date: "2024–至今",
        institution: "国防科技大学",
        degree: "硕士在读",
      },
      {
        date: "2020–2024",
        institution: "长春理工大学",
        degree: "数据科学与大数据技术 · 学士",
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
      experience: "Experience",
      contact: "Contact",
    },
    themeLight: "Switch to dark theme",
    themeDark: "Switch to light theme",
    menuOpen: "Open navigation menu",
    menuClose: "Close navigation menu",
    heroEyebrow: "REINFORCEMENT LEARNING · INTELLIGENT DECISION-MAKING · OPEN RESEARCH",
    heroTitleA: "Teaching agents",
    heroTitleB: "to think.",
    heroBody:
      "Hi, I’m Qixiu Li, a master’s student at the National University of Defense Technology. I am a researcher and developer focused on reinforcement-learning post-training for VLMs and LLMs, intelligent agents, and trustworthy AI. I am highly self-disciplined and a fast learner: after two months of independent IELTS preparation, I earned a score of 6.5; during an IO-style competition, I worked entirely in English for five consecutive hours and solved 13 algorithmic programming problems without AI assistance; I have contributed to NVIDIA’s 17.7K-star open-source GitHub project for training transformer models at scale; and I have published papers at leading AI conferences, including CVPR and SIGKDD. I track and synthesize cutting-edge research, turning ideas into reproducible top-tier papers and open-source projects that support open exchange.",
    explore: "Explore my work",
    github: "GitHub",
    available: "Open to research discussions and open-source collaboration",
    portraitAlt: "Portrait of Qixiu Li",
    scroll: "Scroll to explore",
    aboutKicker: "01 / ABOUT",
    aboutTitle: "Tackle complex questions.\nBuild clear answers.",
    aboutBody: [
      "My research interests span post-training for large models, multimodal agents, and computer vision, with additional attention to AI for Science. I focus particularly on coding agents, reinforcement-learning algorithms for large models, efficient visual representation learning, and multimodal intent understanding.",
      "Beyond academic publications, I actively contribute to open research and production-grade system development. As a member of a medical-assistance collaboration with the provincial science and technology department, I helped develop a robotic guidance system for skull-base foramen ovale puncture and optimized methods for localizing the foramen ovale target and skin entry point. The project passed acceptance review by the Second Bethune Hospital of Jilin University. As a core full-stack developer for the provincial Cultural Tourism Aggregation Platform, I contributed to the implementation of full-stack logic for government data review and monthly and annual statistical reporting. The platform currently serves thousands of tourist attractions and tourism service providers across Jilin Province. I have also received the Sunny Optical Technology (Group) Company Scholarship and the National Scholarship, among other distinctions.",
    ],
    focusTitle: "Research focus",
    focus: ["Reinforcement-learning post-training for large models", "Multimodal agents", "Efficient computer-vision representations", "AI for Science and trustworthy AI"],
    stats: [
      ["10+", "papers published at or submitted to top-tier conferences"],
      ["¥50K+", "cumulative scholarships"],
      ["∞", "open questions under continued investigation"],
    ],
    projectsKicker: "02 / SELECTED PROJECTS",
    projectsTitle: "Turn research maps\ninto public tools.",
    projectsIntro: "Open, verifiable, and continuously evolving research curation and engineering practice.",
    projects: [
      {
        index: "01",
        title: "EVEREST",
        description:
          "EVEREST recovers the pixel-level extent of socially defined urban entities from digital maps, spatially aligned satellite imagery, and textual targets through candidate enumeration, coarse-mask feedback, and boundary verification.",
        meta: "Vision-language reasoning · Reinforcement learning · Urban segmentation",
        href: "https://github.com/TechCloud-x/EVEREST",
        action: "View project",
      },
      {
        index: "02",
        title: "ICASSP 2025–2026 RL Atlas",
        description:
          "A reproducible screening and review of 122 reinforcement-learning papers, including topic classification and code-completeness audits, with links to the papers, their DOIs, and available public implementations.",
        meta: "Literature review · Data catalog · 2026",
        href: "https://github.com/TechCloud-x/ICASSP2025_6RL-Paper-main",
        action: "View project",
      },
      {
        index: "03",
        title: "RL Top Papers 2026",
        description:
          "A continuously updated index of reinforcement-learning papers from leading conferences such as CVPR, AAAI, and ACL, designed to make cross-disciplinary research trends easier to search and compare.",
        meta: "Research index · Open knowledge · 2026",
        href: "https://github.com/TechCloud-x/RL-TOP-2026PAPER-main",
        action: "Browse catalog",
      },
      {
        index: "04",
        title: "Jilin Provincial Department of Culture and Tourism Special Project — Cultural Tourism Aggregation Platform",
        description:
          "A platform for aggregating and managing cultural and tourism resources across Jilin Province, supporting data collection, information management, statistical analysis, and visualization.",
        meta: "Cultural tourism · Management platform · Open source",
        href: "https://gitee.com/custhitachi/tourismwms",
        action: "View project",
      },
      {
        index: "05",
        title: "Skull-Base Foramen Ovale Puncture Assistance System",
        description:
          "A system that combines robotic guidance with localization of the foramen ovale target and skin entry point to support puncture-path planning and visual validation.",
        meta: "Medical robotics · Computer vision · Open source",
        href: "https://github.com/TechCloud-x/IGS",
        action: "View project",
      },
    ],
    newsKicker: "03 / NEWS",
    newsTitle: "Recent\nnews",
    news: [
      ["2026.08.25", "Our paper EVEREST is now available on arXiv."],
      ["2026.08.14", "Released a reproducible review and catalog of reinforcement-learning papers from ICASSP 2025–2026."],
      ["2026.08.14", "Released a 2026 index of reinforcement-learning papers from leading conferences, including CVPR, AAAI, and ACL."],
      ["2026.05.17", "Our paper Slow-OCast was accepted at SIGKDD 2026. Many thanks to all collaborators!"],
      ["2026.02.21", "Our paper PhyOceanCast was accepted at CVPR 2026. Many thanks to all collaborators!"],
      ["2025.08.31", "Our paper DOLPHIN was accepted at ISPA 2025. Many thanks to all collaborators!"],
      ["2025.06.10", "Our paper IFG-Net was accepted at UIC 2025. Many thanks to all collaborators!"],
    ],
    publicationsKicker: "04 / PUBLICATIONS",
    publicationsTitle: "Selected Publications",
    publicationTag: "SELECTED PAPER",
    paperLinkLabel: "View paper",
    paperAuthorsLabel: "Authors",
    architectureAlt: "paper architecture figure",
    experienceKicker: "05 / EXPERIENCE & SERVICE",
    experienceTitle: "Beyond research,\nstay committed.",
    patents: "Patents",
    patentLinkLabel: "View patent",
    honors: "Honors",
    education: "Education",
    services: "Services",
    patentItems: [
      {
        title: "A Method and System for Multivariable Spherical Information Fusion",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 1716023.7",
        publicationLabel: "Publication No.",
        publicationNumber: "CN121188717B",
        href: "https://www.patentguru.com/cn/search?q=CN121188717B",
      },
      {
        title: "A Method and System for Ocean-Variable Prediction Based on Spatiotemporal Coherence",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 1726905.1",
        publicationLabel: "Publication No.",
        publicationNumber: "CN121188438B",
        href: "https://www.patentguru.com/cn/search?q=CN121188438B",
      },
      {
        title: "A Significant-Wave-Height Prediction Method Based on Feature Engineering and a Senior-Guidance Mechanism",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 0781011.6",
        publicationLabel: "Publication No.",
        publicationNumber: "CN120296702B",
        href: "https://www.patentguru.com/cn/search?q=CN120296702B",
      },
      {
        title: "A Forecast-Data Bias-Correction Method and System",
        numberLabel: "Patent No.",
        number: "ZL 2025 1 1030042.4",
        publicationLabel: "Publication No.",
        publicationNumber: "CN120541441A",
        href: "https://www.patentguru.com/cn/search?q=CN120541441A",
      },
      {
        title: "A Physics-Constrained Method for Medium-Range Temperature Prediction",
        numberLabel: "Publication No.",
        number: "CN 121559636 B",
        href: "https://www.patentguru.com/cn/search?q=CN121559636B",
      },
    ],
    honorItems: [
      {
        date: "2025.12",
        title: "2025 Global Campus Artificial Intelligence Algorithm Elite Competition",
        detail: "National First Prize",
      },
      { date: "2024.09", title: "Incoming Student Scholarship" },
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
        title: "Sunny Optical Technology (Group) Company Scholarship",
        detail: "20 recipients per cohort · Top 1%",
      },
    ],
    educationItems: [
      {
        date: "2024–Present",
        institution: "National University of Defense Technology",
        degree: "Master’s student",
      },
      {
        date: "2020–2024",
        institution: "Changchun University of Science and Technology",
        degree: "B.Sc. in Data Science and Big Data Technology",
      },
    ],
    serviceItems: [
      ["AAAI 2026 Reviewer", "Scholarly peer-review service"],
      ["ICML 2026 Reviewer", "Scholarly peer-review service"],
      ["Open research", "Maintaining reproducible literature catalogs and research maps"],
    ],
    contactKicker: "06 / CONTACT",
    contactTitle: "The next study—\nshall we begin together?",
    contactBody:
      "If you are working on reinforcement learning, agents, or trustworthy AI, I welcome your questions, ideas, and opportunities for collaboration.",
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
    heroEyebrow: "APPRENTISSAGE PAR RENFORCEMENT · DÉCISION INTELLIGENTE · RECHERCHE OUVERTE",
    heroTitleA: "Apprendre aux agents",
    heroTitleB: "à raisonner.",
    heroBody:
      "Bonjour, je suis Qixiu Li, étudiant en master à l’Université nationale de technologie de défense. Mes travaux portent principalement sur le post-entraînement des VLM et des LLM par apprentissage par renforcement, les agents intelligents et l’IA digne de confiance. Très autodiscipliné et doté d’une grande capacité d’apprentissage, j’ai obtenu 6,5 à l’IELTS après deux mois de préparation autonome. Lors d’un concours au format IO, j’ai travaillé exclusivement en anglais pendant cinq heures consécutives et résolu 13 problèmes de programmation algorithmique sans recourir à l’IA. Je contribue également à Training Transformer Models at Scale, le projet GitHub open source de NVIDIA qui compte 17,7 k étoiles, et j’ai publié des articles dans des conférences majeures en intelligence artificielle, notamment CVPR et SIGKDD. Je suis les avancées de la recherche et les synthétise, puis transforme mes idées en articles de premier plan, reproductibles et propices aux échanges scientifiques, ainsi qu’en projets open source.",
    explore: "Découvrir mes travaux",
    github: "GitHub",
    available: "Ouvert aux échanges scientifiques et aux collaborations autour de projets open source",
    portraitAlt: "Portrait de Qixiu Li",
    scroll: "Faire défiler",
    aboutKicker: "01 / À PROPOS",
    aboutTitle: "Étudier des questions complexes.\nConstruire des réponses claires.",
    aboutBody: [
      "Mes intérêts de recherche couvrent le post-entraînement des grands modèles, les agents multimodaux et la vision par ordinateur, ainsi que certains travaux en IA pour les sciences. Je m’intéresse particulièrement aux agents de programmation, aux algorithmes d’apprentissage par renforcement pour les grands modèles, aux représentations visuelles efficaces et à la compréhension multimodale des intentions.",
      "Au-delà des publications scientifiques, je contribue activement à la recherche ouverte et au développement de systèmes de niveau industriel. Dans le cadre d’un projet de coopération en assistance médicale du Département provincial des sciences et technologies, j’ai participé au développement d’un système robotisé de guidage pour la ponction du foramen ovale de la base du crâne et optimisé les méthodes de localisation du point cible au niveau du foramen ovale et du point d’entrée cutané. Le projet a été validé par le Deuxième Hôpital Bethune de l’Université de Jilin. En tant que développeur full-stack principal de la plateforme provinciale d’agrégation touristique, j’ai contribué à la mise en œuvre de la logique de contrôle des données administratives ainsi que des synthèses statistiques mensuelles et annuelles. La plateforme dessert actuellement des milliers de sites touristiques et de prestataires de services touristiques dans la province du Jilin. J’ai également reçu la bourse d’entreprise Sunny Optical et la Bourse nationale.",
    ],
    focusTitle: "Axes de recherche",
    focus: ["Post-entraînement des grands modèles par apprentissage par renforcement", "Agents multimodaux", "Représentations visuelles efficaces", "IA pour les sciences et IA digne de confiance"],
    stats: [
      ["10+", "articles publiés ou soumis à des conférences de premier plan"],
      ["50 k¥+", "montant cumulé des bourses"],
      ["∞", "questions ouvertes étudiées dans la durée"],
    ],
    projectsKicker: "02 / PROJETS SÉLECTIONNÉS",
    projectsTitle: "Transformer des cartes de recherche\nen outils publics.",
    projectsIntro: "Une veille scientifique et des réalisations techniques ouvertes, vérifiables et évolutives.",
    projects: [
      {
        index: "01",
        title: "EVEREST",
        description:
          "EVEREST reconstitue l’étendue pixellaire d’entités urbaines socialement définies à partir de cartes numériques, d’images satellitaires spatialement alignées et de cibles textuelles, grâce à l’énumération des instances, au retour de masques grossiers et à la vérification des frontières.",
        meta: "Raisonnement vision-langage · Apprentissage par renforcement · Segmentation urbaine",
        href: "https://github.com/TechCloud-x/EVEREST",
        action: "Voir le projet",
      },
      {
        index: "02",
        title: "Atlas RL ICASSP 2025–2026",
        description:
          "Une sélection vérifiable de 122 articles sur l’apprentissage par renforcement, comprenant une classification thématique et un audit de la complétude du code, avec des liens vers les articles, les DOI et les implémentations publiques.",
        meta: "Revue de littérature · Catalogue de données · 2026",
        href: "https://github.com/TechCloud-x/ICASSP2025_6RL-Paper-main",
        action: "Voir le projet",
      },
      {
        index: "03",
        title: "Articles RL majeurs 2026",
        description:
          "Un index continuellement mis à jour des articles sur l’apprentissage par renforcement issus de conférences de premier plan telles que CVPR, AAAI et ACL, afin de faciliter la recherche et la comparaison entre domaines.",
        meta: "Index scientifique · Savoir ouvert · 2026",
        href: "https://github.com/TechCloud-x/RL-TOP-2026PAPER-main",
        action: "Parcourir l’index",
      },
      {
        index: "04",
        title: "Projet spécial du Département de la culture et du tourisme du Jilin — Plateforme d’agrégation touristique",
        description:
          "Une plateforme d’agrégation et de gestion des ressources culturelles et touristiques du Jilin, prenant en charge la collecte, la gestion, l’analyse statistique et la visualisation des données.",
        meta: "Tourisme culturel · Gestion · Open source",
        href: "https://gitee.com/custhitachi/tourismwms",
        action: "Voir le projet",
      },
      {
        index: "05",
        title: "Système d’assistance à la ponction du foramen ovale de la base du crâne",
        description:
          "Un système associant guidage robotisé, localisation du point cible au niveau du foramen ovale et repérage du point d’entrée cutané afin de faciliter la planification et la validation visuelle de la trajectoire de ponction.",
        meta: "Robotique médicale · Vision par ordinateur · Open source",
        href: "https://github.com/TechCloud-x/IGS",
        action: "Voir le projet",
      },
    ],
    newsKicker: "03 / ACTUALITÉS",
    newsTitle: "Actualités\nrécentes",
    news: [
      ["25.08.2026", "Notre article EVEREST est désormais disponible sur arXiv."],
      ["14.08.2026", "Mise en ligne d’une revue et d’un catalogue vérifiables consacrés aux articles sur l’apprentissage par renforcement d’ICASSP 2025–2026."],
      ["14.08.2026", "Publication d’un index 2026 des articles sur l’apprentissage par renforcement issus de conférences de premier plan, notamment CVPR, AAAI et ACL."],
      ["17.05.2026", "Notre article Slow-OCast a été accepté à SIGKDD 2026. Merci à tous nos collaborateurs !"],
      ["21.02.2026", "Notre article PhyOceanCast a été accepté à CVPR 2026. Merci à tous nos collaborateurs !"],
      ["31.08.2025", "Notre article DOLPHIN a été accepté à ISPA 2025. Merci à tous nos collaborateurs !"],
      ["10.06.2025", "Notre article IFG-Net a été accepté à UIC 2025. Merci à tous nos collaborateurs !"],
    ],
    publicationsKicker: "04 / PUBLICATIONS",
    publicationsTitle: "Publications sélectionnées",
    publicationTag: "ARTICLE SÉLECTIONNÉ",
    paperLinkLabel: "Voir l’article",
    paperAuthorsLabel: "Auteurs",
    architectureAlt: "figure d’architecture de l’article",
    experienceKicker: "05 / PARCOURS & SERVICE",
    experienceTitle: "Au-delà de la recherche,\ns’engager dans la durée.",
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
        date: "12.2025",
        title: "Concours mondial universitaire d’élite en algorithmes d’intelligence artificielle 2025",
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
        date: "Depuis 2024",
        institution: "Université nationale de technologie de défense",
        degree: "Étudiant en master",
      },
      {
        date: "2020–2024",
        institution: "Université des sciences et technologies de Changchun",
        degree: "Licence en science des données et technologies du big data",
      },
    ],
    serviceItems: [
      ["Évaluateur pour AAAI 2026", "Évaluation scientifique par les pairs"],
      ["Évaluateur pour ICML 2026", "Évaluation scientifique par les pairs"],
      ["Recherche ouverte", "Tenue à jour de répertoires bibliographiques vérifiables et de cartographies de la recherche"],
    ],
    contactKicker: "06 / CONTACT",
    contactTitle: "Le prochain projet de recherche —\net si nous le lancions ensemble ?",
    contactBody:
      "Si vous travaillez sur l’apprentissage par renforcement, les agents ou l’IA digne de confiance, je serais heureux d’échanger sur vos questions, vos idées et d’éventuelles collaborations.",
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
                <img src={visual("my-pic.png")} alt={t.portraitAlt} />
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
              {t.aboutBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
                    {index === 4 ? (
                      <div className="project-image-pair">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={visual("igs-robot-lab.png")} alt="" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={visual("igs-target-visualization.jpg")} alt="" />
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        className={`repository-banner repository-banner-${index + 1}`}
                        src={visual(
                          [
                            "repository-everest-banner.png",
                            "repository-icassp-banner.png",
                            "repository-rl-top-banner.png",
                            "repository-tourismwms-banner.png",
                          ][index],
                        )}
                        alt=""
                      />
                    )}
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
            <h2 className="multiline">{t.newsTitle}</h2>
          </div>
          <div
            className="scroll-frame news-scroll-frame"
            role="region"
            aria-label={t.newsTitle}
            tabIndex={0}
          >
            <div className="news-list">
              {t.news.map(([date, item], index) => {
                const destination = newsDestinations[index];
                return (
                  <article className="news-item" key={`${date}-${index}`}>
                    <time>{date}</time>
                    <p>
                      <HighlightedNewsText text={item} />
                    </p>
                    <a
                      className="news-link"
                      href={destination.href}
                      target={destination.external ? "_blank" : undefined}
                      rel={destination.external ? "noreferrer" : undefined}
                      aria-label={item}
                    >
                      <AssetIcon name="external" className="news-arrow" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section publications" id="publications">
          <div className="section-heading publications-heading">
            <p className="eyebrow">{t.publicationsKicker}</p>
            <h2>{t.publicationsTitle}</h2>
          </div>
          <div className="publication-list">
            {publicationRecords.map((paper, index) => (
              <article
                className="publication-card"
                data-parallax={index % 2 === 0 ? "0.018" : "-0.014"}
                id={`publication-${paper.id}`}
                key={paper.id}
              >
                <div className="publication-visual">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={visual(paper.image)} alt={`${paper.title} ${t.architectureAlt}`} />
                  <span className="paper-grid-label">
                    PAPER / {String(publicationRecords.length - index).padStart(2, "0")}
                  </span>
                  <span className="paper-venue">{paper.venue}</span>
                </div>
                <div className="publication-copy">
                  <span className="publication-tag">
                    {t.publicationTag} / {String(publicationRecords.length - index).padStart(2, "0")}
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

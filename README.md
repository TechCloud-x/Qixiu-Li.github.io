# LQX · Qixiu Li Personal Research Homepage

A trilingual personal research homepage for 李奇烋 / Qixiu Li, focused on reinforcement learning, intelligent agents, and open research.

## Features

- Chinese, English, and French interface
- Light and dark themes, with a light first-visit default
- Responsive navigation and mobile layout
- True multi-layer vertical parallax, a sticky hero scene, and reduced-motion support
- Generated 4K visual system for the hero, research map, publication graphic, social card, and UI icons
- Sections for projects, news, publications, patents, honors, education, and services
- Static export for GitHub Pages

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
```

The static site is generated in `out/`. A GitHub Actions workflow deploys it to [techcloud-x.github.io/Qixiu-Li.github.io](https://techcloud-x.github.io/Qixiu-Li.github.io/) when `main` is updated.

## Personal information

Only publicly verifiable work is included. Publications, patents, honors, and education currently use transparent pending states and can be replaced in `app/page.tsx` once verified details are available.

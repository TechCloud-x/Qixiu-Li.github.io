# Qixiu Li · Personal Research Homepage

A trilingual personal research homepage for 李奇烋 / Qixiu Li, focused on reinforcement learning, intelligent agents, and open research.

## Features

- Chinese, English, and French interface
- Light and dark themes, with a light first-visit default
- Responsive navigation and mobile layout
- Scroll-linked parallax accents with reduced-motion support
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

The static site is generated in `out/`. A GitHub Actions workflow deploys it to GitHub Pages when `main` is updated.

## Personal information

Only publicly verifiable work is included. Publications, patents, honors, and education currently use transparent pending states and can be replaced in `app/page.tsx` once verified details are available.

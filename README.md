# Muhammad Asif Nawaz — The Digital Frontier

Personal portfolio of Muhammad Asif Nawaz: AI/ML engineer, full-stack developer and creative technologist.

Live: https://portfolio-r7ng.vercel.app/

## Stack

- **React 19 + TypeScript + Vite**
- **Three.js / React Three Fiber / Drei**: the procedural "Core" hero scene, lazy-loaded and tiered by device capability
- **GSAP ScrollTrigger + Lenis**: scroll choreography and smooth scrolling
- Plain CSS design system in `src/styles/global.css` (tokens on `:root`)

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Editing content

Every fact on the site lives in **`src/data/content.ts`**: profile, projects, experience, achievements and technologies.
Only add claims, dates and metrics you can back up.

To promote an "In the lab" project (TeckStock, FeelBeats, Nexus AI) into a full case study, add it to `projects`
with a `visual` key, and add a matching composition in `src/sections/ProjectVisuals.tsx`.

## Structure

```
src/
  data/content.ts         all copy and facts
  three/HeroScene.tsx     3D hero (lazy chunk)
  sections/               one component per page section
  components/             nav, cursor, preloader, magnetic links, etc.
  lib/                    device tiering, smooth scroll helpers
  styles/global.css       design system
public/                   photo, favicon, OG image
```

## Performance and accessibility

- The 3D scene renders at high, low or no tier (CSS fallback) depending on WebGL support, screen size, pointer type, memory and CPU cores.
  It stops rendering when the hero is off-screen.
- `prefers-reduced-motion` disables the preloader, smooth scrolling, scroll animations and continuous 3D motion.
- Semantic landmarks, a skip link, keyboard-operable controls, visible focus styles and `aria-live` regions for dynamic panels.

## Deployment

Vercel builds it via `vercel.json` (framework `vite`, output `dist`).

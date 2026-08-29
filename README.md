# Rogul Jayaraman — Portfolio (portfolio_next)

Static portfolio built with Next.js App Router. Editorial, print-magazine style — fast, accessible, zero backend.

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, Tailwind CSS 3.4 |
| Motion | Framer Motion 11, Lenis 1.3 (smooth scroll) |
| Fonts | `next/font` — EB Garamond (display), Inter, JetBrains Mono |
| Icons | lucide-react |

No database, no API routes, no env vars.

## Quick Start

Requires **Node >= 20** (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint (next/core-web-vitals)
```

> `npm run build` must pass before push — Vercel runs the same command.

## Project Structure

```
app/
  layout.tsx     # fonts, <html> dark default, providers, metadata
  page.tsx       # composes all sections in order
  globals.css    # Tailwind base + design tokens + utilities
  not-found.tsx  # 404 page
components/
  theme-provider.tsx   # dark/light with View Transition wipe
  LenisProvider.tsx    # smooth scroll (disabled on prefers-reduced-motion)
  navigation.tsx       # sticky nav + theme toggle
  ScrollToTop.tsx
  sections/            # hero, education, skills, projects, about, internships, achievements, footer
lib/
  motion.ts      # TRANSITION / VIEWPORT / REVEAL tokens
  utils.ts       # cn() helper (clsx + tailwind-merge)
public/
  Rogul_Jayaraman_Resume.pdf
  favicon.svg
  images/photo.jpg
```

## Customization

**Add/edit projects** — `components/sections/projects.tsx`:

```ts
const projects: Project[] = [
  { num: "01", title: "...", year: "2025 · AI + IoT", tech: ["Next.js"], description: "...", git: "https://...", demo: "https://..." },
]
```

**Replace resume** — overwrite `public/Rogul_Jayaraman_Resume.pdf` (keep exact filename — header and links depend on it).

**Replace photo** — overwrite `public/images/photo.jpg` (used in Hero/About).

## Deploy

Vercel, zero config. No env vars. See `docs/DEPLOYMENT.md`.

Headers are in `next.config.js` (security + PDF/favicon caching).

## Troubleshooting

| Symptom | Fix |
|---|---|
| Resume 404 | File must be `public/Rogul_Jayaraman_Resume.pdf` (case-sensitive). Check `next.config.js` header source matches. |
| Lenis not smoothing | Normal if `prefers-reduced-motion: reduce` — smoothing auto-disables. Check `LenisProvider.tsx`. |
| Dark flash on reload | Inline script in `app/layout.tsx` restores theme before paint — keep `suppressHydrationWarning` on `<html>`. |

## Docs

- `docs/ARCHITECTURE.md` — providers, routing, styling
- `docs/DEVELOPMENT.md` — local workflow & tokens
- `docs/DEPLOYMENT.md` — Vercel steps & headers

# Architecture — portfolio_next

One-page overview. Keep it under 100 lines.

## Overview

Static single-page portfolio. No API routes, no DB, no env vars. All sections render in `app/page.tsx`. Deployed as static/server on Vercel (`next build`).

## Providers (order matters)

`app/layout.tsx`:

```
<html class="dark">
  <ThemeProvider>          # 1 — owns light/dark + localStorage + View Transition
    <LenisProvider>        # 2 — smooth scroll (disabled on prefers-reduced-motion)
      <MotionConfig>       # 3 — Framer Motion reducedMotion="user"
        {children}
      </MotionConfig>
    </LenisProvider>
  </ThemeProvider>
</html>
```

Inline `<script>` in `<head>` restores saved theme before paint to avoid flash. `suppressHydrationWarning` on `<html>` is required.

## Routing

- `app/layout.tsx` — root layout, fonts (`next/font`), metadata, viewport.
- `app/page.tsx` — `Navigation` + 8 sections in order: Hero, Education, Skills, Projects, About, Internships, Achievements, Footer.
- `app/not-found.tsx` — 404.
- No dynamic routes. All links are hash anchors or external.

## Styling System

- `app/globals.css` — Tailwind `@base/@components/@utilities` + CSS variables for light/dark + utilities (`.display-mega`, `.btn-primary`, `.card-eleven`, `.orb`, scrollbar).
- `tailwind.config.ts` — `darkMode: ["class"]`, content globs `app/**/*` + `components/**/*` + `lib/**/*`, extended colors (ink, canvas, hairline), gradients, animations.
- `lib/utils.ts` — `cn()` = `clsx` + `tailwind-merge`.

## Sections & Motion

- Each section in `components/sections/*.tsx` is a client component where needed.
- `lib/motion.ts` — single source for `TRANSITION.luxury/slow/subtle`, `VIEWPORT`, `REVEAL`. Use these, don't invent easings.
- `Projects` — pinned horizontal scroll on desktop (Framer `useScroll` + `useTransform`), native snap on mobile. Keyboard arrows supported.

## Assets

- `public/Rogul_Jayaraman_Resume.pdf` — resume (cached via header in `next.config.js`).
- `public/favicon.svg` — icon.
- `public/images/photo.jpg` + `public/images/Intern/*` — images.

## Config

- `next.config.js` — security headers + cache headers for PDF/favicon. No `output: export`.
- `postcss.config.js` + `tailwind.config.ts` + `tsconfig.json` — standard Next 15 setup.

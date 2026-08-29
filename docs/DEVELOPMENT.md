# Development — portfolio_next

## Run Locally

```bash
nvm use           # uses .nvmrc (Node 20) if you have nvm
npm install
npm run dev       # http://localhost:3000
npm run lint
npm run build && npm run start  # test production
```

No env vars. `.env.example` is intentionally empty.

## Add a Project

Edit `components/sections/projects.tsx` → `projects` array:

```ts
{
  num: "05",
  title: "My New Project",
  year: "2025 · Full-Stack",
  tech: ["Next.js", "Tailwind"],
  description: "One sentence — what it does.",
  git: "https://github.com/you/repo",
  demo: "https://my-demo.vercel.app",
}
```

- Omit `git`/`demo` for hardware prototypes — card shows "details on request".
- Keep `num` zero-padded (`"05"`), `year` format `YYYY · Category`.

## Add / Edit Skills

`components/sections/skills.tsx` — arrays at top of file. Follow existing shape.

## Design Tokens

- Colors/spacing: `tailwind.config.ts` → `theme.extend` + `app/globals.css` CSS variables.
- Motion: `lib/motion.ts` — use `TRANSITION.luxury`, `VIEWPORT`, `REVEAL` only. Don't add custom easings.
- Utilities: `.btn-primary`, `.btn-outline`, `.card-eleven`, `.display-mega` in `globals.css`.

Example reveal:

```tsx
import { motion } from "framer-motion";
import { REVEAL, VIEWPORT } from "@/lib/motion";

<motion.div variants={REVEAL} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
  ...
</motion.div>
```

## Git Hygiene

```bash
git status
git diff
git add <files>          # don't add .next, node_modules, logs
git commit -m "feat: ..."
```

Ignored (in `.gitignore`): `.next/`, `node_modules/`, `build.log`, `dev.log`, `.vercel/`, `task_plan.md`, `findings.md`, `progress.md`, `.env*` (except `.env.example`).

## Before You Push

```bash
npm run lint
npm run build
```

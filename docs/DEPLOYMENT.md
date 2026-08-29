# Deployment — portfolio_next

## Vercel Steps (recommended)

1. Push repo to GitHub.
2. Vercel → **Add New Project** → Import repo.
3. Framework: **Next.js** (auto-detected). Build command: `npm run build`. Output: `.next`.
4. Env vars: **none** — leave empty.
5. Deploy. Every push to `main` auto-deploys.

```bash
# manual redeploy
git push origin main
```

## Config

- `next.config.js` — no `output: export`. Vercel handles static + headers.
- Node version: `20.x` via `package.json` `engines` + `.nvmrc`.
- No env file needed — `.env.example` is just `# No env required`.

## Headers (`next.config.js` → `headers()`)

| Source | Headers |
|---|---|
| `/(.*)` | `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `HSTS` |
| `/Rogul_Jayaraman_Resume.pdf` | `Cache-Control: public, max-age=3600, must-revalidate`, `Content-Type: application/pdf` |
| `/favicon.svg` | `Cache-Control: public, max-age=3600`, `Content-Type: image/svg+xml` |

CSP is commented out (caused blank view on refresh) — re-enable only with nonces if needed.

## CI

- `eslint.ignoreDuringBuilds: false` — build fails on lint errors (production gate).
- Local check before push: `npm run lint && npm run build`.

## Verify After Deploy

- [ ] `https://<url>/` loads, dark default, no flash.
- [ ] Theme toggle wipe works (falls back without View Transition).
- [ ] `https://<url>/Rogul_Jayaraman_Resume.pdf` downloads with PDF header.

## Troubleshooting

| Issue | Fix |
|---|---|
| Resume 404 | Ensure `public/Rogul_Jayaraman_Resume.pdf` is committed (not gitignored) and filename case matches. |
| Headers missing | Check `next.config.js` `headers()` and redeploy — headers only apply on Vercel/Next server, not `file://`. |
| Build fails on Vercel but passes locally | Check Node version (20), run `npm ci && npm run build` locally, fix lint errors. |

# Planning Prompt: Migrate to Tailwind CSS 4 + DaisyUI 5

## Goal

Produce a step-by-step implementation plan to migrate this site off the
**deprecated `@astrojs/tailwind` integration** and onto **Tailwind CSS 4** (via
`@tailwindcss/vite`) with **DaisyUI 5**, with no visual regressions. This is
tech-debt cleanup, not a security fix — do it on its own branch so it can be
reviewed and reverted independently.

## Context

This is a static Astro 6 portfolio site (Astrofy template), deployed to GitHub
Pages. Read `CLAUDE.md` first for build/deploy/architecture conventions. Key
constraints that MUST be preserved:

- **Development runs in Docker.** There is no local `node`/`pnpm` — run all
  install/build/dev commands inside the container. Build/test pattern used:
  `docker run --rm -v "$PWD":/app -w /app node:lts bash -lc 'npm install -g pnpm@8 >/dev/null 2>&1; pnpm run build'`.
  The dev `docker/Dockerfile` uses **pnpm@8 + `pnpm install --frozen-lockfile`**.
- **pnpm is pinned to `pnpm@8`** (committed `pnpm-lock.yaml` is `lockfileVersion 6.0`);
  the deploy workflow `.github/workflows/deploy.yml` also pins `pnpm@8`. Keep the
  lockfile at version 6.0 — regenerate it with pnpm 8, never pnpm 9+.
- Astro is currently on **6.4.7**. Do not change the Astro version.

### Why this migration

`@astrojs/tailwind@6.0.2` is deprecated and its peer range officially excludes
Astro 6 (pnpm only warns; `npm install` would hard-fail with ERESOLVE — which is
why the dev Dockerfile was switched to pnpm). The supported path for Astro 6 +
Tailwind is the `@tailwindcss/vite` plugin with Tailwind 4.

### Current styling setup (verify before planning — these are starting facts)

- `package.json`: `@astrojs/tailwind@^6.0.0`, `tailwindcss@^3.3.5` (resolves 3.4.x),
  `daisyui@^4.4.10` (resolves 4.12.x), `@tailwindcss/typography@^0.5.10`.
- `astro.config.mjs`: `integrations: [mdx(), sitemap(), tailwind()]`.
- `tailwind.config.cjs`: content glob, empty `theme.extend`, plugins
  `[@tailwindcss/typography, daisyui]`, and `daisyui: { themes: false (light+dark only),
  darkTheme: "dark", logs: false }`.
- `src/styles/global.css`: holds one custom rule (`.time-line-container ...`) and is
  already imported globally in `src/components/BaseHead.astro` — this is the natural
  home for the Tailwind 4 CSS-first directives. It currently has NO `@tailwind`
  directives (they are injected by `@astrojs/tailwind`).
- No `postcss.config.*` exists.
- DaisyUI component class usage (regression surface, by frequency): `badge` (~61),
  `btn` (~43), `drawer` (~19), `toggle` (~8), `card` (~7), `navbar` (~4),
  `modal` (~4), `input` (~4), `hero` (~3), `swap`/`menu`/`join` (a few each).

## Required change areas (the plan should detail each)

1. **Dependencies** (`package.json` + regenerated `pnpm-lock.yaml` via pnpm 8):
   remove `@astrojs/tailwind` and `tailwindcss@3`; add `tailwindcss@^4` and
   `@tailwindcss/vite@^4`; bump `daisyui` 4→5; keep `@tailwindcss/typography`.
2. **`astro.config.mjs`**: remove the `tailwind()` integration and its import; add
   `@tailwindcss/vite` to `vite.plugins`.
3. **`src/styles/global.css`**: replace the (injected) directives with the TW4
   CSS-first config — `@import "tailwindcss";`, `@plugin "@tailwindcss/typography";`,
   and `@plugin "daisyui" { themes: light --default, dark --prefersdark; }` —
   preserving the existing custom rule and the light+dark-only / dark-as-prefers
   behavior currently encoded in `tailwind.config.cjs`.
4. **`tailwind.config.cjs`**: decide whether to delete it (TW4 auto-detects content;
   `theme.extend` is empty) or retain a minimal `@config` reference. Justify the choice.
5. **DaisyUI 4→5 breaking changes**: audit renamed/removed component classes and the
   renamed theme CSS variables (`--p`/`--s`/etc.), and any site CSS or markup relying
   on them. Enumerate concrete spots to check given the usage list above.
6. **Tailwind 3→4 breaking changes**: account for default border color now
   `currentColor`, `shadow-sm`→`shadow-xs`-style renames, removed legacy utilities,
   and the modern-browser baseline.
7. **Docs**: update `CLAUDE.md`'s Styling section (it currently documents
   `@astrojs/tailwind`, `tailwind.config.cjs`, and the DaisyUI `themes: false` config).

## Verification the plan must include

- Clean production build in Docker (currently 25 pages, no warnings).
- Dev server boots and serves (`docker/run.bash`; probe `http://localhost:4321/`).
- **Visual review pass** — the build passing does NOT prove styling is intact.
  Call out the specific pages/components to eyeball: the sidebar **drawer** + toggle,
  the **navbar**, publication **cards** + **badges**, **modals**, and form **inputs**.
  Light AND dark theme.
- Confirm `pnpm-lock.yaml` stays at `lockfileVersion 6.0`.

## Deliverable

A written implementation plan: ordered steps, exact files touched, the DaisyUI-5 /
Tailwind-4 breaking changes that actually apply to this codebase (not a generic list),
a visual-regression checklist, and a rollback note. Do not start implementing — plan only.

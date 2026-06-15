# CLAUDE.md

## Project Overview

Personal portfolio website for Davide De Benedittis, built on the [Astrofy](https://astrofy-template.netlify.app/) Astro + TailwindCSS template. Static site deployed to GitHub Pages at `https://ddebenedittis.github.io` (set as `site` in `astro.config.mjs`). Sections: projects, publications, teaching, topics (slide decks), CV, and an interactive force-directed graph / map.

## Build & Run

Development is done in Docker. The dev server runs inside the container and the host `src/` is bind-mounted in, so edits to content/components hot-reload live.
```bash
./docker/build.bash    # docker build -t astro_personal_webpage -f docker/Dockerfile .
./docker/run.bash      # runs with --net=host and -v ./src:/app/src, serves astro dev on :4321
```

Non-Docker equivalents (template defaults, package manager is **pnpm**):
```bash
pnpm install
pnpm run dev      # astro dev --host 0.0.0.0
pnpm run build    # astro build → dist/
pnpm run preview
```

## Deployment

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main` (via `withastro/action@v3`).

- **pnpm is pinned to `pnpm@8`** in the workflow and must stay there. The committed `pnpm-lock.yaml` is lockfileVersion 6.0; pnpm 9+ ignores it and pulls `@astrojs/sitemap` 3.7.2, which has a build-time bug.

## Architecture

Astro content-collection site. Content lives as Markdown in `src/content/<collection>/`, rendered by pages in `src/pages/` through layouts in `src/layouts/`.

### Content collections

- `src/content/config.ts` declares Zod schemas for **`blog`** and **`store`** only.
- **`publications/` and `topics/` are NOT declared** in `config.ts` — they are implicit collections inferred by Astro from the directory, with frontmatter validated only at use sites. When adding fields (e.g. `auth`, `journal`, `paperUrl`, `bibtex`, `tags` on publications), there is no schema to update; match the frontmatter of existing entries like `src/content/publications/pub01.md`.

### Pages & routing

- Listing pages use `getStaticPaths({ paginate })` + `getCollection(...)` with `pageSize: 10` (`src/pages/publications/[...page].astro`, `src/pages/topics/[...page].astro`).
- **Publication sort order**: descending by `pubDate`, but a `pubDate` of `"under review"` (case-insensitive) maps to `Infinity` so it sorts to the top. Keep this string exact when adding unpublished work.
- **Topic sort order**: alphabetical by `title`.
- `src/pages/fdt.astro` (force-directed tree) and `src/pages/map.astro` render amCharts visualizations into a `#chartdiv`; both need ad-blockers off to interact.

### Slugs & global config

- `src/config.ts` holds site-wide constants (`SITE_TITLE`, `GENERATE_SLUG_FROM_TITLE`, `TRANSITION_API`).
- `src/lib/createSlug.ts` derives a URL slug from the title when `GENERATE_SLUG_FROM_TITLE` is true (currently `true`), otherwise uses the file's static slug. Call as `createSlug(item.data.title, item.slug)`.

### Navigation

Sidebar nav items are hardcoded in `src/components/SideBarMenu.astro`; each `<a>` `id` matches a page's `sideBarActiveItemID` prop to highlight the active item. Add a nav entry here when adding a top-level page.

## Styling

- TailwindCSS + **DaisyUI** (`tailwind.config.cjs`), with `@tailwindcss/typography`.
- DaisyUI themes restricted to light + dark only (`themes: false`, `darkTheme: "dark"`).
- `.npmrc` sets `shamefully-hoist=true` so Astro's deps resolve under pnpm.

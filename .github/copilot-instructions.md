<!-- Copilot / AI agent instructions for this repository -->
# Repository snapshot and agent guidance

This is an Astro-based portfolio/blog template. Below are concise, actionable notes to help an AI coding agent be productive immediately in this codebase.

## Quick facts
- Framework: `Astro` (see `astro.config.mjs`). Adapter: EdgeOne by default.
- Styling: Tailwind CSS with `@astrojs/tailwind` (see `tailwind.config.js`). Dark mode uses `class` strategy.
- Content: Markdown posts live in `src/content/posts/*.md` and are loaded via `src/utils/getPosts.ts`.
- Components: reusable UI lives in `src/components/*.astro` (e.g. `Navigation.astro`, `Footer.astro`).

## How content flows (important)
- Markdown files: `src/content/posts/*.md` must expose frontmatter keys used by the site. `getPosts.ts` expects (optional/expected): `title`, `description`, `date`, `readTime`, `image`, `slug`.
- Loading: `src/utils/getPosts.ts` uses `import.meta.glob('../content/posts/*.md', { eager: true })` (do NOT rename this glob or move the markdowns without updating the glob).
- Slug resolution: The code uses `frontmatter.slug || filename` — frontmatter `slug` overrides filename. Links use `/posts/{slug}`.
- Pages:
  - `src/pages/posts.astro` — renders the posts list and client-side pagination; it serializes `getAllPosts()` into `postsData` and renders posts via DOM manipulation.
  - `src/pages/posts/[slug].astro` — static paths from `getAllPostSlugs()` and loads a post with `getPostBySlug(slug)`; the page removes the first `<h1>` from the rendered markdown to avoid duplicate titles.

## Project-specific conventions and patterns
- Frontmatter fields: prefer including `title`, `description`, `date` (ISO), `readTime` and `image`. `slug` is optional but recommended for stable URLs.
- Image paths: site expects images under `/assets/images/...` (served from `public/assets/images`). Use that path style for `image` frontmatter.
- Theme toggling: client-side theme preference is stored in `localStorage` (`theme`) and the site toggles the `dark` class on `<html>`; see inline script in `src/pages/index.astro`.
- Client-side behaviors: `posts.astro` uses a serialized JSON (`postsData`) + DOM scripts to render and paginate; prefer small, careful changes there because rendering happens on the client.
- `astro.config.mjs` sets `server.port = 4321` and `devToolbar.enabled = false` — expect the dev server on port `4321` locally.

## Development commands (use PowerShell on Windows)
Run these in the repo root.

```powershell
npm install
npm run dev    # starts Astro dev server (port 4321 per config)
npm run build  # builds the site
npm run preview # preview production build
```

Note: `package.json` includes `astro` and `@edgeone/astro` dependencies — do not remove adapter-related config without checking deployment target.

## Files to inspect for changes (high value)
- `src/utils/getPosts.ts` — core content-loading logic and frontmatter defaults.
- `src/pages/posts.astro` and `src/pages/posts/[slug].astro` — listing, pagination, and individual post rendering.
- `src/config/content.ts` — site-wide copy and configuration used by many pages (title, social links, home/about text).
- `astro.config.mjs` — server, adapter, and Vite headers (cache-control) that affect deployment and dev server behavior.
- `tailwind.config.js` — where Tailwind purge/content globs live; update when adding new template languages.

## Example frontmatter (copy from `src/content/posts/accessibility-guide.md`)
```md
---
title: "Web Accessibility: A Comprehensive Guide"
description: "Make your web applications accessible to all users"
date: "2024-04-02"
readTime: "8 min read"
image: "/assets/images/posts/post1.jpg"
slug: "accessibility-guide"
---
```

## Common agent tasks and cautions
- When adding a new post, place a Markdown file in `src/content/posts/` and ensure a `slug` or file name exists.
- Do not change the `import.meta.glob` path in `getPosts.ts` unless you update all references and understand Astro's bundling. Use the existing Post interface shape.
- Avoid heavy client-side DOM rewriting in `posts.astro` without testing pagination behavior in the browser — the file handles changes to `history.pushState` and `popstate` events.
- If changing deployment adapter or server config, update `astro.config.mjs` and test `npm run build` + `npm run preview` locally.

## Debugging tips
- To debug content-loading issues, log `allMarkdownModules` or return value of `getAllPosts()` from `src/utils/getPosts.ts` and run `npm run dev`.
- If pages fail to render in production but work in dev, check Vite server headers and EdgeOne adapter notes in `astro.config.mjs`.

## Where to update this file
If you (or a later agent) change project structure (move `content/`, alter frontmatter fields, or switch adapters) update this file and call out the changed paths explicitly.

---
If any section above is unclear or you want the instructions in Spanish, tell me which parts to expand and I will iterate.

# CLAUDE.md

Guidance for AI editors (Claude, Codex, etc.) working on this repo.

## What this is

Next.js (App Router, TypeScript, Tailwind) site for
trademarkcopyrightprotection.com. Migrating from WordPress + Elementor,
page by page. No database, no CMS — all content lives in this repo.

## Project structure

- `src/app/` — one folder per route, App Router conventions.
  - `layout.tsx` — root layout: fonts, `<Header />`, `<Footer />`, default metadata.
  - `page.tsx` — homepage (`/`).
  - `brand-owners/`, `law-firms/`, `how-it-works/`, `pricing/`,
    `get-started/`, `book-a-demo/`, `contact/`, `faq/`,
    `weekly-brand-protection/`, `welcome/`, `privacy-policy/` — static pages.
  - `blog/page.tsx` — blog index, lists all posts.
  - `[slug]/page.tsx` — blog posts render at the **root** of the site
    (e.g. `/ai-copyright-theft-brand-protection/`), not under `/blog/`.
  - `not-found.tsx` — 404 page.
  - `sitemap.ts`, `robots.ts` — generated sitemap/robots.
- `src/components/` — `Header`, `Footer`, `Button`, `Container`, `Section`, `CTA`, `PagePlaceholder`.
- `src/content/posts/` — one `.mdx` file per blog post.
- `src/lib/posts.ts` — reads and lists posts from `src/content/posts/`.
- `src/lib/metadata.ts` — `pageMetadata()` helper: sets title, description,
  canonical URL, and Open Graph for every page.

## Adding a blog post

Add one `.mdx` file to `src/content/posts/` with frontmatter:

```md
---
title: "Post Title"
description: "Short SEO description"
date: "2024-01-01"
slug: "post-url-slug"
image: ""
---

Post content here.
```

The post will automatically appear on `/blog/` and be served at the root:
`/post-url-slug/`. Do not create a separate folder under `src/app/` for it.

## Brand colors & fonts

Colors and fonts are defined **only** in `src/app/globals.css`
(`@theme` block) as Tailwind theme tokens (`brand-primary`, `brand-dark`,
`brand-accent`, `brand-magenta`, `brand-cream`, `brand-white`, and the
`font-sans` / `font-heading` font families). Never hardcode hex values or
font names in components — use the Tailwind theme classes.

## URLs and SEO

- Never change existing URLs. These are live SEO-indexed paths.
- `trailingSlash: true` is set in `next.config.ts` — keep it. All internal
  links should include the trailing slash.
- Every page must set metadata via `pageMetadata()` from `src/lib/metadata.ts`.

## Before every commit

```bash
npm run build
npm run lint
```

Both must pass with no errors.

## Workflow

- Small, focused commits with clear messages.
- Work on a branch, open a PR to `main`. Do not push directly to `main`.

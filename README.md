# Kurdistan Sociology

Bilingual (English + Sorani Kurdish) website for an independent platform on Kurdish sociology. Built with Next.js 16 (App Router) + Tailwind, exported as static HTML, hosted free on Cloudflare Pages.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs to ./out (static export)
```

## Project structure

```
src/
  app/
    page.tsx               # / — language picker, redirects to /en
    [locale]/              # bilingual routes (/en, /ku)
      layout.tsx           # html lang + dir per locale
      page.tsx             # home
      about/
      programs/
      news/
        page.tsx           # post list
        [slug]/page.tsx    # individual post
      contact/
  components/
    Header.tsx
    Footer.tsx
  i18n/
    config.ts              # locales + RTL metadata
    dictionaries/en.json   # UI strings
    dictionaries/ku.json
  content/news/
    en/*.md                # Markdown posts (English)
    ku/*.md                # Markdown posts (Sorani)
  lib/posts.ts             # markdown loader (gray-matter + remark)
```

## Adding a news post

Create a Markdown file in `src/content/news/en/` (and optionally `src/content/news/ku/`) with frontmatter:

```markdown
---
title: "Your title"
date: "2026-06-01"
excerpt: "One-line description shown on the news index."
author: "Name"
---

Markdown content here.
```

Commit and push — Cloudflare Pages will rebuild automatically.

## Deploying

See [DEPLOY.md](./DEPLOY.md) for the full domain + email + hosting runbook.

## Editing UI text

Translations live in `src/i18n/dictionaries/en.json` and `ku.json`. Keep the keys in sync between the two files.

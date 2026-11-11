# AGENTS.md

Repository conventions. Read this before changing anything.

## Commit and push every change

Every change to this project is committed **and pushed** to `origin/main` in the same piece of
work. Never finish a task with a dirty working tree or with commits left unpushed — the remote is
the source of truth for this project.

## Commit messages

- Explain intent and reasoning, not just the diff: what changed, why, and what it fixes.
- Subject in the imperative mood, kept under ~72 characters.
- Body paragraphs wrapped at ~80 columns and separated by blank lines.
- Describe real trade-offs and anything that was deliberately left out.
- **No AI attribution**: no "Generated with …" line and no `Co-Authored-By:` trailer.

## Checks before committing

```bash
npm test            # vitest run — content-layer guards
npm run typecheck   # tsc --noEmit
npm run build       # typecheck + production build
```

All three must pass. Report checks that could not be run instead of claiming they passed, and never
weaken an assertion or a type to make a check go green.

## Project facts

- Vite 8 + React 19 + TypeScript (strict), Tailwind CSS v4 (CSS-first `@theme` tokens),
  Framer Motion 14, React Router 7, Lenis, Lucide React.
- Content and copy live in `src/data/*` (projects, skills, experience, site). Presentation
  components never hard-code project facts.
- Design tokens, fluid type and shared classes live in `src/styles/globals.css`.
- Fonts are self-hosted from `src/assets/fonts` via `src/styles/fonts.css`; there is no runtime
  request to Google Fonts.
- `src/data/site.ts` holds contact details. The email is a reserved `example.com` placeholder and
  `SOCIALS` is empty: replace them with verified values, never invent addresses or profile URLs.
- Project previews are generated interface studies (`ProjectVisual.tsx`), captioned as studies,
  never presented as screenshots.
- The site is a client-side SPA; hosts must rewrite unknown paths to `index.html` for `/work/:slug`.
- `src/data/projects.test.ts` guards catalogue invariants (unique slugs, grid placement, tints,
  sitemap coverage). Update it when the data model changes rather than deleting checks.

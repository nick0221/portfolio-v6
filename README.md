# NickDevs — Immersive Creative Developer Portfolio

A dark editorial portfolio for **NickDevs**, Full Stack Web Developer (PHP / Laravel / React).
Built as a single-page scrolling experience with dedicated project routes.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + TypeScript (strict) |
| Build | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) |
| Motion | Framer Motion 14 (`useScroll`, `useTransform`, `useInView`, `AnimatePresence`) |
| Routing | React Router 7 |
| Smooth scroll | Lenis 1.3 (autoRaf, native on touch) |
| Icons | Lucide React |
| Fonts | Space Grotesk + Inter (Google Fonts, preconnected) |

HeroUI was intentionally **not** installed: every surface here is bespoke, and its component
styles plus provider bundle would fight the editorial system while adding weight. Tailwind
utilities cover the same ground. If a HeroUI component is later required, it can be added
without changing this architecture.

## Commands

```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + production build
npm run preview    # serve the production build
```

## Commit conventions

Commit messages describe the intent and reasoning behind a change, not just the diff. This
repository does **not** add AI attribution footers — no "Generated with …" line and no
`Co-Authored-By:` trailer.

## Structure

```
src/
├── components/
│   ├── animations/   Reveal, SplitText, MaskReveal, ParallaxImage, MagneticButton
│   ├── layout/       Navbar, Footer, Preloader, PageTransition
│   ├── projects/     ProjectGrid, ProjectItem, ProjectGallery, ProjectDetails
│   ├── sections/     Hero, Works, About, Expertise, Contact
│   └── ui/           ProjectVisual, SectionHeading, CustomCursor, BackToTop, ScrollProgress
├── context/          IntroContext (preloader ↔ hero coordination)
├── data/             projects.ts, skills.ts, experience.ts, site.ts
├── hooks/            useLenis, useActiveSection, useMediaQuery, useSEO
├── layouts/          MainLayout
├── pages/            HomePage, ProjectPage, NotFoundPage
├── routes/           AppRoutes
├── styles/           globals.css (tokens, typography, rules, grain)
└── types/            project.ts, index.ts
```

## Design system

Tokens live in `src/styles/globals.css` under `@theme` — background `#090909`, surface
`#111111`, elevated `#191919`, border `#292929`, accent lime `#C8FF00`. The accent appears only
as hairlines, dots, hover states and one CTA.

Text steps: `ink #F5F5F5` (18.3:1), `dim #A0A0A0` (7.6:1), `faint #8A8A8A` (5.8:1).
The palette's `#666666` step measures only 3.47:1 on the background, so it is retained as
`--color-quiet` for decorative use and is never used behind real text.

Type: `display-xl` / `display-l` / `display-m` are fluid `clamp()` classes; `.label` is the
11px tracking-wide mono metadata style; `.mono-meta` is tabular technical text.

## Content & assets that need the owner's input

1. **Email** — `src/data/site.ts` ships `nickdevs@example.com` (a reserved placeholder domain).
   Replace it with the real address before publishing.
2. **Social links** — `SOCIALS` in `src/data/site.ts` is intentionally empty because no verified
   GitHub/LinkedIn URLs were supplied. Add entries and the contact section and footer will render
   them automatically; nothing is invented.
3. **Canonical origin** — `SITE.url` is `https://nickdevs.dev`. Update it (and
   `public/sitemap.xml`, `public/robots.txt`, `index.html`) to the deployed origin.
4. **Project stacks** — `src/data/projects.ts` lists plausible stacks per build. Review them
   before publishing; only Streamnest's live URL was verified.
5. **Project imagery** — no screenshots were supplied, so `ProjectVisual.tsx` renders
   deterministic, tinted interface studies (mock, blueprint, and type specimen) instead of stock
   photography. They are captioned as studies, never presented as screenshots.
6. **Open Graph image** — `public/og.svg` is an SVG card. Export a 1200×630 PNG before launch if
   the target platforms require raster OG assets.

## Motion & accessibility

- `prefers-reduced-motion` disables parallax, clip reveals, page wipes, the preloader, the custom
  cursor and marquee movement; layout and navigation stay intact.
- Custom cursor is pointer-fine only, only above `lg`, and deliberately minimal: a small pointer
  arrow in ink that turns lime over interactive elements, with a compact mono label chip on
  labelled targets (project posters, email, back-to-top). Native cursor is restored whenever the
  replacement is not rendered.
- Skip link, visible focus rings, semantic landmarks, `aria-current` on the active nav item.
- Mobile menu: focus moves to the first item on open, Tab/Shift+Tab are trapped inside the
  overlay, Escape closes it, focus returns to the toggle and scroll lock is released.
- Generated project visuals are decorative (`aria-hidden`); the same information is available as
  real text in project metadata and gallery captions.
- No scroll listeners for section tracking — a single `IntersectionObserver` powers the nav
  indicator; parallax uses transforms only.

## Deployment

The site is a client-side SPA. Configure the host to rewrite unknown paths to `index.html`
(needed for `/work/:slug`). Build output is `dist/`.

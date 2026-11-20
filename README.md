# lucasmagalhaes.dev

Portfolio and résumé of **Lucas Pinto de Magalhães** — Full Stack Developer.

🔗 https://lucasmagalhaes-dev.vercel.app

**Stack:** Vite · React 18 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · react-i18next · lucide-react

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into /dist
npm run preview   # serve the build
npm run lint      # ESLint
npm run format    # Prettier
npm run cv        # regenerate the CV PDFs (PT/EN) in /public
npm run og        # regenerate og.png and apple-touch-icon.png
```

`npm run cv` and `npm run og` use Playwright with Chromium.

## Features

- Single-page home with anchor navigation, plus a dedicated `/projects` page (minimal History API router, no extra dependency).
- PT-BR (default) and EN, with a one-time hint on load highlighting the language switch.
- Dark (default) and light themes; both preferences are saved in `localStorage`.
- Command palette (⌘K / Ctrl+K): navigate, switch theme/language, copy email, download CV, open social profiles.
- Knowledge section as a carousel (3 cards on desktop, 2 on tablet, 1 on mobile).
- Project cards with screenshot gallery and live-site previews.
- CV download in the selected language.
- Respects `prefers-reduced-motion`; accessible (WCAG AA, keyboard navigation, screen reader labels).

## Editing content

Editing content never requires touching components. Everything lives in two places:

| What                                          | Where                                           |
| --------------------------------------------- | ----------------------------------------------- |
| Structured data (dates, links, tags, numbers) | `src/data/*.ts`                                 |
| Translatable text (PT-BR and EN)              | `src/locales/pt.json` and `src/locales/en.json` |

Each item in `src/data` has an `id`; its text lives in the locale files under the same key.

| File                | Content                                                                                                                                                               | Text in                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `profile.ts`        | name, email, socials (GitHub, Hugging Face, LinkedIn — array order = display order), CV URLs (PT/EN), "About" stats, Hero terminal lines                              | `hero.*`, `about.*`                                  |
| `experience.ts`     | companies, periods (`"YYYY-MM"`, `end: null` = current), location, tags; `during` (e.g. `'UNIFEI'`) marks experience gained while studying, shown grouped and compact | `experience.items.<id>`, `experience.academic`       |
| `projects.ts`       | projects (status `done` / `wip` / `ongoing`, repo, icon, optional `gallery` of screenshots and `showcase` of live sites) and Lab cards                                | `projects.items.<id>`, `projects.lab.items.<id>`     |
| `skills.ts`         | skill groups and chips                                                                                                                                                | `skills.groups.<id>`                                 |
| `education.ts`      | academic background                                                                                                                                                   | `education.degrees.<id>`                             |
| `knowledge.ts`      | degree courses grouped by area; `selfStudies` add items with the "Independent" badge to an area (e.g. DDD, RAG)                                                       | `knowledge.courses.*`, `knowledge.selfStudy.items.*` |
| `certifications.ts` | certifications, languages (optional `certificate`, shown under the language) and awards                                                                               | `education.certs/languages/awards.<id>`              |

**Translatable tags/chips:** items starting with a lowercase letter (e.g. `servers`, `leadership`) are keys under `terms.<item>` in the locale files. Technology names (`React`, `Docker`) are shown as-is.

### Examples

**New experience** — in `src/data/experience.ts`:

```ts
{ id: 'acme', company: 'ACME', start: '2025-03', end: null, location: 'Remote', tags: ['Go', 'Docker'] }
```

and in `pt.json` / `en.json`, inside `experience.items`:

```json
"acme": { "role": "Software Engineer", "summary": "…", "highlights": ["…", "…"] }
```

**New project** — add it to `projects` (`src/data/projects.ts`) and its text to `projects.items.<id>`. It shows up on the `/projects` page; the bento layout follows the array order (the first item is the large card). The home page shows a preview of the `featured` project plus a link to `/projects`.

**Project screenshots** — save 1280×800 WebP images in `public/projects/<project>/` and list them in the project's `gallery` (labels in `projects.items.<id>.images.<key>`).

**New social profile** — add it to `socials` in `profile.ts` and its icon to `src/components/icons/socialIcons.ts`; it appears in the Hero, Contact and command palette.

**Go Application repository link** — fill in `repo` on the `goapp` item in `projects.ts`.

### Static files (`/public`)

- `cv-lucas-magalhaes.pdf` (PT) and `cv-lucas-magalhaes-en.pdf` (EN) — generated by `npm run cv` from the content in `scripts/generate-cv.mjs` (A4, one page). The "Download CV" button serves the file matching the selected language.
- `projects/` — project screenshots (WebP, 1280×800, lazy-loaded).
- `og.png` / `apple-touch-icon.png` — generated by `npm run og` (uses Playwright; edit the template in `scripts/generate-og.mjs`).
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

> SEO (title, description, Open Graph, Twitter Card, JSON-LD `Person`) lives in `index.html`. If the domain changes, update `index.html`, `robots.txt`, `sitemap.xml` and `siteUrl` in `profile.ts`.

## Structure

```
src/
├─ components/
│  ├─ command/     Command palette (⌘K / Ctrl+K), loaded on demand
│  ├─ icons/       Brand icons (GitHub, LinkedIn, Hugging Face) and the social icon map
│  ├─ layout/      Header, LanguageHint, Footer, Background, ScrollProgress
│  ├─ projects/    Project cards, bento grid, Lab grid, screenshot gallery
│  ├─ providers/   Theme and toast
│  └─ ui/          Card, Button, Carousel, Chip, Reveal, Section, Terminal, Counter…
├─ data/           Typed content
├─ hooks/          useTheme, useToast, useActiveSection, useTypewriter…
├─ lib/            i18n, router (History API), sections (anchor scrolling), motion, cn, console easter egg
├─ locales/        pt.json, en.json
├─ pages/          HomePage (/), ProjectsPage (/projects, lazy-loaded)
├─ sections/       Home sections: Hero, About, Experience, Projects (preview), Skills, Knowledge, Education, Contact
├─ styles/         Design tokens (CSS vars) + Tailwind
└─ types/          Content types
```

**Design tokens** live in `src/styles/globals.css` (`:root` = dark, `:root.light` = light) and are exposed to Tailwind via `@theme` (`bg-bg`, `bg-surface`, `text-muted`, `text-accent`…).

Theme (dark by default) and language (PT by default) are saved in `localStorage`.

`scripts/` holds the CV generator (`generate-cv.mjs`, with the CV content in PT and EN) and the Open Graph image generator (`generate-og.mjs`).

## Deploying to Vercel

1. At [vercel.com/new](https://vercel.com/new), import the `lukinhapdm/lucasmagalhaes.dev` repository.
2. Vercel detects **Vite** automatically (build `npm run build`, output `dist`). No environment variables are needed.
3. Name the project `lucasmagalhaes-dev` so it is served at `lucasmagalhaes-dev.vercel.app`.

`vercel.json` already includes the SPA rewrite (so `/projects` works on direct access) and long-term caching for `/assets`. Every push to `main` triggers a production deploy; other branches get preview deployments.

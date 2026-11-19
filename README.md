# lucasmagalhaes.dev

Portfólio e currículo de **Lucas Pinto de Magalhães** — Desenvolvedor Full Stack.

🔗 https://lucasmagalhaes-dev.vercel.app

**Stack:** Vite · React 18 · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · react-i18next · lucide-react

## Rodando localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + build de produção em /dist
npm run preview   # serve o build
npm run lint      # ESLint
npm run format    # Prettier
```

## Editando o conteúdo

Nenhuma edição de conteúdo exige mexer em componentes. Tudo fica em dois lugares:

| O quê                                            | Onde                                          |
| ------------------------------------------------ | --------------------------------------------- |
| Dados estruturados (datas, links, tags, números) | `src/data/*.ts`                               |
| Textos traduzíveis (PT-BR e EN)                  | `src/locales/pt.json` e `src/locales/en.json` |

Cada item em `src/data` tem um `id`; os textos dele ficam nos arquivos de idioma sob a mesma chave.

| Arquivo             | Conteúdo                                                                         | Textos em                                        |
| ------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------ |
| `profile.ts`        | nome, e-mail, redes, URL do CV, números do "Sobre", linhas do terminal do Hero   | `hero.*`, `about.*`                              |
| `experience.ts`     | empresas, períodos (`"AAAA-MM"`, `end: null` = atual), local, tags               | `experience.items.<id>`                          |
| `projects.ts`       | projetos (status `done` / `wip` / `ongoing`, repo, ícone) e cards do Laboratório | `projects.items.<id>`, `projects.lab.items.<id>` |
| `skills.ts`         | grupos de skills e chips                                                         | `skills.groups.<id>`                             |
| `education.ts`      | formação acadêmica                                                               | `education.degrees.<id>`                         |
| `certifications.ts` | certificações, idiomas e prêmios                                                 | `education.certs/languages/awards.<id>`          |

**Tags/chips traduzíveis:** itens que começam com letra minúscula (ex.: `servers`, `leadership`) são chaves de `terms.<item>` nos arquivos de idioma. Nomes de tecnologia (`React`, `Docker`) aparecem como estão.

### Exemplos

**Nova experiência** — em `src/data/experience.ts`:

```ts
{ id: 'acme', company: 'ACME', start: '2025-03', end: null, location: 'Remoto', tags: ['Go', 'Docker'] }
```

e em `pt.json` / `en.json`, dentro de `experience.items`:

```json
"acme": { "role": "Engenheiro de Software", "summary": "…", "highlights": ["…", "…"] }
```

**Novo projeto** — adicione em `projects` (`src/data/projects.ts`) e o texto em `projects.items.<id>`. O layout bento usa a ordem do array: o 1º é o card grande.

**Link do repositório da Aplicação Go** — preencha `repo` no item `goapp` de `projects.ts`.

### Arquivos estáticos (`/public`)

- `cv-lucas-magalhaes.pdf` — **substitua pelo CV real** mantendo o mesmo nome (o atual é provisório).
- `og.png` / `apple-touch-icon.png` — gerados por `npm run og` (usa Playwright; edite o template em `scripts/generate-og.mjs`).
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

> SEO (title, description, Open Graph, Twitter Card, JSON-LD `Person`) fica em `index.html`. Se mudar o domínio, atualize `index.html`, `robots.txt`, `sitemap.xml` e `siteUrl` em `profile.ts`.

## Estrutura

```
src/
├─ components/
│  ├─ command/     Command palette (⌘K / Ctrl+K), carregada sob demanda
│  ├─ icons/       Ícones de marca (GitHub, LinkedIn)
│  ├─ layout/      Header, Footer, Background, ScrollProgress
│  ├─ providers/   Tema e toast
│  └─ ui/          Card, Button, Chip, Reveal, Section, Terminal, Counter…
├─ data/           Conteúdo tipado
├─ hooks/          useTheme, useToast, useActiveSection, useTypewriter…
├─ lib/            i18n, motion, sections, cn, easter egg do console
├─ locales/        pt.json, en.json
├─ sections/       Hero, About, Experience, Projects, Skills, Education, Contact
├─ styles/         Design tokens (CSS vars) + Tailwind
└─ types/          Tipos do conteúdo
```

**Design tokens** ficam em `src/styles/globals.css` (`:root` = dark, `:root.light` = claro) e são expostos ao Tailwind via `@theme` (`bg-bg`, `bg-surface`, `text-muted`, `text-accent`…).

Tema (dark padrão) e idioma (PT padrão) são salvos no `localStorage`.

## Deploy na Vercel

1. Em [vercel.com/new](https://vercel.com/new), importe o repositório `lukinhapdm/lucasmagalhaes.dev`.
2. A Vercel detecta **Vite** automaticamente (build `npm run build`, output `dist`). Não há variáveis de ambiente.
3. Em _Settings → Domains_, defina `lucasmagalhaes-dev.vercel.app` (nome do projeto: `lucasmagalhaes-dev`).

O `vercel.json` já inclui o rewrite de SPA e cache longo para `/assets`. Cada push na branch principal gera um deploy de produção; outras branches geram previews.

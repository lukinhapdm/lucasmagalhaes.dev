/**
 * Gera os currículos em PDF (A4, 1 página) a partir dos dados abaixo:
 *   public/cv-lucas-magalhaes.pdf     (PT)
 *   public/cv-lucas-magalhaes-en.pdf  (EN)
 * Uso: npm run cv   (requer Playwright/Chromium)
 *
 * O conteúdo do currículo é mantido aqui, separado do site, porque pode divergir
 * dele (nomes de empresa, cursos, prêmios).
 */
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(resolve(root, 'node_modules/@fontsource-variable', pkg, 'files', file)).toString('base64')}`

const SITE = 'lucasmagalhaes-dev.vercel.app'
const EMAIL = 'lucaspintodemagalhaes@hotmail.com'

const cv = {
  pt: {
    lang: 'pt-BR',
    title: 'Desenvolvedor Full Stack',
    stack: 'Python • Go • React • Node.js · PostgreSQL • MongoDB',
    location: 'São José dos Campos/SP — disponível para mudança',
    labels: {
      summary: 'Resumo',
      experience: 'Experiência profissional',
      academic: 'Experiência durante a formação',
      projects: 'Projeto em destaque',
      skills: 'Competências técnicas',
      education: 'Formação acadêmica',
      courses: 'Cursos e certificações',
      languages: 'Idiomas',
      extra: 'Prêmios e atividades',
    },
    summary:
      'Desenvolvedor Web Full Stack e Engenheiro de Computação (UNIFEI), com formação técnica em Mecatrônica (ETEP). Atuo na arquitetura e sustentação de ecossistemas digitais — CMS, servidores, rastreamento com Google Tag Manager e chatbots de atendimento. Desenvolvi como TCC um chatbot de saúde com IA (RAG + LLM) e hoje construo uma aplicação em Go, PostgreSQL e Docker para aprofundar back-end e modelagem de dados.',
    jobs: [
      {
        role: 'Desenvolvedor Web Full Stack',
        org: 'Gecko Marketing',
        place: 'São José dos Campos/SP',
        period: 'mai 2024 – atual',
        bullets: [
          'Desenvolvimento e customização de sites em WordPress e Elementor para clientes da agência.',
          'Gestão de infraestrutura de servidores e e-mail corporativo; manutenção contínua dos sites.',
          'Rastreamento avançado com Google Tag Manager e integração de chatbots de atendimento, com foco em escalabilidade e performance.',
        ],
      },
    ],
    academic: [
      {
        role: 'Diretor de TI / Gerente de Marketing',
        org: 'Atlas Soluções em Tecnologia (Empresa Júnior · UNIFEI)',
        period: 'jan 2017 – jan 2019',
        text: 'Co-fundador e primeiro diretor de TI: criou o portfólio da diretoria, capacitou membros, geriu equipes e negociou com clientes; depois assumiu o marketing.',
      },
      {
        role: 'Associado de TI',
        org: 'UP Consultoria Júnior (UNIFEI)',
        period: '2016',
        text: 'Site do evento ExpoJob e interface gráfica (Python) do software de vendas do Buffet Gut’s.',
      },
      {
        role: 'Técnico de Laboratório (estágio)',
        org: 'PowerBlade I.T Solution (ETEP)',
        period: 'mai – ago 2015',
        text: 'Análise técnica e manutenção de no-breaks, organização do laboratório e atendimento.',
      },
    ],
    projects: [
      {
        name: 'Chatbot RAG para Saúde',
        tags: 'Python · Google Gemini · LLM · RAG · Prompt engineering',
        text: 'TCC em Engenharia de Computação: chatbot em Python que usa o modelo Gemini (LLM), com Retrieval-Augmented Generation (RAG) e prompt engineering, para responder dúvidas sobre COVID-19 e unidades de saúde de Itabira/MG com base em fontes oficiais.',
      },
    ],
    skills: [
      [
        'Front-end',
        'React, TypeScript, JavaScript, HTML5, CSS3, Tailwind, Bootstrap, WordPress, Elementor',
      ],
      ['Back-end', 'Go, Node.js, Python, C++, REST APIs'],
      ['Dados', 'PostgreSQL, MongoDB, SQL, Power BI'],
      ['IA', 'LLM, RAG, fine-tuning, prompt engineering, chatbots'],
      ['DevOps', 'Docker, Git, GitHub, Vercel, Google Tag Manager'],
      ['Outros', 'Domain-Driven Design, Photoshop, Pacote Office'],
    ],
    education: [
      {
        degree: 'Bacharelado em Engenharia de Computação',
        org: 'Universidade Federal de Itajubá (UNIFEI) — Campus Itabira',
        period: 'fev 2016 – dez 2024',
      },
      {
        degree: 'Ensino Médio / Técnico em Mecatrônica',
        org: 'Escola Técnica Professor Everardo Passos (ETEP)',
        period: 'fev 2012 – set 2015',
      },
    ],
    courses: [
      'Python Fundamental 1 e 2 — IFSC (2026)',
      'Imersão IA Google Gemini — Alura (2024)',
      'Imersão Python: Análise de Dados — Alura (2024)',
      'Fórum de Inteligência Artificial — Harvard Business Review (2024)',
      'Imersão Front-End — Alura (2024)',
      'White Belt Six Sigma — RL&Associados (2021)',
    ],
    languages: ['Português — nativo', 'Inglês — avançado (C1) · EF SET English Certificate 69/100'],
    extra: [
      'Melhor TCC de Mecatrônica — ETEP (2014)',
      'Bota pra Fazer UNIFEI (2019): restauração do estacionamento da APAE Itabira, projeto de impacto social',
    ],
  },
  en: {
    lang: 'en',
    title: 'Full Stack Developer',
    stack: 'Python • Go • React • Node.js · PostgreSQL • MongoDB',
    location: 'São José dos Campos, Brazil — open to relocation',
    labels: {
      summary: 'Summary',
      experience: 'Professional experience',
      academic: 'Experience during studies',
      projects: 'Featured project',
      skills: 'Technical skills',
      education: 'Education',
      courses: 'Courses and certifications',
      languages: 'Languages',
      extra: 'Awards and activities',
    },
    summary:
      'Full Stack Web Developer and Computer Engineer (UNIFEI), with a technical degree in Mechatronics (ETEP). I architect and maintain digital ecosystems — CMS, servers, Google Tag Manager tracking and customer service chatbots. For my thesis I built an AI health chatbot (RAG + LLM), and I am currently building an application with Go, PostgreSQL and Docker to deepen my back-end and data modeling skills.',
    jobs: [
      {
        role: 'Full Stack Web Developer',
        org: 'Gecko Marketing',
        place: 'São José dos Campos, Brazil',
        period: 'May 2024 – present',
        bullets: [
          'Building and customizing WordPress and Elementor websites for the agency’s clients.',
          'Managing server infrastructure and corporate email; ongoing website maintenance.',
          'Advanced tracking with Google Tag Manager and customer service chatbot integration, focused on scalability and performance.',
        ],
      },
    ],
    academic: [
      {
        role: 'IT Director / Marketing Manager',
        org: 'Atlas Soluções em Tecnologia (Junior Enterprise · UNIFEI)',
        period: 'Jan 2017 – Jan 2019',
        text: 'Co-founder and first IT director: built the IT service portfolio, trained members, managed teams and negotiated with clients; later led marketing.',
      },
      {
        role: 'IT Associate',
        org: 'UP Consultoria Júnior (UNIFEI)',
        period: '2016',
        text: 'Built the ExpoJob event website and the Python GUI for Buffet Gut’s sales software.',
      },
      {
        role: 'Laboratory Technician (internship)',
        org: 'PowerBlade I.T Solution (ETEP)',
        period: 'May – Aug 2015',
        text: 'Technical analysis and maintenance of UPS units, lab organization and customer service.',
      },
    ],
    projects: [
      {
        name: 'Health RAG Chatbot',
        tags: 'Python · Google Gemini · LLM · RAG · Prompt engineering',
        text: 'Computer Engineering thesis: a Python chatbot built on the Gemini model (LLM), using Retrieval-Augmented Generation (RAG) and prompt engineering to answer questions about COVID-19 and health units in Itabira, Brazil, based on official sources.',
      },
    ],
    skills: [
      [
        'Front-end',
        'React, TypeScript, JavaScript, HTML5, CSS3, Tailwind, Bootstrap, WordPress, Elementor',
      ],
      ['Back-end', 'Go, Node.js, Python, C++, REST APIs'],
      ['Data', 'PostgreSQL, MongoDB, SQL, Power BI'],
      ['AI', 'LLM, RAG, fine-tuning, prompt engineering, chatbots'],
      ['DevOps', 'Docker, Git, GitHub, Vercel, Google Tag Manager'],
      ['Other', 'Domain-Driven Design, Photoshop, Microsoft Office'],
    ],
    education: [
      {
        degree: 'B.Eng. in Computer Engineering',
        org: 'Federal University of Itajubá (UNIFEI) — Itabira campus',
        period: 'Feb 2016 – Dec 2024',
      },
      {
        degree: 'High School / Mechatronics Technician',
        org: 'Escola Técnica Professor Everardo Passos (ETEP)',
        period: 'Feb 2012 – Sep 2015',
      },
    ],
    courses: [
      'Python Fundamentals 1 & 2 — IFSC (2026)',
      'Google Gemini AI Immersion — Alura (2024)',
      'Python Immersion: Data Analysis — Alura (2024)',
      'Artificial Intelligence Forum — Harvard Business Review (2024)',
      'Front-End Immersion — Alura (2024)',
      'White Belt Six Sigma — RL&Associados (2021)',
    ],
    languages: [
      'Portuguese — native',
      'English — advanced (C1) · EF SET English Certificate 69/100',
    ],
    extra: [
      'Best Mechatronics Final Project — ETEP (2014)',
      'Bota pra Fazer UNIFEI (2019): social impact project restoring the APAE Itabira parking lot',
    ],
  },
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function html(d) {
  const section = (title, body) => `<section><h2>${esc(title)}</h2>${body}</section>`
  return `<!doctype html><html lang="${d.lang}"><head><meta charset="utf-8"><title>Lucas Pinto de Magalhães — CV</title><style>
  @font-face { font-family: Geist; src: url(${font('geist', 'geist-latin-wght-normal.woff2')}); font-weight: 100 900; }
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Geist, sans-serif; color: #1f2328; font-size: 8.8pt; line-height: 1.36; padding: 11mm 14mm 9mm; }
  a { color: inherit; text-decoration: none; }
  header { padding-bottom: 3.4mm; border-bottom: 1.4pt solid #0e7490; }
  h1 { font-size: 21pt; letter-spacing: -0.3pt; line-height: 1.1; font-weight: 700; }
  .title { margin-top: 1.2mm; font-size: 10.5pt; font-weight: 600; color: #0e7490; }
  .title span { color: #4b5563; font-weight: 400; }
  .meta { margin-top: 1.4mm; font-size: 8.4pt; color: #4b5563; display: flex; flex-wrap: wrap; column-gap: 2.4mm; }
  .meta span { white-space: nowrap; }
  .meta span + span::before { content: '|'; margin-right: 2.4mm; color: #9ca3af; }
  .meta a { color: #0e7490; }
  section { margin-top: 3.1mm; }
  h2 { font-size: 9.6pt; font-weight: 700; letter-spacing: 1pt; text-transform: uppercase; color: #0e7490; padding-bottom: 0.8mm; border-bottom: 0.6pt solid #cfe7ee; margin-bottom: 1.6mm; }
  .row { display: flex; justify-content: space-between; gap: 4mm; align-items: baseline; }
  .role { font-weight: 600; font-size: 9.4pt; }
  .org { color: #374151; }
  .period { font-size: 8.2pt; color: #4b5563; font-style: italic; white-space: nowrap; }
  ul { padding-left: 3.8mm; margin-top: 0.8mm; }
  li { margin-top: 0.4mm; }
  li::marker { color: #0e7490; }
  .item + .item { margin-top: 1.5mm; }
  .small { color: #374151; }
  .tags { font-size: 8.2pt; font-weight: 600; color: #0e7490; margin-top: 0.3mm; }
  .grid2 { display: grid; grid-template-columns: 1fr; gap: 1.6mm; }
  .skills { display: grid; grid-template-columns: 19mm 1fr; gap: 0.7mm 2mm; }
  .skills dt { font-weight: 600; }
  .cols { display: grid; grid-template-columns: 1.15fr 1fr; gap: 6mm; }
  .plain { padding-left: 3.8mm; }
</style></head><body>
<header>
  <h1>Lucas Pinto de Magalhães</h1>
  <p class="title">${esc(d.title)} <span>· ${esc(d.stack)}</span></p>
  <p class="meta"><span>${esc(d.location)}</span><span><a href="mailto:${EMAIL}">${EMAIL}</a></span><span><b><a href="https://${SITE}">${SITE}</a></b></span></p>
</header>
${section(d.labels.summary, `<p>${esc(d.summary)}</p>`)}
${section(
  d.labels.experience,
  d.jobs
    .map(
      (j) =>
        `<div class="item"><div class="row"><p><span class="role">${esc(j.role)}</span> <span class="org">— ${esc(j.org)} · ${esc(j.place)}</span></p><span class="period">${esc(j.period)}</span></div><ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>`,
    )
    .join(''),
)}
${section(
  d.labels.academic,
  d.academic
    .map(
      (a) =>
        `<div class="item"><div class="row"><p><span class="role">${esc(a.role)}</span> <span class="org">— ${esc(a.org)}</span></p><span class="period">${esc(a.period)}</span></div><p class="small">${esc(a.text)}</p></div>`,
    )
    .join(''),
)}
${section(
  d.labels.projects,
  `<div class="grid2">${d.projects
    .map(
      (p) =>
        `<div><p><span class="role">${esc(p.name)}</span></p><p class="tags">${esc(p.tags)}</p><p class="small">${esc(p.text)}</p></div>`,
    )
    .join('')}</div>`,
)}
${section(d.labels.skills, `<dl class="skills">${d.skills.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`)}
<div class="cols">
  <div>
    ${section(
      d.labels.education,
      d.education
        .map(
          (e) =>
            `<div class="item"><div class="row"><span class="role">${esc(e.degree)}</span></div><p class="small">${esc(e.org)}</p><p class="period">${esc(e.period)}</p></div>`,
        )
        .join(''),
    )}
    ${section(d.labels.languages, `<ul class="plain">${d.languages.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>`)}
  </div>
  <div>
    ${section(d.labels.courses, `<ul class="plain">${d.courses.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`)}
    ${section(d.labels.extra, `<ul class="plain">${d.extra.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`)}
  </div>
</div>
</body></html>`
}

const browser = await chromium.launch()
const page = await browser.newPage()
for (const [lng, file] of [
  ['pt', 'cv-lucas-magalhaes.pdf'],
  ['en', 'cv-lucas-magalhaes-en.pdf'],
]) {
  await page.setContent(html(cv[lng]), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const overflow = await page.evaluate(
    () => document.body.scrollHeight - Math.round((297 / 25.4) * 96),
  )
  if (overflow > 0) console.warn(`⚠ ${lng}: conteúdo passa de 1 página (${overflow}px)`)
  await page.pdf({ path: resolve(root, 'public', file), format: 'A4', printBackground: true })
  console.log(`✓ public/${file}`)
}
await browser.close()

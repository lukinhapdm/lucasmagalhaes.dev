import type { Profile } from '@/types/content'

export const profile: Profile = {
  name: 'Lucas Pinto de Magalhães',
  shortName: 'Lucas Magalhães',
  initials: 'LM',
  email: 'lucaspintodemagalhaes@hotmail.com',
  location: 'São José dos Campos, SP — Brasil',
  siteUrl: 'https://lucasmagalhaes-dev.vercel.app',
  cvUrl: { pt: '/cv-lucas-magalhaes.pdf', en: '/cv-lucas-magalhaes-en.pdf' },
  // A ordem define a ordem dos ícones no Hero, no Contato e na paleta.
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      url: 'https://github.com/lukinhapdm',
      handle: '@lukinhapdm',
    },
    {
      id: 'huggingface',
      label: 'Hugging Face',
      url: 'https://huggingface.co/lukinhapdm',
      handle: '@lukinhapdm',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lucas-magalh%C3%A3es-179856b2',
      handle: 'in/lucas-magalhães',
    },
  ],
  // Números animados do "Sobre"; rótulos em about.stats.<id>.
  stats: [
    { id: 'years', value: 2, suffix: '+' },
    { id: 'projects', value: 20, suffix: '+' },
    { id: 'technologies', value: 10, suffix: '+' },
    { id: 'ai', value: 1 },
  ],
  // Comandos e saídas do terminal animado do Hero (não traduzidos, como num terminal real).
  terminal: [
    { command: 'whoami', output: ['lucas — full stack developer @ gecko digital'] },
    {
      command: 'cat stack.txt',
      output: [
        'backend   → Go · Node.js · Python',
        'frontend  → React · TypeScript · Tailwind',
        'data      → PostgreSQL · MongoDB',
        'infra     → Docker · Git · Vercel',
        'ai        → RAG · LLM',
      ],
    },
  ],
}

import type { SkillGroup } from '@/types/content'

/**
 * Itens que começam com letra minúscula (ex.: `servers`) são chaves traduzidas em
 * `terms.<item>` nos arquivos de idioma. Nomes de tecnologias aparecem como estão.
 */
export const skills: SkillGroup[] = [
  {
    id: 'frontend',
    items: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind',
      'Bootstrap',
      'WordPress',
    ],
  },
  { id: 'backend', items: ['Go', 'Node.js', 'Python', 'C++', 'REST APIs'] },
  { id: 'database', items: ['PostgreSQL', 'MongoDB', 'SQL'] },
  { id: 'ai', items: ['LLM', 'RAG', 'chatbots'] },
  { id: 'devops', items: ['Docker', 'Git', 'GitHub', 'Vercel', 'servers', 'corporateEmail'] },
  { id: 'analytics', items: ['Google Tag Manager', 'Power BI', 'dataAnalysis'] },
  { id: 'soft', items: ['leadership', 'communication', 'projectManagement', 'teamwork'] },
]

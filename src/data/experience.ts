import type { Experience } from '@/types/content'

/**
 * Ordem: mais recente primeiro. Textos em `locales/*.json` → `experience.items.<id>`.
 * Tags que começam com letra minúscula são chaves traduzidas em `terms.<tag>`.
 */
export const experience: Experience[] = [
  {
    id: 'gecko',
    company: 'Agência Gecko Digital',
    start: '2024-05',
    end: null,
    location: 'São José dos Campos/SP',
    tags: ['WordPress', 'Google Tag Manager', 'servers', 'chatbots'],
  },
  {
    id: 'atlas',
    company: 'Atlas Soluções em Tecnologia',
    start: '2016-12',
    end: '2019-01',
    location: 'Itabira/MG',
    tags: ['itManagement', 'leadership', 'Marketing', 'negotiation'],
  },
  {
    id: 'up',
    company: 'UP Consultoria Jr.',
    start: '2016-03',
    end: '2016-12',
    location: 'Itabira/MG',
    tags: ['Python', 'GUI', 'HTML', 'CSS'],
  },
  {
    id: 'powerblade',
    company: 'PowerBlade I.T Solution',
    start: '2015-05',
    end: '2015-08',
    location: 'São José dos Campos/SP',
    tags: ['Hardware', 'ups', 'support'],
  },
]

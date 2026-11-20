import type { KnowledgeArea, SelfStudy } from '@/types/content'

/**
 * Disciplinas da graduação em Engenharia de Computação (UNIFEI) ligadas ao trabalho
 * de um desenvolvedor full stack, agrupadas por área. Nomes em `knowledge.courses.<key>`.
 */
export const knowledgeAreas: KnowledgeArea[] = [
  {
    id: 'fundamentals',
    courses: [
      'logic',
      'dataStructures',
      'algorithmAnalysis',
      'languages',
      'compilers',
      'theory',
      'discrete',
    ],
  },
  {
    id: 'backend',
    courses: ['databases', 'operatingSystems', 'distributed', 'networks', 'architecture'],
  },
  { id: 'interfaces', courses: ['hci', 'mobile', 'graphics'] },
  {
    id: 'engineering',
    courses: ['softwareEngineering', 'projectManagement', 'administration', 'methodology'],
  },
  { id: 'data', courses: ['ai', 'statistics', 'numerical', 'operationsResearch'] },
]

/** Estudos feitos por conta própria: entram na lista do card da área, com selo próprio. */
export const selfStudies: SelfStudy[] = [
  { id: 'webDevelopment', area: 'interfaces' },
  { id: 'ddd', area: 'engineering' },
  { id: 'ragFineTuning', area: 'data' },
  { id: 'promptEngineering', area: 'data' },
]

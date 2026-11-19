import type { LabProject, Project } from '@/types/content'

/** Projetos em destaque. O primeiro com `featured: true` vira o card grande do bento. */
export const projects: Project[] = [
  {
    id: 'rag',
    icon: 'bot',
    featured: true,
    tags: ['Python', 'LLM', 'RAG', 'Jupyter'],
    status: 'done',
    repo: 'https://github.com/lukinhapdm/rag-llm-chatbot-saude',
  },
  {
    id: 'goapp',
    icon: 'server',
    tags: ['Go', 'PostgreSQL', 'Docker'],
    status: 'wip',
    // TODO: adicionar `repo` quando o repositório for publicado
  },
  {
    id: 'buffet',
    icon: 'shopping',
    tags: ['Python', 'GUI'],
    status: 'done',
  },
  {
    id: 'gecko',
    icon: 'briefcase',
    tags: ['WordPress', 'Google Tag Manager'],
    status: 'ongoing',
    // TODO: adicionar nomes/links de até 2 sites de clientes (se autorizados)
  },
]

/** Cards menores da seção "Laboratório / Estudos". Descrições em `projects.lab.items.<id>`. */
export const labProjects: LabProject[] = [
  {
    id: 'go-learning',
    name: 'go-learning',
    language: 'Go',
    repo: 'https://github.com/lukinhapdm/go-learning',
  },
  {
    id: 'rest-api-learning',
    name: 'rest-api-learning',
    language: 'HTML',
    repo: 'https://github.com/lukinhapdm/rest-api-learning',
  },
  {
    id: 'curso-nodejs',
    name: 'Curso-NodeJs',
    language: 'JavaScript',
    repo: 'https://github.com/lukinhapdm/Curso-NodeJs',
  },
  {
    id: 'imersao-front-end',
    name: 'Imersao-Front-End',
    language: 'CSS',
    repo: 'https://github.com/lukinhapdm/Imersao-Front-End',
  },
  {
    id: 'cv-online',
    name: 'CV-Online',
    language: 'HTML',
    repo: 'https://github.com/lukinhapdm/CV-Online',
  },
]

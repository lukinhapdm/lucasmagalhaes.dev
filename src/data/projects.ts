import type { LabProject, Project } from '@/types/content'

/**
 * Projetos em destaque. A ordem define a posição no grid bento da página /projects
 * (ver `bento` em `components/projects/ProjectCards.tsx`). O item com `featured: true`
 * é o card grande e também aparece na prévia da home.
 */
export const projects: Project[] = [
  {
    id: 'rag',
    icon: 'bot',
    featured: true,
    tags: ['Python', 'LLM', 'RAG', 'Prompt engineering', 'Jupyter'],
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
    id: 'nodeblog',
    icon: 'newspaper',
    tags: ['Node.js', 'Express', 'MongoDB', 'Passport', 'Handlebars'],
    status: 'done',
    repo: 'https://github.com/lukinhapdm/nodejs-learning/tree/main/ProjetoBlog',
    gallery: [
      { src: '/projects/nodeblog/home.webp', key: 'home', address: 'localhost:8081/' },
      {
        src: '/projects/nodeblog/postagem.webp',
        key: 'post',
        address: 'localhost:8081/postagem',
      },
      { src: '/projects/nodeblog/admin.webp', key: 'admin', address: 'localhost:8081/admin' },
      {
        src: '/projects/nodeblog/admin-postagens.webp',
        key: 'adminPosts',
        address: 'localhost:8081/admin/postagens',
      },
    ],
  },
  {
    id: 'gecko',
    icon: 'briefcase',
    tags: ['WordPress', 'Elementor', 'Google Tag Manager'],
    status: 'ongoing',
    showcase: [
      { id: 'glas', url: 'https://glasagencia.com.br/', image: '/projects/glas/home.webp' },
    ],
  },
]

/** Cards menores da seção "Laboratório / Estudos". Descrições em `projects.lab.items.<id>`. */
export const labProjects: LabProject[] = [
  {
    id: 'cplusplus-learning',
    name: 'cplusplus-learning',
    language: 'C++',
    repo: 'https://github.com/lukinhapdm/cplusplus-learning',
  },
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
    id: 'nodejs-learning',
    name: 'nodejs-learning',
    language: 'JavaScript',
    repo: 'https://github.com/lukinhapdm/nodejs-learning',
  },
]

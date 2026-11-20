/** Mês no formato "AAAA-MM". */
export type YearMonth = `${number}-${number}`

export type SocialId = 'github' | 'linkedin' | 'email'

export interface Social {
  id: SocialId
  label: string
  url: string
  handle: string
}

export interface Stat {
  /** Chave em `about.stats.<id>` nos arquivos de idioma. */
  id: string
  value: number
  suffix?: string
}

export interface TerminalBlock {
  command: string
  output: string[]
}

export interface Profile {
  name: string
  shortName: string
  initials: string
  email: string
  location: string
  siteUrl: string
  /** Currículo em PDF por idioma (gerados por `npm run cv`). */
  cvUrl: { pt: string; en: string }
  socials: Social[]
  stats: Stat[]
  terminal: TerminalBlock[]
}

export interface Experience {
  /** Chave em `experience.items.<id>` (cargo, resumo, destaques). */
  id: string
  company: string
  url?: string
  start: YearMonth
  /** `null` = emprego atual. */
  end: YearMonth | null
  location: string
  tags?: string[]
  /**
   * Instituição de ensino quando a experiência aconteceu durante a formação
   * (empresa júnior, estágio). Essas aparecem agrupadas e em versão compacta.
   */
  during?: string
}

export type ProjectStatus = 'done' | 'wip' | 'ongoing'

export interface Project {
  /** Chave em `projects.items.<id>` (título, descrição). */
  id: string
  tags: string[]
  status: ProjectStatus
  repo?: string
  url?: string
  featured?: boolean
  /** Telas do projeto, exibidas como galeria no card. */
  gallery?: ProjectImage[]
  /** Sites publicados (trabalhos para clientes), exibidos com prévia. */
  showcase?: ShowcaseSite[]
  /** Ícone do card (ver `icons` em `components/projects/ProjectCards.tsx`). */
  icon: 'bot' | 'server' | 'shopping' | 'briefcase' | 'newspaper'
}

export interface ProjectImage {
  /** Caminho em /public (ex.: "/projects/nodeblog/home.webp"), 1280x800. */
  src: string
  /** Chave do rótulo/alt em `projects.items.<id>.images.<key>`. */
  key: string
  /** Endereço exibido na barra do navegador (ex.: "localhost:8081/admin"). */
  address: string
}

export interface ShowcaseSite {
  /** Chave da legenda em `projects.items.<projeto>.showcase.<id>`. */
  id: string
  url: string
  /** Captura da página inicial em /public, 1280x800. */
  image: string
}

export interface LabProject {
  /** Chave em `projects.lab.items.<id>`. */
  id: string
  name: string
  language: string
  repo: string
}

export type SkillGroupId =
  'frontend' | 'backend' | 'database' | 'ai' | 'devops' | 'analytics' | 'soft'

export interface SkillGroup {
  /** Chave em `skills.groups.<id>`. */
  id: SkillGroupId
  /** Chips. Itens iniciados em minúscula são chaves de `terms.<item>` (traduzidos). */
  items: string[]
}

export interface Education {
  /** Chave em `education.degrees.<id>`. */
  id: string
  institution: string
  start: number
  end: number
}

export interface Certification {
  /** Chave em `education.certs.<id>`. */
  id: string
  issuer: string
  year?: number
  url?: string
}

export interface LanguageSkill {
  /** Chave em `education.languages.<id>`. */
  id: string
  level: string
  /** Certificado que comprova o nível: chave de `education.certs.<id>`. */
  certificate?: string
}

export interface Award {
  /** Chave em `education.awards.<id>` (título + descrição). */
  id: string
  year?: number
}

export type KnowledgeAreaId = 'fundamentals' | 'backend' | 'interfaces' | 'engineering' | 'data'

export interface KnowledgeArea {
  /** Textos em `knowledge.areas.<id>` (título e resumo). */
  id: KnowledgeAreaId
  /** Disciplinas: chaves de `knowledge.courses.<key>`. */
  courses: string[]
}

export interface SelfStudy {
  /** Nome em `knowledge.selfStudy.items.<id>`. */
  id: string
  /** Card de área em cuja lista o estudo aparece (com o selo "Estudo independente"). */
  area: KnowledgeAreaId
}

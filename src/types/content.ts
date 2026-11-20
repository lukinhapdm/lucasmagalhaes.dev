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
  cvUrl: string
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
  /** Ícone (nome exportado de lucide-react, ver `components/ui/ProjectIcon`). */
  icon: 'bot' | 'server' | 'shopping' | 'briefcase'
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
}

export interface Award {
  /** Chave em `education.awards.<id>` (título + descrição). */
  id: string
  year?: number
}

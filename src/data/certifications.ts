import type { Award, Certification, LanguageSkill } from '@/types/content'

/** Cursos e certificações; nomes em education.certs.<id>. */
export const certifications: Certification[] = [
  { id: 'python', issuer: 'Python Fundamental' },
  { id: 'alura', issuer: 'Alura', year: 2024 },
  { id: 'sixsigma', issuer: 'Six Sigma', year: 2021 },
]

/** `certificate` exibe um certificado abaixo do idioma (ex.: EF SET). */
export const languages: LanguageSkill[] = [
  { id: 'pt', level: 'native' },
  { id: 'en', level: 'C1', certificate: 'efset' },
]

/** Prêmios e atividades; textos em education.awards.<id>. */
export const awards: Award[] = [
  { id: 'mechatronics', year: 2014 },
  { id: 'botaPraFazer', year: 2019 },
]

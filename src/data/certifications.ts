import type { Award, Certification, LanguageSkill } from '@/types/content'

export const certifications: Certification[] = [
  { id: 'python', issuer: 'Python Fundamental' },
  { id: 'alura', issuer: 'Alura', year: 2024 },
  { id: 'sixsigma', issuer: 'Six Sigma', year: 2021 },
]

export const languages: LanguageSkill[] = [
  { id: 'pt', level: 'native' },
  { id: 'en', level: 'C1', certificate: 'efset' },
]

export const awards: Award[] = [
  { id: 'mechatronics', year: 2014 },
  { id: 'botaPraFazer', year: 2019 },
]

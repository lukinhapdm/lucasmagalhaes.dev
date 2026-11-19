export const SECTIONS = [
  'hero',
  'about',
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
] as const

export type SectionId = (typeof SECTIONS)[number]

export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`)
  el.focus({ preventScroll: true })
}

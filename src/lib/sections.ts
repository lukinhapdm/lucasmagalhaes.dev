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

/** Altura do header fixo (compacto) + respiro. */
const HEADER_OFFSET = 72

export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = id === 'hero' ? 0 : el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`)

  // Foca a seção só depois que a rolagem terminar: chamar focus() durante a
  // rolagem suave interrompe a animação no Chromium.
  let done = false
  const focusSection = () => {
    if (done) return
    done = true
    window.removeEventListener('scrollend', focusSection)
    el.focus({ preventScroll: true })
  }
  window.addEventListener('scrollend', focusSection, { once: true })
  window.setTimeout(focusSection, 1200)

  window.scrollTo({ top: Math.max(top, 0), behavior: reduce ? 'auto' : 'smooth' })
}

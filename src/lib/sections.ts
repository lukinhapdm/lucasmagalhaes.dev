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

/** Distância entre o topo da tela e o título da seção ao final da rolagem (header + respiro). */
const TITLE_OFFSET = 96

let cancelCurrent: (() => void) | null = null

/** Posição de destino: o conteúdo da seção (após o padding) logo abaixo do header. */
function targetY(el: HTMLElement, isHero: boolean): number {
  if (isHero) return 0
  const paddingTop = parseFloat(getComputedStyle(el).paddingTop) || 0
  const y = el.getBoundingClientRect().top + window.scrollY + paddingTop - TITLE_OFFSET
  const max = document.documentElement.scrollHeight - window.innerHeight
  return Math.max(0, Math.min(y, max))
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2)

/**
 * Rola até a seção com animação própria (requestAnimationFrame):
 * - recalcula o destino a cada quadro, então mudanças de layout não fazem parar antes;
 * - não depende de `scroll-behavior`/`scrollend` (comportamento varia entre navegadores);
 * - é cancelada se o usuário rolar manualmente;
 * - só move o foco para a seção ao final, para não interromper a rolagem.
 */
export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id)
  if (!el) return
  cancelCurrent?.()
  history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`)

  const isHero = id === 'hero'
  const focusSection = () => el.focus({ preventScroll: true })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, targetY(el, isHero))
    focusSection()
    return
  }

  const root = document.documentElement
  const prevBehavior = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'

  const startY = window.scrollY
  const distance = Math.abs(targetY(el, isHero) - startY)
  const duration = Math.min(1000, Math.max(450, distance * 0.3))
  const start = performance.now()
  let raf = 0

  const stop = () => {
    cancelAnimationFrame(raf)
    root.style.scrollBehavior = prevBehavior
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    cancelCurrent = null
  }

  const step = (now: number) => {
    const progress = Math.min((now - start) / duration, 1)
    const y = startY + (targetY(el, isHero) - startY) * easeInOutCubic(progress)
    window.scrollTo(0, y)
    if (progress < 1) {
      raf = requestAnimationFrame(step)
    } else {
      stop()
      focusSection()
    }
  }

  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  cancelCurrent = stop
  raf = requestAnimationFrame(step)
}

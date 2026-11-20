import type { Transition, Variants } from 'framer-motion'

/** Curva de easing padrão do site (saída suave, "ease-out-expo"). */
export const EASE = [0.22, 1, 0.36, 1] as const

export const transition: Transition = { duration: 0.6, ease: EASE }

/** Entrada padrão dos elementos: fade + leve subida. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
}

/** Variante de container que anima os filhos em sequência. */
export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

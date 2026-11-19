import type { Transition, Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

export const transition: Transition = { duration: 0.6, ease: EASE }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition },
}

export const stagger = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

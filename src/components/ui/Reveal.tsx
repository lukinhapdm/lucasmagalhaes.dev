import { m, type HTMLMotionProps } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'

/** Fade + translateY ao entrar na viewport. */
export function Reveal(props: HTMLMotionProps<'div'>) {
  return (
    <m.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      {...props}
    />
  )
}

/** Container que aplica stagger aos filhos com `variants={fadeUp}`. */
export function RevealGroup({
  delay = 0,
  gap = 0.06,
  ...props
}: HTMLMotionProps<'div'> & { delay?: number; gap?: number }) {
  return (
    <m.div
      variants={stagger(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      {...props}
    />
  )
}

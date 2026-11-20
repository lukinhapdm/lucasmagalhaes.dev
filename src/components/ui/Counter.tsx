import { useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/** Contador animado de 0 até `value` quando entra na viewport. */
export function Counter({
  value,
  suffix = '',
  duration = 1400,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const start = performance.now()
    // Easing ease-out cúbico: acelera no início e desacelera perto do valor final.
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {/* Leitores de tela leem só o valor final, não a contagem animada. */}
      <span aria-hidden>
        {reduce ? value : n}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  )
}

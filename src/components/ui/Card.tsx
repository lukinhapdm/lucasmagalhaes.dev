import { useRef, type HTMLAttributes, type PointerEvent } from 'react'
import { useFancyPointer } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Inclinação máxima em graus (0 desativa o tilt). */
  tilt?: number
}

/** Card com glassmorphism, borda em gradiente animada, spotlight e tilt 3D sutil. */
export function Card({ className, tilt = 3, children, ...props }: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const fancy = useFancyPointer()

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el || !fancy) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (tilt) {
      el.style.setProperty('--rx', `${((y / rect.height - 0.5) * -tilt).toFixed(2)}deg`)
      el.style.setProperty('--ry', `${((x / rect.width - 0.5) * tilt).toFixed(2)}deg`)
    }
  }

  function handleLeave() {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(
        'card rounded-2xl border border-border glass hover:border-border-strong',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

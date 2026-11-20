import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Etiqueta pequena em fonte mono (tecnologias, tags). */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-surface-2/60 px-2 py-0.5 font-mono text-[11px] leading-5 text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}

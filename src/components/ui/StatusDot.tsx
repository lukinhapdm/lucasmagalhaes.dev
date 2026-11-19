import { cn } from '@/lib/cn'

/** Ponto de status; `pulse` adiciona o anel animado. */
export function StatusDot({
  pulse = false,
  tone = 'success',
}: {
  pulse?: boolean
  tone?: 'success' | 'warning' | 'accent'
}) {
  const color = { success: 'bg-success', warning: 'bg-warning', accent: 'bg-accent' }[tone]
  return (
    <span className="relative inline-flex size-2" aria-hidden>
      {pulse && (
        <span
          className={cn(
            'absolute inline-flex size-full animate-ping rounded-full opacity-60',
            color,
          )}
        />
      )}
      <span className={cn('relative inline-flex size-2 rounded-full', color)} />
    </span>
  )
}

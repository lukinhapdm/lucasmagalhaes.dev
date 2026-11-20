import { forwardRef, useRef, type AnchorHTMLAttributes, type PointerEvent } from 'react'
import { useFancyPointer } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  magnetic?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-solid font-semibold shadow-lg shadow-[color-mix(in_oklab,var(--accent-to)_30%,transparent)] hover:brightness-110',
  secondary: 'glass border border-border-strong text-fg hover:border-accent/60',
  ghost: 'text-muted hover:text-fg hover:bg-surface-2',
}

/** Classes base compartilhadas por links e botões com aparência de botão. */
export const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 h-11 text-sm transition-[transform,filter,background-color,border-color,color] duration-200 ease-out-expo will-change-transform select-none'

/** Link estilizado como botão, com efeito magnético opcional. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant = 'primary', magnetic = false, className, children, ...props },
  forwarded,
) {
  const inner = useRef<HTMLAnchorElement | null>(null)
  const fancy = useFancyPointer()

  function setRef(node: HTMLAnchorElement | null) {
    inner.current = node
    if (typeof forwarded === 'function') forwarded(node)
    else if (forwarded) forwarded.current = node
  }

  // Efeito magnético: o botão acompanha levemente o cursor (só com mouse e sem movimento reduzido).
  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    if (!magnetic || !fancy || !inner.current) return
    const r = inner.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.2
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    inner.current.style.transform = `translate(${x}px, ${y}px)`
  }

  function handleLeave() {
    if (inner.current) inner.current.style.transform = ''
  }

  return (
    <a
      ref={setRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={cn(buttonBase, variants[variant], className)}
      {...props}
    >
      {children}
    </a>
  )
})

/** Botão quadrado só com ícone (tema, idioma, menu). Exige aria-label ou texto sr-only. */
export function IconButton({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-lg text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg',
        className,
      )}
      {...props}
    />
  )
}

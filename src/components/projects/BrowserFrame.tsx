import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Moldura de navegador (barra com pontos e endereço) para capturas de tela. */
export function BrowserFrame({
  address,
  children,
  className,
}: {
  address: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-bg/60', className)}>
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span aria-hidden className="size-2 rounded-full bg-[#ff5f57]" />
        <span aria-hidden className="size-2 rounded-full bg-[#febc2e]" />
        <span aria-hidden className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate rounded-md bg-surface-2/80 px-2 py-0.5 font-mono text-[10px] text-muted">
          {address}
        </span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">{children}</div>
    </div>
  )
}

/** Imagem 1280x800 com carregamento preguiçoso (sem deslocar o layout). */
export function Screenshot({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={1280}
      height={800}
      loading="lazy"
      decoding="async"
      className={cn('absolute inset-0 size-full object-cover object-top', className)}
    />
  )
}

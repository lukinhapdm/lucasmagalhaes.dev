import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { SECTIONS, type SectionId } from '@/lib/sections'

interface SectionProps {
  id: SectionId
  children: ReactNode
  className?: string
  /** Chave i18n com `eyebrow` e `title` (ex.: "about"). */
  heading?: string
}

export function Section({ id, children, className, heading }: SectionProps) {
  const { t } = useTranslation()
  const index = SECTIONS.indexOf(id)
  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={heading ? `${id}-title` : undefined}
      className={cn('relative py-24 outline-none md:py-32', className)}
    >
      <div className="container-page">
        {heading && (
          <Reveal className="mb-12 md:mb-16">
            <p className="mb-3 font-mono text-xs tracking-wider text-accent uppercase">
              <span className="text-muted">{String(index).padStart(2, '0')} //</span>{' '}
              {t(`${heading}.eyebrow`)}
            </p>
            <h2
              id={`${id}-title`}
              className="max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-5xl"
            >
              {t(`${heading}.title`)}
            </h2>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

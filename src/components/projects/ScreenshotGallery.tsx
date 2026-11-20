import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserFrame, Screenshot } from '@/components/projects/BrowserFrame'
import { cn } from '@/lib/cn'
import type { ProjectImage } from '@/types/content'

/** Galeria de telas do projeto: moldura de navegador + abas para trocar a tela. */
export function ScreenshotGallery({
  projectId,
  images,
}: {
  projectId: string
  images: ProjectImage[]
}) {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)
  const label = (img: ProjectImage) => t(`projects.items.${projectId}.images.${img.key}`)
  const current = images[active]

  return (
    <div className="mt-6">
      <BrowserFrame address={current?.address ?? ''}>
        {images.map((img, i) => (
          <Screenshot
            key={img.src}
            src={img.src}
            alt={
              i === active ? t(`projects.items.${projectId}.imageAlt`, { screen: label(img) }) : ''
            }
            className={cn(
              'transition-opacity duration-300',
              i === active ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          />
        ))}
      </BrowserFrame>
      <div role="group" aria-label={t('projects.screens')} className="mt-3 flex flex-wrap gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            aria-pressed={i === active}
            onClick={() => setActive(i)}
            className={cn(
              'relative z-[2] rounded-md border px-2.5 py-1 font-mono text-[11px] transition-colors duration-200',
              i === active
                ? 'border-accent/60 bg-surface-2 text-fg'
                : 'border-border text-muted hover:border-border-strong hover:text-fg',
            )}
          >
            {label(img)}
          </button>
        ))}
      </div>
    </div>
  )
}

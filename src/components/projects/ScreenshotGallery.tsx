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
      {/* Miniaturas: reaproveitam as mesmas imagens da galeria (sem download extra). */}
      <div role="group" aria-label={t('projects.screens')} className="mt-3 grid grid-cols-4 gap-2">
        {images.map((img, i) => {
          const selected = i === active
          return (
            <button
              key={img.src}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(i)}
              className={cn(
                'group/thumb relative z-[2] flex flex-col items-center gap-1.5 text-center transition-opacity duration-200',
                selected ? 'opacity-100' : 'opacity-55 hover:opacity-100',
              )}
            >
              {/* Borda em degradê na miniatura ativa (padding de 1.5px sobre fundo em degradê). */}
              <span
                className={cn(
                  'block w-full rounded-lg p-[1.5px]',
                  selected ? 'bg-gradient-accent' : 'bg-border-strong',
                )}
              >
                <img
                  src={img.src}
                  alt=""
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[16/10] w-full rounded-[7px] object-cover object-top"
                />
              </span>
              <span
                className={cn(
                  'text-[10.5px] leading-tight',
                  selected ? 'font-medium text-fg' : 'text-muted',
                )}
              >
                {label(img)}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

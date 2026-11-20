import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CarouselProps {
  children: ReactNode
  /** Rótulo acessível do carrossel. */
  label: string
  labels: { prev: string; next: string; page: (n: number, total: number) => string }
  className?: string
}

/**
 * Carrossel com rolagem nativa (scroll-snap): 1 card por vez no celular, 2 no tablet
 * e 3 no desktop. Setas e indicadores avançam uma "página" (a quantidade visível).
 * Funciona com toque/arrastar e teclado; respeita prefers-reduced-motion.
 */
export function Carousel({ children, label, labels, className }: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const items = Children.toArray(children)
  const [state, setState] = useState({ page: 0, pages: 1, atStart: true, atEnd: false })

  const measure = useCallback(() => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = first.offsetWidth + gap
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / step))
    const pages = Math.max(1, Math.ceil(items.length / perView))
    const maxScroll = track.scrollWidth - track.clientWidth
    const atEnd = track.scrollLeft >= maxScroll - 2
    const page = atEnd ? pages - 1 : Math.round(track.scrollLeft / (step * perView))
    setState({ page, pages, atStart: track.scrollLeft <= 2, atEnd })
  }, [items.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    track.addEventListener('scroll', measure, { passive: true })
    return () => {
      ro.disconnect()
      track.removeEventListener('scroll', measure)
    }
  }, [measure])

  function scrollToPage(page: number) {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = first.offsetWidth + gap
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / step))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: page * perView * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  const arrow =
    'grid size-10 place-items-center rounded-full border border-border bg-surface/80 text-fg transition-[opacity,border-color,color] duration-200 hover:border-accent/60 hover:text-accent disabled:pointer-events-none disabled:opacity-30'

  return (
    <section aria-roledescription="carousel" aria-label={label} className={className}>
      <ul
        ref={trackRef}
        className="-mx-2 flex snap-x snap-mandatory scroll-px-2 [scrollbar-width:none] gap-4 overflow-x-auto scroll-smooth px-2 py-2 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <li
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${items.length}`}
            className="flex shrink-0 basis-full snap-start md:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
          >
            <div className="w-full">{child}</div>
          </li>
        ))}
      </ul>

      {state.pages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {Array.from({ length: state.pages }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToPage(i)}
                aria-label={labels.page(i + 1, state.pages)}
                aria-current={i === state.page ? 'true' : undefined}
                className="grid h-6 place-items-center"
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-[width,background-color] duration-300',
                    i === state.page ? 'w-6 bg-gradient-accent' : 'w-1.5 bg-border-strong',
                  )}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToPage(state.page - 1)}
              disabled={state.atStart}
              aria-label={labels.prev}
              className={arrow}
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToPage(state.page + 1)}
              disabled={state.atEnd}
              aria-label={labels.next}
              className={arrow}
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

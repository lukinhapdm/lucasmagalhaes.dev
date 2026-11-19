import { Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/ui/Button'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { toggleLanguage } from '@/lib/i18n'
import { modKeyLabel } from '@/lib/platform'
import { SECTIONS, scrollToSection, type SectionId } from '@/lib/sections'

const NAV = SECTIONS.filter((s) => s !== 'hero')

interface HeaderProps {
  onOpenPalette: () => void
  onPreloadPalette: () => void
}

export function Header({ onOpenPalette, onPreloadPalette }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection(SECTIONS)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const mobileNavRef = useRef<HTMLElement>(null)

  // Menu fechado fica fora da ordem de foco e da árvore de acessibilidade.
  useEffect(() => {
    if (mobileNavRef.current) mobileNavRef.current.inert = !open
  }, [open])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function go(id: SectionId) {
    return (e: React.MouseEvent) => {
      e.preventDefault()
      setOpen(false)
      scrollToSection(id)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled || open
            ? 'border-b border-border bg-[var(--header)] backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <div
          className={cn(
            'container-page flex items-center justify-between gap-4 transition-[height] duration-300 ease-out-expo',
            scrolled ? 'h-14' : 'h-16 md:h-20',
          )}
        >
          <a
            href="#hero"
            onClick={go('hero')}
            className="group flex items-center gap-2.5 font-mono text-sm"
          >
            <span className="sr-only">Lucas Magalhães — </span>
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-solid font-sans text-sm font-bold transition-transform duration-300 group-hover:rotate-[-6deg]">
              LM
            </span>
            <span className="hidden text-muted transition-colors group-hover:text-fg sm:inline">
              lucas<span className="text-accent">.dev</span>
            </span>
          </a>

          <nav aria-label={t('a11y.mainNav')} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={go(id)}
                    aria-current={active === id ? 'true' : undefined}
                    className={cn(
                      'relative rounded-lg px-3 py-2 text-sm transition-colors duration-200',
                      active === id ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {t(`nav.${id}`)}
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-3 -bottom-px h-px origin-left bg-gradient-accent transition-transform duration-300 ease-out-expo',
                        active === id ? 'scale-x-100' : 'scale-x-0',
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenPalette}
              onPointerEnter={onPreloadPalette}
              onFocus={onPreloadPalette}
              aria-label={t('a11y.openPalette')}
              aria-keyshortcuts="Control+K Meta+K"
              className="mr-1 hidden h-9 items-center gap-1.5 rounded-lg border border-border bg-surface-2/50 px-2.5 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-fg md:inline-flex"
            >
              <kbd className="font-mono">{modKeyLabel}</kbd>
              <kbd className="font-mono">K</kbd>
            </button>
            <IconButton
              onClick={toggleLanguage}
              title={t('a11y.switchLang')}
              className="w-auto gap-1 px-2"
            >
              <Languages aria-hidden className="size-4" />
              <span aria-hidden className="font-mono text-xs uppercase">
                {i18n.language === 'pt' ? 'en' : 'pt'}
              </span>
              <span className="sr-only">{t('a11y.switchLang')}</span>
            </IconButton>
            <IconButton onClick={toggleTheme} aria-label={t('a11y.toggleTheme')}>
              {theme === 'dark' ? (
                <Sun aria-hidden className="size-4" />
              ) : (
                <Moon aria-hidden className="size-4" />
              )}
            </IconButton>
            <IconButton
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="lg:hidden"
            >
              {open ? (
                <X aria-hidden className="size-5" />
              ) : (
                <Menu aria-hidden className="size-5" />
              )}
            </IconButton>
          </div>
        </div>

        {/* Transição em CSS (grid-rows): animar height:auto com o Framer Motion
            restaurava a posição de rolagem e cancelava a navegação no mobile. */}
        <nav
          id="mobile-nav"
          aria-label={t('a11y.mainNav')}
          ref={mobileNavRef}
          className={cn(
            'grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out-expo lg:hidden',
            open ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0',
          )}
        >
          <ul className="container-page flex min-h-0 flex-col gap-1 overflow-hidden">
            {NAV.map((id, i) => (
              <li key={id} className={i === NAV.length - 1 ? 'pb-4' : undefined}>
                <a
                  href={`#${id}`}
                  onClick={go(id)}
                  aria-current={active === id ? 'true' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors',
                    active === id ? 'bg-surface-2 text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

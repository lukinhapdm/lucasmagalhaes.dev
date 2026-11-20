import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Background } from '@/components/layout/Background'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { useTranslation } from 'react-i18next'
import { ROUTES, useRoute } from '@/lib/router'
import { SECTIONS, scrollToSection, type SectionId } from '@/lib/sections'
import { HomePage } from '@/pages/HomePage'

const loadPalette = () => import('@/components/command/CommandPalette')
const CommandPalette = lazy(loadPalette)
const loadProjectsPage = () => import('@/pages/ProjectsPage')
const ProjectsPage = lazy(loadProjectsPage)

if (typeof history !== 'undefined') history.scrollRestoration = 'manual'

/**
 * Ao trocar de página:
 * 1. voltar/avançar no navegador → restaura a posição salva no histórico;
 * 2. navegação nova para /#secao (ou link direto) → rola até a seção;
 * 3. caso contrário → topo.
 */
function useRouteScroll(route: string) {
  useLayoutEffect(() => {
    const saved = (history.state as { scrollY?: number } | null)?.scrollY
    if (typeof saved === 'number') {
      window.scrollTo({ top: saved, behavior: 'instant' })
      return
    }
    const hash = decodeURIComponent(location.hash.slice(1))
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (route === ROUTES.home && (SECTIONS as readonly string[]).includes(hash)) {
      requestAnimationFrame(() => scrollToSection(hash as SectionId))
    }
  }, [route])
}

/** Título e canonical por página. */
function useRouteMeta(route: string) {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    document.title = route === ROUTES.projects ? t('projects.page.metaTitle') : t('meta.title')
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        'href',
        `https://lucasmagalhaes-dev.vercel.app${route === ROUTES.home ? '/' : route}`,
      )
  }, [route, t, i18n.language])
}

export default function App() {
  const { t } = useTranslation()
  const route = useRoute()
  useRouteScroll(route)
  useRouteMeta(route)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteMounted, setPaletteMounted] = useState(false)

  const openPalette = useCallback(() => {
    setPaletteMounted(true)
    setPaletteOpen(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteMounted(true)
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <ToastProvider>
            <a
              href="#main"
              className="sr-only z-[100] rounded-lg bg-surface px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              {t('a11y.skip')}
            </a>
            <Background />
            <ScrollProgress />
            <Header
              onOpenPalette={openPalette}
              onPreloadPalette={() => void loadPalette()}
              onPreloadProjects={() => void loadProjectsPage()}
            />
            <main id="main" tabIndex={-1} className="outline-none">
              {route === ROUTES.projects ? (
                <Suspense fallback={<div className="min-h-screen" />}>
                  <ProjectsPage />
                </Suspense>
              ) : (
                <HomePage />
              )}
            </main>
            <Footer />
            {paletteMounted && (
              <Suspense fallback={null}>
                <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
              </Suspense>
            )}
          </ToastProvider>
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  )
}

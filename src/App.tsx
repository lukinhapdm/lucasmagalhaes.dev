import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Background } from '@/components/layout/Background'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { useTranslation } from 'react-i18next'
import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

const loadPalette = () => import('@/components/command/CommandPalette')
const CommandPalette = lazy(loadPalette)

export default function App() {
  const { t } = useTranslation()
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
            <Header onOpenPalette={openPalette} onPreloadPalette={() => void loadPalette()} />
            <main id="main" tabIndex={-1} className="outline-none">
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Education />
              <Contact />
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

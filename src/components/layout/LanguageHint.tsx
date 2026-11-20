import { AnimatePresence, m } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toggleLanguage } from '@/lib/i18n'

const STORAGE_KEY = 'langHintSeen'
const SHOW_AFTER = 1200
const HIDE_AFTER = 6000

function alreadySeen(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Destaque exibido uma vez por visita: brilho no botão de idioma + balão no outro
 * idioma ("Also available in English"). Clicar no balão troca o idioma.
 * Renderizado dentro do wrapper `relative` do botão de idioma no Header.
 */
export function LanguageHint() {
  const { t, i18n } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (alreadySeen()) return
    const show = window.setTimeout(() => {
      setVisible(true)
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* storage indisponível */
      }
    }, SHOW_AFTER)
    const hide = window.setTimeout(() => setVisible(false), SHOW_AFTER + HIDE_AFTER)
    return () => {
      window.clearTimeout(show)
      window.clearTimeout(hide)
    }
  }, [])

  // Esconde se o idioma for trocado por qualquer caminho (botão, paleta).
  useEffect(() => {
    const onChange = () => setVisible(false)
    i18n.on('languageChanged', onChange)
    return () => i18n.off('languageChanged', onChange)
  }, [i18n])

  return (
    <AnimatePresence>
      {visible && (
        <>
          <span
            aria-hidden
            className="lang-glow pointer-events-none absolute -inset-1 rounded-xl"
          />
          <m.button
            type="button"
            lang={t('langHint.lang')}
            onClick={toggleLanguage}
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full right-0 z-10 mt-3 w-max max-w-[15rem] rounded-xl border border-accent/50 bg-surface px-3.5 py-2.5 text-left shadow-xl shadow-black/30"
          >
            <span
              aria-hidden
              className="absolute -top-1.5 right-5 size-3 rotate-45 border-t border-l border-accent/50 bg-surface"
            />
            <span className="relative flex items-center gap-2 text-sm font-medium text-fg">
              <Languages aria-hidden className="size-4 text-accent" />
              {t('langHint.text')}
            </span>
            <span className="relative mt-0.5 block text-xs text-muted">{t('langHint.action')}</span>
          </m.button>
        </>
      )}
    </AnimatePresence>
  )
}

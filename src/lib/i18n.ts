import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pt from '@/locales/pt.json'
import en from '@/locales/en.json'

export const LANGUAGES = ['pt', 'en'] as const
export type Language = (typeof LANGUAGES)[number]

const STORAGE_KEY = 'lang'

function readStoredLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'en' ? 'en' : 'pt'
  } catch {
    return 'pt'
  }
}

function syncDocument(lng: string) {
  const html = document.documentElement
  html.lang = lng === 'en' ? 'en' : 'pt-BR'
  document.title = i18n.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.t('meta.description'))
}

void i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en } },
  lng: readStoredLanguage(),
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
  returnNull: false,
})

syncDocument(i18n.language)
i18n.on('languageChanged', (lng) => {
  syncDocument(lng)
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    /* storage indisponível */
  }
})

export function toggleLanguage() {
  void i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt')
}

/** Traduz um item de chip/tag: minúsculo inicial = chave em `terms.*`. */
export function translateTerm(item: string): string {
  return /^[a-z]/.test(item) ? i18n.t(`terms.${item}`, { defaultValue: item }) : item
}

/** "2024-05" → "mai 2024" / "May 2024" */
export function formatYearMonth(value: string, lng: string): string {
  const [y, m] = value.split('-').map(Number)
  const date = new Date(y ?? 2000, (m ?? 1) - 1, 1)
  return new Intl.DateTimeFormat(lng === 'en' ? 'en-US' : 'pt-BR', {
    month: 'short',
    year: 'numeric',
  })
    .format(date)
    .replace('.', '')
    .replace(' de ', ' ')
}

export default i18n

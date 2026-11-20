import { ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { profile } from '@/data/profile'
import { modKeyLabel } from '@/lib/platform'
import { scrollToTop } from '@/lib/sections'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-border py-10">
      <div className="container-page flex flex-col items-center justify-between gap-4 text-sm text-muted md:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.shortName}. {t('footer.built')}
        </p>
        <div className="flex items-center gap-4">
          <p className="hidden font-mono text-xs md:block">
            {t('footer.tip')}{' '}
            <kbd className="rounded border border-border px-1.5 py-0.5">{modKeyLabel}</kbd>{' '}
            <kbd className="rounded border border-border px-1.5 py-0.5">K</kbd>
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:text-fg"
          >
            <ArrowUp aria-hidden className="size-4" />
            {t('a11y.backToTop')}
          </button>
        </div>
      </div>
    </footer>
  )
}

import type { AnchorHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'

/** Link externo com target _blank, rel seguro e aviso para leitores de tela. */
export function ExternalLink({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { t } = useTranslation()
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {t('a11y.newTab')}</span>
    </a>
  )
}

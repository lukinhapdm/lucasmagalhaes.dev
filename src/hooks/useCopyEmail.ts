import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { profile } from '@/data/profile'
import { useToast } from '@/hooks/useToast'

export function useCopyEmail() {
  const { t } = useTranslation()
  const { showToast } = useToast()

  return useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      showToast(t('toast.emailCopied'))
    } catch {
      showToast(t('toast.copyFailed'))
    }
  }, [showToast, t])
}

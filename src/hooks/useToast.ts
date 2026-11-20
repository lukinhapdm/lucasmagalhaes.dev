import { createContext, useContext } from 'react'

export interface ToastContextValue {
  showToast: (message: string) => void
}

/** Contexto separado do Provider para não quebrar o Fast Refresh do Vite. */
export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast deve ser usado dentro de <ToastProvider>')
  return ctx
}

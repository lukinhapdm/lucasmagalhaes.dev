import { AnimatePresence, m } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { ToastContext } from '@/hooks/useToast'

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<{ id: number; text: string } | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const showToast = useCallback((text: string) => {
    window.clearTimeout(timer.current)
    setMessage({ id: Date.now(), text })
    timer.current = window.setTimeout(() => setMessage(null), 2800)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4"
      >
        <AnimatePresence>
          {message && (
            <m.div
              key={message.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 rounded-xl border border-border-strong px-4 py-3 text-sm shadow-2xl shadow-black/30 glass"
            >
              <CheckCircle2 aria-hidden className="size-4 text-success" />
              {message.text}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

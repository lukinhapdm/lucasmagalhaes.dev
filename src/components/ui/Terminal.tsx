import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/Card'
import type { TerminalBlock } from '@/types/content'

type Line = { kind: 'cmd' | 'out'; text: string }

const PROMPT = (
  <span className="text-accent">
    lucas@dev<span className="text-muted">:</span>
    <span className="text-[var(--accent-to)]">~</span>
    <span className="text-muted">$</span>
  </span>
)

/** Mini terminal que "digita" comandos e revela a saída linha a linha. */
export function Terminal({ blocks }: { blocks: TerminalBlock[] }) {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const lines = useMemo<Line[]>(
    () =>
      blocks.flatMap((b) => [
        { kind: 'cmd' as const, text: b.command },
        ...b.output.map((text) => ({ kind: 'out' as const, text })),
      ]),
    [blocks],
  )
  const [shown, setShown] = useState(0)
  const [typed, setTyped] = useState(0)
  const done = reduce || shown >= lines.length

  // Máquina de estados: digita o comando letra a letra e depois revela cada linha de saída.
  useEffect(() => {
    if (done) return
    const line = lines[shown]
    if (!line) return
    let delay = 140
    let next = () => setShown((s) => s + 1)
    if (line.kind === 'cmd') {
      if (typed < line.text.length) {
        delay = shown === 0 && typed === 0 ? 700 : 55
        next = () => setTyped((c) => c + 1)
      } else {
        delay = 260
        next = () => {
          setShown((s) => s + 1)
          setTyped(0)
        }
      }
    }
    const id = window.setTimeout(next, delay)
    return () => window.clearTimeout(id)
  }, [done, lines, shown, typed])

  return (
    <Card tilt={4} className="overflow-hidden shadow-2xl shadow-black/40">
      <figure aria-label={t('a11y.terminal')} className="m-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted">lucas@dev — zsh</span>
        </div>
        <figcaption className="sr-only">
          {blocks.map((b) => b.output.join('; ')).join('; ')}
        </figcaption>
        <pre
          aria-hidden
          className="overflow-x-auto p-4 font-mono text-[12.5px] leading-6 sm:p-5 sm:text-[13px]"
        >
          {/* Linhas ainda não reveladas ficam invisíveis (não ocultas) para evitar salto de layout. */}
          {lines.map((line, i) => {
            const visible = done || i < shown || (i === shown && line.kind === 'cmd')
            const isTyping = !done && i === shown
            return (
              <div key={i} className={visible ? undefined : 'invisible'}>
                {line.kind === 'cmd' ? (
                  <>
                    {PROMPT}{' '}
                    <span className="text-fg">
                      {isTyping ? line.text.slice(0, typed) : line.text}
                    </span>
                    {isTyping && (
                      <span className="caret ml-px inline-block h-4 w-2 translate-y-0.5 bg-accent" />
                    )}
                  </>
                ) : (
                  <span className="text-muted">{line.text}</span>
                )}
              </div>
            )
          })}
          <div className={done ? undefined : 'invisible'}>
            {PROMPT} <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-accent" />
          </div>
        </pre>
      </figure>
    </Card>
  )
}

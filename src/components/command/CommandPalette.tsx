import { AnimatePresence, m } from 'framer-motion'
import {
  ArrowRight,
  Copy,
  CornerDownLeft,
  Download,
  Languages,
  Moon,
  Search,
  Sun,
} from 'lucide-react'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type KeyboardEvent,
} from 'react'
import { useTranslation } from 'react-i18next'
import { socialIcons } from '@/components/icons/socialIcons'
import { profile } from '@/data/profile'
import { useCopyEmail } from '@/hooks/useCopyEmail'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/cn'
import { toggleLanguage } from '@/lib/i18n'
import { ROUTES, navigate } from '@/lib/router'
import { SECTIONS, goToSection } from '@/lib/sections'

type Group = 'navigate' | 'actions' | 'links'

interface Command {
  id: string
  group: Group
  label: string
  icon: ComponentType<{ className?: string }>
  /** Se `true`, o foco não volta ao elemento anterior (ex.: navegação). */
  movesFocus?: boolean
  perform: () => void
}

interface Props {
  open: boolean
  onClose: () => void
}

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

function openExternal(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/** Conteúdo da paleta; montado só enquanto aberta, então o estado reinicia a cada abertura. */
function Palette({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const copyEmail = useCopyEmail()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)
  const shouldRestore = useRef(true)
  const listId = useId()

  // Ao abrir: guarda o foco anterior, foca o campo e trava a rolagem da página.
  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      if (shouldRestore.current) restoreTo.current?.focus()
    }
  }, [])

  // Lista de comandos: seções, ações e links das redes sociais.
  const commands = useMemo<Command[]>(() => {
    return [
      ...SECTIONS.map<Command>((id) => ({
        id: `go-${id}`,
        group: 'navigate',
        label: `${t('palette.goTo')} ${t(`nav.${id}`)}`,
        icon: ArrowRight,
        movesFocus: true,
        perform: () => (id === 'projects' ? navigate(ROUTES.projects) : goToSection(id)),
      })),
      {
        id: 'theme',
        group: 'actions',
        label: t('palette.toggleTheme'),
        icon: theme === 'dark' ? Sun : Moon,
        perform: toggleTheme,
      },
      {
        id: 'lang',
        group: 'actions',
        label: t('palette.toggleLang'),
        icon: Languages,
        perform: toggleLanguage,
      },
      {
        id: 'copy',
        group: 'actions',
        label: t('palette.copyEmail'),
        icon: Copy,
        perform: () => void copyEmail(),
      },
      {
        id: 'cv',
        group: 'actions',
        label: t('palette.downloadCv'),
        icon: Download,
        perform: () => {
          const a = document.createElement('a')
          a.href = profile.cvUrl[i18n.language === 'en' ? 'en' : 'pt']
          a.download = ''
          a.click()
        },
      },
      ...profile.socials.flatMap<Command>((social) => {
        const Icon = socialIcons[social.id]
        return Icon
          ? [
              {
                id: social.id,
                group: 'links',
                label: t('palette.open', { name: social.label }),
                icon: Icon,
                perform: () => openExternal(social.url),
              },
            ]
          : []
      }),
    ]
  }, [t, i18n.language, theme, toggleTheme, copyEmail])

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return q ? commands.filter((c) => normalize(c.label).includes(q)) : commands
  }, [commands, query])

  const current = Math.min(active, Math.max(filtered.length - 1, 0))

  // Fecha antes de executar para a ação (ex.: rolagem) não competir com a animação de saída.
  function run(cmd: Command | undefined) {
    if (!cmd) return
    shouldRestore.current = !cmd.movesFocus
    onClose()
    requestAnimationFrame(() => cmd.perform())
  }

  function move(delta: number) {
    if (!filtered.length) return
    const next = (current + delta + filtered.length) % filtered.length
    setActive(next)
    listRef.current?.querySelector(`[data-index="${next}"]`)?.scrollIntoView({ block: 'nearest' })
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        move(1)
        break
      case 'ArrowUp':
        e.preventDefault()
        move(-1)
        break
      case 'Enter':
        e.preventDefault()
        run(filtered[current])
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
      // Mantém o foco no campo (as opções usam aria-activedescendant).
      case 'Tab':
        e.preventDefault()
        break
    }
  }

  const groups: Group[] = ['navigate', 'actions', 'links']

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
      onKeyDown={handleKeyDown}
    >
      <m.div
        aria-hidden
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label={t('a11y.openPalette')}
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/50"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search aria-hidden className="size-4 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder={t('palette.placeholder')}
            aria-label={t('palette.placeholder')}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={
              filtered[current] ? `${listId}-${filtered[current].id}` : undefined
            }
            aria-autocomplete="list"
            className="h-14 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
            ESC
          </kbd>
        </div>

        <ul ref={listRef} id={listId} role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-8 text-center text-sm text-muted">{t('palette.empty')}</li>
          )}
          {groups.map((group) => {
            const items = filtered.filter((c) => c.group === group)
            if (!items.length) return null
            return (
              <li key={group} role="presentation">
                <p className="px-3 pt-3 pb-1.5 font-mono text-[11px] tracking-wider text-muted uppercase">
                  {t(`palette.groups.${group}`)}
                </p>
                <ul role="group" aria-label={t(`palette.groups.${group}`)}>
                  {items.map((cmd) => {
                    const index = filtered.indexOf(cmd)
                    const selected = index === current
                    const Icon = cmd.icon
                    return (
                      <li
                        key={cmd.id}
                        id={`${listId}-${cmd.id}`}
                        role="option"
                        aria-selected={selected}
                        data-index={index}
                        onPointerMove={() => !selected && setActive(index)}
                        onClick={() => run(cmd)}
                        className={cn(
                          'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150',
                          selected ? 'bg-surface-2 text-fg' : 'text-muted',
                        )}
                      >
                        <Icon aria-hidden className={cn('size-4', selected && 'text-accent')} />
                        <span className="flex-1">{cmd.label}</span>
                        {selected && <CornerDownLeft aria-hidden className="size-3.5 text-muted" />}
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 font-mono text-[11px] text-muted">
          <span>↑↓ {t('palette.hintNavigate')}</span>
          <span>↵ {t('palette.hintSelect')}</span>
          <span>esc {t('palette.hintClose')}</span>
        </div>
      </m.div>
    </div>
  )
}

/** Export default para ser carregada sob demanda com React.lazy (ver App.tsx). */
export default function CommandPalette({ open, onClose }: Props) {
  return <AnimatePresence>{open && <Palette onClose={onClose} />}</AnimatePresence>
}

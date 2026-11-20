import { useSyncExternalStore } from 'react'

/** Rotas do site. Qualquer caminho desconhecido cai na home. */
export const ROUTES = { home: '/', projects: '/projects' } as const
export type Route = (typeof ROUTES)[keyof typeof ROUTES]

const EVENT = 'app:navigate'

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(EVENT, onChange)
  }
}

function currentRoute(): Route {
  return location.pathname.replace(/\/+$/, '') === ROUTES.projects ? ROUTES.projects : ROUTES.home
}

export function useRoute(): Route {
  return useSyncExternalStore(subscribe, currentRoute, () => ROUTES.home)
}

/**
 * Navega sem recarregar a página. Guarda a posição de rolagem atual no
 * histórico para restaurá-la ao voltar (botão "voltar" do navegador).
 */
export function navigate(to: string) {
  if (to === location.pathname + location.hash) return
  history.replaceState({ ...(history.state as object), scrollY: window.scrollY }, '')
  history.pushState({}, '', to)
  window.dispatchEvent(new Event(EVENT))
}

/** Handler de clique para <a href>: respeita Ctrl/⌘/Shift/botão do meio (nova aba). */
export function linkHandler(to: string, before?: () => void) {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
      return
    e.preventDefault()
    before?.()
    navigate(to)
  }
}

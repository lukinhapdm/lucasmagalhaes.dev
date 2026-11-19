import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Dispositivo com mouse fino e hover e sem preferência por menos movimento. */
export function useFancyPointer(): boolean {
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  return fine && !reduce
}

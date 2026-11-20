import { useEffect, useState } from 'react'

/** Retorna o id da seção visível no centro da viewport. */
/** `resetKey` (ex.: rota atual) refaz a observação quando a página muda. */
export function useActiveSection(ids: readonly string[], resetKey?: string): string {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [ids, resetKey])

  return active
}

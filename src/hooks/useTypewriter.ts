import { useEffect, useState } from 'react'

interface Options {
  typeSpeed?: number
  deleteSpeed?: number
  pause?: number
  enabled?: boolean
}

/** Efeito de digitação alternando entre as palavras. Sem animação → troca a cada `pause`. */
export function useTypewriter(
  words: string[],
  { typeSpeed = 65, deleteSpeed = 35, pause = 1800, enabled = true }: Options = {},
): string {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const word = words[index % words.length] ?? ''

  useEffect(() => {
    if (!enabled) {
      const id = window.setTimeout(() => setIndex((i) => i + 1), pause * 1.5)
      return () => window.clearTimeout(id)
    }
    let delay = deleting ? deleteSpeed : typeSpeed
    if (!deleting && text === word) delay = pause
    const id = window.setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)
    return () => window.clearTimeout(id)
  }, [text, deleting, word, enabled, typeSpeed, deleteSpeed, pause])

  return enabled ? text : word
}

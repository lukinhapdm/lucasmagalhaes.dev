/** Usado para mostrar ⌘ ou Ctrl no atalho da paleta de comandos. */
export const isMac =
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)

export const modKeyLabel = isMac ? '⌘' : 'Ctrl'

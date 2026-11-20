import '@/styles/fonts.css'
import '@/styles/globals.css'
// Inicializa o i18n antes do primeiro render (idioma salvo + título da aba).
import '@/lib/i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { printConsoleEasterEgg } from '@/lib/consoleEasterEgg'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Mensagem estilizada no console do navegador para quem inspecionar o site.
printConsoleEasterEgg()

import '@/styles/fonts.css'
import '@/styles/globals.css'
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

printConsoleEasterEgg()

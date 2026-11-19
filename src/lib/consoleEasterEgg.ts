import { profile } from '@/data/profile'

export function printConsoleEasterEgg() {
  const github = profile.socials.find((s) => s.id === 'github')?.url ?? ''
  const art = [
    '██╗     ███╗   ███╗',
    '██║     ████╗ ████║',
    '██║     ██╔████╔██║',
    '██║     ██║╚██╔╝██║',
    '███████╗██║ ╚═╝ ██║',
    '╚══════╝╚═╝     ╚═╝',
  ].join('\n')
  console.log(
    `%c${art}`,
    'color:#22d3ee;font-family:monospace;font-size:12px;line-height:1.1;text-shadow:0 0 8px rgba(139,92,246,.6)',
  )
  console.log(
    '%c👋 Curioso(a) pelo código? / Curious about the code?%c\n→ ' + github,
    'color:#e4e4e7;background:linear-gradient(90deg,#22d3ee,#8b5cf6);padding:4px 8px;border-radius:4px;font-weight:600',
    'color:#a1a1aa;font-family:monospace',
  )
}

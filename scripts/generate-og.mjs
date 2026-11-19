/**
 * Gera public/og.png (1200x630), public/apple-touch-icon.png (180x180)
 * e, se não existir, um CV provisório em public/cv-lucas-magalhaes.pdf.
 * Uso: npm run og  (requer Playwright/Chromium disponível)
 */
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(
    resolve(root, 'node_modules/@fontsource-variable', pkg, 'files', file),
  ).toString('base64')}`

const fontFaces = `
  @font-face { font-family: Geist; src: url(${font('geist', 'geist-latin-wght-normal.woff2')}); font-weight: 100 900; }
  @font-face { font-family: JBM; src: url(${font('jetbrains-mono', 'jetbrains-mono-latin-wght-normal.woff2')}); font-weight: 100 800; }
`

const og = `<!doctype html><html><head><style>${fontFaces}
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #0a0a0f; color: #e4e4e7; font-family: Geist; position: relative; overflow: hidden; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 90% 80% at 70% 0%, #000 20%, transparent 80%); }
  .glow { position: absolute; width: 700px; height: 500px; right: -150px; top: -220px; border-radius: 50%; background: linear-gradient(100deg, #22d3ee, #8b5cf6); filter: blur(120px); opacity: .45; }
  .wrap { position: relative; padding: 80px 88px; height: 100%; display: flex; flex-direction: column; }
  .logo { width: 64px; height: 64px; border-radius: 16px; background: linear-gradient(135deg, #22d3ee, #8b5cf6); display: grid; place-items: center; color: #0a0a0f; font-weight: 800; font-size: 28px; }
  .mono { font-family: JBM; }
  .eyebrow { margin-top: 56px; font-size: 24px; color: #a1a1aa; }
  h1 { font-size: 92px; line-height: 1; font-weight: 700; letter-spacing: -3px; margin-top: 12px; }
  .grad { background: linear-gradient(100deg, #22d3ee, #8b5cf6); -webkit-background-clip: text; color: transparent; }
  .role { margin-top: 28px; font-size: 26px; }
  .role b { color: #22d3ee; font-weight: 500; }
  .foot { margin-top: auto; display: flex; justify-content: space-between; font-size: 22px; color: #a1a1aa; }
  .chips span { border: 1px solid rgba(255,255,255,.12); border-radius: 8px; padding: 6px 12px; margin-left: 8px; background: rgba(18,18,26,.7); }
</style></head><body>
  <div class="grid"></div><div class="glow"></div>
  <div class="wrap">
    <div class="logo">LM</div>
    <p class="eyebrow mono">// Desenvolvedor Full Stack</p>
    <h1>Lucas <span class="grad">Magalhães</span></h1>
    <p class="role mono"><b>&gt;</b> Python • Go • React • Node.js · IA aplicada (RAG + LLM)</p>
    <div class="foot mono"><span>lucasmagalhaes-dev.vercel.app</span><span class="chips"><span>PostgreSQL</span><span>MongoDB</span><span>Docker</span></span></div>
  </div>
</body></html>`

const icon = `<!doctype html><html><head><style>${fontFaces}
  * { margin: 0 } body { width: 180px; height: 180px; display: grid; place-items: center; background: linear-gradient(135deg, #22d3ee, #8b5cf6); font-family: Geist; font-weight: 800; font-size: 80px; letter-spacing: -3px; color: #0a0a0f; }
</style></head><body>LM</body></html>`

const cv = `<!doctype html><html><head><style>${fontFaces}
  body { font-family: Geist; color: #18181b; padding: 64px; } h1 { font-size: 32px; margin: 0 } .mono { font-family: JBM; color: #0e7490; }
  p { font-size: 15px; line-height: 1.6; color: #3f3f46; }
</style></head><body>
  <h1>Lucas Pinto de Magalhães</h1>
  <p class="mono">Desenvolvedor Full Stack · Python • Go • React • Node.js</p>
  <p>A versão em PDF do currículo será publicada em breve.<br/>Enquanto isso, veja o currículo completo em <b>https://lucasmagalhaes-dev.vercel.app</b>.</p>
  <p>lucaspintodemagalhaes@hotmail.com · github.com/lukinhapdm</p>
</body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })

await page.setContent(og, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: resolve(root, 'public/og.png') })

await page.setViewportSize({ width: 180, height: 180 })
await page.setContent(icon, { waitUntil: 'load' })
await page.evaluate(() => document.fonts.ready)
await page.screenshot({ path: resolve(root, 'public/apple-touch-icon.png') })

const cvPath = resolve(root, 'public/cv-lucas-magalhaes.pdf')
if (!existsSync(cvPath)) {
  await page.setContent(cv, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: cvPath, format: 'A4' })
}

await browser.close()
console.log('✓ og.png, apple-touch-icon.png e CV provisório gerados em /public')

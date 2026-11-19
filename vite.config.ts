import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, type Plugin } from 'vite'

/** Injeta <link rel=preload> para as fontes (evita FOUT e melhora LCP). */
function preloadFonts(): Plugin {
  return {
    name: 'preload-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (_html, ctx) =>
        Object.keys(ctx.bundle ?? {})
          .filter((file) => file.endsWith('.woff2'))
          .map((file) => ({
            tag: 'link',
            attrs: {
              rel: 'preload',
              as: 'font',
              type: 'font/woff2',
              href: `/${file}`,
              crossorigin: '',
            },
            injectTo: 'head' as const,
          })),
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadFonts()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler'))
            return 'react'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-'))
            return 'motion'
          if (id.includes('i18next')) return 'i18n'
        },
      },
    },
  },
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})

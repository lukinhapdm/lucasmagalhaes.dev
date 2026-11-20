import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, MapPin } from 'lucide-react'
import { useRef, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { socialIcons } from '@/components/icons/socialIcons'
import { ButtonLink } from '@/components/ui/Button'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { RevealGroup } from '@/components/ui/Reveal'
import { fadeUp } from '@/lib/motion'
import { Terminal } from '@/components/ui/Terminal'
import { profile } from '@/data/profile'
import { useFancyPointer } from '@/hooks/useMediaQuery'
import { useTypewriter } from '@/hooks/useTypewriter'
import { ROUTES, linkHandler } from '@/lib/router'
import { scrollToSection } from '@/lib/sections'

export function Hero() {
  const { t, i18n } = useTranslation()
  const reduce = useReducedMotion()
  const fancy = useFancyPointer()
  const roles = t('hero.roles', { returnObjects: true }) as string[]
  const role = useTypewriter(roles, { enabled: !reduce })

  const sectionRef = useRef<HTMLElement>(null)
  const gx = useMotionValue(0)
  const gy = useMotionValue(0)
  const x = useSpring(gx, { stiffness: 40, damping: 20 })
  const y = useSpring(gy, { stiffness: 40, damping: 20 })

  function handleMove(e: PointerEvent<HTMLElement>) {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    gx.set(e.clientX - rect.left - 300)
    gy.set(e.clientY - rect.top - 300)
  }

  const [first, ...rest] = profile.shortName.split(' ')

  return (
    <section
      id="hero"
      ref={sectionRef}
      tabIndex={-1}
      onPointerMove={fancy ? handleMove : undefined}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 outline-none"
    >
      {fancy && (
        <m.div
          aria-hidden
          style={{ x, y, opacity: 'var(--glow-opacity)' }}
          className="pointer-events-none absolute top-0 left-0 size-[600px] rounded-full blur-[100px]"
        >
          <div className="size-full rounded-full bg-[radial-gradient(circle,var(--accent-from),var(--accent-to)_45%,transparent_70%)]" />
        </m.div>
      )}

      <div className="relative container-page grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <RevealGroup gap={0.08}>
          <m.p
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted"
          >
            <MapPin aria-hidden className="size-3.5 text-accent" />
            {profile.location}
          </m.p>

          <m.h1 variants={fadeUp} className="tracking-tight">
            <span className="mb-2 block font-mono text-base font-normal text-muted md:text-lg">
              {t('hero.greeting')}
            </span>
            <span className="block text-5xl leading-[1.02] font-bold sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              {first} <span className="text-gradient">{rest.join(' ')}</span>
            </span>
          </m.h1>

          <m.p variants={fadeUp} className="mt-5 h-8 font-mono text-lg md:text-xl">
            <span className="sr-only">{roles.join(' · ')}</span>
            <span aria-hidden>
              <span className="text-accent">&gt;</span> <span className="text-fg">{role}</span>
              <span className="caret ml-0.5 inline-block h-5 w-2.5 translate-y-1 bg-[var(--accent-to)]" />
            </span>
          </m.p>

          <m.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
          >
            {t('hero.tagline')}
          </m.p>

          <m.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={ROUTES.projects} magnetic onClick={linkHandler(ROUTES.projects)}>
              {t('hero.ctaProjects')}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink
              href={profile.cvUrl[i18n.language === 'en' ? 'en' : 'pt']}
              download
              variant="secondary"
              magnetic
            >
              <Download aria-hidden className="size-4" />
              {t('hero.ctaCv')}
            </ButtonLink>
            <div className="ml-1 flex items-center gap-1">
              {profile.socials.map((s) => {
                const Icon = socialIcons[s.id]
                if (!Icon) return null
                return (
                  <ExternalLink
                    key={s.id}
                    href={s.url}
                    aria-label={s.label}
                    className="grid size-11 place-items-center rounded-xl text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-fg"
                  >
                    <Icon className="size-5" />
                  </ExternalLink>
                )
              })}
            </div>
          </m.div>
        </RevealGroup>

        <m.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Terminal blocks={profile.terminal} />
        </m.div>
      </div>

      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToSection('about')
        }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] text-muted transition-colors hover:text-fg md:flex"
      >
        {t('hero.scroll')}
        <ArrowDown aria-hidden className="size-4 animate-bounce" />
      </a>
    </section>
  )
}

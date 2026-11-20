import { m } from 'framer-motion'
import { ArrowUpRight, Copy, Mail, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { socialIcons } from '@/components/icons/socialIcons'
import { ButtonLink, buttonBase } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { RevealGroup } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { fadeUp } from '@/lib/motion'
import { profile } from '@/data/profile'
import { useCopyEmail } from '@/hooks/useCopyEmail'
import { cn } from '@/lib/cn'

export function Contact() {
  const { t } = useTranslation()
  const copyEmail = useCopyEmail()

  return (
    <Section id="contact" heading="contact">
      <RevealGroup gap={0.08} className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <m.div variants={fadeUp}>
          <Card tilt={2} className="relative h-full overflow-hidden p-6 md:p-10">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 size-64 rounded-full bg-gradient-accent opacity-20 blur-3xl"
            />
            <p className="max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {t('contact.description')}
            </p>
            <p className="mt-8 font-mono text-sm break-all text-fg md:text-lg">
              <span className="text-accent">$</span> echo {profile.email}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void copyEmail()}
                className={cn(buttonBase, 'bg-gradient-solid font-semibold hover:brightness-110')}
              >
                <Copy aria-hidden className="size-4" />
                {t('contact.copy')}
              </button>
              <ButtonLink href={`mailto:${profile.email}`} variant="secondary" magnetic>
                <Mail aria-hidden className="size-4" />
                {t('contact.send')}
              </ButtonLink>
            </div>
          </Card>
        </m.div>

        <div className="grid gap-4">
          {profile.socials.map((s) => {
            const Icon = socialIcons[s.id]
            if (!Icon) return null
            return (
              <m.div key={s.id} variants={fadeUp}>
                <Card tilt={5} className="group/social p-5">
                  <div className="flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-fg">
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">
                        <ExternalLink
                          href={s.url}
                          className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                        >
                          {s.label}
                        </ExternalLink>
                      </p>
                      <p className="truncate font-mono text-xs text-muted">{s.handle}</p>
                    </div>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-muted transition-all duration-200 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 group-hover/social:text-accent"
                    />
                  </div>
                </Card>
              </m.div>
            )
          })}
          <m.div variants={fadeUp}>
            <Card tilt={0} className="flex items-center gap-4 p-5">
              <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                <MapPin aria-hidden className="size-5" />
              </span>
              <div>
                <p className="font-medium">{t('contact.location')}</p>
                <p className="font-mono text-xs text-muted">{profile.location}</p>
              </div>
            </Card>
          </m.div>
        </div>
      </RevealGroup>
    </Section>
  )
}

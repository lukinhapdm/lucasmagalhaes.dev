import { m } from 'framer-motion'
import { Award, BadgeCheck, GraduationCap, Languages } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/Card'
import { RevealGroup } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { fadeUp } from '@/lib/motion'
import { awards, certifications, languages } from '@/data/certifications'
import { education } from '@/data/education'

function Block({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <m.div variants={fadeUp} className="h-full">
      <Card tilt={2} className="h-full p-6 md:p-7">
        <h3 className="mb-5 flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
            {icon}
          </span>
          {title}
        </h3>
        {children}
      </Card>
    </m.div>
  )
}

export function Education() {
  const { t } = useTranslation()

  return (
    <Section id="education" heading="education">
      <RevealGroup gap={0.08} className="grid gap-4 md:grid-cols-2">
        <Block
          icon={<GraduationCap aria-hidden className="size-4.5" />}
          title={t('education.degreesTitle')}
        >
          <ul className="space-y-5">
            {education.map((e) => (
              <li key={e.id} className="border-l border-border pl-4">
                <p className="font-mono text-xs text-accent">
                  {e.start} — {e.end}
                </p>
                <p className="mt-1 font-medium">{t(`education.degrees.${e.id}`)}</p>
                <p className="text-sm text-muted">{e.institution}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          icon={<BadgeCheck aria-hidden className="size-4.5" />}
          title={t('education.certsTitle')}
        >
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.id} className="flex items-start justify-between gap-4 text-sm">
                <span>
                  <span className="block text-fg">{t(`education.certs.${c.id}`)}</span>
                  <span className="text-muted">{c.issuer}</span>
                </span>
                {c.year && <span className="shrink-0 font-mono text-xs text-muted">{c.year}</span>}
              </li>
            ))}
          </ul>
        </Block>

        <Block
          icon={<Languages aria-hidden className="size-4.5" />}
          title={t('education.languagesTitle')}
        >
          <ul className="space-y-3">
            {languages.map((l) => (
              <li key={l.id} className="text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-fg">{t(`education.languages.${l.id}`)}</span>
                  <span className="rounded-md border border-border bg-surface-2/60 px-2 py-0.5 font-mono text-xs text-muted">
                    {t(`education.levels.${l.level}`)}
                  </span>
                </div>
                {l.certificate && (
                  <p className="mt-1.5 flex items-start gap-1.5 text-muted">
                    <BadgeCheck aria-hidden className="mt-0.5 size-3.5 shrink-0 text-accent" />
                    {t(`education.certs.${l.certificate}`)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Block>

        <Block icon={<Award aria-hidden className="size-4.5" />} title={t('education.awardsTitle')}>
          <ul className="space-y-4">
            {awards.map((a) => (
              <li key={a.id} className="text-sm">
                <p className="flex items-baseline justify-between gap-4">
                  <span className="font-medium text-fg">{t(`education.awards.${a.id}.title`)}</span>
                  {a.year && (
                    <span className="shrink-0 font-mono text-xs text-muted">{a.year}</span>
                  )}
                </p>
                <p className="mt-0.5 text-muted">{t(`education.awards.${a.id}.description`)}</p>
              </li>
            ))}
          </ul>
        </Block>
      </RevealGroup>
    </Section>
  )
}

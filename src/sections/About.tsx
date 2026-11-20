import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/Card'
import { Counter } from '@/components/ui/Counter'
import { RevealGroup } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { fadeUp } from '@/lib/motion'
import { profile } from '@/data/profile'

/** Sobre: parágrafos traduzidos + cards com números animados. */
export function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]

  return (
    <Section id="about" heading="about">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <RevealGroup
          gap={0.1}
          className="space-y-5 text-base leading-relaxed text-muted md:text-lg"
        >
          {paragraphs.map((p, i) => (
            <m.p key={i} variants={fadeUp} className={i === 0 ? 'text-fg' : undefined}>
              {p}
            </m.p>
          ))}
        </RevealGroup>

        <RevealGroup gap={0.08} className="grid grid-cols-2 gap-3 self-start sm:gap-4">
          {profile.stats.map((stat) => (
            <m.div key={stat.id} variants={fadeUp}>
              <Card tilt={6} className="h-full p-5 md:p-6">
                <p className="text-gradient font-mono text-4xl font-semibold md:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm leading-snug text-muted">
                  {t(`about.stats.${stat.id}`)}
                </p>
              </Card>
            </m.div>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

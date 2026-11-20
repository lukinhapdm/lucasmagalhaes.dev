import { m, useScroll, useSpring } from 'framer-motion'
import { Building2, GraduationCap, MapPin } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { StatusDot } from '@/components/ui/StatusDot'
import { experience } from '@/data/experience'
import { cn } from '@/lib/cn'
import { formatYearMonth, translateTerm } from '@/lib/i18n'
import type { Experience as Job } from '@/types/content'

const professional = experience.filter((job) => !job.during)
const academic = experience.filter((job) => job.during)

function usePeriod() {
  const { t, i18n } = useTranslation()
  return (job: Job) =>
    `${formatYearMonth(job.start, i18n.language)} — ${
      job.end ? formatYearMonth(job.end, i18n.language) : t('experience.present')
    }`
}

/** Item da timeline: ponto na linha + conteúdo. */
function TimelineItem({ highlight, children }: { highlight?: boolean; children: ReactNode }) {
  return (
    <li className="relative pl-8 md:pl-12">
      <span
        aria-hidden
        className={cn(
          'absolute top-7 left-0 grid size-[15px] place-items-center rounded-full border bg-bg md:size-[23px]',
          highlight ? 'border-accent' : 'border-border-strong',
        )}
      >
        <span
          className={cn(
            'size-1.5 rounded-full md:size-2',
            highlight ? 'bg-gradient-accent' : 'bg-muted/60',
          )}
        />
      </span>
      <Reveal>{children}</Reveal>
    </li>
  )
}

function JobCard({ job }: { job: Job }) {
  const { t } = useTranslation()
  const period = usePeriod()
  const key = `experience.items.${job.id}`
  const current = job.end === null
  const highlights = t(`${key}.highlights`, { returnObjects: true, defaultValue: [] }) as string[]

  return (
    <Card tilt={0} className="p-5 md:p-7">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="mb-1.5 font-mono text-xs text-accent">{period(job)}</p>
          <h3 className="text-lg font-semibold tracking-tight md:text-xl">{t(`${key}.role`)}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Building2 aria-hidden className="size-3.5" />
              {job.company}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden className="size-3.5" />
              {job.location}
            </span>
          </p>
        </div>
        {current && (
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-success/30 bg-success/10 px-2.5 py-1 font-mono text-xs text-success">
            <StatusDot pulse />
            {t('experience.current')}
          </span>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-fg/90 md:text-base">{t(`${key}.summary`)}</p>
      {highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm text-muted">
          {highlights.map((h) => (
            <li key={h} className="flex gap-2.5">
              <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
              {h}
            </li>
          ))}
        </ul>
      )}
      {job.tags && (
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
          {job.tags.map((tag) => (
            <li key={tag}>
              <Chip>{translateTerm(tag)}</Chip>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

/** Experiências da época de estudos (empresas juniores, estágio), em formato compacto. */
function AcademicCard() {
  const { t } = useTranslation()
  const period = usePeriod()

  return (
    <Card tilt={0} className="p-5 md:p-7">
      <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight md:text-xl">
        <GraduationCap aria-hidden className="size-5 text-accent" />
        {t('experience.academic.title')}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {t('experience.academic.description')}
      </p>

      <ul className="mt-6 divide-y divide-border border-t border-border">
        {academic.map((job) => {
          const key = `experience.items.${job.id}`
          return (
            <li key={job.id} className="py-4 last:pb-0">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p className="font-medium text-fg">{t(`${key}.role`)}</p>
                <p className="shrink-0 font-mono text-xs text-accent">{period(job)}</p>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                <span>{job.company}</span>
                <span aria-hidden>·</span>
                <span className="rounded-md border border-border bg-surface-2/60 px-1.5 py-px font-mono text-[11px]">
                  {t(`${key}.kind`)} · {job.during}
                </span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-fg/85">{t(`${key}.summary`)}</p>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <Section id="experience" heading="experience">
      <ol ref={listRef} className="relative space-y-6 md:space-y-8">
        {/* trilho + linha que acende com o scroll */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px bg-border md:left-[11px]"
        />
        <m.span
          aria-hidden
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-gradient-to-b from-[var(--accent-from)] to-[var(--accent-to)] shadow-[0_0_12px_var(--accent-from)] md:left-[11px]"
        />

        {professional.map((job) => (
          <TimelineItem key={job.id} highlight={job.end === null}>
            <JobCard job={job} />
          </TimelineItem>
        ))}
        {academic.length > 0 && (
          <TimelineItem>
            <AcademicCard />
          </TimelineItem>
        )}
      </ol>
    </Section>
  )
}

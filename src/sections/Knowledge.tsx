import {
  BrainCircuit,
  Code2,
  GraduationCap,
  MonitorSmartphone,
  ServerCog,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/Card'
import { Carousel } from '@/components/ui/Carousel'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { knowledgeAreas, selfStudies } from '@/data/knowledge'
import type { KnowledgeAreaId, SelfStudy } from '@/types/content'

const areaIcons: Record<KnowledgeAreaId, LucideIcon> = {
  fundamentals: Code2,
  backend: ServerCog,
  interfaces: MonitorSmartphone,
  engineering: Workflow,
  data: BrainCircuit,
}

/** Bloco compacto, em destaque, para um estudo feito por conta própria. */
function SelfStudyNote({ study }: { study: SelfStudy }) {
  const { t } = useTranslation()
  const key = `knowledge.selfStudy.${study.id}`
  return (
    <div className="relative mt-5 overflow-hidden rounded-xl border border-accent/40 bg-surface-2/50 p-4">
      <div
        aria-hidden
        className="absolute -top-10 -right-10 size-28 rounded-full bg-gradient-accent opacity-15 blur-2xl"
      />
      <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent">
        <Sparkles aria-hidden className="size-3.5" />
        {t('knowledge.selfStudy.badge')}
      </p>
      <h4 className="mt-1.5 text-sm font-semibold tracking-tight">{t(`${key}.title`)}</h4>
      <p className="mt-1 text-xs leading-relaxed text-muted">{t(`${key}.summary`)}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {study.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-md border border-border bg-surface/80 px-2 py-0.5 font-mono text-[10.5px] text-fg/90"
          >
            {t(`${key}.topics.${topic}`)}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Conhecimentos da graduação (por área), com estudos independentes em destaque. */
export function Knowledge() {
  const { t } = useTranslation()

  return (
    <Section id="knowledge" heading="knowledge">
      <p className="-mt-6 mb-10 max-w-2xl text-base leading-relaxed text-muted md:-mt-10 md:mb-12 md:text-lg">
        {t('knowledge.subtitle')}
      </p>

      <Reveal>
        <Carousel
          label={t('knowledge.carousel.label')}
          labels={{
            prev: t('knowledge.carousel.prev'),
            next: t('knowledge.carousel.next'),
            page: (n, total) => t('knowledge.carousel.page', { n, total }),
          }}
        >
          {knowledgeAreas.map((area) => {
            const Icon = areaIcons[area.id]
            const studies = selfStudies.filter((s) => s.area === area.id)
            return (
              <div key={area.id} className="h-full">
                <Card tilt={3} className="flex h-full flex-col p-6">
                  <span className="mb-5 grid size-10 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 className="font-semibold tracking-tight">
                    {t(`knowledge.areas.${area.id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {t(`knowledge.areas.${area.id}.summary`)}
                  </p>
                  <ul
                    aria-label={t('knowledge.coursesLabel')}
                    className="mt-5 space-y-1.5 border-t border-border pt-4 text-sm"
                  >
                    {area.courses.map((course) => (
                      <li key={course} className="flex gap-2.5 text-fg/90">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                        {t(`knowledge.courses.${course}`)}
                      </li>
                    ))}
                  </ul>
                  {studies.map((study) => (
                    <SelfStudyNote key={study.id} study={study} />
                  ))}
                </Card>
              </div>
            )
          })}
        </Carousel>
      </Reveal>

      <p className="mt-8 flex items-center gap-2 font-mono text-xs text-muted">
        <GraduationCap aria-hidden className="size-4 text-accent" />
        {t('knowledge.hours')}
      </p>
    </Section>
  )
}

import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ProjectCard, Status } from '@/components/projects/ProjectCards'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { RevealGroup } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { labProjects, projects } from '@/data/projects'
import { fadeUp } from '@/lib/motion'
import { ROUTES, linkHandler } from '@/lib/router'

const featured = projects.find((p) => p.featured) ?? projects[0]
const others = projects.filter((p) => p !== featured)

/** Prévia na home: projeto principal + chamada para a página de projetos. */
export function Projects() {
  const { t } = useTranslation()

  return (
    <Section id="projects" heading="projects">
      <RevealGroup gap={0.08} className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {featured && <ProjectCard project={featured} />}

        <m.div variants={fadeUp} className="h-full">
          <Card tilt={2} className="relative flex h-full flex-col overflow-hidden p-6 md:p-7">
            <div
              aria-hidden
              className="absolute -right-20 -bottom-20 size-56 rounded-full bg-gradient-accent opacity-15 blur-3xl"
            />
            <p className="leading-relaxed text-muted">{t('projects.teaser.text')}</p>

            <ul className="mt-6 divide-y divide-border border-y border-border">
              {others.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-3">
                  <span className="text-sm text-fg">{t(`projects.items.${p.id}.title`)}</span>
                  <Status status={p.status} />
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <p className="mb-3 font-mono text-xs text-muted">
                {t('projects.teaser.count', { count: projects.length + labProjects.length })}
              </p>
              <ButtonLink
                href={ROUTES.projects}
                onClick={linkHandler(ROUTES.projects)}
                magnetic
                className="w-full sm:w-auto"
              >
                {t('projects.teaser.cta')}
                <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
            </div>
          </Card>
        </m.div>
      </RevealGroup>
    </Section>
  )
}

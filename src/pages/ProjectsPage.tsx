import { ArrowLeft, FolderGit2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LabGrid, ProjectsBento } from '@/components/projects/ProjectCards'
import { Reveal } from '@/components/ui/Reveal'
import { ROUTES, linkHandler } from '@/lib/router'

/** Página dedicada: /projects */
export default function ProjectsPage() {
  const { t } = useTranslation()

  return (
    <div className="pt-28 pb-24 md:pt-36 md:pb-32">
      <div className="container-page">
        <Reveal className="mb-12 md:mb-16">
          <a
            href={ROUTES.home}
            onClick={linkHandler(ROUTES.home)}
            className="group mb-8 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            {t('projects.page.back')}
          </a>
          <p className="mb-3 font-mono text-xs tracking-wider text-accent uppercase">
            <span className="text-muted">~/</span>
            {t('projects.eyebrow')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {t('projects.page.title')}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {t('projects.page.subtitle')}
          </p>
        </Reveal>

        <section aria-labelledby="featured-title">
          <h2 id="featured-title" className="sr-only">
            {t('projects.page.featured')}
          </h2>
          <ProjectsBento />
        </section>

        <section aria-labelledby="lab-title" className="mt-20">
          <Reveal className="mb-8">
            <h2
              id="lab-title"
              className="flex items-center gap-2 text-xl font-semibold tracking-tight md:text-2xl"
            >
              <FolderGit2 aria-hidden className="size-5 text-accent" />
              {t('projects.lab.title')}
            </h2>
            <p className="mt-1 text-sm text-muted">{t('projects.lab.subtitle')}</p>
          </Reveal>
          <LabGrid />
        </section>
      </div>
    </div>
  )
}

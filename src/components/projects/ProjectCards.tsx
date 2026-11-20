import { m } from 'framer-motion'
import { ArrowUpRight, Bot, Briefcase, Newspaper, Server, ShoppingCart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { GithubIcon } from '@/components/icons/BrandIcons'
import { BrowserFrame, Screenshot } from '@/components/projects/BrowserFrame'
import { ScreenshotGallery } from '@/components/projects/ScreenshotGallery'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { RevealGroup } from '@/components/ui/Reveal'
import { fadeUp } from '@/lib/motion'
import { StatusDot } from '@/components/ui/StatusDot'
import { labProjects, projects } from '@/data/projects'
import { cn } from '@/lib/cn'
import type { Project, ProjectStatus } from '@/types/content'

const icons = {
  bot: Bot,
  server: Server,
  shopping: ShoppingCart,
  briefcase: Briefcase,
  newspaper: Newspaper,
} as const

const statusTone: Record<
  ProjectStatus,
  { tone: 'success' | 'warning' | 'accent'; pulse: boolean }
> = {
  done: { tone: 'success', pulse: false },
  wip: { tone: 'warning', pulse: true },
  ongoing: { tone: 'accent', pulse: true },
}

const langColors: Record<string, string> = {
  Go: '#00ADD8',
  HTML: '#E34C26',
  JavaScript: '#F1E05A',
  CSS: '#8B5CF6',
  Python: '#3572A5',
}

/** Layout do bento: índice → classes de grid. */
const bento = [
  'md:col-span-4 md:row-span-2',
  'md:col-span-2',
  'md:col-span-2',
  'md:col-span-3',
  'md:col-span-3',
]

export function Status({ status }: { status: ProjectStatus }) {
  const { t } = useTranslation()
  const { tone, pulse } = statusTone[status]
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-[11px] text-muted">
      <StatusDot tone={tone} pulse={pulse} />
      {t(`projects.status.${status}`)}
    </span>
  )
}

function ChatMock() {
  const { t } = useTranslation()
  return (
    <div
      aria-hidden
      className="mt-6 space-y-3 rounded-xl border border-border bg-bg/60 p-4 text-sm"
    >
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-surface-2 px-4 py-2.5 text-fg">
        {t('projects.chat.question')}
      </div>
      <div className="flex gap-2.5">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-solid">
          <Bot className="size-4" />
        </span>
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-2.5 text-muted">
          {t('projects.chat.answer')}
          <span className="mt-2 block font-mono text-[11px] text-accent">
            ↳ {t('projects.chat.source')}
          </span>
        </div>
      </div>
    </div>
  )
}

export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  const { t } = useTranslation()
  const Icon = icons[project.icon]
  const key = `projects.items.${project.id}`
  const badge = t(`${key}.badge`, { defaultValue: '' })

  return (
    <m.article variants={fadeUp} className={cn('h-full', className)}>
      <Card tilt={project.featured ? 2 : 4} className="flex h-full flex-col p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-11 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
            <Icon aria-hidden className="size-5" />
          </span>
          <Status status={project.status} />
        </div>

        {badge && (
          <p className="mt-5 font-mono text-[11px] tracking-wide text-accent uppercase">{badge}</p>
        )}
        <h3
          className={cn(
            'font-semibold tracking-tight',
            badge ? 'mt-1.5' : 'mt-5',
            project.featured ? 'text-2xl md:text-3xl' : 'text-lg',
          )}
        >
          {t(`${key}.title`)}
        </h3>
        <p
          className={cn(
            'mt-2 leading-relaxed text-muted',
            project.featured ? 'text-base' : 'text-sm',
          )}
        >
          {t(`${key}.description`)}
        </p>

        {project.featured && <ChatMock />}

        {project.gallery && <ScreenshotGallery projectId={project.id} images={project.gallery} />}

        {project.showcase?.map((site) => (
          <div key={site.id} className="mt-6">
            <ExternalLink href={site.url} className="group/site block">
              <BrowserFrame
                address={new URL(site.url).host}
                className="transition-[border-color] duration-200 group-hover/site:border-accent/50"
              >
                <Screenshot
                  src={site.image}
                  alt={t(`${key}.showcase.${site.id}.title`)}
                  className="transition-transform duration-500 ease-out-expo group-hover/site:scale-[1.03]"
                />
              </BrowserFrame>
              <span className="mt-3 flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-fg">{t(`${key}.showcase.${site.id}.title`)}</span>
                <span className="inline-flex shrink-0 items-center gap-1 font-medium text-muted transition-colors group-hover/site:text-accent">
                  {t('projects.visit')}
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </span>
              <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                {t(`${key}.showcase.${site.id}.description`)}
              </span>
            </ExternalLink>
          </div>
        ))}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Chip>{tag}</Chip>
              </li>
            ))}
          </ul>
          {project.repo ? (
            <ExternalLink
              href={project.repo}
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
            >
              <GithubIcon className="size-4" />
              {t('projects.repo')}
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
              />
            </ExternalLink>
          ) : (
            project.status === 'wip' && (
              <span className="font-mono text-xs text-muted">{t('projects.repoSoon')}</span>
            )
          )}
        </div>
      </Card>
    </m.article>
  )
}

/** Grid bento com todos os projetos em destaque. */
export function ProjectsBento() {
  return (
    <RevealGroup gap={0.08} className="grid gap-4 md:grid-cols-6">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} className={bento[i] ?? 'md:col-span-2'} />
      ))}
    </RevealGroup>
  )
}

/** Cards do Laboratório (estudos e cursos). */
export function LabGrid() {
  const { t } = useTranslation()
  return (
    <RevealGroup gap={0.06} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {labProjects.map((lab) => (
        <m.div key={lab.id} variants={fadeUp}>
          <Card tilt={5} className="group/lab h-full p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-mono text-sm font-medium text-fg">
                <ExternalLink
                  href={lab.repo}
                  className="after:absolute after:inset-0 after:rounded-2xl after:content-['']"
                >
                  {lab.name}
                </ExternalLink>
              </h3>
              <ArrowUpRight
                aria-hidden
                className="size-4 text-muted transition-all duration-200 group-hover/lab:translate-x-0.5 group-hover/lab:-translate-y-0.5 group-hover/lab:text-accent"
              />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {t(`projects.lab.items.${lab.id}`)}
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] text-muted">
              <span
                aria-hidden
                className="size-2.5 rounded-full"
                style={{ backgroundColor: langColors[lab.language] ?? 'var(--muted)' }}
              />
              {lab.language}
            </p>
          </Card>
        </m.div>
      ))}
    </RevealGroup>
  )
}

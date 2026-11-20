import { m } from 'framer-motion'
import {
  BarChart3,
  BrainCircuit,
  Container,
  Database,
  MonitorSmartphone,
  Server,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/Card'
import { RevealGroup } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { fadeUp } from '@/lib/motion'
import { skills } from '@/data/skills'
import { translateTerm } from '@/lib/i18n'
import type { SkillGroupId } from '@/types/content'

const groupIcons: Record<SkillGroupId, LucideIcon> = {
  frontend: MonitorSmartphone,
  backend: Server,
  database: Database,
  ai: BrainCircuit,
  devops: Container,
  analytics: BarChart3,
  soft: Users,
}

/** Skills em grupos; o esmaecimento dos outros grupos no hover é feito em CSS (.skills-grid). */
export function Skills() {
  const { t } = useTranslation()

  return (
    <Section id="skills" heading="skills">
      <RevealGroup gap={0.06} className="skills-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = groupIcons[group.id]
          return (
            <m.div
              key={group.id}
              variants={fadeUp}
              // O último grupo ocupa a linha inteira para fechar o grid.
              className={`skill-group ${i === skills.length - 1 ? 'sm:col-span-2 lg:col-span-3' : ''}`}
            >
              <Card tilt={4} className="h-full p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg border border-border bg-surface-2 text-accent">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <h3 id={`skill-${group.id}`} className="font-semibold tracking-tight">
                    {t(`skills.groups.${group.id}`)}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-muted">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-border bg-surface-2/60 px-3 py-1.5 font-mono text-xs text-fg/90 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                    >
                      {translateTerm(item)}
                    </li>
                  ))}
                </ul>
              </Card>
            </m.div>
          )
        })}
      </RevealGroup>
    </Section>
  )
}

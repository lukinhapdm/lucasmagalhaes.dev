import type { SVGProps, ComponentType } from 'react'
import { GithubIcon, HuggingFaceIcon, LinkedinIcon } from '@/components/icons/BrandIcons'
import type { SocialId } from '@/types/content'

/** Ícone de cada rede social (usado no Hero, no Contato e na paleta de comandos). */
export const socialIcons: Partial<Record<SocialId, ComponentType<SVGProps<SVGSVGElement>>>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  huggingface: HuggingFaceIcon,
}

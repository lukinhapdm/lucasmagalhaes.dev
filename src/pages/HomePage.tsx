import { About } from '@/sections/About'
import { Contact } from '@/sections/Contact'
import { Education } from '@/sections/Education'
import { Experience } from '@/sections/Experience'
import { Hero } from '@/sections/Hero'
import { Knowledge } from '@/sections/Knowledge'
import { Projects } from '@/sections/Projects'
import { Skills } from '@/sections/Skills'

/** Página inicial (/): a ordem aqui define a ordem das seções na tela. */
export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Knowledge />
      <Education />
      <Contact />
    </>
  )
}

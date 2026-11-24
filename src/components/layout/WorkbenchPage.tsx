import { copy } from '../../data/content'
import { Hero } from '../hero/Hero'
import { PanelProvider } from '../panel/PanelProvider'
import { AboutSection } from '../about/AboutSection'
import { Desk } from '../desk/Desk'
import { ProjectIndex } from '../desk/ProjectIndex'
import { Timeline } from '../experience/Timeline'
import { SkillHighlightProvider } from '../skills/SkillHighlightProvider'
import { SkillsSection } from '../skills/SkillsSection'
import { ContactLinks } from './ContactLinks'

/** The full, playful page. Sections fill in phase by phase. */
export function WorkbenchPage() {
  return (
    <PanelProvider>
    <SkillHighlightProvider>
    <main>
      <Hero />

      <section id="workbench" aria-labelledby="workbench-heading" className="scroll-mt-20 px-4 py-24 sm:px-8">
        <div id="main" className="mx-auto max-w-6xl">
          <h2 id="workbench-heading" className="text-display-md">{copy.deskHeading}</h2>
          <p className="mt-4 max-w-xl text-body-lg">{copy.deskIntro}</p>
          <div className="mt-12">
            <Desk />
          </div>
          <div id="projects" className="mt-20 scroll-mt-24">
            <ProjectIndex />
          </div>
        </div>
      </section>

      <SkillsSection />
      <Timeline />
      <AboutSection />

      <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-20 px-4 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="contact-heading" className="text-display-md outline-none">{copy.contactHeading}</h2>
          <p className="mt-4 max-w-xl text-body-lg">{copy.contactIntro}</p>
          {/* Phase 7: the laptop terminal goes above these buttons. */}
          <ContactLinks className="mt-8" />
        </div>
      </section>
    </main>
    </SkillHighlightProvider>
    </PanelProvider>
  )
}

import { SKILL_CATEGORIES, copy, skills } from '../../data/content'

/** Phase 3 placeholder list. Phase 6 turns this into the interactive tool tray. */
export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="skills-heading" className="text-display-md outline-none">{copy.skillsHeading}</h2>
        <p className="mt-4 max-w-xl text-body-lg">{copy.skillsIntro}</p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-chestnut">{cat}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {skills.filter((s) => s.category === cat && s.featured).map((s) => (
                  <li key={s.name} className="tag">{s.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

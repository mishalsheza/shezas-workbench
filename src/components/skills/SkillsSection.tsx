import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'
import { SKILL_CATEGORIES, copy, skills, type Skill } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { EASE } from '../../lib/motion'
import { usePanel } from '../panel/panelStore'
import { usedIn, useSkillHighlight } from './skillHighlight'

const featured = skills.filter((s) => s.featured)
const rest = skills.filter((s) => !s.featured)

/** One tool. Clickable (aria-pressed) when some project uses it, otherwise a quiet label. */
function SkillChip({ skill }: { skill: Skill }) {
  const { selected, toggle } = useSkillHighlight()
  const usable = usedIn(skill.name).length > 0
  if (!usable) {
    return (
      <span className="inline-flex items-center rounded-full border border-dashed border-chestnut/30 px-3 py-1 font-mono text-xs text-espresso/70">
        {skill.name}
        <span className="sr-only"> ({copy.skills.unused})</span>
      </span>
    )
  }
  const pressed = selected === skill.name
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => toggle(skill.name)}
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs transition-colors duration-200 ease-workbench ${
        pressed
          ? 'border-chestnut bg-chestnut text-champagne'
          : 'border-chestnut/40 bg-champagne-deep text-espresso hover:border-chestnut hover:bg-blush-soft'
      }`}
    >
      {skill.name}
    </button>
  )
}

function SkillList({ list }: { list: Skill[] }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-2">
      {list.map((s) => (
        <li key={s.name}>
          <SkillChip skill={s} />
        </li>
      ))}
    </ul>
  )
}

/** "Used in": chips for every project / the internship using the selected skill. */
function UsedIn() {
  const { selected } = useSkillHighlight()
  const { open } = usePanel()
  const reduced = useReducedMotion()
  const entries = selected ? usedIn(selected) : []

  return (
    <div aria-live="polite" className="mt-8 min-h-[4.5rem]">
      <AnimatePresence mode="wait" initial={false}>
        {selected && (
          <motion.div
            key={selected}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="rounded-2xl bg-champagne-deep/70 px-4 py-3 sm:px-5"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-chestnut">
                {copy.skills.usedIn} <span className="normal-case tracking-normal text-espresso">{selected}</span>
              </p>
              <ul className="flex flex-wrap gap-2">
                {entries.map((e) => (
                  <li key={e.hash} data-accent={e.accent}>
                    <a
                      href={e.hash}
                      onClick={(ev) => {
                        if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.button !== 0) return
                        ev.preventDefault()
                        open(e.hash, ev.currentTarget)
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-tint px-3 py-1 text-sm text-espresso transition-colors duration-200 ease-workbench hover:bg-champagne"
                    >
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-strong" />
                      {e.study.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2 text-xs text-espresso/80">{copy.skills.clearHint}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** The tool tray: pick a skill to light up the desk objects and projects that use it. */
export function SkillsSection() {
  const [showAll, setShowAll] = useState(false)
  const allId = useId()
  const reduced = useReducedMotion()

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-20 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="skills-heading" className="text-display-md outline-none">{copy.skillsHeading}</h2>
        <p className="mt-4 max-w-xl text-body-lg">{copy.skillsIntro}</p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-chestnut">{cat}</h3>
              <SkillList list={featured.filter((s) => s.category === cat)} />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            aria-expanded={showAll}
            aria-controls={allId}
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full px-1 py-1 font-mono text-xs uppercase tracking-[0.16em] text-chestnut transition-colors duration-200 ease-workbench hover:text-espresso"
          >
            {showAll ? copy.skills.allToolsHide : `${copy.skills.allTools} (${rest.length})`}
            <ChevronDown
              aria-hidden="true"
              className={`h-3.5 w-3.5 transition-transform duration-200 ease-workbench ${showAll ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {showAll && (
              <motion.div
                id={allId}
                initial={reduced ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
                  {SKILL_CATEGORIES.map((cat) => {
                    const list = rest.filter((s) => s.category === cat)
                    return list.length === 0 ? null : (
                      <div key={cat}>
                        <h4 className="sr-only">{cat}</h4>
                        <SkillList list={list} />
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <UsedIn />
      </div>
    </section>
  )
}

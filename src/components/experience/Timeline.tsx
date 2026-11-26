import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useId, useRef, useState, type MouseEvent } from 'react'
import { copy, experienceNewestFirst, type ExperienceEntry } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { caseHash } from '../../lib/caseStudies'
import { EASE } from '../../lib/motion'
import { usePanel } from '../panel/panelStore'

const entries = experienceNewestFirst()

function Commit({ entry }: { entry: ExperienceEntry }) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const { open: openPanel } = usePanel()
  const detailsId = useId()
  const accent = entry.caseStudy?.accent ?? 'chestnut'
  const hash = entry.caseStudy && entry.id === 'robovision-internship' ? caseHash({ kind: 'experience', id: entry.id }) : null

  const onOpenCase = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!hash || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    openPanel(hash, e.currentTarget)
  }

  return (
    <li data-accent={accent} className="relative pl-10 sm:pl-12">
      {/* The commit dot, sitting on the line */}
      <span
        aria-hidden="true"
        className="absolute left-[0.6875rem] top-[1.05rem] h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-champagne bg-accent ring-2 ring-accent/40 sm:left-[0.9375rem]"
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full flex-col gap-1 rounded-xl px-3 py-3 text-left font-mono text-sm transition-colors duration-200 ease-workbench hover:bg-accent-tint/60 sm:flex-row sm:items-baseline sm:gap-4"
      >
        <span className="shrink-0 text-accent-strong">{entry.hash}</span>
        <span className="min-w-0 flex-1 text-espresso">
          <span className="text-accent-strong">{entry.type}:</span> {entry.message}
        </span>
        <span className="flex shrink-0 items-center gap-2 text-xs text-chestnut">
          {entry.date}
          <ChevronDown
            aria-hidden="true"
            className={`h-3.5 w-3.5 transition-transform duration-200 ease-workbench ${open ? 'rotate-180' : ''}`}
          />
          <span className="sr-only">{copy.timeline.showDetails}</span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={detailsId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-4 pt-1">
              <p className="font-mono text-xs text-chestnut">
                {entry.organisation} · {entry.role}
                {entry.endDate ? ` · ${entry.date} – ${entry.endDate}` : ''}
                {entry.location ? ` · ${entry.location}` : ''}
              </p>
              <ul className="mt-3 space-y-2">
                {entry.details.slice(0, 3).map((d) => (
                  <li key={d} className="flex gap-3 text-[0.9375rem] leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              {hash && (
                <a
                  href={hash}
                  data-desk-target={hash}
                  onClick={onOpenCase}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-strong underline decoration-accent/50 decoration-2 underline-offset-4 transition-colors duration-200 ease-workbench hover:decoration-accent"
                >
                  {copy.timeline.openCaseStudy}
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

/** Experience and education as a git log. The line draws itself as you scroll. */
export function Timeline() {
  const reduced = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 55%'] })
  const draw = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-20 px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 id="experience-heading" className="text-display-md outline-none">{copy.experienceHeading}</h2>
        <p className="mt-4 font-mono text-sm text-chestnut">$ git log --oneline</p>

        <div className="relative mt-10 max-w-3xl">
          {/* Track + the drawn line */}
          <span aria-hidden="true" className="absolute bottom-4 left-[0.6875rem] top-4 w-0.5 -translate-x-1/2 rounded-full bg-chestnut/15 sm:left-[0.9375rem]" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-4 left-[0.6875rem] top-4 w-0.5 -translate-x-1/2 origin-top rounded-full bg-chestnut sm:left-[0.9375rem]"
            style={{ scaleY: reduced ? 1 : draw }}
          />
          <ol ref={listRef} className="relative space-y-2">
            {entries.map((e) => (
              <Commit key={e.id} entry={e} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

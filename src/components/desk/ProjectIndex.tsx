import type { MouseEvent } from 'react'
import type { ProjectCategory } from '../../data/content'
import { copy, projectsByCategory } from '../../data/content'
import { caseHash } from '../../lib/caseStudies'
import { usePanel } from '../panel/panelStore'

const CATEGORIES: ProjectCategory[] = ['ai', 'fullstack']

/** The plain-text way in: opens the same case-study panels as the desk objects. */
export function ProjectIndex() {
  const { open } = usePanel()

  const onClick = (hash: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    // Let cmd/ctrl/shift-click open the shareable link in a new tab.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    open(hash, e.currentTarget)
  }

  return (
    <div>
      <h3 className="text-display-sm">{copy.projectIndexHeading}</h3>
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        {CATEGORIES.map((category) => (
          <section key={category} aria-labelledby={`index-${category}`}>
            <h4 id={`index-${category}`} className="font-mono text-xs uppercase tracking-[0.2em] text-chestnut">
              {copy.categoryLabels[category]}
            </h4>
            <ul className="mt-4 divide-y divide-chestnut/15 border-y border-chestnut/15">
              {projectsByCategory(category).map((p) => {
                const hash = caseHash({ kind: 'project', id: p.id })
                return (
                  <li key={p.id} data-accent={p.accent}>
                    <a
                      href={hash}
                      data-desk-target={hash}
                      onClick={onClick(hash)}
                      className="group flex gap-4 px-2 py-5 transition-colors duration-200 ease-workbench hover:bg-accent-tint/60"
                    >
                      <span aria-hidden="true" className="mt-2 h-3 w-3 shrink-0 rounded-full bg-accent ring-2 ring-accent/25" />
                      <span className="min-w-0">
                      <span className="font-display text-2xl tracking-tight text-accent-strong group-hover:underline group-hover:decoration-accent group-hover:decoration-2 group-hover:underline-offset-4">
                        {p.title}
                      </span>
                      <span className="mt-1 block text-sm">{p.summary}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}

import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { lazy, Suspense, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { arduinoDemo, copy } from '../../data/content'
import { neighbours, type CaseEntry } from '../../lib/caseStudies'
import { GithubIcon } from '../layout/BrandIcons'
import { PreviewImage } from './PreviewImage'

interface CaseStudyContentProps {
  entry: CaseEntry
  titleId: string
  titleRef: RefObject<HTMLHeadingElement | null>
  onNavigate: (hash: string) => void
}

// Demos load only when a panel that has one opens.
const ArduinoDemo = lazy(() => import('../demos/ArduinoDemo'))

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent-strong">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  )
}

export function CaseStudyContent({ entry, titleId, titleRef, onNavigate }: CaseStudyContentProps) {
  const { study } = entry
  const { prev, next } = neighbours(entry)

  // Plain links (they work in a new tab too); a normal click swaps the panel in place.
  const go = (hash: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    onNavigate(hash)
  }

  return (
    <article className="px-5 pb-10 pt-8 sm:px-8 sm:pt-10">
      {/* 1. Title + one-line summary */}
      <h2 id={titleId} ref={titleRef} tabIndex={-1} className="text-espresso text-[clamp(2.25rem,4.2vw,3.5rem)] leading-[1.02] tracking-[-0.025em] outline-none">
        {study.title}
      </h2>
      {entry.meta && <p className="mt-3 text-sm text-espresso">{entry.meta}</p>}
      <p className="mt-4 font-display text-xl italic leading-snug text-espresso sm:text-2xl">{study.summary}</p>
      {study.teamNote && <p className="mt-4 rounded-xl bg-accent-tint px-4 py-3 text-sm text-espresso">{study.teamNote}</p>}

      {/* 7. Links, kept near the top so they're one glance away */}
      {(study.liveUrl || study.githubUrl) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {study.liveUrl && (
            <a className="btn-primary" href={study.liveUrl} target="_blank" rel="noopener">
              <ExternalLink aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} /> {copy.panel.live}
            </a>
          )}
          {study.githubUrl && (
            <a className="btn-primary" href={study.githubUrl} target="_blank" rel="noopener">
              <GithubIcon className="h-4 w-4" /> {copy.panel.github}
            </a>
          )}
        </div>
      )}

      {/* 2. Tech stack */}
      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tech stack">
        {study.tech.map((t) => (
          <li key={t} className="tag">{t}</li>
        ))}
      </ul>

      {/* 8. Preview */}
      <div className="mt-8">
        <PreviewImage key={study.image ?? entry.hash} src={study.image} alt={study.imageAlt} deskObject={entry.deskObject} />
      </div>

      {/* 3–6. The story */}
      <Block title={copy.panel.problem}>
        <p className="text-body-lg">{study.problem}</p>
      </Block>
      <Block title={copy.panel.built}>
        <ul className="space-y-3">
          {study.built.map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Block>
      {study.demo === 'blockly' && (
        <Block title={arduinoDemo.heading}>
          <Suspense fallback={<div className="h-[34rem] rounded-2xl bg-accent-tint/40" />}>
            <ArduinoDemo />
          </Suspense>
        </Block>
      )}
      {/* Phase 5 (next): the service-bell demo slots in here too. */}
      <Block title={copy.panel.hardest}>
        <p className="border-l-4 border-accent pl-5 font-display text-lg leading-relaxed text-espresso">{study.hardestPart}</p>
      </Block>
      <Block title={copy.panel.result}>
        <p>{study.result}</p>
      </Block>

      {/* Previous / next */}
      <nav aria-label={copy.panel.browse} className="mt-16 grid grid-cols-2 gap-4 border-t border-chestnut/15 pt-6">
        <a href={prev.hash} onClick={go(prev.hash)} className="group rounded-xl p-3 transition-colors duration-200 ease-workbench hover:bg-blush-soft">
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-chestnut">
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 ease-workbench group-hover:-translate-x-0.5" />
            {copy.panel.previous}
          </span>
          <span className="mt-1 block font-display text-lg leading-tight text-espresso">{prev.study.title}</span>
        </a>
        <a href={next.hash} onClick={go(next.hash)} className="group rounded-xl p-3 text-right transition-colors duration-200 ease-workbench hover:bg-blush-soft">
          <span className="flex items-center justify-end gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-chestnut">
            {copy.panel.next}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform duration-200 ease-workbench group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1 block font-display text-lg leading-tight text-espresso">{next.study.title}</span>
        </a>
      </nav>
    </article>
  )
}

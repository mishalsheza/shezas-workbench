import { AnimatePresence, motion, useIsPresent } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { copy } from '../../data/content'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type { CaseEntry } from '../../lib/caseStudies'
import { DURATION, EASE } from '../../lib/motion'
import { CaseStudyContent } from './CaseStudyContent'

const PANEL_MAX_WIDTH = 720 // px; keep in sync with max-w below

interface CaseStudyPanelProps {
  entry: CaseEntry
  /** Where the clicked object sat, so the panel can grow out of it. */
  origin: DOMRect | null
  onClose: () => void
  onNavigate: (hash: string) => void
  /** Called once the panel starts leaving, to put focus back on the desk. */
  onClosed: () => void
}

/** The shared case-study dialog: a side panel from 768px, a bottom sheet below. */
export function CaseStudyPanel({ entry, origin, onClose, onNavigate, onClosed }: CaseStudyPanelProps) {
  const isPresent = useIsPresent()
  const reduced = useReducedMotion()
  const isSide = useMediaQuery('(min-width: 768px)')
  const dialogRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const titleId = 'case-study-title'

  useFocusTrap(dialogRef, isPresent)

  // Make the page behind inert and stop it scrolling, while the panel is present.
  useEffect(() => {
    const root = document.getElementById('root')
    if (!isPresent || !root) return
    root.inert = true
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      root.inert = false
      document.body.style.overflow = prevOverflow
      onClosed()
    }
  }, [isPresent, onClosed])

  // Esc closes.
  useEffect(() => {
    if (!isPresent) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isPresent, onClose])

  // New study (open, or previous/next): scroll to top and focus the title so it's announced.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    titleRef.current?.focus({ preventScroll: true })
  }, [entry.hash])

  // Side panel grows out of the clicked object: scale from its centre, plus a short slide.
  const panelWidth = Math.min(window.innerWidth * 0.94, PANEL_MAX_WIDTH)
  const transformOrigin = origin
    ? `${origin.left + origin.width / 2 - (window.innerWidth - panelWidth)}px ${origin.top + origin.height / 2}px`
    : '100% 50%'

  const motionProps = reduced
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.15 } }
    : isSide
      ? {
          initial: { opacity: 0, scale: 0.94, x: 40 },
          animate: { opacity: 1, scale: 1, x: 0 },
          exit: { opacity: 0, scale: 0.97, x: 40 },
          transition: { duration: DURATION.reveal, ease: EASE },
        }
      : {
          initial: { y: '100%' },
          animate: { y: 0 },
          exit: { y: '100%' },
          transition: { duration: DURATION.reveal, ease: EASE },
        }

  return (
    <div className="fixed inset-0 z-[80]">
      {/* The desk dims behind the panel; clicking it closes. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-espresso/40"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.15 : DURATION.reveal, ease: EASE }}
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        data-accent={entry.accent}
        aria-modal="true"
        aria-labelledby={titleId}
        {...motionProps}
        style={isSide ? { transformOrigin } : undefined}
        className={
          isSide
            ? 'absolute inset-y-0 right-0 flex w-[94vw] max-w-[720px] flex-col bg-champagne shadow-panel'
            : 'absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col rounded-t-[1.75rem] bg-champagne shadow-panel'
        }
      >
        <div aria-hidden="true" className={`h-1.5 shrink-0 bg-accent ${isSide ? '' : 'rounded-t-[1.75rem]'}`} />
        <div className="relative flex items-center justify-between gap-4 border-b border-accent/30 px-5 py-3 sm:px-8">
          {!isSide && <span aria-hidden="true" className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-chestnut/25" />}
          <p className="truncate font-mono text-xs uppercase tracking-[0.18em] text-accent-strong">{entry.kicker}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label={copy.panel.close}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-espresso transition-colors duration-200 ease-workbench hover:bg-blush-soft"
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={entry.hash}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <CaseStudyContent entry={entry} titleId={titleId} titleRef={titleRef} onNavigate={onNavigate} />
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

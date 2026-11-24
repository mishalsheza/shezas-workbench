import { motion, type Variants } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { OBJECT_ART } from '../objects'
import { targetHash, type DeskItem } from '../../lib/deskItems'
import { DURATION, EASE } from '../../lib/motion'
import type { Placement } from './deskLayout'
import { placeLabel } from './labelPlacement'
import { highlightState, useSkillHighlight } from '../skills/skillHighlight'

// Light comes from the lamp at the top-left, so shadows fall down and to the right.
const SHADOW_REST = 'drop-shadow(3px 4px 3px rgba(62, 36, 25, 0.22))'
const SHADOW_LIFT = 'drop-shadow(8px 14px 10px rgba(62, 36, 25, 0.26))'

const lift: Variants = {
  rest: { y: 0, rotate: 0, filter: SHADOW_REST, transition: { duration: DURATION.hover, ease: EASE } },
  lift: { y: -6, rotate: 2, filter: SHADOW_LIFT, transition: { duration: DURATION.hover, ease: EASE } },
}
const liftReduced: Variants = {
  rest: { filter: SHADOW_REST },
  lift: { filter: SHADOW_LIFT },
}
const label: Variants = {
  rest: { opacity: 0, y: 6, transition: { duration: DURATION.hover, ease: EASE } },
  lift: { opacity: 1, y: 0, transition: { duration: DURATION.hover, ease: EASE, delay: 0.04 } },
}

interface DeskObjectProps {
  item: DeskItem
  place: Placement
  reduced: boolean
  /** Smaller label without tags, for narrow scenes. */
  compact: boolean
  onOpen: (item: DeskItem, el: HTMLElement) => void
}

/** One object in the studio: a real button that lifts, tilts and shows a tinted label. */
export function DeskObject({ item, place, reduced, compact, onOpen }: DeskObjectProps) {
  const Art = OBJECT_ART[item.id]
  const state = highlightState(useSkillHighlight().lit, item.id)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [labelPos, setLabelPos] = useState<{ left: number; top: number } | null>(null)

  // Measured each time the label is about to show, so it follows any resize.
  const positionLabel = useCallback(() => {
    const btn = buttonRef.current
    const lbl = labelRef.current
    const scene = btn?.closest<HTMLElement>('[data-desk-scene]')
    if (!btn || !lbl || !scene) return
    const s = scene.getBoundingClientRect()
    const toBox = (r: DOMRect) => ({ x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height })
    const self = toBox(btn.getBoundingClientRect())
    const obstacles = [...scene.querySelectorAll<HTMLElement>('[data-desk-object]')]
      .filter((el) => el !== btn)
      .map((el) => toBox(el.getBoundingClientRect()))
    const { x, y } = placeLabel({ w: s.width, h: s.height }, self, { w: lbl.offsetWidth, h: lbl.offsetHeight }, obstacles, place.label)
    setLabelPos({ left: x - self.x, top: y - self.y })
  }, [place.label])

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      data-desk-object=""
      onHoverStart={positionLabel}
      onFocus={positionLabel}
      aria-label={item.label}
      data-accent={item.accent}
      data-desk-target={targetHash(item.target)}
      onClick={(e) => onOpen(item, e.currentTarget)}
      initial="rest"
      animate="rest"
      whileHover="lift"
      whileFocus="lift"
      className="group absolute z-10 rounded-xl hover:z-30 focus-visible:z-30"
      style={{ left: `${place.left}%`, bottom: `${place.bottom}%`, width: `${place.width}%` }}
    >
      {/* Skill highlight: a soft accent halo behind objects that use the selected skill */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-2 rounded-2xl bg-accent/15 ring-2 ring-accent transition-opacity duration-300 ease-workbench ${
          state === 'lit' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <motion.div
        variants={reduced ? liftReduced : lift}
        style={{ transformOrigin: '50% 100%' }}
        className={`relative transition-opacity duration-300 ease-workbench ${state === 'dim' ? 'opacity-30' : ''}`}
      >
        <Art className="block h-auto w-full" />
      </motion.div>

      <motion.span
        ref={labelRef}
        aria-hidden="true"
        variants={label}
        style={labelPos ?? undefined}
        className={`pointer-events-none absolute w-max max-w-[16rem] overflow-hidden rounded-xl border-t-4 border-accent bg-champagne text-left shadow-lifted ${
          compact ? 'max-w-[11rem] px-3 py-2' : 'px-4 py-3'
        } ${
          labelPos ? '' : place.label === 'above' ? 'bottom-[calc(100%+0.75rem)] left-0' : 'top-[calc(100%+0.75rem)] left-0'
        }`}
      >
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent-strong">{item.kicker}</span>
        <span className={`mt-1 block font-display leading-tight tracking-tight text-espresso ${compact ? 'text-[0.9375rem]' : 'text-xl'}`}>
          {item.title}
        </span>
        {compact ? null : item.tags.length > 0 ? (
          <span className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </span>
        ) : (
          item.hint && <span className="mt-1 block text-sm text-espresso">{item.hint}</span>
        )}
      </motion.span>
    </motion.button>
  )
}

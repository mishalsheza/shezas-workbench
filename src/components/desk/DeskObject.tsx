import { motion, type Variants } from 'framer-motion'
import { OBJECT_ART } from '../objects'
import { targetHash, type DeskItem } from '../../lib/deskItems'
import { DURATION, EASE } from '../../lib/motion'
import type { Placement } from './deskLayout'

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
  onOpen: (item: DeskItem, el: HTMLElement) => void
}

/** One object in the studio: a real button that lifts, tilts and shows a tinted label. */
export function DeskObject({ item, place, reduced, onOpen }: DeskObjectProps) {
  const Art = OBJECT_ART[item.id]
  return (
    <motion.button
      type="button"
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
      <motion.div variants={reduced ? liftReduced : lift} style={{ transformOrigin: '50% 100%' }}>
        <Art className="block h-auto w-full" />
      </motion.div>

      <motion.span
        aria-hidden="true"
        variants={label}
        className={`pointer-events-none absolute left-1/2 w-max max-w-[16rem] -translate-x-1/2 overflow-hidden rounded-xl border-t-4 border-accent bg-champagne px-4 py-3 text-left shadow-lifted ${
          place.label === 'above' ? 'bottom-[calc(100%+0.75rem)]' : 'top-[calc(100%+0.75rem)]'
        }`}
      >
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent-strong">{item.kicker}</span>
        <span className="mt-1 block font-display text-xl leading-tight tracking-tight text-espresso">{item.title}</span>
        {item.tags.length > 0 ? (
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

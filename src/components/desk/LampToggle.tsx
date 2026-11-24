import { AnimatePresence, motion } from 'framer-motion'
import { copy } from '../../data/content'
import { DeskLamp } from '../objects/DeskLamp'
import { DURATION, EASE } from '../../lib/motion'
import { LAMP_PLACEMENT } from './deskLayout'

interface LampToggleProps {
  on: boolean
  onToggle: () => void
  reduced: boolean
}

/** The desk lamp: decor, but clicking it toggles a warm glow over the scene. */
export function LampToggle({ on, onToggle, reduced }: LampToggleProps) {
  return (
    <>
      <AnimatePresence>
        {on && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-multiply"
            style={{
              background:
                'radial-gradient(ellipse 30% 40% at 17% 66%, rgba(233, 169, 58, 0.42) 0%, rgba(233, 169, 58, 0.16) 45%, rgba(233, 169, 58, 0) 100%)',
            }}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0 }}
            transition={{ duration: DURATION.slow, ease: EASE }}
          />
        )}
      </AnimatePresence>
      <button
        type="button"
        aria-pressed={on}
        aria-label={copy.lamp}
        onClick={onToggle}
        className="absolute z-10 rounded-xl"
        style={{ left: `${LAMP_PLACEMENT.left}%`, bottom: `${LAMP_PLACEMENT.bottom}%`, width: `${LAMP_PLACEMENT.width}%` }}
      >
        <DeskLamp on={on} className="block h-auto w-full drop-shadow-[3px_4px_3px_rgba(62,36,25,0.18)]" />
      </button>
    </>
  )
}

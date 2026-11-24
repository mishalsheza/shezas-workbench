import { useCallback, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { deskItems, targetHash, type DeskItem } from '../../lib/deskItems'
import { scrollToSection } from '../../lib/scrollToSection'
import { usePanel } from '../panel/panelStore'
import { DeskCard } from './DeskCard'
import { DeskObject } from './DeskObject'
import { DESK_LAYOUT } from './deskLayout'
import { LampToggle } from './LampToggle'
import { StudioBackdrop } from './StudioBackdrop'

/** The workbench: a front-view studio from 768px up, a stack of tinted cards on phones. */
export function Desk() {
  const reduced = useReducedMotion()
  const { open } = usePanel()
  const [lampOn, setLampOn] = useState(false)
  const onOpen = useCallback(
    (item: DeskItem, el: HTMLElement) => {
      if (item.target.kind === 'section') scrollToSection(item.target.id, reduced)
      else open(targetHash(item.target), el)
    },
    [open, reduced],
  )

  return (
    <>
      {/* ≥768px: the studio scene */}
      <div className="relative hidden aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-champagne shadow-[0_30px_60px_-34px_rgba(62,36,25,0.45)] ring-1 ring-espresso/10 md:block">
        <StudioBackdrop />
        <LampToggle on={lampOn} onToggle={() => setLampOn((v) => !v)} reduced={reduced} />
        <ul className="absolute inset-0" aria-label="Objects in the studio">
          {deskItems.map((item) => (
            <li key={item.id} className="contents">
              <DeskObject item={item} place={DESK_LAYOUT[item.id]} reduced={reduced} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      </div>

      {/* <768px: object cards */}
      <ul className="grid gap-4 md:hidden" aria-label="Objects in the studio">
        {deskItems.map((item) => (
          <li key={item.id}>
            <DeskCard item={item} onOpen={onOpen} />
          </li>
        ))}
      </ul>
    </>
  )
}

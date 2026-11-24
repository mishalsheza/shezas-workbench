import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { SkillName } from '../../data/content'
import { usePanel } from '../panel/panelStore'
import { SkillHighlightContext, usedIn, type SkillHighlight } from './skillHighlight'

/** Holds the selected skill so the desk, the project index and the skills section agree. */
export function SkillHighlightProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<SkillName | null>(null)
  const { activeHash } = usePanel()

  const toggle = useCallback((skill: SkillName) => setSelected((s) => (s === skill ? null : skill)), [])
  const clear = useCallback(() => setSelected(null), [])

  // Esc clears, unless a case-study panel is open (its own Esc closes it).
  useEffect(() => {
    if (!selected || activeHash) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, activeHash])

  const value = useMemo<SkillHighlight>(
    () => ({ selected, toggle, clear, lit: selected ? new Set(usedIn(selected).map((e) => e.deskObject)) : null }),
    [selected, toggle, clear],
  )
  return <SkillHighlightContext.Provider value={value}>{children}</SkillHighlightContext.Provider>
}

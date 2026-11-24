import { createContext, useContext } from 'react'
import type { DeskObjectId, SkillName } from '../../data/content'
import { caseEntries, type CaseEntry } from '../../lib/caseStudies'

export interface SkillHighlight {
  selected: SkillName | null
  toggle: (skill: SkillName) => void
  clear: () => void
  /** Desk objects that use the selected skill; null when nothing is selected. */
  lit: ReadonlySet<DeskObjectId> | null
}

export const SkillHighlightContext = createContext<SkillHighlight>({
  selected: null,
  toggle: () => {},
  clear: () => {},
  lit: null,
})

export const useSkillHighlight = () => useContext(SkillHighlightContext)

/** Every case study (projects and the internship) whose tech list includes a skill, in desk order. */
export const usedIn = (skill: SkillName): CaseEntry[] => caseEntries.filter((e) => e.study.tech.includes(skill))

/** "lit", "dim", or null when no skill is selected. */
export const highlightState = (lit: ReadonlySet<DeskObjectId> | null, id: DeskObjectId): 'lit' | 'dim' | null =>
  lit === null ? null : lit.has(id) ? 'lit' : 'dim'

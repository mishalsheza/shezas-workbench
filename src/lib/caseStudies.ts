import type { Accent, CaseStudy, DeskObjectId, DeskTarget } from '../data/content'
import { copy, deskObjects, getExperience, getProject } from '../data/content'

export type CaseRoute = Exclude<DeskTarget, { kind: 'section' }>

/** Everything the case-study panel needs, for projects and the internship alike. */
export interface CaseEntry {
  /** e.g. "#project/queueease" */
  hash: string
  study: CaseStudy
  kicker: string
  /** Extra line under the title, e.g. role and dates for the internship. */
  meta?: string
  deskObject: DeskObjectId
  accent: Accent
}

export const caseHash = (r: CaseRoute): string => `#${r.kind}/${r.id}`

const toEntry = (route: CaseRoute): CaseEntry => {
  if (route.kind === 'project') {
    const p = getProject(route.id)
    if (!p) throw new Error(`Unknown project ${route.id}`)
    return { hash: caseHash(route), study: p, kicker: copy.deskKickers[p.category], deskObject: p.deskObject, accent: p.accent }
  }
  const e = getExperience(route.id)
  if (!e?.caseStudy) throw new Error(`Experience ${route.id} has no case study`)
  return {
    hash: caseHash(route),
    study: e.caseStudy,
    kicker: `${copy.deskKickers.experience} · ${e.organisation}`,
    meta: `${e.role} · ${e.date}${e.endDate ? ` – ${e.endDate}` : ''}`,
    deskObject: e.caseStudy.deskObject,
    accent: e.caseStudy.accent,
  }
}

/** Every case study, in desk order. Previous / next follow this order. */
export const caseEntries: CaseEntry[] = deskObjects
  .map((d) => d.opens)
  .filter((t): t is CaseRoute => t.kind !== 'section')
  .map(toEntry)

/** Look up a URL hash. Unknown or malformed hashes return undefined, quietly. */
export const findCase = (hash: string): CaseEntry | undefined => {
  let h = hash
  try {
    h = decodeURIComponent(hash)
  } catch {
    return undefined
  }
  return caseEntries.find((e) => e.hash === h)
}

export const neighbours = (entry: CaseEntry): { prev: CaseEntry; next: CaseEntry } => {
  const i = caseEntries.findIndex((e) => e.hash === entry.hash)
  const n = caseEntries.length
  // caseEntries is never empty and i is always found, so these are defined.
  return { prev: caseEntries[(i - 1 + n) % n] as CaseEntry, next: caseEntries[(i + 1) % n] as CaseEntry }
}

import type { Accent, DeskObjectId, DeskObjectMeta, DeskTarget } from '../data/content'
import { copy, deskObjects, getExperience, getProject } from '../data/content'

export interface DeskItem {
  id: DeskObjectId
  label: string
  target: DeskTarget
  kicker: string
  title: string
  /** 2–3 mono tags, or a short hint for section objects. */
  tags: string[]
  hint?: string
  accent: Accent
}

const resolve = (meta: DeskObjectMeta): DeskItem => {
  const base = { id: meta.id, label: meta.label, target: meta.opens }
  const { opens } = meta
  if (opens.kind === 'project') {
    const p = getProject(opens.id)
    if (!p) throw new Error(`Desk object ${meta.id} points at missing project ${opens.id}`)
    return { ...base, kicker: copy.deskKickers[p.category], title: p.title, tags: p.tech.slice(0, 3), accent: p.accent }
  }
  if (opens.kind === 'experience') {
    const e = getExperience(opens.id)
    if (!e?.caseStudy) throw new Error(`Desk object ${meta.id} points at missing experience ${opens.id}`)
    return {
      ...base,
      kicker: `${copy.deskKickers.experience} · ${e.organisation}`,
      title: e.caseStudy.title,
      tags: e.caseStudy.tech.slice(0, 3),
      accent: e.caseStudy.accent,
    }
  }
  if (!meta.section) throw new Error(`Section desk object ${meta.id} needs "section" copy`)
  return { ...base, kicker: meta.section.kicker, title: meta.section.title, tags: [], hint: meta.section.hint, accent: 'chestnut' }
}

/** Every desk object with its hover-label copy, in keyboard (tab) order. */
export const deskItems: DeskItem[] = deskObjects.map(resolve)

/** URL hash for a case study, e.g. "#project/queueease". Sections return their anchor. */
export const targetHash = (t: DeskTarget): string => `#${t.kind === 'section' ? t.id : `${t.kind}/${t.id}`}`

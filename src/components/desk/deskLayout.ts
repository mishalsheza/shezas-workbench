import type { DeskObjectId } from '../../data/content'

export interface Placement {
  /** % of scene width from the left edge. */
  left: number
  /** % of scene height from the bottom edge to the object's base. */
  bottom: number
  /** % of scene width. Height follows each drawing's aspect ratio. */
  width: number
  /** Which side the hover label opens on. */
  label: 'above' | 'below'
}

/*
 * Front-view studio, 16:10. Scene coordinates are 1600×1000, so
 * left = x / 16, width = w / 16, bottom = (1000 − baseY) / 10.
 * Desk top sits at y ≈ 732, the shelf top at y = 330.
 */
const DESK = 26.8
const SHELF = 67

export const DESK_LAYOUT: Record<DeskObjectId, Placement> = {
  // on the wall
  pegboard: { left: 3.1, bottom: 65.4, width: 21.25, label: 'below' },
  compact: { left: 33.75, bottom: SHELF, width: 16.9, label: 'below' },
  house: { left: 51.9, bottom: SHELF - 0.2, width: 11.9, label: 'below' },
  ticket: { left: 72.2, bottom: 67, width: 8.1, label: 'below' },
  pinboard: { left: 82, bottom: 64.5, width: 16, label: 'below' },
  // on the desk
  arduino: { left: 17.8, bottom: DESK, width: 18.75, label: 'above' },
  laptop: { left: 37.8, bottom: DESK, width: 26.9, label: 'above' },
  bell: { left: 66, bottom: DESK, width: 9.4, label: 'above' },
  ledger: { left: 76, bottom: DESK - 0.5, width: 15.6, label: 'above' },
  mug: { left: 92.4, bottom: DESK, width: 4.6, label: 'above' },
}

/** The lamp (decor + toggle) on the far left of the desk. */
export const LAMP_PLACEMENT = { left: 2.2, bottom: DESK, width: 14.4 }

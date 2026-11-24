import type { DeskObjectId } from '../../data/content'

/*
 * Front-view studio. Scene coordinates are 1600 wide × SCENE_H tall; the bottom of
 * the 1600×1000 drawing is cropped so only the tops of the desk drawers show.
 * left = x / 16, width = w / 16, bottom = (SCENE_H − baseY) / SCENE_H.
 * Desk top sits at y ≈ 732, the shelf top at y = 330.
 */
export const SCENE_W = 1600
export const SCENE_H = 880

export interface Placement {
  /** % of scene width from the left edge. */
  left: number
  /** % of scene height from the bottom edge to the object's base. */
  bottom: number
  /** % of scene width. Height follows each drawing's aspect ratio. */
  width: number
  /** Preferred side for the hover label; it moves elsewhere if that would cover another object. */
  label: 'above' | 'below'
}

/** Scene-y of an object's base → `bottom` %. */
const base = (y: number) => ((SCENE_H - y) / SCENE_H) * 100
/** Scene-y → `top` % (for gradients and the like). */
export const sceneY = (y: number) => (y / SCENE_H) * 100

const DESK = base(732)
const SHELF = base(330)

export const DESK_LAYOUT: Record<DeskObjectId, Placement> = {
  // on the wall
  pegboard: { left: 3.1, bottom: base(346), width: 21.25, label: 'below' },
  compact: { left: 33.75, bottom: SHELF, width: 16.9, label: 'below' },
  house: { left: 51.9, bottom: base(332), width: 11.9, label: 'below' },
  ticket: { left: 72.2, bottom: SHELF, width: 8.1, label: 'below' },
  pinboard: { left: 82, bottom: base(355), width: 16, label: 'below' },
  // on the desk
  arduino: { left: 17.8, bottom: DESK, width: 18.75, label: 'above' },
  laptop: { left: 37.8, bottom: DESK, width: 26.9, label: 'above' },
  bell: { left: 66, bottom: DESK, width: 9.4, label: 'above' },
  ledger: { left: 76, bottom: base(737), width: 15.6, label: 'above' },
  mug: { left: 92.4, bottom: DESK, width: 4.6, label: 'above' },
}

/** The lamp (decor + toggle) on the far left of the desk. */
export const LAMP_PLACEMENT = { left: 2.2, bottom: DESK, width: 14.4 }

/**
 * Where to put an object's hover label so it never covers another object.
 * Everything is in px, relative to the scene's top-left corner.
 */
interface Box {
  x: number
  y: number
  w: number
  h: number
}

const GAP = 10 // min space between a label and its own object
const PAD = 8 // label ↔ scene edge
const CLEAR = 4 // breathing room around other objects
const STEP = 8 // grid resolution of the search
const WRONG_SIDE = 60 // px-equivalent penalty for leaving the preferred side

const inflate = (b: Box, by: number): Box => ({ x: b.x - by, y: b.y - by, w: b.w + by * 2, h: b.h + by * 2 })

const overlap = (a: Box, b: Box) => {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y)
  return w > 0 && h > 0 ? w * h : 0
}

/** Shortest distance between two boxes' edges (0 if they touch). */
const distance = (a: Box, b: Box) => {
  const dx = Math.max(b.x - (a.x + a.w), a.x - (b.x + b.w), 0)
  const dy = Math.max(b.y - (a.y + a.h), a.y - (b.y + b.h), 0)
  return Math.hypot(dx, dy)
}

/**
 * Searches every spot in the scene on an 8px grid and returns the one closest to the
 * object that touches no other object, preferring the requested side and a centred
 * label. If nothing is free (a tiny scene), the spot with the least overlap wins.
 */
export function placeLabel(
  scene: { w: number; h: number },
  self: Box,
  label: { w: number; h: number },
  obstacles: Box[],
  prefer: 'above' | 'below',
): { x: number; y: number } {
  const { w, h } = label
  const maxX = scene.w - PAD - w
  const maxY = scene.h - PAD - h
  const selfZone = inflate(self, GAP)
  const blocked = obstacles.map((o) => inflate(o, CLEAR))
  const cx = self.x + self.w / 2

  let best = { x: PAD, y: PAD }
  let bestCost = Infinity
  let fallback = best
  let fallbackScore = Infinity

  for (let y = PAD; y <= maxY; y += STEP) {
    for (let x = PAD; x <= maxX; x += STEP) {
      const c = { x, y, w, h }
      if (overlap(c, selfZone) > 0) continue
      const hit = blocked.reduce((sum, o) => sum + overlap(c, o), 0)
      const onPreferredSide = prefer === 'above' ? y + h <= self.y : y >= self.y + self.h
      const cost =
        distance(c, self) + Math.abs(x + w / 2 - cx) * 0.25 + (onPreferredSide ? 0 : WRONG_SIDE)
      if (hit === 0) {
        if (cost < bestCost) {
          best = { x, y }
          bestCost = cost
        }
      } else {
        // Covered fraction of the label, weighted so a fallback still stays near its object.
        const score = (hit / (w * h)) * 400 + cost
        if (score < fallbackScore) {
          fallback = { x, y }
          fallbackScore = score
        }
      }
    }
  }
  return bestCost < Infinity ? best : fallback
}

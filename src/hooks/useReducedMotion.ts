import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/** True when the visitor prefers reduced motion. Always a boolean. */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false
}

import { createContext, useContext } from 'react'

export interface PanelController {
  /** Open a case study by hash. `opener` is the element focus returns to on close. */
  open: (hash: string, opener?: HTMLElement | null) => void
  activeHash: string | undefined
}

export const PanelContext = createContext<PanelController | null>(null)

export function usePanel(): PanelController {
  const ctx = useContext(PanelContext)
  if (!ctx) throw new Error('usePanel must be used inside PanelProvider')
  return ctx
}

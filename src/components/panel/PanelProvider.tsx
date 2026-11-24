import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useHashRoute } from '../../hooks/useHashRoute'
import { CaseStudyPanel } from './CaseStudyPanel'
import { PanelContext, type PanelController } from './panelStore'

/** The visible desk object (or index link) for a case study, used when there's no opener. */
const findTrigger = (hash: string): HTMLElement | null =>
  [...document.querySelectorAll<HTMLElement>(`[data-desk-target="${hash}"]`)].find((el) => el.getClientRects().length > 0) ?? null

export function PanelProvider({ children }: { children: ReactNode }) {
  const { entry, open: openHash, close } = useHashRoute()
  const opener = useRef<HTMLElement | null>(null)
  const [origin, setOrigin] = useState<DOMRect | null>(null)
  const lastHash = useRef<string | undefined>(entry?.hash)
  const initialEntry = useRef(entry)

  // Arriving on a shared link: bring the desk into view behind the panel.
  useEffect(() => {
    const first = initialEntry.current
    if (!first) return
    document.getElementById('workbench')?.scrollIntoView({ behavior: 'instant', block: 'start' })
    setOrigin(findTrigger(first.hash)?.getBoundingClientRect() ?? null)
  }, [])

  useEffect(() => {
    if (entry) lastHash.current = entry.hash
  }, [entry])

  const open = useCallback<PanelController['open']>(
    (hash, el) => {
      opener.current = el ?? null
      setOrigin(el?.getBoundingClientRect() ?? null)
      openHash(hash)
    },
    [openHash],
  )

  const restoreFocus = useCallback(() => {
    const target = opener.current?.isConnected && opener.current.getClientRects().length > 0 ? opener.current : lastHash.current ? findTrigger(lastHash.current) : null
    target?.focus({ preventScroll: false })
    opener.current = null
  }, [])

  const value = useMemo(() => ({ open, activeHash: entry?.hash }), [open, entry?.hash])

  return (
    <PanelContext.Provider value={value}>
      {children}
      {createPortal(
        <AnimatePresence>
          {entry && (
            <CaseStudyPanel
              key="case-study-panel"
              entry={entry}
              origin={origin}
              onClose={close}
              onNavigate={(hash) => openHash(hash)}
              onClosed={restoreFocus}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </PanelContext.Provider>
  )
}

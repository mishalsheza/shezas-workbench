import { useCallback, useEffect, useRef, useState } from 'react'
import { findCase, type CaseEntry } from '../lib/caseStudies'

/**
 * The open case study lives in the URL hash (#project/<id>, #experience/<id>).
 * Opening pushes a history entry, so the browser's Back button closes the panel.
 * Moving between case studies replaces it, so Back still closes rather than
 * stepping through every study. Unknown hashes are ignored.
 */
export function useHashRoute() {
  const [entry, setEntry] = useState<CaseEntry | undefined>(() => findCase(window.location.hash))
  /** True when we pushed the current history entry ourselves (so Back is safe). */
  const pushed = useRef(false)

  useEffect(() => {
    const sync = () => {
      const next = findCase(window.location.hash)
      if (!next) pushed.current = false
      setEntry(next)
    }
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const open = useCallback((hash: string) => {
    const next = findCase(hash)
    if (!next) return
    if (findCase(window.location.hash)) {
      window.history.replaceState(window.history.state, '', next.hash)
    } else {
      window.history.pushState({ panel: next.hash }, '', next.hash)
      pushed.current = true
    }
    setEntry(next)
  }, [])

  const close = useCallback(() => {
    if (pushed.current) {
      pushed.current = false
      window.history.back() // popstate clears the entry
      return
    }
    // Arrived via a shared link: drop the hash without leaving the site.
    window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
    setEntry(undefined)
  }, [])

  return { entry, open, close }
}

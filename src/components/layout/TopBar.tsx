import { useEffect, useState } from 'react'
import { profile } from '../../data/content'
import { ResumeToggle } from '../resume-mode/ResumeToggle'

/** True once the page has scrolled past `offset` px. */
function useScrolled(offset = 24): boolean {
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > offset)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])
  return scrolled
}

/**
 * Monogram + resume toggle. Transparent over the hero on desktop; once the page scrolls
 * it gets a champagne backing so headings slide under it instead of colliding with it.
 */
export function TopBar() {
  const scrolled = useScrolled()
  return (
    <header
      className={`no-print pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-4 py-3 transition-[background-color,border-color,backdrop-filter] duration-300 ease-workbench sm:px-8 md:py-4 ${
        scrolled
          ? 'border-chestnut/10 bg-champagne/90 backdrop-blur-sm'
          : 'border-transparent bg-champagne/85 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none'
      }`}
    >
      <a
        href="#top"
        aria-label={`${profile.name}, back to top`}
        className="pointer-events-auto grid h-10 w-10 place-items-center rounded-xl bg-chestnut font-display text-base font-semibold tracking-tight text-champagne shadow-object"
      >
        SM
      </a>
      <div className="pointer-events-auto">
        <ResumeToggle />
      </div>
    </header>
  )
}

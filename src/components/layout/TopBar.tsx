import { profile } from '../../data/content'
import { ResumeToggle } from '../resume-mode/ResumeToggle'

export function TopBar() {
  return (
    <header className="no-print pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-champagne/85 px-4 py-3 backdrop-blur-sm sm:px-8 md:bg-transparent md:py-4 md:backdrop-blur-none">
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

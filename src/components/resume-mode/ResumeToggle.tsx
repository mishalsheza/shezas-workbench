import { FileText, LayoutGrid } from 'lucide-react'
import { copy } from '../../data/content'
import { useResumeModeContext } from './resumeModeStore'

export function ResumeToggle() {
  const { isResume, toggle } = useResumeModeContext()
  const Icon = isResume ? LayoutGrid : FileText
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isResume}
      className="inline-flex items-center gap-2 rounded-full border border-chestnut/25 bg-champagne/90 px-4 py-2 text-sm font-medium text-espresso shadow-object backdrop-blur transition-colors duration-200 ease-workbench hover:border-chestnut/50 hover:bg-blush-soft"
    >
      <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
      {isResume ? copy.resumeToggleOff : copy.resumeToggle}
    </button>
  )
}

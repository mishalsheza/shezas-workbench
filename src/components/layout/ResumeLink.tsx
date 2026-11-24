import type { ReactNode } from 'react'
import { links } from '../../data/content'
import { useAssetAvailable } from '../../hooks/useAssetAvailable'
import { useResumeModeContext } from '../resume-mode/resumeModeStore'

interface ResumeLinkProps {
  className?: string
  children: ReactNode
}

/**
 * Opens public/resume.pdf when it exists. Until it's added, it switches to
 * "Just the resume" mode instead, so the link is never a dead end.
 */
export function ResumeLink({ className, children }: ResumeLinkProps) {
  const pdf = useAssetAvailable(links.resume, 'pdf')
  const { setIsResume } = useResumeModeContext()

  if (pdf === false) {
    return (
      <button type="button" className={className} onClick={() => setIsResume(true)}>
        {children}
      </button>
    )
  }
  return (
    <a className={className} href={links.resume} target="_blank" rel="noopener">
      {children}
    </a>
  )
}

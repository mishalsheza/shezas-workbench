import { createContext, useContext } from 'react'
import type { useResumeMode } from '../../hooks/useResumeMode'

export type ResumeMode = ReturnType<typeof useResumeMode>

export const ResumeModeContext = createContext<ResumeMode | null>(null)

export function useResumeModeContext(): ResumeMode {
  const ctx = useContext(ResumeModeContext)
  if (!ctx) throw new Error('useResumeModeContext must be used inside ResumeModeProvider')
  return ctx
}

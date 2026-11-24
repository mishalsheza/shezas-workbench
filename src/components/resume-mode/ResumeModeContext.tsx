import type { ReactNode } from 'react'
import { useResumeMode } from '../../hooks/useResumeMode'
import { ResumeModeContext } from './resumeModeStore'

export function ResumeModeProvider({ children }: { children: ReactNode }) {
  const value = useResumeMode()
  return <ResumeModeContext.Provider value={value}>{children}</ResumeModeContext.Provider>
}

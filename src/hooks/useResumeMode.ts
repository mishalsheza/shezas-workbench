import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'workbench:mode'
const PARAM = 'mode'

const readInitial = (): boolean => {
  const param = new URLSearchParams(window.location.search).get(PARAM)
  if (param === 'resume') return true
  if (param === 'workbench') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'resume'
  } catch {
    return false
  }
}

/**
 * "Just the resume" mode. `?mode=resume` wins over the saved choice;
 * the choice is saved in localStorage (best effort) and mirrored in the URL.
 */
export function useResumeMode() {
  const [isResume, setIsResume] = useState<boolean>(readInitial)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, isResume ? 'resume' : 'workbench')
    } catch {
      /* storage blocked: the URL param still works */
    }
    const url = new URL(window.location.href)
    if (isResume) url.searchParams.set(PARAM, 'resume')
    else url.searchParams.delete(PARAM)
    window.history.replaceState(window.history.state, '', url)
  }, [isResume])

  const toggle = useCallback(() => {
    setIsResume((v) => !v)
    window.scrollTo({ top: 0 })
  }, [])

  return { isResume, toggle, setIsResume }
}

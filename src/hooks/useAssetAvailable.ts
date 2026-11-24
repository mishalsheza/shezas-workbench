import { useEffect, useState } from 'react'

const cache = new Map<string, Promise<boolean>>()

const check = (url: string, expectedType: string): Promise<boolean> => {
  let pending = cache.get(url)
  if (!pending) {
    // A static host (and Vite's SPA fallback) may answer 200 with index.html,
    // so the content type is what proves the file is really there.
    pending = fetch(url, { method: 'HEAD' })
      .then((r) => r.ok && (r.headers.get('content-type') ?? '').includes(expectedType))
      .catch(() => false)
    cache.set(url, pending)
  }
  return pending
}

/** `undefined` while checking, then whether the asset exists with the expected type. */
export function useAssetAvailable(url: string | undefined, expectedType: string): boolean | undefined {
  const [available, setAvailable] = useState<boolean | undefined>(url ? undefined : false)

  useEffect(() => {
    if (!url) return
    let alive = true
    void check(url, expectedType).then((ok) => {
      if (alive) setAvailable(ok)
    })
    return () => {
      alive = false
    }
  }, [url, expectedType])

  return available
}

import { useState } from 'react'
import type { DeskObjectId } from '../../data/content'
import { copy } from '../../data/content'
import { OBJECT_ART } from '../objects'

interface PreviewImageProps {
  src?: string
  alt: string
  deskObject: DeskObjectId
}

/** Lazy-loaded screenshot, or a tasteful placeholder (the desk object) until one is added. */
export function PreviewImage({ src, alt, deskObject }: PreviewImageProps) {
  const [failed, setFailed] = useState(!src)
  const Art = OBJECT_ART[deskObject]

  if (failed || !src) {
    return (
      <figure className="flex aspect-[16/10] flex-col items-center justify-center gap-4 rounded-2xl bg-accent-tint p-8">
        <Art className="h-1/2 w-auto max-w-[60%] drop-shadow-[3px_4px_3px_rgba(62,36,25,0.22)]" />
        <figcaption className="font-mono text-xs uppercase tracking-[0.18em] text-accent-strong">{copy.panel.previewMissing}</figcaption>
      </figure>
    )
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      width={1600}
      height={1000}
      onError={() => setFailed(true)}
      className="aspect-[16/10] w-full rounded-2xl bg-champagne-deep object-cover shadow-object"
    />
  )
}

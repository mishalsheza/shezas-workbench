import type { ReactNode } from 'react'

interface ObjectSvgProps {
  viewBox: string
  className?: string
  children: ReactNode
}

/**
 * Wrapper for every illustration: decorative (the button carries the name),
 * one espresso outline weight that children inherit (non-scaling, via `.art`).
 */
export function ObjectSvg({ viewBox, className = '', children }: ObjectSvgProps) {
  return (
    <svg viewBox={viewBox} aria-hidden="true" focusable="false" className={`art ${className}`} overflow="visible">
      <g className="stroke-espresso" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  )
}

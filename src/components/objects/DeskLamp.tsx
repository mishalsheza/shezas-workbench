import { ObjectSvg } from './ObjectSvg'

/** Decor (and a toggle): an architect's desk lamp leaning over the desk. */
export function DeskLamp({ className, on = false }: { className?: string; on?: boolean }) {
  return (
    <ObjectSvg viewBox="0 0 260 320" className={className}>
      {/* base */}
      <path d="M20 312 Q20 296 40 296 H100 Q120 296 120 312 Z" className="fill-espresso" />
      {/* arms */}
      <path d="M70 298 L46 150" fill="none" strokeWidth={9} className="stroke-espresso" />
      <path d="M70 298 L46 150" fill="none" strokeWidth={5} className="stroke-chestnut" />
      <path d="M46 150 L170 64" fill="none" strokeWidth={9} className="stroke-espresso" />
      <path d="M46 150 L170 64" fill="none" strokeWidth={5} className="stroke-chestnut" />
      <circle cx="46" cy="150" r="9" className="fill-champagne-deep" />
      <circle cx="70" cy="296" r="7" className="fill-champagne-deep" />
      {/* shade, pointing down-right */}
      <g transform="rotate(35 186 76)">
        <path d="M160 52 H212 L236 118 H136 Z" className="fill-blush" />
        <path d="M198 52 H212 L236 118 H214 Z" className="fill-espresso/10" stroke="none" />
        <path d="M160 52 H212 L236 118 H136 Z" fill="none" />
        <ellipse cx="186" cy="118" rx="50" ry="8" className={on ? 'fill-gold' : 'fill-champagne'} />
        <rect x="176" y="40" width="20" height="14" rx="3" className="fill-espresso" />
      </g>
    </ObjectSvg>
  )
}

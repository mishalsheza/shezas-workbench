import { foundationShades } from '../../data/content'
import { ObjectSvg } from './ObjectSvg'

const shade = (i: number) => foundationShades[i]?.hex ?? '#D6A06A'

/** ShadeSense: an open compact with a mirror lid, plus three foundation bottles, fair to deep. */
export function ShadeSenseShelf({ className }: { className?: string }) {
  const bottles = [
    { x: 112, h: 92, i: 1 },
    { x: 150, h: 108, i: 2 },
    { x: 188, h: 84, i: 4 },
  ]
  return (
    <ObjectSvg viewBox="0 0 230 150" className={className}>
      {/* compact: mirror lid standing open */}
      <circle cx="54" cy="62" r="40" className="fill-rose" />
      <path d="M54 22 A40 40 0 0 1 54 102 A30 40 0 0 0 54 22 Z" className="fill-rose-shade" stroke="none" />
      <circle cx="54" cy="62" r="40" fill="none" />
      <circle cx="54" cy="62" r="30" className="fill-champagne" />
      <path d="M38 62 L58 42 M44 72 L66 50" className="stroke-blush" strokeWidth={3} />
      {/* compact: base with the pressed powder */}
      <path d="M10 118 Q10 104 24 104 H84 Q98 104 98 118 V128 Q98 142 84 142 H24 Q10 142 10 128 Z" className="fill-rose" />
      <path d="M10 126 V128 Q10 142 24 142 H84 Q98 142 98 128 V126 Z" className="fill-rose-shade" />
      <ellipse cx="54" cy="116" rx="34" ry="8" style={{ fill: shade(0) }} />
      <path d="M30 114 Q42 110 52 111" fill="none" className="stroke-champagne/70" strokeWidth={2} />
      {/* bottles */}
      {bottles.map(({ x, h, i }) => {
        const top = 142 - h
        return (
          <g key={x}>
            <rect x={x - 6} y={top} width="12" height="16" rx="2" className="fill-rose" />
            <rect x={x + 1} y={top} width="5" height="16" className="fill-rose-shade" stroke="none" />
            <rect x={x - 6} y={top} width="12" height="16" rx="2" fill="none" />
            <path
              d={`M${x - 16} ${top + 24} Q${x - 16} ${top + 16} ${x - 8} ${top + 16} H${x + 8} Q${x + 16} ${top + 16} ${x + 16} ${top + 24} V${136} Q${x + 16} 142 ${x + 10} 142 H${x - 10} Q${x - 16} 142 ${x - 16} 136 Z`}
              style={{ fill: shade(i) }}
            />
            <path d={`M${x + 6} ${top + 17} H${x + 8} Q${x + 15} ${top + 17} ${x + 15} ${top + 24} V136 Q${x + 15} 141 ${x + 10} 141 H${x + 6} Z`} className="fill-espresso/20" stroke="none" />
            <rect x={x - 11} y={top + 40} width="22" height="22" rx="2" className="fill-champagne" />
            <path d={`M${x - 6} ${top + 48} H${x + 6} M${x - 6} ${top + 54} H${x + 2}`} strokeWidth={1.25} />
          </g>
        )
      })}
    </ObjectSvg>
  )
}

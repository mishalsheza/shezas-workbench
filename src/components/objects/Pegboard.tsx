import { pegboardTags } from '../../data/content'
import { ObjectSvg } from './ObjectSvg'

/** Skills: a pegboard with hanging tools and little skill tags. */
export function Pegboard({ className }: { className?: string }) {
  const holes = []
  for (let y = 28; y < 300; y += 22) for (let x = 28; x < 360; x += 22) holes.push([x, y] as const)
  return (
    <ObjectSvg viewBox="0 0 380 320" className={className}>
      <rect x="6" y="6" width="368" height="308" rx="10" className="fill-chestnut" />
      <rect x="18" y="18" width="344" height="284" rx="4" className="fill-champagne-deep" />
      <path d="M18 286 H362 V298 Q362 302 358 302 H22 Q18 302 18 298 Z" className="fill-espresso/10" stroke="none" />
      <g className="fill-espresso/20" stroke="none">
        {holes.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />
        ))}
      </g>
      {/* hammer */}
      <rect x="54" y="66" width="14" height="150" rx="6" className="fill-chestnut" />
      <path d="M30 44 H92 V70 H30 Q24 70 24 64 V50 Q24 44 30 44 Z" className="fill-champagne" />
      <path d="M80 44 H92 V70 H80 Z" className="fill-espresso/15" stroke="none" />
      {/* wrench */}
      <path d="M118 74 V214 Q118 222 126 222 Q134 222 134 214 V74" className="fill-champagne" />
      <path d="M108 52 A20 20 0 1 0 144 52 L136 40 V58 H116 V40 Z" className="fill-champagne" />
      {/* screwdriver */}
      <rect x="166" y="44" width="24" height="70" rx="11" className="fill-blush" />
      <path d="M180 46 H185 Q190 46 190 56 V102 Q190 112 185 112 H180 Z" className="fill-espresso/10" stroke="none" />
      <rect x="174" y="114" width="8" height="84" className="fill-champagne" />
      {/* tape measure */}
      <circle cx="262" cy="80" r="40" className="fill-chestnut" />
      <circle cx="262" cy="80" r="16" className="fill-champagne" />
      <path d="M296 104 H316 V114 H292 Z" className="fill-champagne" />
      {/* skill tags */}
      {pegboardTags.map((tag, i) => {
        const col = i % 3
        const row = Math.floor(i / 3)
        const x = 210 + col * 50
        const y = 168 + row * 66
        return (
          <g key={tag}>
            <path d={`M${x + 20} ${y - 18} L${x + 20} ${y}`} strokeWidth={1.25} />
            <circle cx={x + 20} cy={y - 18} r="2.5" className="fill-espresso" stroke="none" />
            <rect x={x} y={y} width="42" height="30" rx="4" className={i % 2 === 0 ? 'fill-champagne' : 'fill-blush'} />
            <text x={x + 21} y={y + 19} textAnchor="middle" stroke="none" className="fill-espresso font-mono" fontSize="8.5" textLength={tag.length > 6 ? 34 : undefined} lengthAdjust="spacingAndGlyphs">
              {tag}
            </text>
          </g>
        )
      })}
    </ObjectSvg>
  )
}

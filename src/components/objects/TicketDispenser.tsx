import { ObjectSvg } from './ObjectSvg'

/** QueueEase: a wall-mounted "take a number" dispenser showing 07. */
export function TicketDispenser({ className }: { className?: string }) {
  return (
    <ObjectSvg viewBox="0 0 120 240" className={className}>
      {/* wall plate */}
      <rect x="34" y="2" width="52" height="18" rx="3" className="fill-chestnut" />
      <circle cx="44" cy="11" r="2" className="fill-champagne-deep" />
      <circle cx="76" cy="11" r="2" className="fill-champagne-deep" />
      {/* body */}
      <rect x="10" y="18" width="100" height="134" rx="44" className="fill-cornflower" />
      <path d="M78 22 Q110 30 110 62 V108 Q110 146 78 150 Q94 120 94 86 Q94 48 78 22 Z" className="fill-cornflower-shade" stroke="none" />
      <rect x="10" y="18" width="100" height="134" rx="44" fill="none" />
      <text x="60" y="44" textAnchor="middle" stroke="none" className="fill-champagne font-mono" fontSize="7.5" letterSpacing="1">
        TAKE A NUMBER
      </text>
      {/* display */}
      <rect x="28" y="52" width="64" height="42" rx="8" className="fill-espresso" />
      <text x="60" y="86" textAnchor="middle" stroke="none" className="fill-blush font-mono" fontSize="30" fontWeight="700">
        07
      </text>
      {/* slot + ticket */}
      <rect x="30" y="120" width="60" height="8" rx="4" className="fill-espresso" />
      <path d="M36 124 H84 V206 L78 212 L72 206 L66 212 L60 206 L54 212 L48 206 L42 212 L36 206 Z" className="fill-champagne" />
      <path d="M42 140 H78" className="stroke-cornflower" strokeDasharray="2 4" strokeWidth={1.25} />
      <text x="60" y="180" textAnchor="middle" stroke="none" className="fill-cornflower-strong font-display" fontSize="28" fontWeight="600">
        07
      </text>
    </ObjectSvg>
  )
}

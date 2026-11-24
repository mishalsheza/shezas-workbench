import { about } from '../../data/content'
import { ObjectSvg } from './ObjectSvg'

/** About: a pinboard with sticky notes and a photo. */
export function Pinboard({ className }: { className?: string }) {
  return (
    <ObjectSvg viewBox="0 0 300 340" className={className}>
      <rect x="6" y="6" width="288" height="328" rx="10" className="fill-chestnut" />
      <rect x="18" y="18" width="264" height="304" rx="4" className="fill-blush" />
      <path d="M18 300 H282 V318 Q282 322 278 322 H22 Q18 322 18 318 Z" className="fill-espresso/10" stroke="none" />
      {/* photo */}
      <g transform="rotate(-5 96 110)">
        <rect x="40" y="46" width="112" height="128" rx="2" className="fill-champagne" />
        <rect x="50" y="56" width="92" height="84" className="fill-champagne-deep" />
        <circle cx="122" cy="78" r="10" className="fill-blush" />
        <path d="M50 140 L80 102 L100 124 L114 110 L142 140 Z" className="fill-chestnut" />
        <path d="M70 156 H122" strokeWidth={1.25} />
        <circle cx="96" cy="50" r="5" className="fill-espresso" />
      </g>
      {/* sticky notes */}
      <g transform="rotate(4 220 96)">
        <rect x="174" y="50" width="92" height="92" rx="2" className="fill-champagne" />
        <rect x="174" y="50" width="92" height="12" className="fill-espresso/10" stroke="none" />
        <foreignObject x="182" y="66" width="76" height="72">
          <p className="font-display text-[12px] italic leading-tight text-espresso">{about.stickyNote}</p>
        </foreignObject>
        <circle cx="220" cy="54" r="5" className="fill-chestnut" />
      </g>
      <g transform="rotate(-3 200 236)">
        <rect x="150" y="190" width="104" height="86" rx="2" className="fill-champagne" />
        <path d="M162 214 H238 M162 230 H226 M162 246 H232 M162 262 H210" strokeWidth={1.25} />
        <circle cx="202" cy="194" r="5" className="fill-espresso" />
      </g>
      <g transform="rotate(6 78 248)">
        <rect x="38" y="206" width="84" height="84" rx="2" className="fill-champagne-deep" />
        <path d="M50 232 L62 244 L86 220" fill="none" strokeWidth={2.5} />
        <path d="M50 264 H104" strokeWidth={1.25} />
        <circle cx="80" cy="210" r="5" className="fill-chestnut" />
      </g>
    </ObjectSvg>
  )
}

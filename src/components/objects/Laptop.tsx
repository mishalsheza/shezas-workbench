import { terminal } from '../../data/content'
import { ObjectSvg } from './ObjectSvg'

/** Contact: an open laptop with a terminal on screen. */
export function Laptop({ className }: { className?: string }) {
  return (
    <ObjectSvg viewBox="0 0 400 260" className={className}>
      <rect x="40" y="4" width="320" height="216" rx="12" className="fill-champagne-deep" />
      <rect x="54" y="16" width="292" height="190" rx="4" className="fill-espresso" />
      <g stroke="none">
        <circle cx="68" cy="30" r="3.5" className="fill-blush" />
        <circle cx="80" cy="30" r="3.5" className="fill-champagne/40" />
        <circle cx="92" cy="30" r="3.5" className="fill-champagne/40" />
        <text x="68" y="64" className="fill-champagne font-mono" fontSize="13">{terminal.prompt} help</text>
        <text x="68" y="86" className="fill-blush font-mono" fontSize="13">email  github  linkedin  resume</text>
        <text x="68" y="108" className="fill-champagne/70 font-mono" fontSize="13">{terminal.prompt}</text>
        <rect data-cursor="" x="232" y="97" width="9" height="15" className="fill-blush" />
      </g>
      {/* base */}
      <path d="M0 222 H400 L390 244 Q388 248 382 248 H18 Q12 248 10 244 Z" className="fill-champagne" />
      <path d="M10 240 H390 L388 244 Q386 248 380 248 H20 Q14 248 12 244 Z" className="fill-espresso/15" stroke="none" />
      <path d="M0 222 H400 L390 244 Q388 248 382 248 H18 Q12 248 10 244 Z" fill="none" />
      <path d="M168 222 Q170 230 178 230 H222 Q230 230 232 222" fill="none" />
    </ObjectSvg>
  )
}

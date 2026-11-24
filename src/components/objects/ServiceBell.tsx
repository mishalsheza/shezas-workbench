import { ObjectSvg } from './ObjectSvg'

/** Hotel Voice AI Agent: a classic brass service bell from the side, with sound waves. */
export function ServiceBell({ className }: { className?: string }) {
  return (
    <ObjectSvg viewBox="0 0 150 140" className={className}>
      {/* sound waves */}
      <g fill="none" className="stroke-gold-shade" strokeWidth={2.5} data-wave="">
        <path d="M89.9 34.7 A26 26 0 0 1 100.6 51.5" />
        <path d="M97.9 23.2 A40 40 0 0 1 114.4 49.1" />
        <path d="M60.1 34.7 A26 26 0 0 0 49.4 51.5" />
        <path d="M52.1 23.2 A40 40 0 0 0 35.6 49.1" />
      </g>
      {/* base */}
      <rect x="12" y="122" width="126" height="14" rx="5" className="fill-chestnut" />
      <rect x="12" y="130" width="126" height="6" rx="3" className="fill-chestnut-shade" stroke="none" />
      <rect x="12" y="122" width="126" height="14" rx="5" fill="none" />
      {/* dome */}
      <path d="M28 120 C28 66 122 66 122 120 Z" className="fill-gold" />
      <path d="M96 76 C114 86 122 100 122 120 H102 C104 104 102 88 96 76 Z" className="fill-gold-shade" stroke="none" />
      <path d="M28 120 C28 66 122 66 122 120 Z" fill="none" />
      <path d="M42 108 C42 94 50 84 62 79" fill="none" className="stroke-champagne" strokeWidth={4} />
      <rect x="22" y="116" width="106" height="7" rx="3.5" className="fill-gold-shade" />
      {/* plunger */}
      <rect x="71" y="58" width="8" height="22" className="fill-gold-shade" />
      <ellipse cx="75" cy="56" rx="15" ry="5.5" className="fill-gold" />
    </ObjectSvg>
  )
}

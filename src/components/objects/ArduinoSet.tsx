import { ObjectSvg } from './ObjectSvg'

const pins = Array.from({ length: 12 }, (_, i) => i)

/** Internship: a teal Arduino board wired to a breadboard with an LED. */
export function ArduinoSet({ className, ledOn = false }: { className?: string; ledOn?: boolean }) {
  return (
    <ObjectSvg viewBox="0 0 260 120" className={className}>
      {/* breadboard */}
      <path d="M140 114 L150 60 H254 L258 114 Z" className="fill-champagne" />
      <path d="M140 114 H258 V108 H141 Z" className="fill-champagne-deep" stroke="none" />
      <path d="M145 87 H256" className="stroke-espresso/40" strokeWidth={1} />
      <g className="fill-espresso/35" stroke="none">
        {pins.map((i) => (
          <g key={i}>
            <circle cx={156 + i * 8} cy="70" r="1.3" />
            <circle cx={155 + i * 8.2} cy="78" r="1.3" />
            <circle cx={153 + i * 8.4} cy="97" r="1.3" />
            <circle cx={152 + i * 8.6} cy="105" r="1.3" />
          </g>
        ))}
      </g>
      {/* LED */}
      {ledOn && <circle cx="214" cy="40" r="20" className="fill-blush/50" stroke="none" />}
      <path d="M210 74 V58 M218 74 V58" strokeWidth={1.5} />
      <path d="M206 58 V38 A8 8 0 0 1 222 38 V58 Z" className={ledOn ? 'fill-blush' : 'fill-blush/60'} />
      <rect x="204" y="56" width="20" height="4" rx="1" className={ledOn ? 'fill-blush' : 'fill-blush/60'} />
      <path d="M210 40 A3 3 0 0 1 213 36" fill="none" className="stroke-champagne" strokeWidth={2} />
      {/* Arduino board */}
      <path d="M8 114 L16 50 H128 L134 114 Z" className="fill-teal" />
      <path d="M8 114 H134 L133 106 H9 Z" className="fill-teal-shade" stroke="none" />
      <path d="M8 114 L16 50 H128 L134 114 Z" fill="none" />
      <rect x="0" y="62" width="20" height="16" rx="2" className="fill-champagne-deep" />
      <rect x="2" y="88" width="16" height="14" rx="3" className="fill-espresso" />
      <rect x="44" y="54" width="78" height="7" rx="1" className="fill-espresso" />
      <rect x="40" y="102" width="80" height="7" rx="1" className="fill-espresso" />
      <rect x="56" y="74" width="50" height="16" rx="2" className="fill-espresso" />
      <circle cx="34" cy="84" r="4" className="fill-champagne-deep" />
      {/* wires */}
      <g fill="none" strokeWidth={3}>
        <path d="M84 55 C100 36 150 40 170 70" className="stroke-blush" />
        <path d="M104 55 C118 42 170 46 186 70" className="stroke-espresso" />
      </g>
    </ObjectSvg>
  )
}

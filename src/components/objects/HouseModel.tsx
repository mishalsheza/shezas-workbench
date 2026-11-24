import { ObjectSvg } from './ObjectSvg'

/** Property Advisor: a small architectural house model, seen at a slight three-quarter angle. */
export function HouseModel({ className }: { className?: string }) {
  return (
    <ObjectSvg viewBox="0 0 170 150" className={className}>
      {/* base board */}
      <path d="M8 134 H104 L150 104 H56 Z" className="fill-champagne-deep" />
      <path d="M8 134 H104 V142 H8 Z" className="fill-chestnut" />
      <path d="M104 134 L150 104 V112 L104 142 Z" className="fill-chestnut-shade" />
      {/* far roof plane (peeks over the gable) */}
      <path d="M60 40 L100 16 L70 46 L30 72 Z" className="fill-terracotta-shade" />
      {/* side wall, in shade */}
      <path d="M90 72 L130 48 V100 L90 126 Z" className="fill-champagne-deep" />
      <path d="M98 84 L110 77 V92 L98 99 Z M116 73 L124 68 V83 L116 88 Z" className="fill-champagne" />
      {/* front gable wall, lit */}
      <path d="M30 126 V72 L60 40 L90 72 V126 Z" className="fill-champagne" />
      {/* main roof plane */}
      <path d="M60 40 L100 16 L134 50 L94 75 Z" className="fill-terracotta" />
      <path d="M70 46 L106 24 M80 56 L116 33 M88 65 L124 42" className="stroke-terracotta-shade" strokeWidth={1.25} />
      <path d="M60 40 L100 16 L134 50 L94 75 Z" fill="none" />
      {/* chimney */}
      <path d="M106 22 V8 H116 V30" className="fill-terracotta-shade" />
      {/* door and round window */}
      <path d="M52 126 V104 Q60 96 68 104 V126 Z" className="fill-terracotta" />
      <circle cx="64" cy="114" r="1.6" className="fill-espresso" stroke="none" />
      <circle cx="60" cy="74" r="7" className="fill-champagne-deep" />
      <path d="M60 67 V81 M53 74 H67" strokeWidth={1.25} />
      {/* shrub */}
      <circle cx="24" cy="126" r="9" className="fill-sage/60" />
    </ObjectSvg>
  )
}

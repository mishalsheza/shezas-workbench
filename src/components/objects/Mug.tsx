import { ObjectSvg } from './ObjectSvg'

/** About: a coffee mug, still steaming. */
export function Mug({ className }: { className?: string }) {
  return (
    <ObjectSvg viewBox="0 0 90 100" className={className}>
      <g fill="none" className="stroke-espresso/40" strokeWidth={2}>
        <path d="M28 22 C22 14 34 10 28 2" />
        <path d="M42 22 C36 14 48 10 42 2" />
      </g>
      <path d="M62 44 H70 Q82 44 82 58 Q82 72 66 72 H62" fill="none" strokeWidth={6} className="stroke-espresso" />
      <path d="M62 44 H70 Q82 44 82 58 Q82 72 66 72 H62" fill="none" strokeWidth={3} className="stroke-blush" />
      <path d="M8 30 H66 V84 Q66 96 54 96 H20 Q8 96 8 84 Z" className="fill-blush" />
      <path d="M48 30 H66 V84 Q66 96 54 96 H48 Z" className="fill-espresso/10" stroke="none" />
      <path d="M8 30 H66 V84 Q66 96 54 96 H20 Q8 96 8 84 Z" fill="none" />
      <ellipse cx="37" cy="30" rx="29" ry="6" className="fill-champagne" />
      <ellipse cx="37" cy="31" rx="24" ry="4" className="fill-chestnut-shade" />
    </ObjectSvg>
  )
}

import { ObjectSvg } from './ObjectSvg'

/** Finance Tracker: an open ledger lying on the desk, a calculator and a few coins. */
export function LedgerSet({ className }: { className?: string }) {
  return (
    <ObjectSvg viewBox="0 0 250 110" className={className}>
      {/* ledger cover, then pages in gentle perspective */}
      <path d="M4 104 L22 52 H144 L156 104 Z" className="fill-sage" />
      <path d="M4 104 H156 L154 98 H6 Z" className="fill-sage-shade" stroke="none" />
      <path d="M10 98 L26 56 Q52 50 80 56 V100 Q46 94 10 98 Z" className="fill-champagne" />
      <path d="M80 56 Q110 50 140 56 L150 98 Q114 94 80 100 Z" className="fill-champagne-deep" />
      <g className="stroke-sage-shade" strokeWidth={1}>
        <path d="M24 66 Q50 62 76 66 M21 75 Q48 71 77 75 M18 84 Q46 80 78 84 M15 92 Q44 88 79 92" />
        <path d="M84 66 Q110 62 138 66 M84 75 Q112 71 141 75 M84 84 Q114 80 144 84" />
      </g>
      <path d="M58 60 V96" className="stroke-rose/70" strokeWidth={1} />
      {/* calculator */}
      <rect x="160" y="30" width="54" height="74" rx="7" className="fill-sage" />
      <path d="M200 31 H207 Q214 31 214 38 V97 Q214 104 207 104 H200 Z" className="fill-sage-shade" stroke="none" />
      <rect x="160" y="30" width="54" height="74" rx="7" fill="none" />
      <rect x="167" y="37" width="40" height="15" rx="2" className="fill-champagne-deep" />
      <path d="M186 44 H202" strokeWidth={1.5} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect key={`${r}-${c}`} x={167 + c * 10.5} y={58 + r * 14} width="7.5" height="9" rx="1.5" className={r === 2 && c === 3 ? 'fill-blush' : 'fill-champagne'} strokeWidth={1.25} />
        )),
      )}
      {/* coins */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <ellipse cx="234" cy={100 - i * 6} rx="12" ry="4" className="fill-champagne-deep" />
          <path d={`M222 ${100 - i * 6} V${103 - i * 6}`} strokeWidth={1} />
        </g>
      ))}
      <ellipse cx="234" cy="88" rx="12" ry="4" className="fill-champagne" />
    </ObjectSvg>
  )
}

import { SCENE_H, SCENE_W } from './deskLayout'

/**
 * The non-interactive scene (same proportions as the container): champagne wall,
 * shelf with books, the desk, a plant. Kept quieter than the objects.
 */
export function StudioBackdrop() {
  return (
    <svg viewBox={`0 0 ${SCENE_W} ${SCENE_H}`} aria-hidden="true" focusable="false" className="art absolute inset-0 h-full w-full">
      <g className="stroke-espresso" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        {/* wall */}
        <rect x="0" y="0" width={SCENE_W} height={SCENE_H} className="fill-champagne-deep/50" stroke="none" />

        {/* shelf */}
        <path d="M540 346 L560 404 H576 L568 346 Z M1050 346 L1042 404 H1058 L1078 346 Z" className="fill-chestnut-shade" />
        <rect x="460" y="330" width="676" height="18" rx="3" className="fill-chestnut" />
        <rect x="460" y="342" width="676" height="6" rx="2" className="fill-chestnut-shade" stroke="none" />
        <rect x="460" y="330" width="676" height="18" rx="3" fill="none" />
        {/* books */}
        <rect x="1036" y="242" width="22" height="88" rx="2" className="fill-champagne" />
        <rect x="1058" y="256" width="26" height="74" rx="2" className="fill-chestnut/60" />
        <rect x="1084" y="234" width="18" height="96" rx="2" className="fill-blush/70" />
        <path d="M1104 330 L1116 268 L1130 271 L1120 330 Z" className="fill-champagne-deep" />
        <path d="M1042 260 H1052 M1064 274 H1078 M1088 252 H1098" strokeWidth={1.25} />
        {/* plant, on the shelf */}
        <g transform="translate(470 205) scale(0.56) translate(-1450 -420)">
          <path d="M1500 560 C1460 520 1450 470 1468 440 C1490 480 1500 520 1506 560 Z" className="fill-sage/50" />
          <path d="M1508 560 C1520 500 1550 470 1580 462 C1572 500 1548 536 1514 562 Z" className="fill-sage/50" />
          <path d="M1504 562 C1500 500 1510 450 1530 420 C1536 470 1524 520 1512 562 Z" className="fill-sage/60" />
          <path d="M1470 562 H1546 L1536 642 H1480 Z" className="fill-champagne" />
          <path d="M1520 562 H1546 L1536 642 H1514 Z" className="fill-espresso/10" stroke="none" />
          <path d="M1470 562 H1546 L1536 642 H1480 Z" fill="none" />
          <rect x="1464" y="556" width="88" height="14" rx="3" className="fill-champagne-deep" />
        </g>

        {/* desk: top, apron, and the tops of two pedestals (cropped by the frame) */}
        <rect x="24" y="720" width="1552" height="26" rx="4" className="fill-chestnut" />
        <rect x="24" y="720" width="1552" height="8" rx="3" className="fill-champagne/15" stroke="none" />
        <rect x="24" y="720" width="1552" height="26" rx="4" fill="none" />
        <rect x="48" y="746" width="1504" height="40" className="fill-chestnut-shade" />
        {[80, 1230].map((x) => (
          <g key={x}>
            <rect x={x} y="786" width="290" height="240" className="fill-chestnut" />
            <rect x={x + 18} y="804" width="254" height="90" rx="4" className="fill-chestnut-shade" />
            <rect x={x + 18} y="910" width="254" height="110" rx="4" className="fill-chestnut-shade" />
            <rect x={x + 120} y="844" width="50" height="10" rx="5" className="fill-champagne-deep" />
            <rect x={x + 120} y="950" width="50" height="10" rx="5" className="fill-champagne-deep" />
          </g>
        ))}
        <rect x="370" y="786" width="860" height="26" className="fill-espresso/10" stroke="none" />
      </g>
    </svg>
  )
}

import { OBJECT_ART } from '../objects'
import { targetHash, type DeskItem } from '../../lib/deskItems'

/** Mobile version of a studio object: the same drawing on a card tinted with its colour. */
export function DeskCard({ item, onOpen }: { item: DeskItem; onOpen: (item: DeskItem, el: HTMLElement) => void }) {
  const Art = OBJECT_ART[item.id]
  return (
    <button
      type="button"
      aria-label={item.label}
      data-accent={item.accent}
      data-desk-target={targetHash(item.target)}
      onClick={(e) => onOpen(item, e.currentTarget)}
      className="flex w-full items-center gap-5 rounded-2xl border-l-4 border-accent bg-accent-tint p-4 text-left shadow-object transition-colors duration-200 ease-workbench hover:bg-blush-soft"
    >
      <span className="flex h-24 w-28 shrink-0 items-center justify-center rounded-xl bg-champagne p-3">
        <Art className="h-full w-auto max-w-full drop-shadow-[3px_4px_3px_rgba(62,36,25,0.22)]" />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent-strong">{item.kicker}</span>
        <span className="mt-0.5 block font-display text-xl leading-tight tracking-tight text-espresso">{item.title}</span>
        {item.tags.length > 0 ? (
          <span className="mt-2 flex flex-wrap gap-1.5">
            {item.tags.map((t) => (
              <span key={t} className="tag bg-champagne">{t}</span>
            ))}
          </span>
        ) : (
          item.hint && <span className="mt-1 block text-sm">{item.hint}</span>
        )}
      </span>
    </button>
  )
}

import { Reorder, useDragControls } from 'framer-motion'
import { ChevronDown, ChevronUp, GripVertical, Play, Plus, RotateCcw, Square, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { ArduinoBlockKind } from '../../data/content'
import { arduinoDemo as t, copy } from '../../data/content'
import { ArduinoSet } from '../objects/ArduinoSet'

interface Block {
  id: number
  kind: ArduinoBlockKind
  /** Only for "wait". */
  ms: number
}

const MAX_BLOCKS = 8
/**
 * How long an instant block (LED on/off) stays highlighted. With the shortest wait at
 * 250 ms, the LED can never flash faster than 2.5 times a second (WCAG 2.3.1 allows 3).
 */
const STEP_MS = 200
const KINDS: ArduinoBlockKind[] = ['ledOn', 'ledOff', 'wait']

let nextId = 0
const block = (kind: ArduinoBlockKind, ms = 500): Block => ({ id: nextId++, kind, ms })
const blink = () => [block('ledOn'), block('wait', 500), block('ledOff'), block('wait', 500)]

/** Blockly-style colours: LED blocks gold, timing teal, control chestnut. */
const BLOCK_STYLE: Record<ArduinoBlockKind, string> = {
  ledOn: 'bg-gold text-espresso',
  ledOff: 'bg-gold text-espresso',
  wait: 'bg-teal-strong text-champagne',
}

const codeFor = (b: Block) =>
  b.kind === 'wait' ? `delay(${b.ms});` : `digitalWrite(LED, ${b.kind === 'ledOn' ? 'HIGH' : 'LOW'});`

const HEADER = ['const int LED = 13;', '', 'void setup() {', '  pinMode(LED, OUTPUT);', '}', '', 'void loop() {']

/** Internship demo: snap blocks into a loop, read the C++ they become, watch the LED. */
export default function ArduinoDemo() {
  const [blocks, setBlocks] = useState<Block[]>(blink)
  const [running, setRunning] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [led, setLed] = useState(false)

  // The runner reads the latest program each step, so edits apply while it runs.
  const blocksRef = useRef(blocks)
  useEffect(() => {
    blocksRef.current = blocks
  }, [blocks])

  useEffect(() => {
    if (!running) return
    let i = 0
    let timer: number | undefined
    const tick = () => {
      const list = blocksRef.current
      if (list.length === 0) {
        setRunning(false)
        return
      }
      i %= list.length
      const b = list[i] as Block
      if (b.kind !== 'wait') setLed(b.kind === 'ledOn')
      setActiveId(b.id)
      i += 1
      timer = window.setTimeout(tick, b.kind === 'wait' ? Math.max(b.ms, STEP_MS) : STEP_MS)
    }
    tick()
    return () => window.clearTimeout(timer)
  }, [running])

  const stop = () => {
    setRunning(false)
    setActiveId(null)
    setLed(false)
  }
  const reset = () => {
    stop()
    setBlocks(blink())
  }
  const add = (kind: ArduinoBlockKind) => setBlocks((bs) => (bs.length >= MAX_BLOCKS ? bs : [...bs, block(kind)]))
  const update = (id: number, patch: Partial<Block>) => setBlocks((bs) => bs.map((b) => (b.id === id ? { ...b, ...patch } : b)))
  const remove = (id: number) => setBlocks((bs) => bs.filter((b) => b.id !== id))
  const move = (id: number, by: -1 | 1) =>
    setBlocks((bs) => {
      const i = bs.findIndex((b) => b.id === id)
      const j = i + by
      if (i < 0 || j < 0 || j >= bs.length) return bs
      const next = [...bs]
      ;[next[i], next[j]] = [next[j] as Block, next[i] as Block]
      return next
    })

  const full = blocks.length >= MAX_BLOCKS
  const activeIndex = blocks.findIndex((b) => b.id === activeId)

  return (
    <figure className="rounded-2xl border border-accent/30 bg-accent-tint/40 p-4 sm:p-5">
      <figcaption>
        <span className="tag bg-champagne">{t.label}</span>
        <p className="mt-3 text-sm text-espresso">{copy.arduinoCaption}</p>
      </figcaption>

      {/* The board, drawn exactly like the one on the desk */}
      <div className="mt-5 flex flex-col items-center gap-4 rounded-xl bg-champagne px-4 py-5 sm:flex-row sm:justify-between sm:px-6">
        <ArduinoSet ledOn={led} className="h-auto w-full max-w-[16rem] drop-shadow-[3px_4px_3px_rgba(62,36,25,0.18)]" />
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-espresso">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 rounded-full ring-2 transition-colors duration-150 ${led ? 'bg-gold ring-gold/40' : 'bg-champagne-deep ring-espresso/20'}`}
            />
            {led ? t.ledOn : t.ledOff}
          </p>
          <div className="flex gap-2">
            {running ? (
              <button type="button" onClick={stop} className="btn-primary">
                <Square aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} /> {t.stop}
              </button>
            ) : (
              <button type="button" onClick={() => setRunning(true)} disabled={blocks.length === 0} className="btn-primary disabled:opacity-50">
                <Play aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} /> {t.run}
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-chestnut/25 px-4 py-2.5 text-sm font-medium text-espresso transition-colors duration-200 ease-workbench hover:bg-blush-soft"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2} /> {t.reset}
            </button>
          </div>
          <p className="sr-only" aria-live="polite">{running ? t.running : t.stopped}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {/* Workspace: palette + program */}
        <div className="min-w-0">
          <h4 className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent-strong">{t.palette}</h4>
          <ul className="mt-2 flex flex-wrap gap-2">
            {KINDS.map((kind) => (
              <li key={kind}>
                <button
                  type="button"
                  onClick={() => add(kind)}
                  disabled={full}
                  aria-label={t.add(t.blocks[kind])}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium shadow-object transition-[filter,opacity] duration-200 ease-workbench hover:brightness-105 disabled:opacity-50 disabled:shadow-none ${BLOCK_STYLE[kind]}`}
                >
                  <Plus aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.25} />
                  {t.blocks[kind]}
                </button>
              </li>
            ))}
          </ul>

          <h4 id="arduino-program" className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent-strong">
            {t.program}
          </h4>
          {/* The C-shaped "repeat forever" block that loop() becomes */}
          <div className="mt-2 rounded-xl bg-chestnut p-1.5 pb-0 shadow-object">
            <p className="px-2 pb-1.5 pt-0.5 text-sm font-medium text-champagne">{t.loop}</p>
            <div className="ml-3 min-h-12 rounded-l-lg bg-champagne p-1.5">
              {blocks.length === 0 ? (
                <p className="px-2 py-2.5 text-sm text-espresso">{t.empty}</p>
              ) : (
                <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} aria-labelledby="arduino-program" className="space-y-1.5">
                  {blocks.map((b, i) => (
                    <BlockRow
                      key={b.id}
                      block={b}
                      active={b.id === activeId}
                      first={i === 0}
                      last={i === blocks.length - 1}
                      onMove={(by) => move(b.id, by)}
                      onRemove={() => remove(b.id)}
                      onMs={(ms) => update(b.id, { ms })}
                    />
                  ))}
                </Reorder.Group>
              )}
            </div>
            <div className="h-3" />
          </div>
          {full && <p className="mt-2 text-sm text-espresso">{t.full}</p>}
        </div>

        {/* Generated code */}
        <div className="min-w-0">
          <h4 id="arduino-code" className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent-strong">{t.code}</h4>
          <pre
            aria-labelledby="arduino-code"
            className="mt-2 overflow-x-auto rounded-xl bg-espresso py-3 font-mono text-[0.8125rem] leading-relaxed text-champagne"
          >
            <code className="block min-w-max">
              {HEADER.map((line, i) => (
                <span key={`h${i}`} className="block px-4">{line || ' '}</span>
              ))}
              {blocks.length === 0 ? (
                <span className="block px-4 text-champagne/60">{'  // add some blocks'}</span>
              ) : (
                blocks.map((b, i) => (
                  <span
                    key={b.id}
                    className={`block border-l-2 px-4 transition-colors duration-150 ${
                      i === activeIndex ? 'border-gold bg-gold/25' : 'border-transparent'
                    }`}
                  >
                    {`  ${codeFor(b)}`}
                  </span>
                ))
              )}
              <span className="block px-4">{'}'}</span>
            </code>
          </pre>
        </div>
      </div>

      <p className="mt-4 text-sm text-espresso">{t.note}</p>
    </figure>
  )
}

interface BlockRowProps {
  block: Block
  active: boolean
  first: boolean
  last: boolean
  onMove: (by: -1 | 1) => void
  onRemove: () => void
  onMs: (ms: number) => void
}

const iconBtn =
  'grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors duration-150 hover:bg-espresso/15 disabled:opacity-35 disabled:hover:bg-transparent'

/** One snapped-in block: drag it by the grip, or use the arrow buttons. */
function BlockRow({ block: b, active, first, last, onMove, onRemove, onMs }: BlockRowProps) {
  const controls = useDragControls()
  const name = t.blocks[b.kind]
  return (
    <Reorder.Item
      value={b}
      dragListener={false}
      dragControls={controls}
      className={`flex items-center gap-1 rounded-lg py-1 pl-1 pr-1.5 text-sm font-medium shadow-object ${BLOCK_STYLE[b.kind]} ${
        active ? 'ring-2 ring-espresso ring-offset-2 ring-offset-champagne' : ''
      }`}
    >
      <span
        aria-hidden="true"
        onPointerDown={(e) => controls.start(e)}
        className="grid h-7 w-5 shrink-0 cursor-grab touch-none place-items-center opacity-60 active:cursor-grabbing"
      >
        <GripVertical className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 truncate">{name}</span>
      {b.kind === 'wait' && (
        <label className="flex shrink-0 items-center gap-1">
          <span className="sr-only">{name}</span>
          <select
            value={b.ms}
            onChange={(e) => onMs(Number(e.target.value))}
            className="rounded-md border-0 bg-champagne py-0.5 pl-1.5 pr-1 font-mono text-xs text-espresso"
          >
            {t.waitOptions.map((ms) => (
              <option key={ms} value={ms}>{ms}</option>
            ))}
          </select>
          <span className="text-xs">{t.waitUnit}</span>
        </label>
      )}
      <span className="ml-1 flex shrink-0">
        <button type="button" onClick={() => onMove(-1)} disabled={first} aria-label={`${t.moveUp}: ${name}`} className={iconBtn}>
          <ChevronUp aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </button>
        <button type="button" onClick={() => onMove(1)} disabled={last} aria-label={`${t.moveDown}: ${name}`} className={iconBtn}>
          <ChevronDown aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </button>
        <button type="button" onClick={onRemove} aria-label={`${t.remove}: ${name}`} className={iconBtn}>
          <X aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
        </button>
      </span>
    </Reorder.Item>
  )
}

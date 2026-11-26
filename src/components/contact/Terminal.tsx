import { Fragment, useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import {
  SKILL_CATEGORIES,
  about,
  experienceNewestFirst,
  links,
  profile,
  skills,
  terminal as t,
} from '../../data/content'
import { useAssetAvailable } from '../../hooks/useAssetAvailable'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { caseEntries } from '../../lib/caseStudies'
import { usePanel } from '../panel/panelStore'
import { useResumeModeContext } from '../resume-mode/resumeModeStore'

/* ── Output model ── */
type Seg = string | { text: string; href: string }
type Tone = 'cmd' | 'out' | 'muted' | 'accent' | 'error'
interface Line {
  id: number
  tone: Tone
  parts: Seg[]
  /** Hanging indent in ch, so wrapped two-column rows stay aligned. */
  indent?: number
}

let lineId = 0
const mk = (tone: Tone, ...parts: Seg[]): Line => ({ id: lineId++, tone, parts })
const row = (indent: number, ...parts: Seg[]): Line => ({ ...mk('out', ...parts), indent })

const COMMANDS = ['help', 'about', 'projects', 'skills', 'experience', 'open', 'github', 'linkedin', 'resume', 'email', 'clear']
const INTRO_KEY = 'workbench:terminal-intro'

/** `open` targets: every project id, plus "robovision" for the internship. */
const TARGETS = caseEntries.map((e) => ({
  slug: e.hash.startsWith('#experience/') ? 'robovision' : e.hash.slice('#project/'.length),
  title: e.study.title,
  hash: e.hash,
}))
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')

/** Exact slug, else the one target whose slug or title starts with / contains the query. */
const findTarget = (q: string) => {
  const n = norm(q)
  if (!n) return undefined
  const exact = TARGETS.find((x) => norm(x.slug) === n)
  if (exact) return exact
  for (const test of [(s: string) => s.startsWith(n), (s: string) => s.includes(n)]) {
    const hits = TARGETS.filter((x) => test(norm(x.slug)) || test(norm(x.title)))
    if (hits.length === 1) return hits[0]
    if (hits.length > 1) return undefined
  }
  return undefined
}

const commonPrefix = (words: string[]) =>
  words.reduce((pre, w) => {
    let i = 0
    while (i < pre.length && pre[i] === w[i]) i++
    return pre.slice(0, i)
  })

const pad = (s: string, n: number) => s + ' '.repeat(Math.max(1, n - s.length))
const strip = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

/** Renders `code` spans and links inside a line. */
function Segments({ parts }: { parts: Seg[] }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? (
          <Fragment key={i}>
            {p.split(/(`[^`]+`)/).map((chunk, j) =>
              chunk.startsWith('`') && chunk.endsWith('`') && chunk.length > 1 ? (
                <span key={j} className="text-gold">{chunk.slice(1, -1)}</span>
              ) : (
                chunk
              ),
            )}
          </Fragment>
        ) : (
          <a
            key={i}
            href={p.href}
            {...(p.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener' })}
            className="text-blush underline decoration-blush/40 underline-offset-4 hover:decoration-blush"
          >
            {p.text}
          </a>
        ),
      )}
    </>
  )
}

const TONE: Record<Tone, string> = {
  cmd: 'text-champagne',
  out: 'text-champagne/90',
  muted: 'text-champagne/60',
  accent: 'text-blush',
  error: 'text-rose-tint',
}

/** The contact terminal: a real, labelled input with a polite live log above it. */
export function Terminal() {
  const reduced = useReducedMotion()
  const { open: openPanel } = usePanel()
  const { setIsResume } = useResumeModeContext()
  const pdf = useAssetAvailable(links.resume, 'pdf')
  const inputId = useId()

  const [lines, setLines] = useState<Line[]>(() => t.welcome.map((w) => mk('muted', w)))
  const [value, setValue] = useState('')
  const history = useRef<string[]>([])
  const histIndex = useRef<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const userTouched = useRef(false)
  const introTimers = useRef<number[]>([])

  const print = useCallback((...ls: Line[]) => setLines((prev) => [...prev, ...ls]), [])

  // Keep the newest output in view.
  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const resumeHref = pdf ? links.resume : '?mode=resume'

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim()
      const echo = mk('cmd', `${t.prompt} ${raw}`)
      if (!input) return print(echo)
      history.current = [...history.current.filter((h) => h !== input), input]
      histIndex.current = null

      const [word = '', ...args] = input.split(/\s+/)
      const cmd = word.toLowerCase()
      const out: Line[] = [echo]
      const say = (tone: Tone, ...parts: Seg[]) => out.push(mk(tone, ...parts))
      const openUrl = (url: string, label: string) => {
        say('muted', t.opening(label))
        window.open(url, '_blank', 'noopener')
      }

      if (input.toLowerCase() === 'sudo hire-sheza') {
        t.hire.forEach((h, i) => say(i === 1 ? 'accent' : 'out', h))
        say('out', 'email:  ', { text: links.email, href: `mailto:${links.email}` })
        say('out', 'resume: ', { text: pdf ? strip(new URL(links.resume, location.href).href) : 'just the resume', href: resumeHref })
      } else if (cmd === 'sudo') {
        say('error', t.sudoDenied)
      } else {
        switch (cmd) {
          case 'help': {
            const w = Math.max(...t.help.map(([c]) => c.length)) + 3
            t.help.forEach(([c, d]) => out.push(row(w, `\`${pad(c, w)}\``, d)))
            break
          }
          case 'about':
            say('accent', `${profile.name} · ${profile.role} · ${profile.location}`)
            t.aboutLines.forEach((l) => say('out', l))
            say('muted', `currently learning: ${about.currentlyLearning}`)
            break
          case 'projects': {
            const w = Math.max(...TARGETS.map((x) => x.slug.length)) + 3
            TARGETS.forEach((x) => out.push(row(w, `\`${pad(x.slug, w)}\``, x.title)))
            say('muted', t.projectsHint)
            break
          }
          case 'skills':
            SKILL_CATEGORIES.forEach((cat) =>
              out.push(row(19, `\`${pad(cat, 19)}\``, skills.filter((s) => s.category === cat && s.featured).map((s) => s.name).join(', '))),
            )
            break
          case 'experience':
            experienceNewestFirst().forEach((e) => out.push(row(8, `\`${e.hash}\` ${e.type}: ${e.message} `, `(${e.date})`)))
            break
          case 'open': {
            const q = args.join(' ')
            if (!q) {
              say('muted', t.openUsage)
              break
            }
            const target = findTarget(q)
            if (!target) {
              say('error', t.noSuchProject(q))
              break
            }
            say('muted', t.opening(target.title))
            // After the output renders, so focus returns to this input when the panel closes.
            window.setTimeout(() => openPanel(target.hash, inputRef.current), 150)
            break
          }
          case 'github':
            openUrl(links.github, strip(links.github))
            break
          case 'linkedin':
            openUrl(links.linkedin, strip(links.linkedin))
            break
          case 'resume':
            if (pdf) openUrl(links.resume, 'resume.pdf')
            else {
              say('muted', t.resumeMode)
              window.setTimeout(() => setIsResume(true), 900)
            }
            break
          case 'email':
            navigator.clipboard
              ?.writeText(links.email)
              .then(() => print(mk('accent', t.copied(links.email))))
              .catch(() => print(mk('out', t.copyFailed(links.email))))
            if (!navigator.clipboard) say('out', t.copyFailed(links.email))
            break
          case 'clear':
            setLines([])
            return
          case 'coffee':
            t.coffee.forEach((l, i) => say(i === t.coffee.length - 1 ? 'muted' : 'accent', l))
            break
          default:
            say('error', t.notFound(word))
        }
      }
      print(...out)
    },
    [print, pdf, resumeHref, openPanel, setIsResume],
  )

  /* ── First visit: type `help` once, when the terminal scrolls into view ── */
  const cancelIntro = useCallback(() => {
    if (introTimers.current.length === 0) return
    introTimers.current.forEach((id) => window.clearTimeout(id))
    introTimers.current = []
    setValue('')
  }, [])

  useEffect(() => {
    if (reduced) return
    try {
      if (localStorage.getItem(INTRO_KEY)) return
    } catch {
      return
    }
    const el = frameRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || userTouched.current) return
        io.disconnect()
        try {
          localStorage.setItem(INTRO_KEY, '1')
        } catch {
          /* fine: it may replay next visit */
        }
        const word = 'help'
        const at = (ms: number, fn: () => void) => introTimers.current.push(window.setTimeout(fn, ms))
        ;[...word].forEach((_, i) => at(500 + i * 140, () => setValue(word.slice(0, i + 1))))
        at(500 + word.length * 140 + 350, () => {
          introTimers.current = []
          setValue('')
          run(word)
        })
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      introTimers.current.forEach((id) => window.clearTimeout(id))
    }
  }, [reduced, run])

  /* ── Keys: Enter, Tab completion, history ── */
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      run(value)
      setValue('')
      return
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const h = history.current
      if (h.length === 0) return
      e.preventDefault()
      let i = histIndex.current
      if (e.key === 'ArrowUp') i = i === null ? h.length - 1 : Math.max(0, i - 1)
      else i = i === null ? null : i + 1 >= h.length ? null : i + 1
      histIndex.current = i
      setValue(i === null ? '' : (h[i] as string))
      return
    }
    if (e.key === 'Tab' && !e.shiftKey && value.trim()) {
      // Only claim Tab when there is something to complete, so keyboard users can still leave.
      const lower = value.toLowerCase()
      const isOpen = /^open\s+/.test(lower)
      const typed = isOpen ? lower.replace(/^open\s+/, '') : lower
      const pool = isOpen ? TARGETS.map((x) => x.slug) : value.includes(' ') ? [] : COMMANDS
      const hits = pool.filter((c) => c.startsWith(typed))
      if (hits.length === 0) return
      e.preventDefault()
      const base = isOpen ? 'open ' : ''
      if (hits.length === 1) {
        const done = hits[0] as string
        setValue(base + done + (!isOpen && done === 'open' ? ' ' : ''))
      } else {
        const pre = commonPrefix(hits)
        if (pre.length > typed.length) setValue(base + pre)
        else print(mk('cmd', `${t.prompt} ${value}`), mk('muted', hits.join('   ')))
      }
    }
  }

  const prompt = (children: ReactNode) => (
    <span aria-hidden="true" className="shrink-0 text-blush">
      {children}
    </span>
  )

  return (
    <div
      ref={frameRef}
      data-section-frame=""
      className="max-w-3xl overflow-hidden rounded-2xl bg-espresso shadow-lifted ring-1 ring-espresso/10 transition-shadow duration-200 focus-within:ring-[3px] focus-within:ring-blush"
      onMouseUp={(e) => {
        // Clicking the terminal focuses the input, unless text is being selected or a link was hit.
        if ((e.target as HTMLElement).closest('a') || window.getSelection()?.toString()) return
        inputRef.current?.focus({ preventScroll: true })
      }}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-champagne/10 px-4 py-3">
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-blush" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-champagne/30" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-champagne/30" />
        <p className="ml-3 truncate font-mono text-xs text-champagne/60">{t.title}</p>
      </div>

      <div className="px-4 pb-4 pt-3 font-mono text-[0.8125rem] leading-relaxed sm:px-5 sm:text-sm">
        <div ref={logRef} role="log" aria-live="polite" aria-label={t.title} className="max-h-80 overflow-y-auto overscroll-contain whitespace-pre-wrap break-words">
          {lines.map((l) => (
            <div key={l.id} className={TONE[l.tone]} style={l.indent ? { paddingLeft: `${l.indent}ch`, textIndent: `-${l.indent}ch` } : undefined}>
              {l.tone === 'cmd' && l.parts[0] && typeof l.parts[0] === 'string' && l.parts[0].startsWith(t.prompt) ? (
                <>
                  {prompt(t.prompt)}
                  <span className="sr-only">$</span>
                  {(l.parts[0] as string).slice(t.prompt.length)}
                </>
              ) : (
                <Segments parts={l.parts} />
              )}
            </div>
          ))}
        </div>

        <div className="mt-1 flex items-center gap-2">
          {prompt(t.prompt)}
          <label htmlFor={inputId} className="sr-only">{t.inputLabel}</label>
          <input
            ref={inputRef}
            id={inputId}
            data-section-focus=""
            value={value}
            onChange={(e) => {
              cancelIntro()
              setValue(e.target.value)
            }}
            onKeyDown={(e) => {
              userTouched.current = true
              if (introTimers.current.length) cancelIntro()
              onKeyDown(e)
            }}
            onFocus={() => {
              userTouched.current = true
              cancelIntro()
            }}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="go"
            className="min-w-0 flex-1 rounded bg-transparent text-base text-champagne caret-blush outline-none placeholder:text-champagne/35 focus-visible:shadow-none focus-visible:outline-none sm:text-sm"
            placeholder="help"
          />
        </div>
      </div>
    </div>
  )
}

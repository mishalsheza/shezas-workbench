import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { copy, links, profile } from '../../data/content'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { DURATION, EASE } from '../../lib/motion'
import { ResumeLink } from '../layout/ResumeLink'

const navLink = 'link-quiet font-medium text-espresso'

export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: DURATION.slow, ease: EASE, delay },
        }

  return (
    <section id="top" aria-labelledby="hero-name" className="relative flex min-h-[100svh] flex-col justify-center px-4 pb-24 pt-28 sm:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <motion.p {...rise(0)} className="font-mono text-xs uppercase tracking-[0.22em] text-chestnut">
          {profile.role} · {profile.location}
        </motion.p>

        <motion.h1 {...rise(0.08)} id="hero-name" className="mt-6 text-display-xl">
          {profile.name}
        </motion.h1>

        {/* The thin chestnut line that draws itself in under the name. */}
        <motion.div
          aria-hidden="true"
          className="mt-6 h-[2px] w-full max-w-3xl origin-left bg-chestnut"
          initial={reduced ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
        />

        <motion.p {...rise(0.5)} className="mt-8 max-w-2xl font-display text-2xl italic leading-snug text-espresso sm:text-3xl">
          {profile.tagline}
        </motion.p>

        <motion.nav {...rise(0.65)} aria-label="Quick links" className="mt-10">
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-2 text-body-lg">
            <li>
              <a className={navLink} href="#projects">{copy.heroLinks.projects}</a>
            </li>
            <li aria-hidden="true" className="text-chestnut/50">·</li>
            <li>
              <a className={navLink} href={links.github} target="_blank" rel="noopener">{copy.heroLinks.github}</a>
            </li>
            <li aria-hidden="true" className="text-chestnut/50">·</li>
            <li>
              <ResumeLink className={navLink}>{copy.heroLinks.resume}</ResumeLink>
            </li>
            <li aria-hidden="true" className="text-chestnut/50">·</li>
            <li>
              <a className={navLink} href="#contact">{copy.heroLinks.contact}</a>
            </li>
          </ul>
        </motion.nav>
      </div>

      <motion.a
        href="#workbench"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.reveal, ease: EASE, delay: 1.2 }}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 text-sm text-chestnut"
      >
        {copy.heroHint}
        <motion.span
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        >
          <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  )
}

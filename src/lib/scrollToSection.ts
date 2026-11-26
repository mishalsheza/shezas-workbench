/**
 * Scrolls a page section into view and moves focus into it. If the section marks an
 * element with `data-section-focus` (e.g. the contact terminal's input), that element is
 * centred and focused; otherwise the section's heading is.
 */
export function scrollToSection(id: string, reducedMotion: boolean) {
  const section = document.getElementById(id)
  if (!section) return
  const behavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth'
  const target = section.querySelector<HTMLElement>('[data-section-focus]')
  if (target) {
    ;(target.closest<HTMLElement>('[data-section-frame]') ?? target).scrollIntoView({ behavior, block: 'center' })
    target.focus({ preventScroll: true })
    return
  }
  section.scrollIntoView({ behavior, block: 'start' })
  const heading = section.querySelector<HTMLElement>('h2')
  if (heading) {
    heading.tabIndex = -1
    heading.focus({ preventScroll: true })
  }
}

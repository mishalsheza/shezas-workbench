/** Scrolls a page section into view and moves focus to its heading. */
export function scrollToSection(id: string, reducedMotion: boolean) {
  const section = document.getElementById(id)
  if (!section) return
  section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  const heading = section.querySelector<HTMLElement>('h2')
  if (heading) {
    heading.tabIndex = -1
    heading.focus({ preventScroll: true })
  }
}

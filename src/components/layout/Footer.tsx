import { copy, links, profile } from '../../data/content'
import { ContactLinks } from './ContactLinks'

export function Footer() {
  return (
    <footer className="border-t border-chestnut/15 px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl tracking-tight text-chestnut">{profile.name}</p>
          <p className="mt-2 text-sm">
            {copy.footerBuiltWith} ·{' '}
            <a className="link-quiet" href={links.source} target="_blank" rel="noopener">
              {copy.footerSource}
            </a>
          </p>
        </div>
        <ContactLinks />
      </div>
    </footer>
  )
}

import { FileText, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './BrandIcons'
import { links } from '../../data/content'
import { ResumeLink } from './ResumeLink'

const pill =
  'inline-flex items-center gap-2 rounded-full border border-chestnut/30 px-4 py-2 text-sm font-medium text-espresso transition-colors duration-200 ease-workbench hover:border-chestnut hover:bg-blush-soft'

/** Email · GitHub · LinkedIn · Resume, as plain buttons. Used under the terminal and elsewhere. */
export function ContactLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      <li>
        <a className={pill} href={`mailto:${links.email}`}>
          <Mail aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} /> Email
        </a>
      </li>
      <li>
        <a className={pill} href={links.github} target="_blank" rel="noopener">
          <GithubIcon className="h-4 w-4" /> GitHub
        </a>
      </li>
      <li>
        <a className={pill} href={links.linkedin} target="_blank" rel="noopener">
          <LinkedinIcon className="h-4 w-4" /> LinkedIn
        </a>
      </li>
      <li>
        <ResumeLink className={pill}>
          <FileText aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} /> Resume
        </ResumeLink>
      </li>
    </ul>
  )
}

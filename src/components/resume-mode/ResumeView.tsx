import { Printer } from 'lucide-react'
import { SKILL_CATEGORIES, copy, education, experience, links, profile, projectsByCategory, skills } from '../../data/content'
import { useAssetAvailable } from '../../hooks/useAssetAvailable'

const stripScheme = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '')

function Heading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="border-b border-chestnut/20 pb-2 font-display text-2xl tracking-tight text-chestnut print:text-xl">
      {children}
    </h2>
  )
}

/** "Just the resume": one clean, printable column. No desk, no animation. */
export function ResumeView() {
  const pdf = useAssetAvailable(links.resume, 'pdf')
  const jobs = experience.filter((e) => e.caseStudy)

  return (
    <main id="top" className="resume mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-8 print:max-w-none print:p-0">
      <header>
        <h1 className="font-display text-5xl tracking-tight text-chestnut sm:text-6xl print:text-4xl">{profile.name}</h1>
        <p className="mt-2 text-body-lg">
          {profile.role} · {profile.location}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <li>
            <a className="link-quiet" href={`mailto:${links.email}`}>{links.email}</a>
          </li>
          <li>
            <a className="link-quiet" href={links.github}>{stripScheme(links.github)}</a>
          </li>
          <li>
            <a className="link-quiet" href={links.linkedin}>{stripScheme(links.linkedin)}</a>
          </li>
          {pdf && (
            <li className="print:hidden">
              <a className="link-quiet" href={links.resume} target="_blank" rel="noopener">resume.pdf</a>
            </li>
          )}
        </ul>
        <button type="button" onClick={() => window.print()} className="btn-primary no-print mt-6">
          <Printer aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} /> {copy.resumePrint}
        </button>
      </header>

      <section aria-labelledby="r-experience" className="mt-12 print:mt-6">
        <Heading id="r-experience">{copy.resumeExperienceHeading}</Heading>
        {jobs.map((job) => (
          <article key={job.id} className="mt-5 break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-sans text-lg font-semibold text-espresso">
                {job.organisation} · <span className="font-normal">{job.role}</span>
              </h3>
              <p className="font-mono text-xs text-chestnut">
                {job.date}{job.endDate ? ` – ${job.endDate}` : ''}{job.location ? ` · ${job.location}` : ''}
              </p>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.95rem]">
              {job.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {(['ai', 'fullstack'] as const).map((category) => (
        <section key={category} aria-labelledby={`r-${category}`} className="mt-12 print:mt-6">
          <Heading id={`r-${category}`}>{copy.categoryLabels[category]}</Heading>
          {projectsByCategory(category).map((p) => (
            <article key={p.id} className="mt-5 break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-sans text-lg font-semibold text-espresso">
                  {p.title}
                </h3>
                <p className="text-sm">
                  {p.liveUrl && (
                    <>
                      <a className="link-quiet" href={p.liveUrl}>Live</a> ·{' '}
                    </>
                  )}
                  <a className="link-quiet" href={p.githubUrl}>{stripScheme(p.githubUrl)}</a>
                </p>
              </div>
              <p className="mt-1 text-[0.95rem]">{p.summary}</p>
              {p.teamNote && <p className="mt-1 text-sm italic">{p.teamNote}</p>}
              <p className="mt-1 font-mono text-xs text-chestnut">{p.tech.join(' · ')}</p>
            </article>
          ))}
        </section>
      ))}

      <section aria-labelledby="r-skills" className="mt-12 print:mt-6">
        <Heading id="r-skills">{copy.resumeSkillsHeading}</Heading>
        <dl className="mt-4 grid gap-2 text-[0.95rem] sm:grid-cols-[10rem_1fr]">
          {SKILL_CATEGORIES.map((cat) => {
            const names = skills.filter((s) => s.category === cat).map((s) => s.name)
            if (names.length === 0) return null
            return (
              <div key={cat} className="contents">
                <dt className="font-semibold text-espresso">{cat}</dt>
                <dd>{names.join(', ')}</dd>
              </div>
            )
          })}
        </dl>
      </section>

      <section aria-labelledby="r-education" className="mt-12 print:mt-6">
        <Heading id="r-education">{copy.educationHeading}</Heading>
        {education.map((e) => (
          <article key={e.institution} className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 break-inside-avoid">
            <div>
              <h3 className="font-sans text-lg font-semibold text-espresso">{e.institution}</h3>
              <p className="text-[0.95rem]">{e.degree}</p>
            </div>
            <p className="font-mono text-xs text-chestnut">
              {e.dates} · {e.location}
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}

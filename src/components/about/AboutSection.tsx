import { about, copy } from '../../data/content'

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 px-4 py-24 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 id="about-heading" className="text-display-md outline-none">{copy.aboutHeading}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="mt-6 max-w-prose text-body-lg">{p}</p>
          ))}
        </div>
        <div className="space-y-8 self-end">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-chestnut">Currently learning</h3>
            <p className="mt-2">{about.currentlyLearning}</p>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-chestnut">Currently obsessed with</h3>
            <ol className="mt-3 space-y-2">
              {about.obsessedWith.map((item, i) => (
                <li key={item} className="flex gap-3 font-display text-xl text-espresso">
                  <span className="font-mono text-sm text-chestnut">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

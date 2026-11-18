import { useRef, useState, type CSSProperties } from 'react'
import { labProjects, moreWork, profile, projects, type Project, type ProjectTag } from '../data/content'
import SectionHead from '../components/SectionHead'
import SplitWords from '../components/SplitWords'
import { ArrowUpRight, GitHubIcon } from '../components/Icons'
import { AgroShiftVisual, FleetVisual, PhoenixVisual, ScamShieldVisual } from './ProjectVisuals'
import { hasFinePointer, prefersReducedMotion } from '../lib/device'
import { ScrollTrigger } from '../lib/scroll'

const filters: ('All' | ProjectTag)[] = ['All', 'AI / ML', 'Full-Stack', 'Real-Time', 'Data & Climate']

const visuals = {
  scamshield: ScamShieldVisual,
  agroshift: AgroShiftVisual,
  fleet: FleetVisual,
  phoenix: PhoenixVisual,
}

function TiltStage({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const Visual = visuals[project.visual]
  const enabled = typeof window !== 'undefined' && hasFinePointer() && !prefersReducedMotion()
  const move = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.setProperty('--rx', `${-y * 7}deg`)
    ref.current.style.setProperty('--ry', `${x * 9}deg`)
    ref.current.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const leave = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }
  return (
    <div className="launch__stage" ref={ref} onPointerMove={move} onPointerLeave={leave} data-cursor="explore">
      <div className="launch__stage-inner">
        <div className="launch__glow" aria-hidden="true" />
        <span className="launch__bignum" aria-hidden="true">
          {project.index}
        </span>
        <Visual />
        <span className="launch__illus mono" aria-hidden="true">
          Illustrative interface
        </span>
      </div>
    </div>
  )
}

function Launch({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <article className={`launch ${flip ? 'launch--flip' : ''}`} style={{ '--accent': p.accent } as CSSProperties} aria-labelledby={`p-${p.id}`} data-launch>
      <TiltStage project={p} />

      <div className="launch__info">
        <div className="launch__meta mono" data-reveal>
          <span>{p.index} / 0{projects.length}</span>
          <span className="launch__tags">{p.tags.join(' · ')}</span>
        </div>
        {p.badge ? (
          <p className="launch__badge mono" data-reveal>
            <span aria-hidden="true">◆</span> {p.badge}
          </p>
        ) : null}
        <h3 id={`p-${p.id}`} className="launch__name" data-reveal>
          {p.name}
        </h3>
        <p className="launch__kicker serif" data-reveal>
          {p.kicker}
        </p>
        <p className="launch__summary" data-reveal>
          {p.summary}
        </p>

        <div className="launch__cols" data-reveal>
          <div>
            <p className="mono launch__h">The problem</p>
            <p>{p.problem}</p>
          </div>
          <div>
            <p className="mono launch__h">My contribution</p>
            <p>{p.contribution}</p>
          </div>
        </div>

        <ul className="launch__features" data-reveal>
          {p.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <ul className="launch__stack mono" aria-label="Technology stack" data-reveal>
          {p.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
          {p.proof ? <li className="launch__proof">✓ {p.proof}</li> : null}
        </ul>

        <div className="launch__links" data-reveal>
          {p.live ? (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn--accent" data-cursor="open">
              Live demo <ArrowUpRight size={16} />
              <span className="sr-only"> for {p.name} (opens in new tab)</span>
            </a>
          ) : null}
          {p.github ? (
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn--line" data-cursor="code">
              <GitHubIcon size={16} /> Source
              <span className="sr-only"> code for {p.name} on GitHub (opens in new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const shown = projects.filter((p) => filter === 'All' || p.tags.includes(filter as ProjectTag))

  const choose = (f: (typeof filters)[number]) => {
    setFilter(f)
    // Layout height changes — let ScrollTrigger re-measure after paint.
    requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()))
  }

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          index="04"
          label="Selected work"
          title={
            <span id="work-title">
              <SplitWords text="The project" /> <em className="serif"><SplitWords text="universe." /></em>
            </span>
          }
          aside={<p>Products shipped end to end — each solving a real problem for real people, with tests and deployments to prove it.</p>}
        />

        <div className="work__filters" role="toolbar" aria-label="Filter projects" data-reveal>
          {filters.map((f) => {
            const n = f === 'All' ? projects.length : projects.filter((p) => p.tags.includes(f as ProjectTag)).length
            return (
              <button key={f} className={`chip ${filter === f ? 'is-on' : ''}`} aria-pressed={filter === f} onClick={() => choose(f)}>
                {f} <sup className="mono">{n}</sup>
              </button>
            )
          })}
        </div>

        <div className="work__list" aria-live="polite">
          {shown.map((p, i) => (
            <Launch key={p.id} p={p} flip={i % 2 === 1} />
          ))}
        </div>

        <div className="more">
          <div className="more__head" data-reveal>
            <p className="mono">Also shipped</p>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="ulink">
              All repositories on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
          <ul className="more__list">
            {moreWork.map((m) => (
              <li key={m.name} className="more__row" data-reveal>
                <a href={m.live ?? m.href} target="_blank" rel="noopener noreferrer" data-cursor="open">
                  <span className="more__name">{m.name}</span>
                  <span className="more__note">{m.note}</span>
                  <span className="more__stack mono">{m.stack}</span>
                  <span className="more__arrow" aria-hidden="true">
                    <ArrowUpRight size={20} />
                  </span>
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="lab" data-reveal>
            <p className="mono lab__label">
              <span className="pulse" aria-hidden="true" /> In the lab
            </p>
            <ul className="lab__list">
              {labProjects.map((l) => (
                <li key={l.name}>
                  <span className="lab__name">{l.name}</span>
                  <span className="mono lab__note">{l.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

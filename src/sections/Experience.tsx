import { experience } from '../data/content'
import SectionHead from '../components/SectionHead'
import SplitWords from '../components/SplitWords'
import { ArrowUpRight } from '../components/Icons'

export default function Experience() {
  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="container">
        <SectionHead
          index="05"
          label="Experience"
          title={
            <span id="journey-title">
              <SplitWords text="The professional" /> <em className="serif"><SplitWords text="journey." /></em>
            </span>
          }
        />

        <ol className="timeline">
          <span className="timeline__rail" aria-hidden="true">
            <span className="timeline__fill" data-timeline-fill />
          </span>
          {experience.map((x) => (
            <li key={x.org} className="tl" data-reveal>
              <span className="tl__node" aria-hidden="true" />
              <div className="tl__when mono">
                <span>{x.period}</span>
                {x.status ? <span className="tl__status">{x.status}</span> : null}
              </div>
              <div className="tl__card">
                <div className="tl__head">
                  <div>
                    <h3 className="tl__role">{x.role}</h3>
                    <p className="tl__org serif">{x.org}</p>
                  </div>
                  {x.href ? (
                    <a href={x.href} target="_blank" rel="noopener noreferrer" className="tl__link mono" aria-label={`${x.org} work on GitHub (opens in new tab)`}>
                      Repo <ArrowUpRight size={14} />
                    </a>
                  ) : null}
                </div>
                <p className="tl__summary">{x.summary}</p>
                {x.items.length ? (
                  <ul className="tl__items">
                    {x.items.map((it) => (
                      <li key={it.t}>
                        <span className="tl__it">{it.t}</span>
                        <span className="tl__id">{it.d}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <ul className="tl__stack mono" aria-label="Technologies">
                  {x.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

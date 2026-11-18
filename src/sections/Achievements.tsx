import { useRef } from 'react'
import { achievements } from '../data/content'
import SectionHead from '../components/SectionHead'
import SplitWords from '../components/SplitWords'
import { hasFinePointer, prefersReducedMotion } from '../lib/device'

function Plaque({ a, i }: { a: (typeof achievements)[number]; i: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const enabled = typeof window !== 'undefined' && hasFinePointer() && !prefersReducedMotion()
  const move = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    ref.current.style.setProperty('--rx', `${(0.5 - y) * 8}deg`)
    ref.current.style.setProperty('--ry', `${(x - 0.5) * 10}deg`)
    ref.current.style.setProperty('--gx', `${x * 100}%`)
    ref.current.style.setProperty('--gy', `${y * 100}%`)
  }
  const leave = () => {
    ref.current?.style.setProperty('--rx', '0deg')
    ref.current?.style.setProperty('--ry', '0deg')
  }
  return (
    <li ref={ref} className={`plaque plaque--${a.size}`} onPointerMove={move} onPointerLeave={leave} data-reveal>
      <div className="plaque__inner">
        <div className="plaque__top mono">
          <span>{String(i + 1).padStart(2, '0')}</span>
          <span>{a.kind}</span>
        </div>
        <p className="plaque__highlight serif" aria-hidden="true">
          {a.highlight}
        </p>
        <div>
          <h3 className="plaque__title">{a.title}</h3>
          <p className="plaque__detail">{a.detail}</p>
        </div>
      </div>
    </li>
  )
}

export default function Achievements() {
  return (
    <section id="honors" className="section honors" aria-labelledby="honors-title">
      <div className="container">
        <SectionHead
          index="06"
          label="Leadership & achievements"
          title={
            <span id="honors-title">
              <SplitWords text="Recognition," /> <em className="serif"><SplitWords text="earned in public." /></em>
            </span>
          }
        />
        <ul className="wall">
          {achievements.map((a, i) => (
            <Plaque key={a.title} a={a} i={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}

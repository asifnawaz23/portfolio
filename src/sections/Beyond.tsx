import { useState } from 'react'
import { beyond } from '../data/content'
import SectionHead from '../components/SectionHead'
import SplitWords from '../components/SplitWords'
import Terminal from './Terminal'

export default function Beyond() {
  const [active, setActive] = useState(0)
  return (
    <section id="beyond" className="section beyond" aria-labelledby="beyond-title">
      <div className="container">
        <SectionHead
          index="07"
          label="Beyond the screen"
          title={
            <span id="beyond-title">
              <SplitWords text="What keeps me" /> <em className="serif"><SplitWords text="building." /></em>
            </span>
          }
        />

        <div className="beyond__grid">
          <ul className="manifesto" onPointerLeave={() => undefined}>
            {beyond.map((b, i) => (
              <li key={b.word} className={`manifesto__item ${active === i ? 'is-on' : ''}`} data-reveal>
                <button onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-expanded={active === i}>
                  <span className="mono manifesto__k">{String(i + 1).padStart(2, '0')}</span>
                  <span className="manifesto__word">{b.word}</span>
                </button>
                <p className="manifesto__line">{b.line}</p>
              </li>
            ))}
          </ul>

          <div className="beyond__term" data-reveal>
            <p className="mono beyond__hint">Prefer the command line? Explore my profile here.</p>
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  )
}

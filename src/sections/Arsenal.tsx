import { useMemo, useState } from 'react'
import { techCategories, techs, type Tech, type TechCategory } from '../data/content'
import SectionHead from '../components/SectionHead'
import SplitWords from '../components/SplitWords'

const W = 1000
const H = 660
const CX = W / 2
const CY = H / 2

interface Placed extends Tech {
  x: number
  y: number
}
interface Hub {
  id: TechCategory
  code: string
  x: number
  y: number
  nodes: Placed[]
}

function layout(): Hub[] {
  return techCategories.map((c, i) => {
    const a = -Math.PI / 2 + (i / techCategories.length) * Math.PI * 2
    const hx = CX + Math.cos(a) * 300
    const hy = CY + Math.sin(a) * 200
    const items = techs.filter((t) => t.cat === c.id)
    const spread = Math.min(Math.PI * 1.3, 0.56 * items.length)
    const nodes = items.map((t, j) => {
      const na = a + (items.length === 1 ? 0 : -spread / 2 + (j / (items.length - 1)) * spread)
      const r = 98 + (j % 2) * 34
      return { ...t, x: hx + Math.cos(na) * r, y: hy + Math.sin(na) * r * 0.82 }
    })
    return { id: c.id, code: c.code, x: hx, y: hy, nodes }
  })
}

export default function Arsenal() {
  const hubs = useMemo(layout, [])
  const [cat, setCat] = useState<TechCategory | 'All'>('All')
  const [sel, setSel] = useState<Tech>(techs.find((t) => t.name === 'Hugging Face Transformers') ?? techs[0])

  const isDim = (c: TechCategory) => cat !== 'All' && cat !== c
  const catMeta = techCategories.find((c) => c.id === sel.cat)

  return (
    <section id="arsenal" className="section arsenal" aria-labelledby="arsenal-title">
      <div className="container">
        <SectionHead
          index="03"
          label="Technical arsenal"
          title={
            <span id="arsenal-title">
              <SplitWords text="The intelligence" /> <em className="serif"><SplitWords text="system." /></em>
            </span>
          }
          aside={<p>Every technology here is tied to real work. Hover, tap or tab through the constellation to see where each one has been used.</p>}
        />

        <div className="arsenal__filters" role="toolbar" aria-label="Filter technologies by category" data-reveal>
          {(['All', ...techCategories.map((c) => c.id)] as const).map((c) => (
            <button key={c} className={`chip ${cat === c ? 'is-on' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="arsenal__stage" data-reveal>
          <div className="constellation" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="constellation__svg" aria-hidden="true">
              <defs>
                <radialGradient id="coreGlow">
                  <stop offset="0%" stopColor="#a497ff" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#a497ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx={CX} cy={CY} rx={300} ry={200} className="orbit" />
              <ellipse cx={CX} cy={CY} rx={410} ry={290} className="orbit orbit--faint" />
              <circle cx={CX} cy={CY} r={90} fill="url(#coreGlow)" />
              {hubs.map((h) => (
                <g key={h.id} className={`hubg ${isDim(h.id) ? 'is-dim' : ''} ${sel.cat === h.id ? 'is-sel' : ''}`}>
                  <line x1={CX} y1={CY} x2={h.x} y2={h.y} className="link link--core" />
                  {h.nodes.map((n) => (
                    <line key={n.name} x1={h.x} y1={h.y} x2={n.x} y2={n.y} className={`link ${sel.name === n.name ? 'is-active' : ''}`} />
                  ))}
                </g>
              ))}
            </svg>

            <div className="constellation__core" style={{ left: `${(CX / W) * 100}%`, top: `${(CY / H) * 100}%` }} aria-hidden="true">
              <span className="mono">{techs.length}</span>
              <small className="mono">nodes</small>
            </div>

            {hubs.map((h) => (
              <div key={h.id} className={`hub ${isDim(h.id) ? 'is-dim' : ''}`} style={{ left: `${(h.x / W) * 100}%`, top: `${(h.y / H) * 100}%` }}>
                <button className="hub__btn" onClick={() => setCat(cat === h.id ? 'All' : h.id)} aria-pressed={cat === h.id} aria-label={`Focus ${h.id}`}>
                  <span className="mono">{h.code}</span>
                </button>
                <span className="hub__label mono" aria-hidden="true">
                  {h.id}
                </span>
              </div>
            ))}

            {hubs.flatMap((h) =>
              h.nodes.map((n, i) => (
                <button
                  key={n.name}
                  className={`node ${isDim(h.id) ? 'is-dim' : ''} ${sel.name === n.name ? 'is-sel' : ''}`}
                  style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%`, animationDelay: `${(i * 0.7) % 4}s` }}
                  onMouseEnter={() => setSel(n)}
                  onFocus={() => setSel(n)}
                  onClick={() => setSel(n)}
                  aria-describedby="tech-detail"
                >
                  <span className="node__dot" aria-hidden="true" />
                  <span className="node__name">{n.name}</span>
                </button>
              )),
            )}
          </div>

          <div className="arsenal__list">
            {techCategories
              .filter((c) => cat === 'All' || cat === c.id)
              .map((c) => (
                <div key={c.id} className="arsenal__group">
                  <p className="mono arsenal__gtitle">
                    <span>{c.code}</span> {c.id}
                  </p>
                  <div className="arsenal__chips">
                    {techs
                      .filter((t) => t.cat === c.id)
                      .map((t) => (
                        <button key={t.name} className={`tchip ${sel.name === t.name ? 'is-sel' : ''}`} onClick={() => setSel(t)} aria-describedby="tech-detail">
                          {t.name}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
          </div>

          <aside id="tech-detail" className="tech-detail" aria-live="polite">
            <p className="mono tech-detail__cat">
              <span className="tech-detail__code">{catMeta?.code}</span> {sel.cat}
            </p>
            <h3 className="tech-detail__name">{sel.name}</h3>
            <p className="tech-detail__note">{sel.note}</p>
            {sel.usedIn?.length ? (
              <div className="tech-detail__used">
                <p className="mono">Used in</p>
                <ul>
                  {sel.usedIn.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="mono tech-detail__hint">{catMeta?.blurb}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

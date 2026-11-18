import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/scroll'

/** Short, honest preloader: waits for fonts (and the 3D scene when present), capped at ~2.2s. */
export default function Preloader({ sceneReady, onDone }: { sceneReady: boolean; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  const [fontsReady, setFontsReady] = useState(false)
  const [timedOut, setTimedOut] = useState(false)
  const finished = useRef(false)

  useEffect(() => {
    document.fonts?.ready.then(() => setFontsReady(true)).catch(() => setFontsReady(true))
    const t = window.setTimeout(() => setTimedOut(true), 2200)
    return () => window.clearTimeout(t)
  }, [])

  const target = (fontsReady ? 50 : 20) + (sceneReady ? 50 : 20)
  const complete = (fontsReady && sceneReady) || timedOut

  useEffect(() => {
    const goal = complete ? 100 : target
    const id = window.setInterval(() => {
      setCount((c) => (c >= goal ? c : Math.min(goal, c + Math.max(1, Math.round((goal - c) / 6)))))
    }, 28)
    return () => window.clearInterval(id)
  }, [target, complete])

  useEffect(() => {
    if (count < 100 || finished.current || !root.current) return
    finished.current = true
    const tl = gsap.timeline({ onComplete: onDone })
    tl.to(root.current.querySelectorAll('.pre__line'), { yPercent: -110, duration: 0.6, ease: 'power3.in', stagger: 0.05 }).to(
      root.current,
      { clipPath: 'inset(0 0 100% 0)', duration: 0.9, ease: 'expo.inOut' },
      '-=0.2',
    )
  }, [count, onDone])

  return (
    <div ref={root} className="pre" role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="pre__grid" aria-hidden="true" />
      <div className="pre__center">
        <div className="pre__mask">
          <span className="pre__line mono">INITIALISING THE DIGITAL FRONTIER</span>
        </div>
        <div className="pre__mask">
          <span className="pre__line pre__name">Muhammad Asif Nawaz</span>
        </div>
      </div>
      <div className="pre__foot">
        <div className="pre__mask">
          <span className="pre__line mono">Karachi · 24.86° N, 67.00° E</span>
        </div>
        <div className="pre__mask">
          <span className="pre__line pre__count mono">{String(count).padStart(3, '0')}</span>
        </div>
      </div>
      <div className="pre__bar" style={{ transform: `scaleX(${count / 100})` }} />
    </div>
  )
}

import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'
import type { RenderTier } from '../lib/device'
import { scrollToTarget } from '../lib/scroll'
import Magnetic from '../components/Magnetic'
import { ArrowDown, ArrowUpRight } from '../components/Icons'

const HeroScene = lazy(() => import('../three/HeroScene'))

interface Props {
  tier: RenderTier
  reduced: boolean
  onSceneReady: () => void
}

export default function Hero({ tier, reduced, onSceneReady }: Props) {
  const section = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(true)
  const [time, setTime] = useState('')

  useEffect(() => {
    if (!section.current) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '0px 0px 0px 0px' })
    io.observe(section.current)
    return () => io.disconnect()
  }, [])

  // Karachi local time — a small "live system" detail.
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Karachi', hour12: false })
    const tick = () => setTime(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    if (tier === 'none') onSceneReady()
  }, [tier, onSceneReady])

  return (
    <section id="hero" ref={section} className="hero" aria-labelledby="hero-title">
      <div className="hero__stage" aria-hidden="true">
        <div className="hero__fallback">
          <div className="orb" />
          <div className="orb__ring orb__ring--1" />
          <div className="orb__ring orb__ring--2" />
          <div className="orb__ring orb__ring--3" />
        </div>
        {tier !== 'none' && (
          <Suspense fallback={null}>
            <HeroScene tier={tier} reduced={reduced} active={inView} onReady={onSceneReady} />
          </Suspense>
        )}
        <div className="hero__vignette" />
        <div className="hero__grid" />
      </div>

      <div className="hero__hud mono" aria-hidden="true">
        <span className="hud__tl">
          <i className="hud__tick" /> SYS.CORE / ONLINE
        </span>
        <span className="hud__tr">KHI {time} PKT</span>
        <span className="hud__bl">24.86°N · 67.00°E</span>
        <span className="hud__br">v2.0 — THE DIGITAL FRONTIER</span>
      </div>

      <div className="hero__content container">
        <p className="hero__eyebrow mono" data-hero>
          <span className="pulse" aria-hidden="true" />
          {profile.status}
        </p>

        <h1 id="hero-title" className="hero__title">
          <span className="sr-only">{profile.name} — </span>
          <span className="hero__line" data-hero-line>
            <span>I build intelligent</span>
          </span>
          <span className="hero__line" data-hero-line>
            <span>
              systems that <em className="serif">explain</em>
            </span>
          </span>
          <span className="hero__line" data-hero-line>
            <span>
              <em className="serif">themselves.</em>
            </span>
          </span>
        </h1>

        <div className="hero__identity" data-hero>
          <p className="hero__name">{profile.name}</p>
          <ul className="hero__roles mono" aria-label="Roles">
            {profile.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <p className="hero__lede" data-hero>
          Software engineer from Karachi turning AI research into products people can trust — from scam detection and climate-smart farming to real-time fleet systems.
        </p>

        <div className="hero__ctas" data-hero>
          <Magnetic
            href="#work"
            variant="solid"
            cursor="explore"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('work')
            }}
          >
            Explore my work <ArrowDown size={16} />
          </Magnetic>
          <Magnetic
            href="#contact"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault()
              scrollToTarget('contact')
            }}
          >
            Let’s connect <ArrowUpRight size={16} />
          </Magnetic>
        </div>
      </div>

      <button className="hero__scroll mono" onClick={() => scrollToTarget('about')} aria-label="Scroll to About section" data-hero>
        <span className="hero__scroll-track" aria-hidden="true">
          <span />
        </span>
        Scroll
      </button>
    </section>
  )
}

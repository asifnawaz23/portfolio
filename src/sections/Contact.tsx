import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/content'
import Magnetic from '../components/Magnetic'
import SplitWords from '../components/SplitWords'
import { ArrowUp, ArrowUpRight, GitHubIcon, LinkedInIcon, Mail } from '../components/Icons'
import { prefersReducedMotion } from '../lib/device'
import { scrollToTarget } from '../lib/scroll'

/** Dot field that bends away from the pointer. Only animates while visible. */
function SignalField() {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const reduced = prefersReducedMotion()
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    const mouse = { x: -9999, y: -9999 }
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const gap = 26

    const resize = () => {
      const r = c.getBoundingClientRect()
      w = r.width
      h = r.height
      c.width = w * dpr
      c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!running) draw(0)
    }
    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (let y = gap / 2; y < h; y += gap) {
        for (let x = gap / 2; x < w; x += gap) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const d = Math.sqrt(dx * dx + dy * dy)
          const f = Math.max(0, 1 - d / 180)
          const wave = reduced ? 0 : Math.sin(x * 0.012 + t * 0.0006) * Math.cos(y * 0.014 + t * 0.0005)
          const ox = (dx / (d || 1)) * f * 14
          const oy = (dy / (d || 1)) * f * 14 + wave * 3
          const a = 0.1 + f * 0.6 + (wave + 1) * 0.04
          ctx.fillStyle = f > 0.05 ? `rgba(164,151,255,${a})` : `rgba(200,205,224,${a})`
          ctx.beginPath()
          ctx.arc(x + ox, y + oy, 1 + f * 1.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      if (reduced) draw(0)
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !reduced) {
        if (!running) {
          running = true
          raf = requestAnimationFrame(loop)
        }
      } else {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(c)
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(c)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return <canvas ref={canvas} className="contact__field" aria-hidden="true" />
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <SignalField />
      <div className="contact__veil" aria-hidden="true" />
      <div className="container contact__inner">
        <p className="mono contact__label" data-reveal>
          § 08 — Let’s build something
        </p>
        <h2 id="contact-title" className="contact__title" data-split>
          <SplitWords text="Have an idea" /> <em className="serif"><SplitWords text="worth building?" /></em>
        </h2>
        <p className="contact__lede" data-reveal>
          Recruiters, founders, developers and collaborators — I’m open to internships, entry-level roles and ambitious side projects. My inbox is always open.
        </p>

        <div className="contact__cta" data-reveal>
          <Magnetic href={`mailto:${profile.email}`} variant="solid" className="mag--xl" cursor="write">
            <Mail size={20} /> {profile.email}
          </Magnetic>
          <button className="copy mono" onClick={copy} aria-live="polite">
            {copied ? 'Copied ✓' : 'Copy email'}
          </button>
        </div>

        <ul className="contact__links" data-reveal>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="clink" data-cursor="open">
              <LinkedInIcon size={22} />
              <span>
                <b>LinkedIn</b>
                <small className="mono">in/{profile.linkedinHandle}</small>
              </span>
              <ArrowUpRight size={18} />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="clink" data-cursor="open">
              <GitHubIcon size={22} />
              <span>
                <b>GitHub</b>
                <small className="mono">@{profile.githubHandle}</small>
              </span>
              <ArrowUpRight size={18} />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </li>
          <li>
            <a href={`mailto:${profile.email}`} className="clink" data-cursor="write">
              <Mail size={22} />
              <span>
                <b>Email</b>
                <small className="mono">{profile.email}</small>
              </span>
              <ArrowUpRight size={18} />
            </a>
          </li>
        </ul>
      </div>

      <footer className="footer container">
        <p className="footer__name">
          {profile.name}
          <span className="mono"> © {new Date().getFullYear()}</span>
        </p>
        <p className="mono footer__built">Built with React, Three.js &amp; GSAP · Karachi</p>
        <button className="totop mono" onClick={() => scrollToTarget(0)} aria-label="Back to top" data-cursor="top">
          <ArrowUp size={16} /> Top
        </button>
      </footer>
    </section>
  )
}

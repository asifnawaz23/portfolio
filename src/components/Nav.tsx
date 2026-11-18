import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { navItems, profile } from '../data/content'
import { scrollToTarget, stopScroll } from '../lib/scroll'

export default function Nav() {
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const [pill, setPill] = useState<{ x: number; w: number; on: boolean }>({ x: 0, w: 0, on: false })
  const menuBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['hero', ...navItems.map((n) => n.id), 'beyond'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    const ul = listRef.current
    const link = ul?.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`)
    if (!ul || !link) {
      setPill((p) => ({ ...p, on: false }))
      return
    }
    setPill({ x: link.offsetLeft, w: link.offsetWidth, on: true })
  }, [active])

  useEffect(() => {
    stopScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const wasOpen = open
    setOpen(false)
    window.setTimeout(() => scrollToTarget(id), wasOpen ? 380 : 0)
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
        <a href="#hero" className="nav__brand" onClick={go('hero')} aria-label={`${profile.name} — back to top`}>
          <span className="nav__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <path d="M6 25 16 6l10 19" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <path d="M10.5 18h11" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="16" cy="6" r="2" fill="var(--violet)" />
            </svg>
          </span>
          <span className="nav__name">
            Asif Nawaz<span className="nav__dot">.</span>
          </span>
        </a>

        <nav aria-label="Primary" className="nav__desktop">
          <ul ref={listRef} className="nav__list">
            <li className="nav__pill" style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.on ? 1 : 0 }} aria-hidden="true" />
            {navItems.map((n, i) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  data-id={n.id}
                  onClick={go(n.id)}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={active === n.id ? 'is-active' : ''}
                >
                  <span className="mono nav__num">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={`mailto:${profile.email}`} className="nav__cta">
          <span className="nav__status" aria-hidden="true" /> Let’s talk
        </a>

        <button
          ref={menuBtn}
          className="nav__burger"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
        <div className="nav__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      </header>

      <div id="mobile-menu" className={`mmenu ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          <ol className="mmenu__list">
            {navItems.map((n, i) => (
              <li key={n.id} style={{ transitionDelay: open ? `${120 + i * 55}ms` : '0ms' }}>
                <a href={`#${n.id}`} onClick={go(n.id)}>
                  <span className="mono">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mmenu__foot mono">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <div>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

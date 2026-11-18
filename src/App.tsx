import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { detectRenderTier, prefersReducedMotion } from './lib/device'
import { gsap, initSmoothScroll, ScrollTrigger, stopScroll } from './lib/scroll'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Arsenal from './sections/Arsenal'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Achievements from './sections/Achievements'
import Beyond from './sections/Beyond'
import Contact from './sections/Contact'

export default function App() {
  const [tier] = useState(detectRenderTier)
  const [reduced] = useState(prefersReducedMotion)
  const [sceneReady, setSceneReady] = useState(false)
  const [loaded, setLoaded] = useState(reduced)
  const root = useRef<HTMLDivElement>(null)

  const onSceneReady = useCallback(() => setSceneReady(true), [])
  const onLoaded = useCallback(() => setLoaded(true), [])

  useEffect(() => initSmoothScroll(), [])

  useEffect(() => {
    stopScroll(!loaded)
    if (loaded) document.documentElement.classList.add('is-loaded')
  }, [loaded])

  // Hide intro elements before first paint so the preloader hand-off is seamless.
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.set('[data-hero-line] > span', { yPercent: 110 })
      gsap.set('[data-hero]', { autoAlpha: 0, y: 24 })
      gsap.set('.nav', { autoAlpha: 0, y: -20 })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // Intro + scroll choreography.
  useLayoutEffect(() => {
    if (!loaded || reduced) return
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'expo.out' } })
      intro
        .to('[data-hero-line] > span', { yPercent: 0, duration: 1.5, stagger: 0.09 })
        .to('[data-hero]', { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, '-=1.15')
        .to('.nav', { autoAlpha: 1, y: 0, duration: 1 }, '-=1.1')

      // Hero copy drifts and fades as you leave.
      gsap.to('.hero__content', {
        yPercent: -18,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // Split headings rise word by word.
      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((h) => {
        gsap.from(h.querySelectorAll('.split__word'), {
          yPercent: 115,
          rotate: 4,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.05,
          scrollTrigger: { trigger: h, start: 'top 85%' },
        })
      })

      // Generic reveals, batched for efficiency.
      gsap.set('[data-reveal]', { autoAlpha: 0, y: 36 })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, overwrite: true }),
      })

      gsap.utils.toArray<HTMLElement>('[data-clip-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 80%' } },
        )
        const img = el.querySelector('img')
        if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1')
        gsap.to(el, { yPercent: speed * 100, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })

      // Project stages ease in with depth.
      gsap.utils.toArray<HTMLElement>('[data-launch] .launch__stage-inner').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.9, rotateX: 8, autoAlpha: 0.2 },
          { scale: 1, rotateX: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 45%', scrub: 0.6 } },
        )
      })

      const fill = document.querySelector('[data-timeline-fill]')
      if (fill) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: true } },
        )
      }

      gsap.from('.ticker', { autoAlpha: 0, duration: 1.2, scrollTrigger: { trigger: '.ticker', start: 'top 95%' } })
    }, root)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)
    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [loaded, reduced])

  return (
    <div ref={root}>
      {!reduced && !loaded ? <Preloader sceneReady={sceneReady || tier === 'none'} onDone={onLoaded} /> : null}
      <Cursor />
      <Nav />
      <main id="main">
        <Hero tier={tier} reduced={reduced} onSceneReady={onSceneReady} />
        <About />
        <Arsenal />
        <Projects />
        <Experience />
        <Achievements />
        <Beyond />
        <Contact />
      </main>
    </div>
  )
}

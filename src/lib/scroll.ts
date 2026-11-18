import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './device'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/** Smooth scrolling (desktop + reduced-motion aware), wired into ScrollTrigger. */
export function initSmoothScroll(): () => void {
  if (prefersReducedMotion()) return () => {}
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

export function stopScroll(stop: boolean) {
  if (!lenis) {
    document.documentElement.style.overflow = stop ? 'hidden' : ''
    return
  }
  if (stop) lenis.stop()
  else lenis.start()
}

/** Scroll to a section id (or 0 for top), with smooth easing when available. */
export function scrollToTarget(target: string | number) {
  const el = typeof target === 'string' ? document.getElementById(target) : null
  if (typeof target === 'string' && !el) return
  if (lenis) {
    lenis.scrollTo(el ?? (target as number), { offset: 0, duration: 1.4 })
  } else {
    const top = el ? el.getBoundingClientRect().top + window.scrollY : (target as number)
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }
  if (el) {
    el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  }
}

export { gsap, ScrollTrigger }

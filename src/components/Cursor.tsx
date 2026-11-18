import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../lib/device'

/** Dot + trailing ring. Grows and shows a label over [data-cursor] targets. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!hasFinePointer()) return
    document.documentElement.classList.add('has-cursor')
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    const lerp = prefersReducedMotion() ? 1 : 0.18
    let raf = 0
    let visible = false

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (!visible) {
        visible = true
        ringPos.x = pos.x
        ringPos.y = pos.y
        dot.current?.classList.add('is-visible')
        ring.current?.classList.add('is-visible')
      }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor], a, button, input, textarea, [role="button"]')
      const mode = target?.dataset.cursor ?? (target ? (target.matches('input, textarea') ? 'text' : 'hover') : '')
      const r = ring.current
      if (!r) return
      r.dataset.mode = mode
      if (label.current) label.current.textContent = mode && !['hover', 'text'].includes(mode) ? mode : ''
    }
    const onLeave = () => {
      visible = false
      dot.current?.classList.remove('is-visible')
      ring.current?.classList.remove('is-visible')
    }
    const onDown = () => ring.current?.classList.add('is-down')
    const onUp = () => ring.current?.classList.remove('is-down')

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * lerp
      ringPos.y += (pos.y - ringPos.y) * lerp
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true">
        <span ref={label} className="cursor-ring__label mono" />
      </div>
    </>
  )
}

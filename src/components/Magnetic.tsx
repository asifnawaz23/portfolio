import { useRef, type ReactNode, type AnchorHTMLAttributes } from 'react'
import { hasFinePointer, prefersReducedMotion } from '../lib/device'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  strength?: number
  variant?: 'solid' | 'ghost' | 'bare'
  cursor?: string
}

/** Link/button that leans toward the pointer. */
export default function Magnetic({ children, strength = 0.35, variant = 'solid', className = '', cursor, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const inner = useRef<HTMLSpanElement>(null)
  const enabled = typeof window !== 'undefined' && hasFinePointer() && !prefersReducedMotion()

  const move = (e: React.PointerEvent) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    ref.current.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
    if (inner.current) inner.current.style.transform = `translate3d(${x * strength * 0.35}px, ${y * strength * 0.35}px, 0)`
  }
  const leave = () => {
    if (!ref.current) return
    ref.current.style.transform = ''
    if (inner.current) inner.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      className={`mag mag--${variant} ${className}`}
      onPointerMove={move}
      onPointerLeave={leave}
      data-cursor={cursor ?? 'hover'}
      {...rest}
    >
      <span ref={inner} className="mag__inner">
        {children}
      </span>
    </a>
  )
}

export type RenderTier = 'high' | 'low' | 'none'

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const hasFinePointer = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

/** Decide how much 3D the current device should render. */
export function detectRenderTier(): RenderTier {
  if (typeof window === 'undefined') return 'none'
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return 'none'
    ;(gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    return 'none'
  }
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return 'low'
  const small = window.matchMedia('(max-width: 860px)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4
  const fewCores = (nav.hardwareConcurrency || 8) <= 4
  return small || coarse || lowMemory || fewCores ? 'low' : 'high'
}

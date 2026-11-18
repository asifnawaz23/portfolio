import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Lightformer, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import type { RenderTier } from '../lib/device'

/**
 * "The Core" — a liquid-chrome intelligence core inside a faceted glass shell,
 * wrapped by orbital rings carrying data nodes, with a field of drifting shards.
 * One draw-light scene: no external models or textures, procedural environment.
 */

interface Props {
  tier: Exclude<RenderTier, 'none'>
  reduced: boolean
  active: boolean
  onReady?: () => void
}

const pointer = { x: 0, y: 0 }

function useScrollProgress() {
  const p = useRef(0)
  useEffect(() => {
    const onScroll = () => {
      p.current = Math.min(1.4, window.scrollY / Math.max(1, window.innerHeight))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return p
}

function Ring({ radius, tilt, speed, nodes, opacity = 0.55 }: { radius: number; tilt: [number, number, number]; speed: number; nodes: number; opacity?: number }) {
  const group = useRef<THREE.Group>(null)
  const nodeAngles = useMemo(() => Array.from({ length: nodes }, (_, i) => (i / nodes) * Math.PI * 2 + radius), [nodes, radius])
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.z += dt * speed
  })
  return (
    <group rotation={tilt}>
      <group ref={group}>
        <mesh>
          <torusGeometry args={[radius, 0.0065, 8, 220]} />
          <meshStandardMaterial color="#cfd3df" metalness={1} roughness={0.25} transparent opacity={opacity} />
        </mesh>
        {nodeAngles.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
            <sphereGeometry args={[i === 0 ? 0.055 : 0.032, 16, 16]} />
            <meshBasicMaterial color={i === 0 ? '#c9e4ff' : '#a497ff'} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Shards({ count }: { count: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const data = useMemo(() => {
    const rnd = mulberry32(7)
    return Array.from({ length: count }, () => {
      const r = 3.6 + rnd() * 3.4
      const theta = rnd() * Math.PI * 2
      const phi = Math.acos(2 * rnd() - 1)
      return {
        pos: new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.7, r * Math.sin(phi) * Math.sin(theta) - 1),
        rot: new THREE.Euler(rnd() * 6, rnd() * 6, rnd() * 6),
        spin: 0.1 + rnd() * 0.4,
        scale: 0.03 + rnd() * 0.09,
        phase: rnd() * Math.PI * 2,
      }
    })
  }, [count])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  useFrame(({ clock }) => {
    const m = ref.current
    if (!m) return
    const t = clock.elapsedTime
    data.forEach((d, i) => {
      dummy.position.copy(d.pos)
      dummy.position.y += Math.sin(t * 0.4 + d.phase) * 0.15
      dummy.rotation.set(d.rot.x + t * d.spin, d.rot.y + t * d.spin * 0.7, d.rot.z)
      dummy.scale.setScalar(d.scale)
      dummy.updateMatrix()
      m.setMatrixAt(i, dummy.matrix)
    })
    m.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#d7dae4" metalness={1} roughness={0.18} flatShading />
    </instancedMesh>
  )
}

function Dust({ count }: { count: number }) {
  const geo = useMemo(() => {
    const rnd = mulberry32(42)
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * 22
      arr[i * 3 + 1] = (rnd() - 0.5) * 12
      arr[i * 3 + 2] = (rnd() - 0.5) * 12 - 3
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [count])
  const ref = useRef<THREE.Points>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.018} color="#c8cde0" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Core({ tier, reduced }: { tier: Props['tier']; reduced: boolean }) {
  const root = useRef<THREE.Group>(null)
  const shell = useRef<THREE.Mesh>(null)
  const edges = useRef<THREE.LineSegments>(null)
  const born = useRef<number | null>(null)
  const scroll = useScrollProgress()
  const { viewport, camera, size } = useThree()

  const shellGeo = useMemo(() => new THREE.IcosahedronGeometry(1.62, 1), [])
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(shellGeo), [shellGeo])

  // Place the core to the right on wide screens, centred behind the type on narrow ones.
  // Must match the 900px breakpoint in global.css where the hero copy re-stacks.
  const wide = size.width >= 900 && viewport.aspect > 1.15
  const baseX = wide ? Math.min(3.2, viewport.width * 0.26) : 0
  const baseY = wide ? 0.05 : viewport.height * 0.26
  const baseScale = wide ? 0.8 : Math.min(0.55, viewport.width * 0.16)

  useFrame(({ clock }, dt) => {
    const g = root.current
    if (!g) return
    if (born.current === null) born.current = clock.elapsedTime
    const age = clock.elapsedTime - born.current
    const intro = reduced ? 1 : easeOutExpo(Math.min(1, age / 2.4))
    const s = scroll.current

    // Pointer parallax, eased.
    const tx = pointer.y * 0.25
    const ty = pointer.x * 0.4
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, tx + s * 0.6, 3, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, ty + (reduced ? 0 : clock.elapsedTime * 0.06) + s * 1.2, 3, dt)

    const scale = baseScale * (0.55 + 0.45 * intro) * (1 - s * 0.25)
    g.scale.setScalar(scale)
    g.position.x = baseX - (wide ? s * 1.2 : 0)
    g.position.y = baseY + s * 1.6 + (1 - intro) * -0.6

    if (shell.current) {
      shell.current.rotation.y -= dt * 0.08
      shell.current.rotation.z += dt * 0.03
    }
    if (edges.current && shell.current) edges.current.rotation.copy(shell.current.rotation)

    // Gentle camera drift with the pointer.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.35, 2, dt)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * 0.2, 2, dt)
    camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={root} scale={0.55}>
      {/* liquid chrome nucleus */}
      <mesh>
        <sphereGeometry args={[0.92, tier === 'high' ? 128 : 64, tier === 'high' ? 128 : 64]} />
        <MeshDistortMaterial
          color="#b9bccb"
          metalness={1}
          roughness={0.12}
          distort={reduced ? 0.18 : 0.34}
          speed={reduced ? 0 : 1.4}
          envMapIntensity={2.4}
        />
      </mesh>

      {/* faceted glass shell */}
      <mesh ref={shell} geometry={shellGeo}>
        <meshPhysicalMaterial
          color="#cfc8ff"
          roughness={0.04}
          metalness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          flatShading
          transparent
          opacity={tier === 'high' ? 0.2 : 0.16}
          envMapIntensity={2.2}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <lineSegments ref={edges} geometry={edgeGeo} scale={1.002}>
        <lineBasicMaterial color="#c3bbff" transparent opacity={0.22} />
      </lineSegments>

      <Ring radius={2.3} tilt={[1.2, 0.2, 0]} speed={0.18} nodes={3} />
      <Ring radius={2.75} tilt={[0.4, -0.7, 0.3]} speed={-0.12} nodes={2} opacity={0.4} />
      <Ring radius={3.25} tilt={[1.75, 0.6, -0.4]} speed={0.08} nodes={4} opacity={0.28} />
    </group>
  )
}

function SceneContents({ tier, reduced, onReady }: Omit<Props, 'active'>) {
  const ready = useRef(false)
  useFrame(() => {
    if (!ready.current) {
      ready.current = true
      onReady?.()
    }
  })
  return (
    <>
      <color attach="background" args={['#060609']} />
      <fog attach="fog" args={['#060609', 7, 17]} />
      <ambientLight intensity={0.15} />
      <directionalLight position={[-4, 5, 3]} intensity={1.6} color="#b3a8ff" />
      <directionalLight position={[5, -2, -4]} intensity={2.2} color="#9fd0ff" />
      <pointLight position={[0, 0, 2.5]} intensity={6} distance={6} color="#7fe7ee" />

      <Environment resolution={tier === 'high' ? 256 : 128} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, -6]} scale={[12, 2, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={2.4} position={[-6, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} color="#8f7dff" />
        <Lightformer form="rect" intensity={2.2} position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#9cd2ff" />
        <Lightformer form="ring" intensity={1.6} position={[0, -4, 3]} scale={3} color="#7fe7ee" />
      </Environment>

      <Core tier={tier} reduced={reduced} />
      <Shards count={tier === 'high' ? 46 : 18} />
      <Dust count={tier === 'high' ? 650 : 220} />
    </>
  )
}

export default function HeroScene({ tier, reduced, active, onReady }: Props) {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      className="hero-canvas"
      dpr={tier === 'high' ? [1, 1.75] : [1, 1.25]}
      camera={{ position: [0, 0, 7.2], fov: 38, near: 0.1, far: 40 }}
      gl={{ antialias: tier === 'high', powerPreference: 'high-performance', alpha: false, stencil: false }}
      frameloop={!active ? 'never' : reduced ? 'demand' : 'always'}
      aria-hidden="true"
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <SceneContents tier={tier} reduced={reduced} onReady={onReady} />
    </Canvas>
  )
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

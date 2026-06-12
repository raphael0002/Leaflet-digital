// components/ui/globe.tsx
"use client"

import { useEffect, useRef, useState, useMemo, useCallback } from "react"
import { Color, Scene, Fog, PerspectiveCamera, Vector3, Group } from "three"
import ThreeGlobe from "three-globe"
import { useThree, Canvas, extend } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import countries from "@/features/marketing/data/globe.json"

// ─── Extend ThreeGlobe into R3F ───────────────────────────────────────────────

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: ThreeElements["mesh"] & { new (): ThreeGlobe }
  }
}

extend({ ThreeGlobe })

// ─── Constants ────────────────────────────────────────────────────────────────

const RING_PROPAGATION_SPEED = 3
const ASPECT = 1.2
const CAMERA_Z = 300
const MAX_PIXEL_RATIO = 2

// ─── Types ────────────────────────────────────────────────────────────────────

export type Position = {
  order: number
  startLat: number
  startLng: number
  endLat: number
  endLng: number
  arcAlt: number
  color: string
}

export type GlobeConfig = {
  pointSize?: number
  globeColor?: string
  showAtmosphere?: boolean
  atmosphereColor?: string
  atmosphereAltitude?: number
  emissive?: string
  emissiveIntensity?: number
  shininess?: number
  polygonColor?: string
  ambientLight?: string
  directionalLeftLight?: string
  directionalTopLight?: string
  pointLight?: string
  arcTime?: number
  arcLength?: number
  rings?: number
  maxRings?: number
  initialPosition?: { lat: number; lng: number }
  autoRotate?: boolean
  autoRotateSpeed?: number
}

interface WorldProps {
  globeConfig: GlobeConfig
  data: Position[]
}

// ─── Utility ─────────────────────────────────────────────────────────────────

function sampleIndices(count: number, total: number): number[] {
  const indices = new Set<number>()
  const safeCount = Math.min(count, total)
  let attempts = 0
  while (indices.size < safeCount && attempts < total * 3) {
    indices.add(Math.floor(Math.random() * total))
    attempts++
  }
  return Array.from(indices)
}

// ─── WebGL renderer config ────────────────────────────────────────────────────

function RendererConfig() {
  const { gl, size } = useThree()

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO))
    gl.setSize(size.width, size.height)
    gl.setClearColor(0x000000, 0)
  }, [gl, size])

  return null
}

// ─── Core Globe (inner R3F component) ────────────────────────────────────────

function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null)
  const groupRef = useRef<Group>(null)
  const [ready, setReady] = useState(false)

  const config = useMemo(
    () => ({
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#1d072e",
      emissive: "#000000",
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    }),
    [globeConfig],
  )

  // One-time mount: create globe and attach to group
  useEffect(() => {
    if (globeRef.current || !groupRef.current) return

    const globe = new ThreeGlobe()
    globeRef.current = globe
    groupRef.current.add(globe)
    setReady(true)

    return () => {
      groupRef.current?.remove(globe)
      globeRef.current = null
    }
  }, [])

  // Material config
  useEffect(() => {
    if (!globeRef.current || !ready) return

    const mat = globeRef.current.globeMaterial() as unknown as {
      color: Color
      emissive: Color
      emissiveIntensity: number
      shininess: number
    }

    mat.color = new Color(config.globeColor)
    mat.emissive = new Color(config.emissive)
    mat.emissiveIntensity = config.emissiveIntensity ?? 0.1
    mat.shininess = config.shininess ?? 0.9
  }, [ready, config.globeColor, config.emissive, config.emissiveIntensity, config.shininess])

  // Data: arcs, points, polygons
  useEffect(() => {
    if (!globeRef.current || !ready || !data.length) return

    const globe = globeRef.current

    // Deduplicated endpoint points
    const pointMap = new Map<string, { size: number; order: number; color: string; lat: number; lng: number }>()
    for (const arc of data) {
      const sk = `${arc.startLat},${arc.startLng}`
      const ek = `${arc.endLat},${arc.endLng}`
      if (!pointMap.has(sk))
        pointMap.set(sk, { size: config.pointSize ?? 1, order: arc.order, color: arc.color, lat: arc.startLat, lng: arc.startLng })
      if (!pointMap.has(ek))
        pointMap.set(ek, { size: config.pointSize ?? 1, order: arc.order, color: arc.color, lat: arc.endLat, lng: arc.endLng })
    }

    const points = Array.from(pointMap.values())

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(config.showAtmosphere ?? true)
      .atmosphereColor(config.atmosphereColor ?? "#ffffff")
      .atmosphereAltitude(config.atmosphereAltitude ?? 0.1)
      .hexPolygonColor(() => config.polygonColor ?? "rgba(255,255,255,0.7)")

    globe
      .arcsData(data)
      .arcStartLat((d) => (d as Position).startLat)
      .arcStartLng((d) => (d as Position).startLng)
      .arcEndLat((d) => (d as Position).endLat)
      .arcEndLng((d) => (d as Position).endLng)
      .arcColor((d: unknown) => (d as Position).color)
      .arcAltitude((d) => (d as Position).arcAlt)
      .arcStroke(0.3)
      .arcDashLength(config.arcLength ?? 0.9)
      .arcDashInitialGap((d) => (d as Position).order)
      .arcDashGap(15)
      .arcDashAnimateTime(() => config.arcTime ?? 2000)

    globe
      .pointsData(points)
      .pointColor((d) => (d as { color: string }).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2)

    globe
      .ringsData([])
      .ringColor(() => config.polygonColor ?? "rgba(255,255,255,0.7)")
      .ringMaxRadius(config.maxRings ?? 3)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED)
      .ringRepeatPeriod(((config.arcTime ?? 2000) * (config.arcLength ?? 0.9)) / (config.rings ?? 1))
  }, [ready, data, config])

  // Ring animation interval
  useEffect(() => {
    if (!globeRef.current || !ready || !data.length) return

    const globe = globeRef.current
    const tick = () => {
      const indices = sampleIndices(Math.floor((data.length * 4) / 5), data.length)
      globe.ringsData(
        data
          .filter((_, i) => indices.includes(i))
          .map((d) => ({ lat: d.startLat, lng: d.startLng, color: d.color })),
      )
    }

    tick() // fire immediately so there's no blank first interval
    const id = setInterval(tick, 2000)
    return () => clearInterval(id)
  }, [ready, data])

  return <group ref={groupRef} />
}

// ─── Public World component ───────────────────────────────────────────────────

export function World({ globeConfig, data }: WorldProps) {
  const scene = useMemo(() => {
    const s = new Scene()
    s.fog = new Fog(0xffffff, 400, 2000)
    return s
  }, [])

  const camera = useMemo(() => new PerspectiveCamera(50, ASPECT, 180, 1800), [])

  return (
    <Canvas
      scene={scene}
      camera={camera}
      frameloop="always"
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <RendererConfig />

      <ambientLight color={globeConfig.ambientLight ?? "#88ccff"} intensity={1.2} />
      <directionalLight
        color={globeConfig.directionalLeftLight ?? "#ffffff"}
        position={new Vector3(-400, 100, 400)}
        intensity={1.0}
      />
      <directionalLight
        color={globeConfig.directionalTopLight ?? "#ffffff"}
        position={new Vector3(-200, 500, 200)}
        intensity={0.8}
      />
      <pointLight
        color={globeConfig.pointLight ?? "#ffffff"}
        position={new Vector3(-200, 500, 200)}
        intensity={1.2}
      />

      <Globe globeConfig={globeConfig} data={data} />

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={CAMERA_Z}
        maxDistance={CAMERA_Z}
        autoRotate={globeConfig.autoRotate ?? true}
        autoRotateSpeed={globeConfig.autoRotateSpeed ?? 1}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI - Math.PI / 3}
      />
    </Canvas>
  )
}
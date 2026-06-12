// components/ui/interactive-dots.tsx
"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type InteractiveDotsProps = {
  className?: string
  /** Distance between dot centers in pixels */
  gap?: number
  /** Dot radius in pixels */
  dotRadius?: number
  /** How far the light reaches from cursor in pixels */
  lightRadius?: number
  /** Brand color RGB values */
  color?: [number, number, number]
  /** Opacity of dots outside light radius */
  baseOpacity?: number
  /** Maximum opacity of dots at cursor center */
  maxOpacity?: number
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function InteractiveDots({
  className,
  gap = 20,
  dotRadius = 0.8,
  lightRadius = 220,
  color = [248, 130, 33],
  baseOpacity = 0.12,
  maxOpacity = 0.85,
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)

  const stateRef = useRef({
    width: 0,
    height: 0,
    mouseX: -1000,
    mouseY: -1000,
    hovering: false,
  })

  const configRef = useRef({
    gap,
    dotRadius,
    lightRadius,
    color,
    baseOpacity,
    maxOpacity,
  })

  // Sync props into ref
  const [r, g, b] = color
  useEffect(() => {
    configRef.current = {
      gap,
      dotRadius,
      lightRadius,
      color: [r, g, b],
      baseOpacity,
      maxOpacity,
    }
  }, [gap, dotRadius, lightRadius, r, g, b, baseOpacity, maxOpacity])

  /* ---- Single effect — owns everything ---- */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const section = (parent.closest("section") ?? parent) as HTMLElement

    let ctx: CanvasRenderingContext2D | null = null
    let cols = 0
    let rows = 0
    let offsetX = 0
    let offsetY = 0

    function setupCanvas() {
      if (!canvas || !parent) return

      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.ceil(rect.width)
      const h = Math.ceil(rect.height)

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      ctx = canvas.getContext("2d", { alpha: true })
      if (!ctx) return

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      stateRef.current.width = w
      stateRef.current.height = h

      // Build grid metrics
      const g = configRef.current.gap
      cols = Math.ceil(w / g) + 1
      rows = Math.ceil(h / g) + 1
      offsetX = (w - (cols - 1) * g) / 2
      offsetY = (h - (rows - 1) * g) / 2
    }

    function draw() {
      if (!ctx) return

      const { width, height, mouseX, mouseY } = stateRef.current
      const cfg = configRef.current
      const [cr, cg, cb] = cfg.color

      ctx.clearRect(0, 0, width, height)

      const hasLight = mouseX > -500 && mouseY > -500
      const lr2 = cfg.lightRadius * cfg.lightRadius
      const TWO_PI = Math.PI * 2

      // Base dots — one batched path
      ctx.beginPath()

      for (let row = 0; row < rows; row++) {
        const y = offsetY + row * cfg.gap

        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * cfg.gap

          if (hasLight) {
            const dx = x - mouseX
            const dy = y - mouseY
            if (dx * dx + dy * dy < lr2) continue
          }

          ctx.moveTo(x + cfg.dotRadius, y)
          ctx.arc(x, y, cfg.dotRadius, 0, TWO_PI)
        }
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${cfg.baseOpacity})`
      ctx.fill()

      if (!hasLight) return

      // Lit dots — bounded region only
      const g = cfg.gap
      const lr = cfg.lightRadius

      const minCol = Math.max(0, Math.floor((mouseX - lr - offsetX) / g))
      const maxCol = Math.min(cols - 1, Math.ceil((mouseX + lr - offsetX) / g))
      const minRow = Math.max(0, Math.floor((mouseY - lr - offsetY) / g))
      const maxRow = Math.min(rows - 1, Math.ceil((mouseY + lr - offsetY) / g))

      for (let row = minRow; row <= maxRow; row++) {
        const y = offsetY + row * g

        for (let col = minCol; col <= maxCol; col++) {
          const x = offsetX + col * g

          const dx = x - mouseX
          const dy = y - mouseY
          const distSq = dx * dx + dy * dy

          if (distSq >= lr2) continue

          const dist = Math.sqrt(distSq)
          const t = 1 - dist / lr

          // Cubic falloff — bright core, soft edge
          const falloff = t * t * t
          const opacity = cfg.baseOpacity + (cfg.maxOpacity - cfg.baseOpacity) * falloff
          const scale = 1 + falloff * 2
          const radius = cfg.dotRadius * scale

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, TWO_PI)
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`
          ctx.fill()
        }
      }
    }

    function loop() {
      draw()

      if (!stateRef.current.hovering) {
        rafRef.current = null
        return
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    function startLoop() {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(loop)
    }

    function stopLoop() {
      stateRef.current.hovering = false
      stateRef.current.mouseX = -1000
      stateRef.current.mouseY = -1000

      if (rafRef.current === null) {
        draw()
      }
    }

    function onPointerMove(e: PointerEvent) {
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      stateRef.current.mouseX = e.clientX - rect.left
      stateRef.current.mouseY = e.clientY - rect.top
      stateRef.current.hovering = true
      startLoop()
    }

    function onPointerLeave() {
      stopLoop()
    }

    // Initialize
    setupCanvas()
    draw()

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      setupCanvas()
      draw()
    })
    resizeObserver.observe(parent)

    // Events on section so hovering text/buttons still triggers dots
    section.addEventListener("pointermove", onPointerMove, { passive: true })
    section.addEventListener("pointerleave", onPointerLeave)

    return () => {
      resizeObserver.disconnect()
      section.removeEventListener("pointermove", onPointerMove)
      section.removeEventListener("pointerleave", onPointerLeave)

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
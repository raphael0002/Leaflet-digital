// components/ui/interactive-grid.tsx
"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type InteractiveGridProps = {
  className?: string
  /** Grid cell size in pixels */
  cellSize?: number
  /** How many cells around the cursor light up */
  radius?: number
  /** Brand color for the glow */
  color?: string
  /** Maximum opacity of a lit cell */
  maxOpacity?: number
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function InteractiveGrid({
  className,
  cellSize = 64,
  radius = 3,
  color = "rgba(248, 130, 33,",
  maxOpacity = 0.15,
}: InteractiveGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 })

  /* ---- Measure container ---- */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setDimensions({
        w: Math.ceil(width),
        h: Math.ceil(height),
      })
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  /* ---- Draw loop ---- */
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { w, h } = dimensions
    const dpr = Math.min(window.devicePixelRatio, 2)

    // Set canvas resolution
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
    }

    ctx.clearRect(0, 0, w, h)

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    // Draw grid lines (very subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)"
    ctx.lineWidth = 1

    // Vertical lines
    for (let x = 0; x <= w; x += cellSize) {
      ctx.beginPath()
      ctx.moveTo(x + 0.5, 0)
      ctx.lineTo(x + 0.5, h)
      ctx.stroke()
    }

    // Horizontal lines
    for (let y = 0; y <= h; y += cellSize) {
      ctx.beginPath()
      ctx.moveTo(0, y + 0.5)
      ctx.lineTo(w, y + 0.5)
      ctx.stroke()
    }

    // Skip glow calculation if mouse is outside
    if (mx < -100 || my < -100) return

    // Calculate which cell the mouse is in
    const centerCol = Math.floor(mx / cellSize)
    const centerRow = Math.floor(my / cellSize)

    // Only iterate cells within radius
    const startCol = Math.max(0, centerCol - radius)
    const endCol = Math.min(Math.ceil(w / cellSize), centerCol + radius + 1)
    const startRow = Math.max(0, centerRow - radius)
    const endRow = Math.min(Math.ceil(h / cellSize), centerRow + radius + 1)

    for (let col = startCol; col < endCol; col++) {
      for (let row = startRow; row < endRow; row++) {
        const cx = col * cellSize + cellSize / 2
        const cy = row * cellSize + cellSize / 2

        const dist = Math.sqrt((cx - mx) ** 2 + (cy - my) ** 2)
        const maxDist = radius * cellSize

        if (dist > maxDist) continue

        // Smooth falloff — quadratic ease out
        const t = 1 - dist / maxDist
        const opacity = t * t * maxOpacity

        if (opacity < 0.005) continue

        ctx.fillStyle = `${color} ${opacity})`
        ctx.fillRect(
          col * cellSize + 1,
          row * cellSize + 1,
          cellSize - 2,
          cellSize - 2,
        )
      }
    }
  }, [dimensions, cellSize, radius, color, maxOpacity])

  /* ---- Animation frame loop ---- */
  useEffect(() => {
    if (dimensions.w === 0 || dimensions.h === 0) return

    let isRunning = true

    const loop = () => {
      if (!isRunning) return
      draw()
      rafRef.current = requestAnimationFrame(loop)
    }

    // Initial draw (grid lines without glow)
    draw()

    // Start loop only when mouse enters
    const container = containerRef.current
    if (!container) return

    const startLoop = () => {
      if (rafRef.current === null) {
        isRunning = true
        loop()
      }
    }

    const stopLoop = () => {
      isRunning = false
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      // Reset mouse position and redraw grid without glow
      mouseRef.current = { x: -1000, y: -1000 }
      draw()
    }

    container.addEventListener("mouseenter", startLoop)
    container.addEventListener("mouseleave", stopLoop)

    return () => {
      isRunning = false
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      container.removeEventListener("mouseenter", startLoop)
      container.removeEventListener("mouseleave", stopLoop)
    }
  }, [dimensions, draw])

  /* ---- Mouse tracking ---- */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    container.addEventListener("mousemove", onMouseMove, { passive: true })
    return () => container.removeEventListener("mousemove", onMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
      />
    </div>
  )
}
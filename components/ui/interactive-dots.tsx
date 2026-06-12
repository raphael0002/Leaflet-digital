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
  /** How long the glow lingers after touch ends (ms) */
  touchFadeDuration?: number
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
  touchFadeDuration = 600,
}: InteractiveDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const stateRef = useRef({
    width: 0,
    height: 0,
    mouseX: -1000,
    mouseY: -1000,
    hovering: false,
    // Touch fade state
    fading: false,
    fadeStart: 0,
    fadeFromX: -1000,
    fadeFromY: -1000,
  })

  const configRef = useRef({
    gap,
    dotRadius,
    lightRadius,
    color,
    baseOpacity,
    maxOpacity,
    touchFadeDuration,
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
      touchFadeDuration,
    }
  }, [gap, dotRadius, lightRadius, r, g, b, baseOpacity, maxOpacity, touchFadeDuration])

  /* ---- Single effect ---- */
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

    /* ---- Canvas setup ---- */
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

      const g = configRef.current.gap
      cols = Math.ceil(w / g) + 1
      rows = Math.ceil(h / g) + 1
      offsetX = (w - (cols - 1) * g) / 2
      offsetY = (h - (rows - 1) * g) / 2
    }

    /* ---- Draw frame ---- */
    function draw() {
      if (!ctx) return

      const state = stateRef.current
      const cfg = configRef.current
      const [cr, cg, cb] = cfg.color

      ctx.clearRect(0, 0, state.width, state.height)

      // Determine effective mouse position and intensity
      let effectX = state.mouseX
      let effectY = state.mouseY
      let intensity = 1

      if (state.fading) {
        // During fade-out, use the last touch position with decreasing intensity
        effectX = state.fadeFromX
        effectY = state.fadeFromY
        const elapsed = performance.now() - state.fadeStart
        const progress = Math.min(elapsed / cfg.touchFadeDuration, 1)
        // Cubic ease out for smooth fade
        intensity = 1 - progress * progress * progress

        if (progress >= 1) {
          state.fading = false
          effectX = -1000
          effectY = -1000
          intensity = 0
        }
      }

      const hasLight = effectX > -500 && effectY > -500 && intensity > 0.01
      const lr = cfg.lightRadius
      const lr2 = lr * lr
      const TWO_PI = Math.PI * 2

      // Phase 1: Base dots — single batched path
      ctx.beginPath()

      for (let row = 0; row < rows; row++) {
        const y = offsetY + row * cfg.gap

        for (let col = 0; col < cols; col++) {
          const x = offsetX + col * cfg.gap

          if (hasLight) {
            const dx = x - effectX
            const dy = y - effectY
            if (dx * dx + dy * dy < lr2) continue
          }

          ctx.moveTo(x + cfg.dotRadius, y)
          ctx.arc(x, y, cfg.dotRadius, 0, TWO_PI)
        }
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${cfg.baseOpacity})`
      ctx.fill()

      if (!hasLight) return

      // Phase 2: Lit dots — bounded region
      const g = cfg.gap

      const minCol = Math.max(0, Math.floor((effectX - lr - offsetX) / g))
      const maxCol = Math.min(cols - 1, Math.ceil((effectX + lr - offsetX) / g))
      const minRow = Math.max(0, Math.floor((effectY - lr - offsetY) / g))
      const maxRow = Math.min(rows - 1, Math.ceil((effectY + lr - offsetY) / g))

      for (let row = minRow; row <= maxRow; row++) {
        const y = offsetY + row * g

        for (let col = minCol; col <= maxCol; col++) {
          const x = offsetX + col * g

          const dx = x - effectX
          const dy = y - effectY
          const distSq = dx * dx + dy * dy

          if (distSq >= lr2) continue

          const dist = Math.sqrt(distSq)
          const t = 1 - dist / lr

          const falloff = t * t * t
          // Apply intensity multiplier for fade-out
          const litOpacity = cfg.baseOpacity + (cfg.maxOpacity - cfg.baseOpacity) * falloff * intensity
          const scale = 1 + falloff * intensity * 2
          const radius = cfg.dotRadius * scale

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, TWO_PI)
          ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${litOpacity})`
          ctx.fill()
        }
      }
    }

    /* ---- RAF loop ---- */
    function loop() {
      draw()

      const state = stateRef.current

      // Keep running if actively hovering/touching OR fading out
      if (state.hovering || state.fading) {
        rafRef.current = requestAnimationFrame(loop)
      } else {
        rafRef.current = null
      }
    }

    function startLoop() {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(loop)
    }

    /* ---- Interaction handlers ---- */

    // Clear any pending fade timer
    function clearFadeTimer() {
      if (fadeTimerRef.current !== null) {
        clearTimeout(fadeTimerRef.current)
        fadeTimerRef.current = null
      }
    }

    // Start interaction at position
    function activateAt(x: number, y: number) {
      const state = stateRef.current
      clearFadeTimer()
      state.fading = false
      state.hovering = true
      state.mouseX = x
      state.mouseY = y
      startLoop()
    }

    // End interaction — snap off for pointer, fade for touch
    function deactivate(fade: boolean) {
      const state = stateRef.current
      state.hovering = false

      if (fade && state.mouseX > -500) {
        // Start fade-out from current position
        state.fading = true
        state.fadeStart = performance.now()
        state.fadeFromX = state.mouseX
        state.fadeFromY = state.mouseY
        state.mouseX = -1000
        state.mouseY = -1000
        startLoop() // keep loop running for fade animation
      } else {
        state.fading = false
        state.mouseX = -1000
        state.mouseY = -1000
        if (rafRef.current === null) {
          draw()
        }
      }
    }

    function getRelativePos(e: MouseEvent | Touch) {
      if (!parent) return { x: -1000, y: -1000 }
      const rect = parent.getBoundingClientRect()
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    /* ---- Pointer events (desktop) ---- */
    function onPointerMove(e: PointerEvent) {
      // Skip touch events — handled separately
      if (e.pointerType === "touch") return
      const pos = getRelativePos(e)
      activateAt(pos.x, pos.y)
    }

    function onPointerLeave(e: PointerEvent) {
      if (e.pointerType === "touch") return
      deactivate(false) // instant off for mouse
    }

    /* ---- Touch events (mobile) ---- */
    function onTouchStart(e: TouchEvent) {
      const touch = e.touches[0]
      if (!touch) return
      const pos = getRelativePos(touch)
      activateAt(pos.x, pos.y)
    }

    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0]
      if (!touch) return
      const pos = getRelativePos(touch)
      const state = stateRef.current
      clearFadeTimer()
      state.fading = false
      state.mouseX = pos.x
      state.mouseY = pos.y
    }

    function onTouchEnd() {
      deactivate(true) // fade out for touch
    }

    /* ---- Initialize ---- */
    setupCanvas()
    draw()

    /* ---- Resize ---- */
    const resizeObserver = new ResizeObserver(() => {
      setupCanvas()
      draw()
    })
    resizeObserver.observe(parent)

    /* ---- Attach events to section ---- */
    // Pointer events for desktop
    section.addEventListener("pointermove", onPointerMove, { passive: true })
    section.addEventListener("pointerleave", onPointerLeave)

    // Touch events for mobile
    section.addEventListener("touchstart", onTouchStart, { passive: true })
    section.addEventListener("touchmove", onTouchMove, { passive: true })
    section.addEventListener("touchend", onTouchEnd)
    section.addEventListener("touchcancel", onTouchEnd)

    /* ---- Cleanup ---- */
    return () => {
      resizeObserver.disconnect()
      clearFadeTimer()

      section.removeEventListener("pointermove", onPointerMove)
      section.removeEventListener("pointerleave", onPointerLeave)
      section.removeEventListener("touchstart", onTouchStart)
      section.removeEventListener("touchmove", onTouchMove)
      section.removeEventListener("touchend", onTouchEnd)
      section.removeEventListener("touchcancel", onTouchEnd)

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
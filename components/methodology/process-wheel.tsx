// components/methodology/process-wheel.tsx
"use client"

import type { CSSProperties, KeyboardEvent } from "react"
import { useMemo } from "react"
import { AnimatePresence, motion } from "motion/react"

import type { ProcessStep } from "@/features/marketing/types"
import { premiumEase } from "@/lib/motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

type ProcessWheelProps = {
  steps: ProcessStep[]
  activeIndex: number
  rotationAngle: number
  onSelect: (index: number) => void
}

/* ------------------------------------------------------------------ */
/*  Geometry constants                                                 */
/* ------------------------------------------------------------------ */

const SIZE = 600
const CENTER = SIZE / 2
const OUTER_R = 288
const INNER_R = 178
const GAP_DEG = 2.4
const MID_R = (OUTER_R + INNER_R) / 2
const LABEL_R = MID_R
const CHEVRON_DEG = 7

/* ------------------------------------------------------------------ */
/*  Center content animation variants                                  */
/* ------------------------------------------------------------------ */

const centerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: premiumEase,
    },
  },
}

const centerIndex = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.12, ease: premiumEase },
  },
}

const centerTitle = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    y: -6,
    filter: "blur(4px)",
    transition: { duration: 0.12, ease: premiumEase },
  },
}

const centerDesc = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.1, ease: premiumEase },
  },
}

/* ------------------------------------------------------------------ */
/*  Glow pulse animation                                               */
/* ------------------------------------------------------------------ */

const glowPulse = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: premiumEase },
  },
}

/* ------------------------------------------------------------------ */
/*  Geometry helpers                                                   */
/* ------------------------------------------------------------------ */

function round(value: number) {
  return Math.round(value * 1000) / 1000
}

function polar(angleDeg: number, radius: number) {
  const angle = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: round(CENTER + radius * Math.cos(angle)),
    y: round(CENTER + radius * Math.sin(angle)),
  }
}

function segmentPath(startDeg: number, endDeg: number) {
  const outerStart = polar(startDeg, OUTER_R)
  const outerEnd = polar(endDeg, OUTER_R)
  const innerEnd = polar(endDeg, INNER_R)
  const innerStart = polar(startDeg, INNER_R)
  const tipEnd = polar(endDeg + CHEVRON_DEG, MID_R)
  const tipStart = polar(startDeg + CHEVRON_DEG, MID_R)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${OUTER_R} ${OUTER_R} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${tipEnd.x} ${tipEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${INNER_R} ${INNER_R} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    `L ${tipStart.x} ${tipStart.y}`,
    "Z",
  ].join(" ")
}

function labelArcPath(startDeg: number, endDeg: number) {
  const start = polar(startDeg, LABEL_R)
  const end = polar(endDeg, LABEL_R)
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${LABEL_R} ${LABEL_R} 0 ${largeArc} 1 ${end.x} ${end.y}`
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ProcessWheel({
  steps,
  activeIndex,
  rotationAngle,
  onSelect,
}: ProcessWheelProps) {
  const count = Math.max(steps.length, 1)
  const stepSize = 360 / count
  const active = steps[activeIndex] ?? steps[0]

  const segments = useMemo(() => {
    return steps.map((step, index) => {
      const start = index * stepSize + GAP_DEG / 2
      const end = (index + 1) * stepSize - GAP_DEG / 2

      return {
        step,
        index,
        d: segmentPath(start, end),
        labelPath: labelArcPath(start, end),
        labelId: `wheel-label-${step.id}`,
      }
    })
  }, [steps, stepSize])

  if (!active) return null

  function handleKeyDown(event: KeyboardEvent<SVGGElement>, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect(index)
    }
  }

  return (
    <div className="relative aspect-square w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[600px]">
      {/* Ambient glow */}
      <motion.div
        variants={glowPulse}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(248,130,33,0.14),transparent_62%)] blur-2xl"
      />

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative h-full w-full overflow-visible"
        role="group"
        aria-label="Interactive process wheel"
      >
        <defs>
          {segments.map((segment) => (
            <path
              key={segment.labelId}
              id={segment.labelId}
              d={segment.labelPath}
              fill="none"
            />
          ))}
        </defs>

        {/* Rotating ring */}
        <g
          className="process-wheel-rotate will-change-transform"
          style={{ "--wheel-rotation": `${rotationAngle}deg` } as CSSProperties}
        >
          {segments.map((segment) => {
            const isActive = segment.index === activeIndex

            return (
              <g
                key={segment.step.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${segment.step.label}`}
                aria-pressed={isActive}
                className="group cursor-pointer outline-none"
                onClick={() => onSelect(segment.index)}
                onKeyDown={(event) => handleKeyDown(event, segment.index)}
              >
                <path
                  d={segment.d}
                  className={cn(
                    "transition-all duration-700 ease-[var(--ease-premium)]",
                    isActive
                      ? "fill-[var(--brand)] stroke-[var(--brand)]"
                      : "fill-transparent stroke-[var(--border)] group-hover:fill-white/[0.045] group-hover:stroke-[var(--border-strong)]",
                  )}
                  strokeWidth={1}
                />

                <text
                  className={cn(
                    "pointer-events-none select-none font-heading font-semibold tracking-wide transition-all duration-700 ease-[var(--ease-premium)]",
                    isActive
                      ? "fill-[var(--primary-foreground)]"
                      : "fill-[var(--text-muted)]",
                  )}
                  style={{ fontSize: isActive ? 22 : 18 }}
                >
                  <textPath
                    href={`#${segment.labelId}`}
                    startOffset="50%"
                    style={{ textAnchor: "middle" }}
                  >
                    {segment.step.label}
                  </textPath>
                </text>
              </g>
            )
          })}
        </g>

        {/* Inner circle */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_R - 14}
          className="fill-[var(--brand-soft)]"
        />
      </svg>

      {/* Center content */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex h-[48%] w-[48%] items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              variants={centerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-center text-center"
            >
              <motion.span
                variants={centerIndex}
                className="inline-block font-mono text-[10px] tracking-[0.3em] text-[var(--brand)] sm:text-xs"
              >
                {active.index}
              </motion.span>

              <motion.h3
                variants={centerTitle}
                className="mt-1 text-balance font-heading text-[12px] font-semibold leading-tight text-[var(--foreground)] sm:mt-2 sm:text-base md:text-lg lg:text-xl"
              >
                {active.title}
              </motion.h3>

              <motion.p
                variants={centerDesc}
                className="hidden sm:block mt-1 line-clamp-3 text-pretty text-[10px] leading-relaxed text-[var(--text-muted)] sm:mt-2 sm:line-clamp-4 sm:text-xs md:text-sm"
              >
                {active.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
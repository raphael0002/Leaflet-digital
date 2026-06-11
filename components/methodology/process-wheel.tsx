"use client"

import type { CSSProperties, KeyboardEvent } from "react"
import { useMemo } from "react"

import type { ProcessStep } from "@/features/marketing/types"
import { cn } from "@/lib/utils"

type ProcessWheelProps = {
  steps: ProcessStep[]
  activeIndex: number
  rotationAngle: number
  onSelect: (index: number) => void
}

const SIZE = 600
const CENTER = SIZE / 2
const OUTER_R = 288
const INNER_R = 178
const GAP_DEG = 2.4
const MID_R = (OUTER_R + INNER_R) / 2
const LABEL_R = MID_R
const CHEVRON_DEG = 7

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
    <div className="relative aspect-square w-full max-w-[600px]">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(248,130,33,0.14),transparent_62%)] blur-2xl" />

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

        <g
          className="process-wheel-rotate will-change-transform"
          style={
            {
              "--wheel-rotation": `${rotationAngle}deg`,
            } as CSSProperties
          }
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


        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_R - 14}
          className="fill-[var(--brand-soft)]"
        />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-[26%]">
        <div key={active.id} className="process-center-reveal text-center">
          <span className="font-mono text-xs tracking-[0.3em] text-[var(--brand)]">
            {active.index}
          </span>

          <h3 className="mt-2 text-balance font-heading text-lg font-semibold leading-tight text-[var(--foreground)] md:text-xl">
            {active.title}
          </h3>

          <p className="mt-2 text-pretty text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">
            {active.description}
          </p>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { ProcessWheel } from "@/components/methodology/process-wheel"
import { Container } from "@/components/shared/container"
import { SectionLabel } from "@/components/shared/section-label"
import { processSteps } from "@/features/marketing/data/process"
import { cn } from "@/lib/utils"

const AUTO_INTERVAL = 4500

function getRotationForIndex(index: number, stepSize: number) {
  const activeCenter = index * stepSize + stepSize / 2
  return -activeCenter
}

function closestRotation(previous: number, next: number) {
  let target = next

  while (target - previous > 180) {
    target -= 360
  }

  while (target - previous < -180) {
    target += 360
  }

  return target
}

export function MethodologySection() {
  const stepSize = useMemo(() => 360 / processSteps.length, [])

  const initialRotation = useMemo(
    () => getRotationForIndex(0, stepSize),
    [stepSize],
  )

  const [wheelState, setWheelState] = useState({
    activeIndex: 0,
    rotationAngle: initialRotation,
  })

  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const selectStep = useCallback(
    (nextIndex: number) => {
      setWheelState((current) => {
        if (nextIndex === current.activeIndex) {
          return current
        }

        const targetRotation = getRotationForIndex(nextIndex, stepSize)
        const nextRotation = closestRotation(
          current.rotationAngle,
          targetRotation,
        )

        return {
          activeIndex: nextIndex,
          rotationAngle: nextRotation,
        }
      })
    },
    [stepSize],
  )

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    stop()

    if (paused) {
      return
    }

    timerRef.current = setInterval(() => {
      setWheelState((current) => {
        const nextIndex = (current.activeIndex + 1) % processSteps.length
        const targetRotation = getRotationForIndex(nextIndex, stepSize)
        const nextRotation = closestRotation(
          current.rotationAngle,
          targetRotation,
        )

        return {
          activeIndex: nextIndex,
          rotationAngle: nextRotation,
        }
      })
    }, AUTO_INTERVAL)

    return stop
  }, [paused, stepSize, stop])

  return (
    <section
      id="process"
      className="relative w-full overflow-hidden bg-[var(--background)] py-16 md:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        const nextFocusedElement = event.relatedTarget as Node | null

        if (!event.currentTarget.contains(nextFocusedElement)) {
          setPaused(false)
        }
      }}
    >
      <SectionLabel>Process</SectionLabel>

      <Container wide>
        <div className="mb-10 max-w-2xl md:mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--brand)] md:hidden">
            Process
          </span>

          <h2 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight tracking-normal text-[var(--foreground)] md:mt-0 md:text-5xl">
            A proven methodology for consistent results.
          </h2>

          <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-[var(--text-muted)] md:text-lg">
            From strategy to launch, every step is designed to make your digital
            product clear, scalable, professional, and conversion-focused.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(520px,0.95fr)] lg:gap-14">
          <ol className="process-list-reveal flex flex-col">
            {processSteps.map((step, index) => {
              const isActive = index === wheelState.activeIndex

              return (
                <li
                  key={step.id}
                  className="process-list-item"
                  style={
                    {
                      "--item-delay": `${index * 90}ms`,
                    } as React.CSSProperties
                  }
                >
                  <button
                    type="button"
                    onClick={() => selectStep(index)}
                    aria-current={isActive ? "step" : undefined}
                    className={cn(
                      "group relative flex w-full items-start gap-5 border-b border-[var(--border)] py-5 text-left transition-colors duration-500 ease-[var(--ease-premium)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]",
                      isActive
                        ? "border-[var(--brand)]/70"
                        : "hover:border-[var(--border-strong)]",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute bottom-[-1px] left-0 h-px bg-[var(--brand)] transition-all duration-700 ease-[var(--ease-premium)]",
                        isActive ? "w-full" : "w-0",
                      )}
                    />

                    <span
                      className={cn(
                        "mt-1 font-mono text-sm tabular-nums transition-all duration-500 ease-[var(--ease-premium)]",
                        isActive
                          ? "translate-x-0 text-[var(--brand)]"
                          : "text-[var(--text-muted)] group-hover:text-[var(--brand)]",
                      )}
                    >
                      {step.index}
                    </span>

                    <span className="flex-1">
                      <span
                        className={cn(
                          "block font-heading text-xl font-semibold tracking-normal transition-all duration-500 ease-[var(--ease-premium)] md:text-2xl",
                          isActive
                            ? "translate-x-1 text-[var(--foreground)]"
                            : "text-[var(--text-muted)] group-hover:translate-x-1 group-hover:text-[var(--foreground)]/90",
                        )}
                      >
                        {step.label}
                      </span>

                      <span
                        className={cn(
                          "grid transition-all duration-700 ease-[var(--ease-premium)]",
                          isActive
                            ? "mt-2 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="min-h-0 overflow-hidden">
                          <span className="block max-w-xl text-pretty text-sm leading-relaxed text-[var(--text-muted)]">
                            {step.description}
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="hidden items-center justify-center sm:flex">
            <ProcessWheel
              steps={processSteps}
              activeIndex={wheelState.activeIndex}
              rotationAngle={wheelState.rotationAngle}
              onSelect={selectStep}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

import { useMotionPreference } from "@/hooks/use-motion-preference"
import { premiumEase } from "@/lib/motion"

type AnimatedCounterProps = {
  value: string
  className?: string
}

function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/)

  if (!match || value.includes("/")) {
    return null
  }

  return {
    target: Number(match[1]),
    suffix: match[2] ?? "",
  }
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, {
    once: false,
    amount: 0.5,
    margin: "20% 0px 20% 0px",
  })
  const { shouldReduceMotion } = useMotionPreference()
  const parsed = useMemo(() => parseValue(value), [value])
  const [display, setDisplay] = useState(parsed ? 0 : value)

  useEffect(() => {
    if (!parsed) {
      return
    }

    let frame = 0

    if (!inView) {
      frame = requestAnimationFrame(() => {
        setDisplay(0)
      })

      return () => cancelAnimationFrame(frame)
    }

    const counter = parsed

    if (shouldReduceMotion) {
      frame = requestAnimationFrame(() => {
        setDisplay(`${counter.target}${counter.suffix}`)
      })

      return () => cancelAnimationFrame(frame)
    }

    const duration = 1000
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(`${Math.round(counter.target * eased)}${counter.suffix}`)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frame)
  }, [inView, parsed, shouldReduceMotion])

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.5, margin: "20% 0px 20% 0px" }}
      transition={{ duration: shouldReduceMotion ? 0.18 : 0.32, ease: premiumEase }}
    >
      {parsed ? display : value}
    </motion.span>
  )
}

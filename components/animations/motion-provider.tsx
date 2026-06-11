"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "motion/react"

import { ScrollProgress } from "@/components/animations/scroll-progress"
import { defaultTransition } from "@/lib/motion"

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={defaultTransition}>
      <ScrollProgress />
      {children}
    </MotionConfig>
  )
}

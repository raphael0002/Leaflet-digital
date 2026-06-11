"use client"

import type { ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"

import {
  defaultTransition,
  revealUp,
  staggerContainer,
  slowStaggerContainer,
} from "@/lib/motion"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
  amount?: number
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  once = false,
  amount = 0.12,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "12% 0px 12% 0px" }}
      transition={{
        duration: defaultTransition.duration,
        delay,
        ease: defaultTransition.ease,
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className,
  slow = false,
  once = false,
  amount = 0.12,
}: {
  children: ReactNode
  className?: string
  slow?: boolean
  once?: boolean
  amount?: number
}) {
  return (
    <motion.div
      className={className}
      variants={slow ? slowStaggerContainer : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "12% 0px 12% 0px" }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  layout = false,
}: {
  children: ReactNode
  className?: string
  layout?: boolean | "position" | "size" | "preserve-aspect"
}) {
  return (
    <motion.div
      className={className}
      layout={layout || undefined}
      variants={revealUp}
    >
      {children}
    </motion.div>
  )
}

export const StaggerReveal = StaggerContainer
export const Stagger = StaggerContainer

export function Presence({
  children,
  mode = "popLayout",
}: {
  children: ReactNode
  mode?: "sync" | "popLayout" | "wait"
}) {
  return (
    <AnimatePresence mode={mode} initial={false}>
      {children}
    </AnimatePresence>
  )
}

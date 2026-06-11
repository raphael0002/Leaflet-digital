"use client"

import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { motion } from "motion/react"

import { cardHover, fastTransition } from "@/lib/motion"
import { cn } from "@/lib/utils"

type MotionCardProps = ComponentPropsWithoutRef<typeof motion.div> & {
  children: ReactNode
}

export function MotionCard({ children, className, ...props }: MotionCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-[20px] border border-white/[0.08] bg-[var(--card)] transition-[background-color,border-color,box-shadow] duration-300 ease-[var(--ease-premium)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]",
        className
      )}
      whileHover={cardHover}
      whileTap={{ scale: 0.995 }}
      transition={fastTransition}
      {...props}
    >
      {children}
    </motion.div>
  )
}

"use client"

import { motion, useScroll } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] h-0.5 w-full origin-left bg-[var(--brand)] motion-reduce:hidden"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

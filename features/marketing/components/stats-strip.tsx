// features/marketing/components/stats-strip.tsx
"use client"

import { motion } from "motion/react"

import { AnimatedCounter } from "@/components/animations/animated-counter"
import { Container } from "@/components/shared/container"
import { stats } from "@/features/marketing/data/stats"
import { fadeIn, fadeUp, sectionStagger } from "@/lib/motion"

const strip = sectionStagger(0.1, 0.06)
const stat = fadeUp(20, 0.55)
const label = fadeIn(0.4, 0.1)

const viewport = { once: true, amount: 0.3 as const }

export function StatsStrip() {
  return (
    <section className="bg-[var(--background-deep)]">
      <Container wide className="border-b border-white/[0.06] py-10 md:py-14">
        <motion.div
          variants={strip}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={stat} className="text-center">
              <p className="font-heading text-[38px] font-semibold leading-none text-white md:text-[50px]">
                <AnimatedCounter value={s.value} />
              </p>
              <motion.p
                variants={label}
                className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/32"
              >
                {s.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
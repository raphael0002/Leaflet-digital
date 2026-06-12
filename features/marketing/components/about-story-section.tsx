// features/marketing/components/about-story-section.tsx
"use client"

import { Beaker, Rocket, Zap } from "lucide-react"
import { motion } from "motion/react"

import { MotionCard } from "@/components/animations/motion-card"
import { Container } from "@/components/shared/container"
import { FloatingSquares } from "@/components/shared/floating-squares"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { storyCards } from "@/features/marketing/data/story"
import {
  fadeUp,
  fadeUpScale,
  iconPop,
  labelViewport,
  scaleIn,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"

const icons = { spark: Zap, experiment: Beaker, evolution: Rocket }

const orchestrator = sectionStagger(0.14, 0.04)
const heading = fadeUp(28, 0.65)
const cards = sectionStagger(0.12, 0.1)
const card = fadeUpScale(40, 0.97, 0.62)
const cardInner = sectionStagger(0.07, 0.12)
const text = fadeUp(12, 0.45)
const squares = scaleIn(0.85, 1)
const labelV = fadeUp(10, 0.5)


export function AboutStorySection() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-[var(--background)] pt-16 md:pt-28"
    >
      <motion.div
        variants={labelV}
        initial="hidden"
        whileInView="visible"
        viewport={labelViewport}
      >
        <SectionLabel>About us</SectionLabel>
      </motion.div>

      <Container wide className="relative">
        <motion.div
          variants={squares}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="absolute right-0 top-0 z-0"
        >
          <FloatingSquares />
        </motion.div>

        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.div variants={heading} className="relative z-10 max-w-[760px]">
            <SectionHeading>
              Built Remote. Built Different.
              <br />
              Built for Growth.
            </SectionHeading>
          </motion.div>

          <motion.div
            variants={cards}
            className="relative z-10 mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-8"
          >
            {storyCards.map((c) => {
              const Icon = icons[c.icon]
              return (
                <motion.div key={c.title} variants={card}>
                  <MotionCard className="flex min-h-[260px] flex-col justify-between p-6 shadow-none ring-0 md:p-8">
                    <motion.div variants={cardInner}>
                      <motion.div variants={iconPop}>
                        <Icon className="size-7 text-[var(--brand)]" strokeWidth={1.5} />
                      </motion.div>
                      <div className="mt-8">
                        <motion.h3
                          variants={text}
                          className="font-heading text-2xl font-bold text-white lg:text-3xl"
                        >
                          {c.title}
                        </motion.h3>
                        <motion.p
                          variants={text}
                          className="mt-5 text-[15px] leading-7 text-[var(--text-soft)]"
                        >
                          {c.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  </MotionCard>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
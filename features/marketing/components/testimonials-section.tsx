// features/marketing/components/testimonials-section.tsx
"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { testimonials } from "@/features/marketing/data/testimonials"
import {
  fadeSlideX,
  fadeUp,
  fadeUpScale,
  labelViewport,
  lineReveal,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"

const orchestrator = sectionStagger(0.12, 0.04)
const labelV = fadeUp(10, 0.5)
const heading = fadeUp(24, 0.6)
const controls = fadeSlideX(12, 0.45)
const cardsGrid = sectionStagger(0.12, 0.15)
const card = fadeUpScale(32, 0.97, 0.6)
const border = lineReveal(0.7, 0)
const quote = fadeUp(10, 0.45, 0.1)
const caption = fadeUp(8, 0.4, 0.18)

export function TestimonialsSection() {
  return (
    <section className="relative bg-[var(--background)] py-16 md:py-28">
      <motion.div
        variants={labelV}
        initial="hidden"
        whileInView="visible"
        viewport={labelViewport}
      >
        <SectionLabel>Testimonials</SectionLabel>
      </motion.div>

      <Container wide>
        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.div
            variants={heading}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              They are satisfied with
              <br />
              the results we provide
            </SectionHeading>
            <motion.div variants={controls} className="flex gap-3">
              <Button variant="outlineDark" size="icon-lg" aria-label="Previous testimonial">
                <ArrowLeft />
              </Button>
              <Button variant="outlineDark" size="icon-lg" aria-label="Next testimonial">
                <ArrowRight />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={cardsGrid} className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={card}>
                <figure className="transition-colors duration-300 ease-[var(--ease-premium)]">
                  <motion.div
                    variants={border}
                    className="mb-7 h-px w-full origin-left bg-white/[0.08]"
                  />
                  <motion.blockquote variants={quote} className="text-sm leading-7 text-white/58">
                    {t.quote}
                  </motion.blockquote>
                  <motion.figcaption variants={caption} className="mt-9">
                    <p className="text-base font-medium text-white">{t.name}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/38">
                      {t.role}
                    </p>
                  </motion.figcaption>
                </figure>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
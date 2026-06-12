// features/marketing/components/services-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { MotionCard } from "@/components/animations/motion-card"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { services } from "@/features/marketing/data/services"
import {
  fadeIn,
  fadeUp,
  fadeUpScale,
  labelViewport,
  popIn,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const orchestrator = sectionStagger(0.12, 0.04)
const labelV = fadeUp(10, 0.5)
const header = fadeUp(24, 0.6)
const grid = sectionStagger(0.1, 0.08)
const card = fadeUpScale(36, 0.97, 0.65)
const inner = sectionStagger(0.07, 0.12)
const text = fadeUp(12, 0.45)
const glow = fadeIn(1.2, 0.2)
const mockups = sectionStagger(0.12, 0.3)
const mockup = popIn(0.9, 0.55)

export function ServicesSection() {
  const [development, design, strategy, ai] = services

  return (
    <section id="services" className="relative bg-[var(--background)] py-16 md:py-28">
      <motion.div
        variants={labelV}
        initial="hidden"
        whileInView="visible"
        viewport={labelViewport}
      >
        <SectionLabel>Services</SectionLabel>
      </motion.div>

      <Container wide>
        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.div
            variants={header}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <SectionHeading>
              We offer several
              <br />
              services for you
            </SectionHeading>
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outlineDark" }), "self-start md:self-auto")}
            >
              Explore our services
              <ArrowUpRight />
            </Link>
          </motion.div>

          <motion.div
            variants={grid}
            className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(340px,0.9fr)] lg:items-stretch lg:gap-8"
          >
            {/* Left column */}
            <div className="grid gap-5 lg:grid-rows-[1.05fr_0.95fr] lg:gap-8">
              {/* Development */}
              <motion.div variants={card}>
                <MotionCard className="relative flex min-h-[280px] overflow-hidden p-6 shadow-none ring-0 md:p-8 lg:min-h-[330px]">
                  <motion.div
                    variants={glow}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(248,130,33,0.22),transparent_45%)]"
                  />
                  <motion.div variants={inner} className="relative flex h-full max-w-[760px] flex-col">
                    <motion.p variants={text} className="font-mono text-sm text-[var(--text-soft)]">
                      {development.number}
                    </motion.p>
                    <motion.h3 variants={text} className="mt-7 font-heading text-3xl font-bold text-white">
                      {development.title}
                    </motion.h3>
                    <motion.p variants={text} className="mt-5 max-w-[700px] text-[17px] leading-8 text-[var(--text-soft)]">
                      {development.description}
                    </motion.p>
                    <motion.div variants={text}>
                      <Link
                        href="/services"
                        className={cn(buttonVariants({ variant: "outlineDark", size: "sm" }), "mt-16 w-fit")}
                      >
                        Learn more
                      </Link>
                    </motion.div>
                  </motion.div>
                </MotionCard>
              </motion.div>

              {/* Strategy + AI */}
              <div className="grid gap-5 md:grid-cols-2 lg:gap-8">
                {[strategy, ai].map((service) => (
                  <motion.div key={service.title} variants={card}>
                    <MotionCard className="flex min-h-[260px] flex-col p-6 shadow-none ring-0 md:p-8 lg:min-h-[300px]">
                      <motion.div variants={inner}>
                        <motion.p variants={text} className="font-mono text-sm text-[var(--text-soft)]">
                          {service.number}
                        </motion.p>
                        <motion.h3 variants={text} className="mt-7 font-heading text-3xl font-bold text-white">
                          {service.title}
                        </motion.h3>
                        <motion.p variants={text} className="mt-5 text-[16px] leading-7 text-[var(--text-soft)]">
                          {service.description}
                        </motion.p>
                      </motion.div>
                    </MotionCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Design card */}
            <motion.div variants={card} className="h-full">
              <MotionCard className="flex min-h-[420px] flex-col p-6 shadow-none ring-0 md:p-8 lg:h-full">
                <motion.div variants={inner}>
                  <motion.p variants={text} className="font-mono text-sm text-[var(--text-soft)]">
                    {design.number}
                  </motion.p>
                  <motion.h3 variants={text} className="mt-16 font-heading text-3xl font-bold text-white lg:mt-24">
                    {design.title}
                  </motion.h3>
                  <motion.p variants={text} className="mt-8 text-[16px] leading-8 text-[var(--text-soft)]">
                    {design.description}
                  </motion.p>
                </motion.div>
                <motion.div variants={mockups} className="mt-auto flex items-end justify-center gap-8 pt-16">
                  <motion.div variants={mockup}>
                    <MiniMockup />
                  </motion.div>
                  <motion.span
                    variants={mockup}
                    className="grid size-10 place-items-center rounded-full bg-white/[0.08] text-[var(--brand)]"
                  >
                    <ArrowUpRight className="size-4" />
                  </motion.span>
                  <motion.div variants={mockup}>
                    <MiniMockup active />
                  </motion.div>
                </motion.div>
              </MotionCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

function MiniMockup({ active }: { active?: boolean }) {
  return (
    <div className="w-24 rounded-xl bg-white/[0.08] p-4">
      <span className="mb-3 block h-2 w-9 rounded-full bg-white/40" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="mb-2 flex items-center gap-2">
          <span className={cn("size-2 rounded-full", active ? "bg-[var(--brand)]" : "bg-[var(--brand)]/45")} />
          <span className="h-1.5 flex-1 rounded-full bg-white/24" />
        </div>
      ))}
    </div>
  )
}
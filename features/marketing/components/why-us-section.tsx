// features/marketing/components/why-us-section.tsx
"use client"

import Link from "next/link"
import { ArrowRight, Check, X } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { DarkCard } from "@/components/shared/dark-card"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { comparisonRows } from "@/features/marketing/data/comparison"
import {
  fadeIn,
  fadeSlideX,
  fadeUp,
  fadeUpScale,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const orchestrator = sectionStagger(0.12, 0.04)
const labelV = fadeUp(10, 0.5)
const heading = fadeUp(24, 0.6)
const subtitle = fadeUp(14, 0.5, 0.06)
const table = fadeUpScale(32, 0.985, 0.7)
const tableHeader = fadeIn(0.5, 0.1)
const rows = sectionStagger(0.08, 0.2)
const row = fadeSlideX(-16, 0.5)
const mobileCards = sectionStagger(0.1, 0.1)
const mobileCard = fadeUpScale(24, 0.97, 0.55)
const bottom = sectionStagger(0.14, 0.1)
const bottomText = fadeUp(28, 0.6)
const quoteCard = fadeUpScale(32, 0.97, 0.65)

export function WhyUsSection() {
  return (
    <section className="relative bg-[var(--background-soft)] py-16 md:py-28">
      <motion.div
        variants={labelV}
        initial="hidden"
        whileInView="visible"
        viewport={sectionViewport}
      >
        <SectionLabel>Why us ?</SectionLabel>
      </motion.div>

      <Container wide>
        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.div variants={heading}>
            <SectionHeading>
              Why 50+ Businesses Choose Leaflet
              <br />
              Over Traditional Agencies
            </SectionHeading>
          </motion.div>

          <motion.p variants={subtitle} className="mt-5 text-base text-white/62">
            We&apos;re not just remote. We&apos;re remotely better.
          </motion.p>

          {/* Desktop table */}
          <motion.div
            variants={table}
            className="mt-9 hidden overflow-hidden rounded-[18px] border border-white/[0.08] lg:block"
          >
            <motion.div
              variants={tableHeader}
              className="grid grid-cols-4 border-b border-white/[0.08] bg-white/[0.025] px-8 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/42"
            >
              <span>Features</span>
              <span>Traditional Agency</span>
              <span>Freelancers</span>
              <span className="text-[var(--brand)]">Leaflet (Remote-First)</span>
            </motion.div>
            <motion.div variants={rows}>
              {comparisonRows.map((r) => (
                <motion.div
                  key={r.feature}
                  variants={row}
                  className="grid grid-cols-4 border-b border-white/[0.05] px-8 py-6 text-sm last:border-b-0"
                >
                  <span className="text-white">{r.feature}</span>
                  <Negative>{r.agency}</Negative>
                  <Negative>{r.freelancers}</Negative>
                  <Positive>{r.leaflet}</Positive>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile cards */}
          <motion.div variants={mobileCards} className="mt-8 grid gap-4 lg:hidden">
            {comparisonRows.map((r) => (
              <motion.div key={r.feature} variants={mobileCard}>
                <DarkCard className="p-5">
                  <h3 className="font-heading text-xl font-bold text-white">{r.feature}</h3>
                  <div className="mt-5 grid gap-3 text-sm">
                    <Negative>Traditional Agency: {r.agency}</Negative>
                    <Negative>Freelancers: {r.freelancers}</Negative>
                    <Positive>Leaflet: {r.leaflet}</Positive>
                  </div>
                </DarkCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom */}
          <motion.div variants={bottom} className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <motion.div variants={bottomText}>
              <h3 className="max-w-[420px] font-heading text-3xl font-semibold leading-[1.05] text-white md:text-4xl">
                Here&apos;s what remote-first really means
              </h3>
              <p className="mt-8 max-w-[560px] text-base leading-8 text-white/54">
                By removing the physical constraints of an office, we access a caliber of talent that
                traditional agencies simply can&apos;t reach. Our team works in your timezone, follows your
                rhythm, and uses the most advanced async tools to keep you in the loop 24/7.
              </p>
            </motion.div>
            <motion.div variants={quoteCard}>
              <DarkCard className="justify-center rounded-[18px] p-8 md:p-12">
                <blockquote className="font-heading text-2xl font-semibold leading-tight text-white md:text-3xl">
                  &quot;The bottom line: You get enterprise-grade results with the speed and cost-efficiency
                  of a lean, modern startup.&quot;
                </blockquote>
                <Link href="/about" className={cn(buttonVariants({ variant: "orange", size: "lg" }), "mt-9 w-fit")}>
                  See how we work
                  <ArrowRight />
                </Link>
              </DarkCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

function Negative({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-white/48">
      <X className="size-4 text-red-500" />
      {children}
    </span>
  )
}

function Positive({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-3 text-white">
      <Check className="size-4 text-[var(--brand)]" />
      {children}
    </span>
  )
}
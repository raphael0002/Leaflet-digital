"use client"

import Link from "next/link"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { InteractiveDots } from "@/components/ui/interactive-dots"
import {
  fadeUp,
  fadeUpBlur,
  popIn,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const orchestrator = sectionStagger(0.13, 0.06)
const heading = fadeUpBlur(28, 5, 0.72)
const subtitle = fadeUp(16, 0.5)
const button = popIn(0.95, 0.5)

export function FinalCTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[var(--background-deep)] py-24 md:py-36"
    >
      <InteractiveDots
        gap={28}
        dotRadius={1}
        color={[248, 130, 33]}
        baseOpacity={0.1}
        maxOpacity={0.85}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-40 bg-gradient-to-b from-[var(--background-deep)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-[var(--background-deep)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-24 bg-gradient-to-r from-[var(--background-deep)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-24 bg-gradient-to-l from-[var(--background-deep)] to-transparent"
      />

      <Container wide className="relative z-[2] text-center">
        <motion.div
          variants={orchestrator}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
        >
          <motion.h2
            variants={heading}
            className="mx-auto max-w-5xl font-heading text-[36px] font-extrabold leading-[1.12] tracking-normal text-white sm:text-[48px] lg:text-[66px]"
          >
            Create something
            <br />
            awesome and extraordinary with us
          </motion.h2>

          <motion.p
            variants={subtitle}
            className="mt-8 text-base text-white/62"
          >
            With a lot of creativity, we can make your dream come true
          </motion.p>

          <motion.div variants={button}>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "orange", size: "lg" }),
                "mt-10 shadow-[0_0_0_1px_rgba(248,130,33,0.2)] hover:shadow-[0_14px_34px_rgba(248,130,33,0.22)]"
              )}
            >
              Contact us
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
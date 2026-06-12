// features/marketing/components/hero-section.tsx
"use client"

import Link from "next/link"
import { ArrowUpRight, Eye, Leaf, Snowflake } from "lucide-react"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { InfiniteLogoStrip } from "@/components/animations/infinite-logo-strip"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { clientLogos, stats } from "@/features/marketing/data/stats"
import {
  fadeIn,
  fadeUp,
  fadeUpBlur,
  heroViewport,
  popIn,
  scaleIn,
  sectionStagger,
  sectionViewport,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

const logoIcons = [Eye, Snowflake, Eye, undefined, Leaf, undefined]
const logos = clientLogos.map((label, index) => ({
  label,
  Icon: logoIcons[index],
}))

/* ---- Variants ---- */
const orchestrator = sectionStagger(0.13, 0.08)
const heading = fadeUpBlur(32, 6, 0.78)
const subtitle = fadeUpBlur(20, 4, 0.65)
const ctaRow = fadeUp(16, 0.55)
const ctaButtons = sectionStagger(0.1, 0)
const button = popIn(0.97, 0.45)
const logoStrip = fadeUp(18, 0.6, 0.18)
const logoLabel = fadeIn(0.55, 0.28)
const cloudL = scaleIn(0.9, 1.6)
const cloudR = scaleIn(0.9, 1.6)
const statsOrchestrator = sectionStagger(0.1, 0.06)
const statItem = fadeUp(20, 0.55)
const statLabel = fadeIn(0.4, 0.1)

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#080706]"
    >
      {/* Background clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0c0b_0%,#080706_100%)]" />
            {/* Left cloud */}
            <motion.div
              variants={cloudL}
              initial="hidden"
              whileInView="visible"
              viewport={heroViewport}
              className={cn(
                "hero-cloud hero-cloud-left absolute rounded-full blur-[92px]",
                // Mobile — smaller, dimmer
                "left-[-20%] top-[10%] h-[400px] w-[500px] opacity-50",
                "bg-[radial-gradient(circle,rgba(248,130,33,0.20)_0%,rgba(248,130,33,0.12)_28%,rgba(132,74,32,0.08)_48%,rgba(74,39,18,0.04)_64%,transparent_78%)]",
                // sm — slightly larger
                "sm:left-[-16%] sm:top-[8%] sm:h-[560px] sm:w-[680px] sm:opacity-60",
                // md — closer to desktop
                "md:left-[-14%] md:h-[680px] md:w-[820px] md:opacity-70",
                // lg+ — full size
                "lg:left-[-12%] lg:h-[760px] lg:w-[920px] lg:opacity-100",
                "lg:bg-[radial-gradient(circle,rgba(248,130,33,0.24)_0%,rgba(248,130,33,0.16)_28%,rgba(132,74,32,0.10)_48%,rgba(74,39,18,0.06)_64%,transparent_78%)]",
                // xl+ — wider screens
                "xl:left-[-8%] xl:h-[820px] xl:w-[980px]",
                "2xl:left-[-4%]",
              )}
            />

            {/* Right cloud */}
            <motion.div
              variants={cloudR}
              initial="hidden"
              whileInView="visible"
              viewport={heroViewport}
              className={cn(
                "hero-cloud hero-cloud-right absolute rounded-full blur-[96px]",
                // Mobile — smaller, dimmer
                "right-[-20%] top-[14%] h-[420px] w-[520px] opacity-45",
                "bg-[radial-gradient(circle,rgba(255,152,54,0.18)_0%,rgba(248,130,33,0.12)_30%,rgba(128,70,30,0.07)_50%,rgba(70,36,17,0.04)_66%,transparent_80%)]",
                // sm
                "sm:right-[-16%] sm:top-[12%] sm:h-[580px] sm:w-[700px] sm:opacity-55",
                // md
                "md:right-[-14%] md:h-[700px] md:w-[840px] md:opacity-65",
                // lg+ — full size
                "lg:right-[-12%] lg:h-[780px] lg:w-[940px] lg:opacity-100",
                "lg:bg-[radial-gradient(circle,rgba(255,152,54,0.24)_0%,rgba(248,130,33,0.16)_30%,rgba(128,70,30,0.10)_50%,rgba(70,36,17,0.06)_66%,transparent_80%)]",
                // xl+
                "xl:right-[-8%] xl:h-[840px] xl:w-[1000px]",
                "2xl:right-[-4%]",
              )}
            />
        </div>
      </div>

      {/*
        First fold: fills exactly one viewport height.
        Uses min-h-dvh (dynamic viewport height) which accounts
        for mobile browser chrome (address bar, bottom nav).
        dvh shrinks when the browser chrome is visible — so the
        content always fits the actual visible area.
      */}
      <div className="relative flex min-h-dvh flex-col">
        {/* Main content — vertically centered in the viewport */}
        <Container
          wide
          className="flex flex-1 flex-col items-center justify-center pt-20 sm:pt-24 md:pt-28"
        >
          <div className="mx-auto w-full max-w-[1200px]">  {/* 980 */}
            <motion.div
              variants={orchestrator}
              initial="hidden"
              whileInView="visible"
              viewport={heroViewport}
              className="flex flex-col items-start sm:items-center"
            >
              <motion.h1
                variants={heading}
                className="text-left text-balance font-heading text-[30px] font-extrabold leading-[1.12] tracking-normal text-[#f8f1ea] sm:text-center sm:text-[44px] md:text-[60px] lg:text-[76px] xl:text-[88px]"
              >
                Build Digital systems that convert, scale, and simplify your
                business.
              </motion.h1>

              <motion.p
                variants={subtitle}
                className="mt-4 max-w-[800px] text-left text-pretty text-[13px] font-medium leading-[1.6] text-white/46 sm:mt-6 sm:text-center sm:text-[15px] sm:leading-7 md:mt-7 md:text-[18px] xl:text-[20px] md:leading-8"
              >
                Leaflet Digital Solutions helps businesses design, develop, and
                launch websites, mobile apps, dashboards, automation tools, and
                digital growth systems that improve operations, build trust, and
                generate qualified leads.
              </motion.p>

              <motion.div variants={ctaRow} className="mt-6 w-full sm:mt-8 md:mt-9">
                <motion.div
                  variants={ctaButtons}
                  initial="hidden"
                  whileInView="visible"
                  viewport={heroViewport}
                  className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-5"
                >
                  <motion.div variants={button}>
                    <Link
                      href="/contact"
                      className={cn(
                        buttonVariants({ variant: "orange", size: "lg" }),
                        "h-12 w-full text-[14px] sm:h-[52px] sm:w-auto sm:min-w-[240px] sm:text-[15px]"
                      )}
                    >
                      Book a free consultation
                      <ArrowUpRight />
                    </Link>
                  </motion.div>
                  <motion.div variants={button}>
                    <Link
                      href="/work"
                      className={cn(
                        buttonVariants({ variant: "outlineDark", size: "lg" }),
                        "h-12 w-full border-white/22 bg-transparent text-[14px] text-white/76 hover:border-white/34 hover:bg-white/[0.04] sm:h-[52px] sm:w-auto sm:min-w-[168px] sm:text-[15px]"
                      )}
                    >
                      See our work
                      <ArrowUpRight />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </Container>

        {/* Logo strip — pinned to bottom of viewport fold */}
        <motion.div
          variants={logoStrip}
          initial="hidden"
          whileInView="visible"
          viewport={heroViewport}
          className="w-full pb-12 sm:pb-16 md:pb-32"
        >
          <Container wide>
            <motion.p
              variants={logoLabel}
              className="text-center font-mono text-[10px] uppercase tracking-[0.24em] text-white/20 sm:text-[11px]"
            >
              WE HAVE WORKED WITH LARGE CORPORATE TEAMS
            </motion.p>
            <InfiniteLogoStrip
              logos={logos}
              className="mt-4 text-white/50 sm:mt-5"
            />
          </Container>
        </motion.div>
      </div>

      <div className="relative border-t border-white/[0.06]">
        <Container wide className="py-10 md:py-14">
          <motion.div
            variants={statsOrchestrator}
            initial="hidden"
            whileInView="visible"
            viewport={sectionViewport}
            className="grid grid-cols-2 gap-6 gap-y-10 md:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={statItem}
                className="text-center"
              >
                <p className="font-heading text-[32px] font-semibold leading-none text-white sm:text-[40px] md:text-[50px]">
                  <AnimatedCounter value={s.value} />
                </p>
                <motion.p
                  variants={statLabel}
                  className="mt-3 font-mono text-[9px] uppercase tracking-[0.24em] text-white/32 sm:mt-4 sm:text-[10px]"
                >
                  {s.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>
    </section>
  )
}
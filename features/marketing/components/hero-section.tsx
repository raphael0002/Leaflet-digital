"use client"

import Link from "next/link"
import { ArrowUpRight, Eye, Leaf, Snowflake } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { InfiniteLogoStrip } from "@/components/animations/infinite-logo-strip"
import { Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { clientLogos } from "@/features/marketing/data/stats"
import { cn } from "@/lib/utils"

const logoIcons = [Eye, Snowflake, Eye, undefined, Leaf, undefined]
const logos = clientLogos.map((label, index) => ({
  label,
  Icon: logoIcons[index],
}))

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#080706]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* base dark background */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#0d0c0b_0%,#080706_100%)]" />

          {/* left cloud */}
          <div className="hero-cloud hero-cloud-left absolute left-[-12%] top-[8%] h-[760px] w-[920px] rounded-full bg-[radial-gradient(circle,rgba(248,130,33,0.16)_0%,rgba(248,130,33,0.10)_28%,rgba(132,74,32,0.07)_48%,rgba(74,39,18,0.045)_64%,transparent_78%)] blur-[92px]" />

          {/* right cloud */}
          <div className="hero-cloud hero-cloud-right absolute right-[-12%] top-[12%] h-[780px] w-[940px] rounded-full bg-[radial-gradient(circle,rgba(255,152,54,0.14)_0%,rgba(248,130,33,0.09)_30%,rgba(128,70,30,0.065)_50%,rgba(70,36,17,0.04)_66%,transparent_80%)] blur-[96px]" />
        </div>
      </div>  

      <Container             
        wide
        className="relative flex min-h-screen flex-col justify-center"
      >
        <div className="mx-auto max-w-[980px] text-center">
          <Reveal y={16}>
            <StaggerReveal>
              <StaggerItem>
                <h1 className="mx-auto text-left sm:text-center text-balance font-heading text-[36px] font-extrabold leading-[1.12] tracking-normal text-[#f8f1ea] sm:text-[58px] md:text-[70px] lg:text-[76px]">
                  Build Digital systems that convert, scale, and simplify your business.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="mx-auto mt-7 max-w-[900px] text-left sm:text-center text-balance text-[14px] font-medium leading-7 text-white/46 sm:text-[17px]">
                  Leaflet Digital Solutions helps businesses design, develop, and launch websites,
                  mobile apps, dashboards, automation tools, and digital growth systems that improve
                  operations, build trust, and generate qualified leads.
                </p>
              </StaggerItem>
              <StaggerItem>
                <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-7">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "orange", size: "lg" }),
                      "h-[52px] w-full min-w-[240px] rounded-full text-[15px] shadow-[0_12px_34px_rgba(248,130,33,0.18)] sm:w-auto"
                    )}
                  >
                    Book a free consultation
                    <ArrowUpRight />
                  </Link>
                  <Link
                    href="/work"
                    className={cn(
                      buttonVariants({ variant: "outlineDark", size: "lg" }),
                      "h-[52px] w-full min-w-[168px] rounded-full border-white/22 bg-transparent text-[15px] text-white/76 hover:border-white/34 hover:bg-white/[0.04] sm:w-auto"
                    )}
                  >
                    See our work
                    <ArrowUpRight />
                  </Link>
                </div>
              </StaggerItem>
            </StaggerReveal>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 w-full max-w-[1400px] sm:mt-36" delay={0.16}>
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.24em] text-white/20">
            WE HAVE WORKED WITH LARGE CORPORATE TEAMS
          </p>
          <InfiniteLogoStrip logos={logos} className="mt-5 text-white/50" />
        </Reveal>
      </Container>
    </section>
  )
}

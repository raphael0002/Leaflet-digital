import Link from "next/link"
import { ArrowRight, Check, X } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { DarkCard } from "@/components/shared/dark-card"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { comparisonRows } from "@/features/marketing/data/comparison"
import { cn } from "@/lib/utils"

export function WhyUsSection() {
  return (
    <section className="relative bg-[var(--background-soft)] py-16 md:py-28">
      <SectionLabel>Why us ?</SectionLabel>
      <Container wide>
        <Reveal>
          <SectionHeading>
            Why 50+ Businesses Choose Leaflet
            <br />
            Over Traditional Agencies
          </SectionHeading>
          <p className="mt-5 text-base text-white/62">We&apos;re not just remote. We&apos;re remotely better.</p>
        </Reveal>

        <StaggerReveal className="mt-9 hidden overflow-hidden rounded-[18px] border border-white/[0.08] lg:block">
          <div className="grid grid-cols-4 border-b border-white/[0.08] bg-white/[0.025] px-8 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-white/42">
            <span>Features</span>
            <span>Traditional Agency</span>
            <span>Freelancers</span>
            <span className="text-[var(--brand)]">Leaflet (Remote-First)</span>
          </div>
          {comparisonRows.map((row) => (
            <StaggerItem key={row.feature}>
              <div className="grid grid-cols-4 border-b border-white/[0.05] px-8 py-6 text-sm last:border-b-0">
                <span className="text-white">{row.feature}</span>
                <Negative>{row.agency}</Negative>
                <Negative>{row.freelancers}</Negative>
                <Positive>{row.leaflet}</Positive>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <StaggerReveal className="mt-8 grid gap-4 lg:hidden">
          {comparisonRows.map((row) => (
            <StaggerItem key={row.feature}>
              <DarkCard className="p-5">
                <h3 className="font-heading text-xl font-bold text-white">{row.feature}</h3>
                <div className="mt-5 grid gap-3 text-sm">
                  <Negative>Traditional Agency: {row.agency}</Negative>
                  <Negative>Freelancers: {row.freelancers}</Negative>
                  <Positive>Leaflet: {row.leaflet}</Positive>
                </div>
              </DarkCard>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <StaggerReveal className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          <StaggerItem>
            <h3 className="max-w-[420px] font-heading text-3xl font-semibold leading-[1.05] text-white md:text-4xl">
              Here&apos;s what remote-first really means
            </h3>
            <p className="mt-8 max-w-[560px] text-base leading-8 text-white/54">
              By removing the physical constraints of an office, we access a caliber of talent that
              traditional agencies simply can&apos;t reach. Our team works in your timezone, follows your
              rhythm, and uses the most advanced async tools to keep you in the loop 24/7.
            </p>
          </StaggerItem>
          <StaggerItem>
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
          </StaggerItem>
        </StaggerReveal>
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

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { MotionCard } from "@/components/animations/motion-card"
import { Container } from "@/components/shared/container"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { Presence, Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { services } from "@/features/marketing/data/services"
import { cn } from "@/lib/utils"

export function ServicesSection() {
  const [development, design, strategy, ai] = services

  return (
    <section id="services" className="relative bg-[var(--background)] py-16 md:py-28">
      <SectionLabel>Services</SectionLabel>
      <Container wide>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <>
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
          </>
        </Reveal>

        <StaggerReveal className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(340px,0.9fr)] lg:items-stretch lg:gap-8">
          <div className="grid gap-5 lg:grid-rows-[1.05fr_0.95fr] lg:gap-8">
            <StaggerItem>
              <MotionCard className="relative flex min-h-[280px] overflow-hidden p-6 shadow-none ring-0 md:p-8 lg:min-h-[330px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(248,130,33,0.22),transparent_45%)]" />
                <div className="relative flex h-full max-w-[760px] flex-col">
                  <p className="font-mono text-sm text-[var(--text-soft)]">{development.number}</p>
                  <h3 className="mt-7 font-heading text-3xl font-bold text-white">{development.title}</h3>
                  <p className="mt-5 max-w-[700px] text-[17px] leading-8 text-[var(--text-soft)]">
                    {development.description}
                  </p>
                  <Link
                    href="/services"
                    className={cn(buttonVariants({ variant: "outlineDark", size: "sm" }), "mt-auto w-fit")}
                  >
                    Learn more
                  </Link>
                </div>
              </MotionCard>
            </StaggerItem>

            <div className="grid gap-5 md:grid-cols-2 lg:gap-8">
              <Presence>
                {[strategy, ai].map((service) => (
                  <StaggerItem key={service.title}>
                    <MotionCard className="flex min-h-[260px] flex-col p-6 shadow-none ring-0 md:p-8 lg:min-h-[300px]">
                      <p className="font-mono text-sm text-[var(--text-soft)]">{service.number}</p>
                      <h3 className="mt-7 font-heading text-3xl font-bold text-white">{service.title}</h3>
                      <p className="mt-5 text-[16px] leading-7 text-[var(--text-soft)]">{service.description}</p>
                    </MotionCard>
                  </StaggerItem>
                ))}
              </Presence>
            </div>
          </div>

          <StaggerItem className="h-full">
            <MotionCard className="flex min-h-[420px] flex-col p-6 shadow-none ring-0 md:p-8 lg:h-full">
              <p className="font-mono text-sm text-[var(--text-soft)]">{design.number}</p>
              <h3 className="mt-16 font-heading text-3xl font-bold text-white lg:mt-24">{design.title}</h3>
              <p className="mt-8 text-[16px] leading-8 text-[var(--text-soft)]">{design.description}</p>
              <div className="mt-auto flex items-end justify-center gap-8 pt-16">
                <MiniMockup active={false} />
                <span className="grid size-10 place-items-center rounded-full bg-white/[0.08] text-[var(--brand)]">
                  <ArrowUpRight className="size-4" />
                </span>
                <MiniMockup active />
              </div>
            </MotionCard>
          </StaggerItem>
        </StaggerReveal>
      </Container>
    </section>
  )
}

function MiniMockup({ active }: { active?: boolean }) {
  return (
    <div className="w-24 rounded-xl bg-white/[0.08] p-4">
      <span className="mb-3 block h-2 w-9 rounded-full bg-white/40" />
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="mb-2 flex items-center gap-2">
          <span className={cn("size-2 rounded-full", active ? "bg-[var(--brand)]" : "bg-[var(--brand)]/45")} />
          <span className="h-1.5 flex-1 rounded-full bg-white/24" />
        </div>
      ))}
    </div>
  )
}

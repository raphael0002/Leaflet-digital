import { AnimatedCounter } from "@/components/animations/animated-counter"
import { StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { Container } from "@/components/shared/container"
import { stats } from "@/features/marketing/data/stats"

export function StatsStrip() {
  return (
    <section className="bg-[var(--background-deep)]">
      <Container wide className="border-b border-white/[0.06] py-10 md:py-14">
        <StaggerReveal className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="text-center">
              <p className="font-heading text-[38px] font-semibold leading-none text-white md:text-[50px]">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/32">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  )
}

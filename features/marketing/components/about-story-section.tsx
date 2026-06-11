import { Beaker, Rocket, Zap } from "lucide-react"

import { MotionCard } from "@/components/animations/motion-card"
import { Container } from "@/components/shared/container"
import { FloatingSquares } from "@/components/shared/floating-squares"
import { SectionHeading } from "@/components/shared/section-heading"
import { SectionLabel } from "@/components/shared/section-label"
import { Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { storyCards } from "@/features/marketing/data/story"

const icons = {
  spark: Zap,
  experiment: Beaker,
  evolution: Rocket,
}

export function AboutStorySection() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-[var(--background)] py-16 md:py-28">
      <SectionLabel>About us</SectionLabel>
      <Container wide className="relative">
        <FloatingSquares className="absolute right-0 top-0 z-0" />
        <Reveal className="relative z-10 max-w-[760px]">
          <SectionHeading>
            Built Remote. Built Different.
            <br />
            Built for Growth.
          </SectionHeading>
        </Reveal>
        <StaggerReveal className="relative z-10 mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-8">
          {storyCards.map((card) => {
            const Icon = icons[card.icon]
            return (
              <StaggerItem key={card.title}>
                <MotionCard className="flex min-h-[260px] flex-col justify-between p-6 shadow-none ring-0 md:p-8">
                  <Icon className="size-7 text-[var(--brand)]" strokeWidth={1.5} />
                  <div className="mt-8">
                    <h3 className="font-heading text-2xl font-bold text-white lg:text-3xl">
                      {card.title}
                    </h3>
                    <p className="mt-5 text-[15px] leading-7 text-[var(--text-soft)]">
                      {card.description}
                    </p>
                  </div>
                </MotionCard>
              </StaggerItem>
            )
          })}
        </StaggerReveal>
      </Container>
    </section>
  )
}

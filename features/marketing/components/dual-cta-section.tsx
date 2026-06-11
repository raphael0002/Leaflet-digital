import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { MotionCard } from "@/components/animations/motion-card"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { cn } from "@/lib/utils"

export function DualCTASection() {
  return (
    <section className="bg-[var(--background)] pb-16 md:pb-28">
      <Container wide>
        <StaggerReveal className="grid gap-6 lg:grid-cols-2">
          <StaggerItem>
            <CTACard
              label="For businesses"
              title={
                <>
                  Scale your digital
                  <br />
                  presence
                </>
              }
              body="Ready to grow with a dedicated tech partner that ships fast and builds for the long run?"
              href="/contact"
              button="Start a Project"
              variant="orange"
            />
          </StaggerItem>
          <StaggerItem>
            <CTACard
              label="For agencies"
              title="White-label that delivers"
              body="Reliable white-label development and design support - plug us in and ship under your brand."
              href="/contact"
              button="Partner with us"
              variant="outlineDark"
              muted
            />
          </StaggerItem>
        </StaggerReveal>
      </Container>
    </section>
  )
}

function CTACard({
  label,
  title,
  body,
  href,
  button,
  variant,
  muted,
}: {
  label: string
  title: React.ReactNode
  body: string
  href: string
  button: string
  variant: "orange" | "outlineDark"
  muted?: boolean
}) {
  return (
    <MotionCard className="relative min-h-[320px] overflow-hidden p-8 md:p-12">
      {!muted ? (
        <div className="absolute -left-20 -top-28 size-[420px] rounded-full border border-[var(--brand)]/18 bg-[radial-gradient(circle,rgba(248,130,33,0.24),transparent_62%)]" />
      ) : (
        <div className="absolute right-14 top-1/2 size-20 rounded-full bg-[var(--brand)]/30 blur-sm" />
      )}
      <div className="relative">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f0b680]">
          {label}
        </p>
        <h3 className="mt-5 max-w-[520px] font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
          {title}
        </h3>
        <p className="mt-5 max-w-[470px] text-sm leading-7 text-white/62">{body}</p>
        <Link href={href} className={cn(buttonVariants({ variant, size: "lg" }), "mt-9")}>
          {button}
          <ArrowRight />
        </Link>
      </div>
    </MotionCard>
  )
}

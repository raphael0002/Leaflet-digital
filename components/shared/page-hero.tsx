import { Container } from "@/components/shared/container"
import { GradientGrid } from "@/components/shared/gradient-grid"

export function PageHero({
  label,
  title,
  description,
}: {
  label: string
  title: string
  description: string
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--background-deep)] py-20 md:py-28">
      <GradientGrid className="opacity-35" />
      <Container className="relative">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--brand)]">{label}</p>
        <h1 className="mt-5 max-w-4xl font-heading text-[42px] font-extrabold leading-[1.08] tracking-normal text-white md:text-[68px]">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/64">{description}</p>
      </Container>
    </section>
  )
}

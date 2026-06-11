import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { GradientGrid } from "@/components/shared/gradient-grid"
import { Reveal, StaggerItem, StaggerReveal } from "@/components/animations/reveal"
import { cn } from "@/lib/utils"

export function FinalCTASection() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.06] bg-[var(--background-deep)] py-24 md:py-36">
      <GradientGrid className="opacity-45" />
      <Container wide className="relative text-center">
        <Reveal>
          <StaggerReveal>
            <StaggerItem>
              <h2 className="mx-auto max-w-5xl font-heading text-[36px] font-extrabold leading-[1.12] tracking-normal text-white sm:text-[48px] lg:text-[66px]">
                Create something
                <br />
                awesome and extraordinary with us
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="mt-8 text-base text-white/62">
                With a lot of creativity, we can make your dream come true
              </p>
            </StaggerItem>
            <StaggerItem>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "orange", size: "lg" }),
                  "mt-10 shadow-[0_0_0_1px_rgba(248,130,33,0.2)] hover:shadow-[0_14px_34px_rgba(248,130,33,0.22)]"
                )}
              >
                Contact us
              </Link>
            </StaggerItem>
          </StaggerReveal>
        </Reveal>
      </Container>
    </section>
  )
}

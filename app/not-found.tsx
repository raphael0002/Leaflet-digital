import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { FloatingSquares } from "@/components/shared/floating-squares"
import { GradientGrid } from "@/components/shared/gradient-grid"

export default function NotFound() {
  return (
    <main className="relative min-h-[72vh] overflow-hidden bg-[var(--background-deep)] py-24 flex items-center ">
      <GradientGrid className="opacity-35" />
      <Container className="relative">
        <FloatingSquares className="absolute right-0 top-0" />
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--brand)]">404</p>
          <h1 className="mt-5 font-heading text-[42px] font-extrabold leading-tight text-white md:text-[68px]">
            This page is not available.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/62">
            The page you&apos;re looking for does not exist, may have moved, or is temporarily
            unavailable.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={buttonVariants({ variant: "orange", size: "lg" })}>
              Back to home
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "outlineDark", size: "lg" })}>
              Contact us
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

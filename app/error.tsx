"use client"

import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"

export default function ErrorPage({
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <main className="min-h-[70vh] bg-[var(--background)] py-24 flex items-center">
      <Container className="flex items-center justify-center">
        <div className="max-w-2xl rounded-[24px] border border-white/[0.08] bg-[var(--card)] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[var(--brand)]">Error</p>
          <h1 className="mt-5 font-heading text-4xl font-bold text-white">Something went wrong.</h1>
          <p className="mt-5 text-base leading-8 text-white/62">
            The page could not be loaded properly. Please try again or return to the homepage.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="orange" onClick={() => unstable_retry()}>
              Try again
            </Button>
            <Link href="/" className={buttonVariants({ variant: "outlineDark" })}>
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/shared/container"
import { MobileNav } from "@/components/layout/mobile-nav"
import { navLinks } from "@/features/marketing/data/nav-links"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    function updateScrolled() {
      const nextScrolled = window.scrollY > 12

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      }
    }

    updateScrolled()

    function onScroll() {
      if (frameRef.current !== null) {
        return
      }

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        updateScrolled()
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-[100] border-b backdrop-blur-md transition-[background-color,border-color] duration-200 ease-[var(--ease-premium)]",
        scrolled
          ? "border-white/[0.08] bg-[var(--background-deep)]/86"
          : "border-white/[0.02] bg-[var(--background-deep)]/68"
      )}
    >
      <Container wide className="flex h-[72px] items-center justify-between">
        <Link
          href="/"
          className="font-heading text-2xl font-extrabold tracking-normal text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] sm:text-3xl"
        >
          Leaflet
        </Link>

        <nav className="hidden items-center gap-3 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm text-white/68 transition duration-200 ease-[var(--ease-premium)] hover:bg-white/[0.06] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)]",
                pathname === link.href && "bg-white/[0.08] text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className={cn(buttonVariants({ variant: "orange", size: "lg" }), "hidden lg:inline-flex")}
        >
          Build with us
        </Link>

        <div className="lg:hidden">
          <MobileNav />
        </div>
      </Container>
    </header>
  )
}

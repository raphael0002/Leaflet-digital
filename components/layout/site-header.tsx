// components/layout/site-header.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

import { buttonVariants } from "@/components/ui/button"
import { MobileNav } from "@/components/layout/mobile-nav"
import { navLinks } from "@/features/marketing/data/nav-links"
import { premiumEase } from "@/lib/motion"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState("")
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()

    const onScroll = () => {
      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(() => {
        update()
        frameRef.current = null
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash)
    updateHash()
    window.addEventListener("hashchange", updateHash)
    return () => window.removeEventListener("hashchange", updateHash)
  }, [])

  useEffect(() => {
    if (pathname !== "/") return

    const sections = navLinks
      .map((l) => l.href.split("#")[1])
      .filter((id): id is string => Boolean(id))
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    let raf: number | null = null

    const updateActive = () => {
      let current = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 140) current = section
        else break
      }
      setActiveHash(`#${current.id}`)
    }

    const schedule = () => {
      if (raf !== null) return
      raf = requestAnimationFrame(() => {
        raf = null
        updateActive()
      })
    }

    updateActive()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: premiumEase, delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-[var(--ease-premium)]",
        scrolled ? "py-0" : "sm:py-4",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border transition-all duration-500 ease-[var(--ease-premium)]",
          scrolled
            ? "relative overflow-hidden border-white/[0.06] bg-[rgba(8,8,8,0.65)] px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.42)] backdrop-blur-xl supports-[backdrop-filter]:bg-[rgba(10,10,10,0.58)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/[0.08] before:to-transparent after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_0_80px_rgba(248,130,33,0.03)] lg:px-16"
            : "border-transparent bg-transparent px-4 py-4 lg:px-16",
        )}
      >
        {/* Mobile: hamburger + logo */}
        <div className="flex items-center gap-3 lg:hidden">
          <MobileNav />
          <Link
            href="/#home"
            className="font-heading text-[22px] font-extrabold tracking-tight text-white"
          >
            Leaflet
          </Link>
        </div>

        {/* Desktop logo */}
        <Link
          href="/#home"
          className="hidden font-heading text-[28px] font-extrabold tracking-tight text-white lg:block"
        >
          Leaflet
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-2 lg:flex"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = isActiveNavLink(link.href, pathname, activeHash)
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  const hash = getHashFromHref(link.href)
                  if (hash) setActiveHash(hash)
                }}
                className={cn(
                  "relative rounded-md px-4 py-2 text-sm font-semibold text-white/60 transition-all duration-300 ease-[var(--ease-premium)] hover:bg-white/[0.05] hover:text-white",
                  isActive && "text-primary",
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/#contact"
          className={cn(
            buttonVariants({
              variant: "orange",
              size: "lg",
              className: "hover:translate-none hover:shadow-none",
            }),
            "hidden items-center gap-2 lg:inline-flex",
          )}
        >
          Build with us
        </Link>

        {/* Mobile CTA */}
        <Link
          href="/#contact"
          className={cn(
            buttonVariants({
              variant: "orange",
              size: "default",
              className: "px-4 hover:translate-none hover:shadow-none",
            }),
            "inline-flex items-center gap-1.5 lg:hidden",
          )}
        >
          Build with us
        </Link>
      </div>
    </motion.header>
  )
}

function isActiveNavLink(href: string, pathname: string, activeHash: string) {
  const hashIndex = href.indexOf("#")
  if (hashIndex === -1) return pathname === href
  const path = href.slice(0, hashIndex) || "/"
  const hash = href.slice(hashIndex)
  return pathname === path && activeHash === hash
}

function getHashFromHref(href: string) {
  const hashIndex = href.indexOf("#")
  return hashIndex === -1 ? null : href.slice(hashIndex)
}
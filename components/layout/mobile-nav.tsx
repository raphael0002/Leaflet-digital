// components/layout/mobile-nav.tsx
"use client"

import Link from "next/link"
import { Menu, XIcon } from "lucide-react"
import { motion } from "motion/react"

import { premiumEase } from "@/lib/motion"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from "@/features/marketing/data/nav-links"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Variants — defined at module scope, never recreated               */
/* ------------------------------------------------------------------ */

const navStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

const navItem = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.36, ease: premiumEase },
  },
}

/* ------------------------------------------------------------------ */
/*  Shared icon-button styles — avoids Button component entirely      */
/* ------------------------------------------------------------------ */

const iconBtn = cn(
  "inline-flex items-center justify-center",
  "size-11 rounded-md",
  "border border-transparent",
  "text-white/70 transition-colors duration-200",
  "hover:bg-white/[0.06] hover:text-white",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)]",
)

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MobileNav() {
  return (
    <Sheet>
      {/*
        SheetTrigger renders its own <button> internally.
        Do NOT nest another <button> inside it.
        Pass className and children directly — no asChild, no render prop.
      */}
      <SheetTrigger
        className={cn(iconBtn, "relative z-[210]")}
        aria-label="Open navigation"
      >
        <Menu strokeWidth={2.5} className="size-6" />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="z-[220] flex h-dvh w-full flex-col border-white/10 bg-[var(--background-deep)] px-6 py-8 text-white sm:max-w-md"
        showCloseButton={false}
      >
        <SheetHeader className="flex flex-row items-center justify-between p-0">
          <SheetTitle className="font-heading text-2xl font-extrabold tracking-normal text-white">
            Leaflet
          </SheetTitle>

          {/*
            SheetClose also renders its own <button>.
            Style it directly — no nested Button component.
          */}
          <SheetClose
            className={cn(iconBtn, "border-white/10")}
            aria-label="Close navigation"
          >
            <XIcon className="size-5" strokeWidth={3} />
          </SheetClose>
        </SheetHeader>

        <motion.nav
          className="mt-14 grid gap-1"
          aria-label="Mobile navigation"
          initial="hidden"
          animate="show"
          variants={navStagger}
        >
          {navLinks.map((link) => (
            <motion.div key={link.href} variants={navItem}>
              {/*
                SheetClose wraps each Link so tapping a nav item
                closes the sheet. SheetClose renders a <button> here,
                but the visible interactive element is the Link inside.
                Use render prop with a <span> so SheetClose does NOT
                render a button wrapper around the Link.
              */}
              <SheetClose
                nativeButton={false}
                render={<span />}
                className="block w-full"
              >
                <Link
                  href={link.href}
                  className="block border-b border-white/[0.08] py-5 font-heading text-4xl font-semibold leading-none tracking-normal text-white transition-colors duration-300 ease-out hover:text-[var(--brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
                >
                  {link.label}
                </Link>
              </SheetClose>
            </motion.div>
          ))}
        </motion.nav>
      </SheetContent>
    </Sheet>
  )
}
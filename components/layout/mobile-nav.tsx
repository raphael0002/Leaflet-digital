"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { motion } from "motion/react"

import { premiumEase } from "@/lib/motion"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from "@/features/marketing/data/nav-links"
import { cn } from "@/lib/utils"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger render={<Button aria-label="Open navigation" variant="ghostDark" size="icon-lg" className="relative z-[210]" />}>
        <Menu />
      </SheetTrigger>
      <SheetContent
        className="z-[220] flex h-dvh w-full flex-col border-white/10 bg-[var(--background-deep)] px-6 py-8 text-white sm:max-w-md"
        showCloseButton
      >
        <SheetHeader className="p-0">
          <SheetTitle className="font-heading text-2xl font-extrabold tracking-normal text-white">
            Leaflet
          </SheetTitle>
        </SheetHeader>
        <motion.nav
          className="mt-14 grid gap-1"
          aria-label="Mobile navigation"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.06,
                delayChildren: 0.08,
              },
            },
          }}
        >
          {navLinks.map((link) => (
            <motion.div
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: -12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.36,
                    ease: premiumEase,
                  },
                },
              }}
            >
              <Link
                href={link.href}
                className="block border-b border-white/[0.08] py-5 font-heading text-4xl font-semibold leading-none tracking-normal text-white transition-colors duration-300 ease-out hover:text-[var(--brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <motion.div
          className="mt-auto"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.32,
            delay: 0.16,
            ease: premiumEase,
          }}
        >
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "orange", size: "lg" }), "w-full")}
          >
            Build with us
          </Link>
        </motion.div>
      </SheetContent>
    </Sheet>
  )
}

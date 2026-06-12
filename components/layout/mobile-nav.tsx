"use client"

import Link from "next/link"
import { Menu, XIcon } from "lucide-react"
import { motion } from "motion/react"

import { premiumEase } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { navLinks } from "@/features/marketing/data/nav-links"

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger render={<Button aria-label="Open navigation" variant="ghostDark" size="icon-lg" className="relative z-[210]" />}>
        <Menu strokeWidth={2.5} className="size-6" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="z-[220] flex h-dvh w-full flex-col border-white/10 bg-[var(--background-deep)] px-6 py-8 text-white sm:max-w-md"
        showCloseButton={false}
      >
        <SheetHeader className="p-0 flex flex-row justify-between items-center">
          <SheetTitle className="font-heading text-2xl font-extrabold tracking-normal text-white">
            Leaflet
          </SheetTitle>
          <SheetClose className="border-2 rounded-md border-white/10 bg-primary hover:bg-primary/80 p-1" nativeButton={false} render={<Button variant="ghostDark"   size="icon-lg" />} >
            <XIcon className="size-5 hover:text-[var(--brand)]" strokeWidth={3}/>  
            <span className="sr-only">Close</span>
          </SheetClose>
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
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href={link.href}
                    className="block border-b border-white/[0.08] py-5 font-heading text-4xl font-semibold leading-none tracking-normal text-white transition-colors duration-300 ease-out hover:text-[var(--brand)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)]"
                  />
                }
              >
                {link.label}
              </SheetClose>
            </motion.div>
          ))}
        </motion.nav>
      </SheetContent>
    </Sheet>
  )
}

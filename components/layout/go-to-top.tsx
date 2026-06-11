"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { motion, animate } from "motion/react"
import { cn } from "@/lib/utils"

export function GoToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
    }

    onScroll()

    window.addEventListener("scroll", onScroll, {
      passive: true,
    })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    const currentScroll = window.scrollY

    animate(currentScroll, 0, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate: (value) => {
        window.scrollTo(0, value)
      },
    })
  }

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={scrollToTop}
      className={cn(
        "group fixed bottom-6 right-6 z-[120] flex h-20 w-20 items-center justify-center rounded-full border border-white/10 text-white shadow-[0_10px_40px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-500",
        "hover:border-primary/80",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      {/* Rotating circular text */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <path
              id="circlePath"
              d="
                M 50,50
                m -34,0
                a 34,34 0 1,1 68,0
                a 34,34 0 1,1 -68,0
              "
            />
          </defs>

          <text
            fill="currentColor"
            className="text-[10px] font-medium tracking-[0.18em] uppercase opacity-90"
          >
            <textPath href="#circlePath" startOffset="0%">
              {`LEAFLET DIGITAL•LEAFLET DIGITAL`}
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center Arrow */}
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.04]"
      >
        <ArrowUp className="size-5" />
      </motion.div>
    </button>
  )
}
"use client"

import { useReducedMotion } from "motion/react"

export function useMotionPreference() {
  return {
    shouldReduceMotion: useReducedMotion(),
  }
}

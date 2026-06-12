// lib/motion.ts
import type { Transition, Variants } from "motion/react"

export const premiumEase = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ------------------------------------------------------------------ */
/*  Transitions                                                        */
/* ------------------------------------------------------------------ */

export const defaultTransition: Transition = {
  duration: 0.56,
  ease: premiumEase,
}

export const fastTransition: Transition = {
  duration: 0.18,
  ease: premiumEase,
}

export const normalTransition: Transition = {
  duration: 0.28,
  ease: premiumEase,
}

export const exitTransition: Transition = {
  duration: 0.22,
  ease: premiumEase,
}

/* ------------------------------------------------------------------ */
/*  Shared viewport config                                             */
/* ------------------------------------------------------------------ */

export const sectionViewport = {
  once: true,
  amount: 0.1 as const,
  margin: "0px 0px -8% 0px" as const,
}

export const heroViewport = {
  once: true,
  amount: 0.05 as const,
}

/* ------------------------------------------------------------------ */
/*  Orchestrators                                                      */
/* ------------------------------------------------------------------ */

export const sectionStagger = (
  stagger = 0.12,
  delay = 0.04,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
})

/* ------------------------------------------------------------------ */
/*  Element reveals                                                    */
/* ------------------------------------------------------------------ */

export const fadeUp = (
  y = 22,
  duration = 0.6,
  delay = 0,
): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: premiumEase, delay },
  },
})

export const fadeUpScale = (
  y = 32,
  scale = 0.97,
  duration = 0.65,
): Variants => ({
  hidden: { opacity: 0, y, scale },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration, ease: premiumEase },
  },
})

export const fadeUpBlur = (
  y = 32,
  blur = 6,
  duration = 0.78,
): Variants => ({
  hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration, ease: premiumEase },
  },
})

export const fadeIn = (
  duration = 0.5,
  delay = 0,
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, ease: premiumEase, delay },
  },
})

export const fadeSlideX = (
  x = 16,
  duration = 0.5,
): Variants => ({
  hidden: { opacity: 0, x },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: premiumEase },
  },
})

export const scaleIn = (
  scale = 0.85,
  duration = 1,
): Variants => ({
  hidden: { opacity: 0, scale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: premiumEase },
  },
})

export const lineReveal = (
  duration = 0.8,
  delay = 0.15,
): Variants => ({
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration, ease: premiumEase, delay },
  },
})

export const popIn = (
  scale = 0.85,
  duration = 0.35,
): Variants => ({
  hidden: { opacity: 0, scale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: premiumEase },
  },
})

export const iconPop: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: premiumEase, delay: 0.15 },
  },
}

/* ------------------------------------------------------------------ */
/*  Section label                                                    */
/* ------------------------------------------------------------------ */

export const labelViewport = {
  once: false,
  amount: 0 as const,
  margin: "-60px 0px 0px 0px" as const,
}

/* ------------------------------------------------------------------ */
/*  Hover presets                                                      */
/* ------------------------------------------------------------------ */

export const cardHover = {
  y: -1,
  borderColor: "rgba(248, 130, 33, 0.28)",
  backgroundColor: "var(--card-hover)",
  transition: normalTransition,
}

export const buttonHover = {
  y: -1,
  transition: fastTransition,
}

export const buttonTap = {
  scale: 0.98,
}

/* ------------------------------------------------------------------ */
/*  Legacy aliases (keep existing imports working)                     */
/* ------------------------------------------------------------------ */

export const revealUp: Variants = fadeUp()
export const cardReveal: Variants = fadeUpScale()

export const staggerContainer: Variants = sectionStagger()
export const slowStaggerContainer: Variants = sectionStagger(0.09, 0.06)
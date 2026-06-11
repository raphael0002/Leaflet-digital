import type { Transition, Variants } from "motion/react"

export const premiumEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number,
]

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

export const revealUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: exitTransition,
  },
}

export const cardReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: defaultTransition,
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: exitTransition,
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export const slowStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
}

export const cardHover = {
  y: -4,
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

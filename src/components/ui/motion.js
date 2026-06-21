// ── Shared Eases ──────────────────────────────────────────────────────────────
export const EASE_EXPO = [0.22, 1, 0.36, 1]
export const EASE_STANDARD = [0.25, 0.1, 0.25, 1]
export const SPRING = { type: 'spring', stiffness: 260, damping: 26 }
export const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 28 }
export const SPRING_GENTLE = { type: 'spring', stiffness: 180, damping: 24 }

// ── Section Reveal ────────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, delay, ease: EASE_EXPO },
  }),
}

// ── Section Title (word-by-word stagger) ──────────────────────────────────────
export const sectionTitleContainer = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { staggerChildren: 0.08, delayChildren: delay },
  }),
}

export const sectionTitleWord = {
  hidden: { opacity: 0, y: 50, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE_EXPO },
  },
}

// ── Content card (stagger by index) ──────────────────────────────────────────
export const contentCard = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.1, ease: EASE_EXPO },
  }),
}

// ── Project card filter transitions ──────────────────────────────────────────
export const projectCardEnter = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.07, ease: EASE_EXPO },
  }),
}

export const projectCardExit = {
  opacity: 0,
  scale: 0.95,
  y: 20,
  transition: { duration: 0.25, ease: EASE_STANDARD },
}

// ── Tag stagger ───────────────────────────────────────────────────────────────
export const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
}

export const tagItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_EXPO } },
}

// ── Page transitions ──────────────────────────────────────────────────────────
export const pageEnter = {
  opacity: 0,
  scale: 0.98,
  y: 20,
}

export const pageVisible = {
  opacity: 1,
  scale: 1,
  y: 0,
  transition: { duration: 0.4, ease: EASE_EXPO },
}

export const pageExit = {
  opacity: 0,
  scale: 0.98,
  y: -20,
  transition: { duration: 0.3, ease: EASE_STANDARD },
}

// ── Skill card stagger ────────────────────────────────────────────────────────
export const skillCardContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const skillCardItem = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_EXPO },
  },
}

// ── Fade in (simple) ──────────────────────────────────────────────────────────
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay, ease: 'easeOut' },
  }),
}

// ── Glass reveal ──────────────────────────────────────────────────────────────
export const glassReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: 'blur(12px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.75, delay, ease: EASE_EXPO },
  }),
}

// ── Stagger container (generic) ───────────────────────────────────────────────
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export const modalVariants = {
  initial: { opacity: 0, y: 24, scale: 0.96, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: EASE_EXPO },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: { duration: 0.3 },
  },
}

export const backdropVariants = {
  initial: { opacity: 0, backdropFilter: 'blur(0px)' },
  animate: {
    opacity: 1,
    backdropFilter: 'blur(12px)',
    transition: { duration: 0.35 },
  },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

// ── Loading orbiting circles ──────────────────────────────────────────────────
export const orbitVariants = [
  { rotate: 0, x: 28 },
  { rotate: 120, x: 28 },
  { rotate: 240, x: 28 },
]

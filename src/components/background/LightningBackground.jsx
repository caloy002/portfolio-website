import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const PARTICLE_COUNT = 30

const BOLTS = [
  [
    'M18 -8 L30 16 L24 17 L39 47 L32 48 L50 108',
    'M72 -6 L62 18 L69 19 L53 49 L60 50 L43 106',
  ],
  [
    'M49 -8 L43 20 L50 21 L38 48 L47 49 L35 108',
    'M78 3 L68 26 L75 27 L61 58 L68 59 L52 106',
  ],
  [
    'M28 -5 L42 21 L35 22 L55 51 L48 52 L68 108',
    'M8 12 L22 35 L16 36 L36 64 L28 65 L45 103',
  ],
]

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
    id: index,
    left: randomBetween(3, 97),
    top: randomBetween(5, 95),
    size: randomBetween(2, 5),
    delay: randomBetween(0, 10),
    duration: randomBetween(12, 24),
    opacity: randomBetween(0.18, 0.55),
  }))
}

export default function LightningBackground({ className = '' }) {
  const prefersReducedMotion = useReducedMotion()
  const particles = useMemo(() => createParticles(), [])
  const [flash, setFlash] = useState(null)

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    let flashTimer
    let hideTimer

    const triggerFlash = () => {
      setFlash({
        id: Date.now(),
        bolts: BOLTS[Math.floor(Math.random() * BOLTS.length)],
      })

      hideTimer = window.setTimeout(() => setFlash(null), 280)
      flashTimer = window.setTimeout(triggerFlash, randomBetween(3000, 8000))
    }

    flashTimer = window.setTimeout(triggerFlash, randomBetween(1800, 4200))

    return () => {
      window.clearTimeout(flashTimer)
      window.clearTimeout(hideTimer)
    }
  }, [prefersReducedMotion])

  return (
    <div className={`lightning-bg pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.18),transparent_32%),linear-gradient(180deg,#030712_0%,#020617_45%,#050816_100%)]" />
      <div className="lightning-bg__grid absolute inset-0" />
      <div className="absolute inset-x-[-10%] top-[-20%] h-[55%] bg-cyan-500/10 blur-3xl" />
      <div className="absolute right-[-20%] bottom-[-20%] h-[48%] w-[60%] rounded-full bg-blue-600/15 blur-3xl" />

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="lightning-bg__particle absolute rounded-full bg-cyan-200"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  y: [0, -44, 0],
                  x: [0, randomBetween(-16, 16), 0],
                  opacity: [particle.opacity * 0.35, particle.opacity, particle.opacity * 0.35],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <AnimatePresence>
        {flash && (
          <motion.div
            key={flash.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.22, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-white/12 mix-blend-screen" />
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              role="presentation"
            >
              {flash.bolts.map((path, index) => (
                <motion.path
                  key={path}
                  d={path}
                  className="lightning-bg__bolt"
                  pathLength="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.24, delay: index * 0.035, ease: 'easeOut' }}
                />
              ))}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

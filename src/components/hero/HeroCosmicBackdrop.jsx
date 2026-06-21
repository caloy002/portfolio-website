import { useMemo } from 'react'
import { motion } from 'framer-motion'

const STAR_COUNT = 48
const PARTICLE_COUNT = 24

function rand(min, max) {
  return min + Math.random() * (max - min)
}

function createStars() {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    left: rand(0, 100),
    top: rand(0, 100),
    size: rand(1, 2.5),
    delay: rand(0, 6),
    duration: rand(2, 5),
    opacity: rand(0.3, 1),
  }))
}

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: rand(5, 95),
    top: rand(10, 90),
    size: rand(2, 5),
    delay: rand(0, 10),
    duration: rand(14, 28),
  }))
}

const SHOOTING_STARS = [
  { id: 0, top: '12%', left: '70%', delay: 0, duration: 4.5 },
  { id: 1, top: '35%', left: '15%', delay: 2.2, duration: 5.2 },
  { id: 2, top: '58%', left: '85%', delay: 5.8, duration: 4.8 },
]

export default function HeroCosmicBackdrop() {
  const stars = useMemo(() => createStars(), [])
  const particles = useMemo(() => createParticles(), [])

  return (
    <div className="hero-cosmic pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="hero-cosmic__gradient absolute inset-0" />

      <div className="hero-cosmic__nebula hero-cosmic__nebula--blue absolute" />
      <div className="hero-cosmic__nebula hero-cosmic__nebula--gold absolute" />
      <div className="hero-cosmic__nebula hero-cosmic__nebula--violet absolute" />

      <motion.div
        className="hero-cosmic__radial-glow absolute"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="hero-cosmic__star absolute rounded-full bg-pearl"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
          }}
          animate={{ opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.4] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="hero-cosmic__particle absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, rand(-12, 12), 0],
            opacity: [0.15, 0.7, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {SHOOTING_STARS.map((star) => (
        <span
          key={star.id}
          className="hero-cosmic__shooting-star absolute"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      <div className="hero-cosmic__streaks absolute inset-0" />
      <div className="hero-cosmic__vignette absolute inset-0" />
    </div>
  )
}

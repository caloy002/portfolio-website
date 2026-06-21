import { useCallback, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const RUNES = ['✦', '◇', '◈', '✧', '☆', '⟡', '✦', '◇']
const SHARD_COUNT = 8
const SPARK_COUNT = 10

const R = 48
const CIRCUMFERENCE = 2 * Math.PI * R

export default function RpgAvatarFrame({ src, alt, className = '' }) {
  const gradId = useId().replace(/:/g, '')
  const containerRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlow({ x, y })
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className={`rpg-avatar group relative mx-auto ${className}`}
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false)
        setGlow({ x: 50, y: 50 })
      }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="rpg-avatar__mouse-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(110,200,255,0.4) 0%, rgba(232,200,122,0.18) 22%, transparent 52%)`,
        }}
        aria-hidden="true"
      />

      <div
        className={`rpg-avatar__stage relative aspect-square w-full ${hovered ? 'rpg-avatar__stage--hover' : ''}`}
      >
        {/* Background FX — full stage, centered */}
        <div className="rpg-avatar__layer rpg-avatar__layer--full" aria-hidden="true">
          <div className="rpg-avatar__aura" />
          <div className="rpg-avatar__aura rpg-avatar__aura--secondary" />
          <div className="rpg-avatar__rays" />
          <div className="rpg-avatar__holo-ring rpg-avatar__holo-ring--outer" />
          <div className="rpg-avatar__holo-ring rpg-avatar__holo-ring--inner" />
        </div>

        {/* Orbit decorations — centered on stage */}
        <div className="rpg-avatar__layer rpg-avatar__layer--full" aria-hidden="true">
          <svg className="rpg-avatar__hud" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(110,200,255,0.1)" strokeWidth="0.35" />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgba(232,200,122,0.18)"
              strokeWidth="0.25"
              strokeDasharray="3 5"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180
              const x1 = 50 + 42 * Math.cos(rad)
              const y1 = 50 + 42 * Math.sin(rad)
              const x2 = 50 + 48 * Math.cos(rad)
              const y2 = 50 + 48 * Math.sin(rad)
              return (
                <line
                  key={deg}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={deg % 90 === 0 ? 'rgba(232,200,122,0.65)' : 'rgba(110,200,255,0.45)'}
                  strokeWidth={deg % 90 === 0 ? 0.9 : 0.55}
                />
              )
            })}
          </svg>

          {!reducedMotion &&
            Array.from({ length: SHARD_COUNT }).map((_, i) => (
              <span
                key={i}
                className="rpg-avatar__shard"
                style={{ '--shard-i': i, '--shard-total': SHARD_COUNT }}
              />
            ))}

          <div className="rpg-avatar__runes">
            {RUNES.map((rune, i) => (
              <span
                key={i}
                className="rpg-avatar__rune"
                style={{ '--rune-i': i, '--rune-total': RUNES.length }}
              >
                {rune}
              </span>
            ))}
          </div>

          {!reducedMotion &&
            Array.from({ length: SPARK_COUNT }).map((_, i) => (
              <span key={i} className="rpg-avatar__spark" style={{ '--spark-i': i }} />
            ))}
        </div>

        {/* Portrait core — centered */}
        <div className="rpg-avatar__layer rpg-avatar__layer--core">
          <div className="rpg-avatar__glass-shell">
            <div className="rpg-avatar__energy-ring" aria-hidden="true" />
            <div className="rpg-avatar__trace-ring" aria-hidden="true" />

            <div className="rpg-avatar__portrait">
              <img
                src={src}
                alt={alt}
                className="rpg-avatar__image"
                draggable={false}
              />
              <div className="rpg-avatar__portrait-grade" aria-hidden="true" />
              <div className="rpg-avatar__portrait-shine" aria-hidden="true" />
              <div className="rpg-avatar__portrait-vignette" aria-hidden="true" />

              <svg className="rpg-avatar__trace-svg" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <linearGradient id={`${gradId}-trace`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8c87a" stopOpacity="0.2" />
                    <stop offset="35%" stopColor="#e8c87a" stopOpacity="1" />
                    <stop offset="55%" stopColor="#6ec8ff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#c0d4f0" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient id={`${gradId}-trace-b`} x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6ec8ff" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#b8a0ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#e8c87a" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(192,212,240,0.2)" strokeWidth="0.6" />

                <motion.circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  stroke={`url(#${gradId}-trace)`}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  strokeDasharray={`${CIRCUMFERENCE * 0.22} ${CIRCUMFERENCE}`}
                  animate={reducedMotion ? {} : { strokeDashoffset: [0, -CIRCUMFERENCE] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />

                <motion.circle
                  cx="50"
                  cy="50"
                  r={R - 4}
                  fill="none"
                  stroke={`url(#${gradId}-trace-b)`}
                  strokeWidth="1"
                  strokeLinecap="round"
                  transform="rotate(90 50 50)"
                  strokeDasharray={`${CIRCUMFERENCE * 0.08} ${CIRCUMFERENCE * 0.5}`}
                  animate={reducedMotion ? {} : { strokeDashoffset: [0, CIRCUMFERENCE] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                />
              </svg>

              <span className="rpg-avatar__marker rpg-avatar__marker--n" />
              <span className="rpg-avatar__marker rpg-avatar__marker--e" />
              <span className="rpg-avatar__marker rpg-avatar__marker--s" />
              <span className="rpg-avatar__marker rpg-avatar__marker--w" />
            </div>

            <div className="rpg-avatar__level-badge glass-panel" aria-hidden="true">
              <span className="rpg-avatar__level-text font-display">LV.</span>
              <span className="rpg-avatar__level-num font-display">01</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

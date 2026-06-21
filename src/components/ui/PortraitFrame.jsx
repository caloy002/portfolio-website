import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'

const R = 47
const CIRCUMFERENCE = 2 * Math.PI * R

const BOUNDS = { minX: -180, maxX: 180, minY: -150, maxY: 150 }
const THROW_BOOST = 0.055
const RESTITUTION = 0.84
const FRICTION = 0.988
const MIN_SPEED = 0.15
const RETURN_DELAY_MS = 1000

export default function PortraitFrame({ src, alt, className = '' }) {
  const gradId = useId().replace(/:/g, '')
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isDragging, setIsDragging] = useState(false)

  const rafRef = useRef(null)
  const returnTimerRef = useRef(null)
  const lastFrameRef = useRef(0)
  const draggingRef = useRef(false)
  const dragOriginRef = useRef({ px: 0, py: 0, cx: 0, cy: 0 })
  const velocityRef = useRef({ x: 0, y: 0 })
  const samplesRef = useRef([])

  const clearMotion = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    if (returnTimerRef.current) {
      clearTimeout(returnTimerRef.current)
      returnTimerRef.current = null
    }
    x.stop()
    y.stop()
  }, [x, y])

  const returnHome = useCallback(() => {
    animate(x, 0, { type: 'spring', stiffness: 340, damping: 26 })
    animate(y, 0, { type: 'spring', stiffness: 340, damping: 26 })
  }, [x, y])

  const scheduleReturnHome = useCallback(() => {
    returnTimerRef.current = setTimeout(() => {
      returnTimerRef.current = null
      returnHome()
    }, RETURN_DELAY_MS)
  }, [returnHome])

  const runBouncePhysics = useCallback(
    (startX, startY, startVx, startVy) => {
      let px = startX
      let py = startY
      let vx = startVx
      let vy = startVy

      if (Math.hypot(vx, vy) < MIN_SPEED && Math.hypot(px, py) < 6) {
        scheduleReturnHome()
        return
      }

      if (Math.hypot(vx, vy) < MIN_SPEED * 2) {
        vx = px * 0.05
        vy = py * 0.05
      }

      lastFrameRef.current = performance.now()

      const step = (now) => {
        const dt = Math.min((now - lastFrameRef.current) / 16.67, 2.5)
        lastFrameRef.current = now

        px += vx * dt
        py += vy * dt

        if (px < BOUNDS.minX) {
          px = BOUNDS.minX
          vx = Math.abs(vx) * RESTITUTION
        } else if (px > BOUNDS.maxX) {
          px = BOUNDS.maxX
          vx = -Math.abs(vx) * RESTITUTION
        }

        if (py < BOUNDS.minY) {
          py = BOUNDS.minY
          vy = Math.abs(vy) * RESTITUTION
        } else if (py > BOUNDS.maxY) {
          py = BOUNDS.maxY
          vy = -Math.abs(vy) * RESTITUTION
        }

        vx *= Math.pow(FRICTION, dt)
        vy *= Math.pow(FRICTION, dt)

        x.set(px)
        y.set(py)

        if (Math.hypot(vx, vy) < MIN_SPEED) {
          rafRef.current = null
          scheduleReturnHome()
          return
        }

        rafRef.current = requestAnimationFrame(step)
      }

      rafRef.current = requestAnimationFrame(step)
    },
    [scheduleReturnHome, x, y],
  )

  useEffect(() => () => clearMotion(), [clearMotion])

  const trackVelocity = useCallback((clientX, clientY) => {
    const now = performance.now()
    const samples = samplesRef.current
    samples.push({ x: clientX, y: clientY, t: now })
    if (samples.length > 6) samples.shift()

    if (samples.length < 2) return

    const first = samples[0]
    const last = samples[samples.length - 1]
    const dt = (last.t - first.t) / 1000
    if (dt <= 0) return

    velocityRef.current = {
      x: (last.x - first.x) / dt,
      y: (last.y - first.y) / dt,
    }
  }, [])

  const handlePointerDown = useCallback(
    (e) => {
      if (e.button !== 0) return

      clearMotion()
      draggingRef.current = true
      setIsDragging(true)

      dragOriginRef.current = {
        px: x.get(),
        py: y.get(),
        cx: e.clientX,
        cy: e.clientY,
      }

      samplesRef.current = [{ x: e.clientX, y: e.clientY, t: performance.now() }]
      velocityRef.current = { x: 0, y: 0 }
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    [clearMotion, x, y],
  )

  const handlePointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return

      const { px, py, cx, cy } = dragOriginRef.current
      x.set(px + e.clientX - cx)
      y.set(py + e.clientY - cy)
      trackVelocity(e.clientX, e.clientY)
    },
    [trackVelocity, x, y],
  )

  const handlePointerUp = useCallback(() => {
    if (!draggingRef.current) return

    draggingRef.current = false
    setIsDragging(false)

    const px = x.get()
    const py = y.get()
    const vx = velocityRef.current.x * THROW_BOOST
    const vy = velocityRef.current.y * THROW_BOOST

    runBouncePhysics(px, py, vx, vy)
  }, [runBouncePhysics, x, y])

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`portrait-frame portrait-frame--draggable relative z-10 mx-auto aspect-square w-full select-none ${className}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        animate={{ scale: isDragging ? 1.06 : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 400, damping: 28 } }}
        style={{ x, y, touchAction: 'none', zIndex: isDragging ? 50 : 10 }}
      >
        <div className="portrait-frame__shell relative h-full w-full">
          <div className="portrait-frame__pulse pointer-events-none" aria-hidden="true" />

          <div className="portrait-frame__energy-ring pointer-events-none" aria-hidden="true" />

          <div className="portrait-frame__body relative h-full w-full overflow-hidden rounded-full bg-abyss/95">
            <img
              src={src}
              alt={alt}
              className="pointer-events-none h-full w-full object-cover object-[center_18%]"
              draggable={false}
            />

            <div
              className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.45)]"
              aria-hidden="true"
            />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`${gradId}-a`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e8c87a" stopOpacity="0.15" />
                  <stop offset="40%" stopColor="#e8c87a" stopOpacity="1" />
                  <stop offset="60%" stopColor="#6ec8ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#b8a0ff" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id={`${gradId}-b`} x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6ec8ff" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#6ec8ff" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#e8c87a" stopOpacity="0.15" />
                </linearGradient>
              </defs>

              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="rgba(232, 200, 122, 0.12)"
                strokeWidth="0.8"
              />

              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180
                const x1 = 50 + (R - 2) * Math.cos(angle)
                const y1 = 50 + (R - 2) * Math.sin(angle)
                const x2 = 50 + (R - (i % 3 === 0 ? 6 : 4)) * Math.cos(angle)
                const y2 = 50 + (R - (i % 3 === 0 ? 6 : 4)) * Math.sin(angle)
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={i % 3 === 0 ? 'rgba(110, 200, 255, 0.55)' : 'rgba(232, 200, 122, 0.35)'}
                    strokeWidth={i % 3 === 0 ? 1.2 : 0.7}
                    strokeLinecap="round"
                  />
                )
              })}

              <motion.circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={`url(#${gradId}-a)`}
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                strokeDasharray={`${CIRCUMFERENCE * 0.18} ${CIRCUMFERENCE}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -CIRCUMFERENCE }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />

              <motion.circle
                cx="50"
                cy="50"
                r={R - 3}
                fill="none"
                stroke={`url(#${gradId}-b)`}
                strokeWidth="1"
                strokeLinecap="round"
                transform="rotate(90 50 50)"
                strokeDasharray={`${CIRCUMFERENCE * 0.1} ${CIRCUMFERENCE * 0.55}`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: CIRCUMFERENCE }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'linear' }}
              />
            </svg>

            <span className="portrait-frame__marker portrait-frame__marker--n pointer-events-none" aria-hidden="true" />
            <span className="portrait-frame__marker portrait-frame__marker--e pointer-events-none" aria-hidden="true" />
            <span className="portrait-frame__marker portrait-frame__marker--s pointer-events-none" aria-hidden="true" />
            <span className="portrait-frame__marker portrait-frame__marker--w pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

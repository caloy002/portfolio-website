import { useEffect, useId } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function RadialMeter({ value, size = 88, label, active }) {
  const gradientId = useId()
  const count = useMotionValue(0)
  const smoothCount = useSpring(count, { stiffness: 70, damping: 18, mass: 0.7 })
  const displayValue = useTransform(smoothCount, (latest) => `${Math.round(latest)}%`)
  const r = (size - 10) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference

  useEffect(() => {
    count.set(value)
  }, [count, value])

  return (
    <motion.div
      className={`relative flex flex-col items-center gap-2 ${active ? 'scale-110' : 'scale-100 opacity-70'}`}
      whileHover={{ scale: active ? 1.12 : 1.05, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {active && (
          <motion.div
            className="absolute inset-0 rounded-full bg-aurora/20 blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="4"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8c87a" />
              <stop offset="50%" stopColor="#6ec8ff" />
              <stop offset="100%" stopColor="#b8a0ff" />
            </linearGradient>
          </defs>
        </svg>
        <motion.span className="absolute inset-0 flex items-center justify-center font-display text-xs font-bold text-pearl">
          {displayValue}
        </motion.span>
      </div>
      {label && (
        <span className="max-w-[72px] text-center font-display text-[0.6rem] tracking-wider text-frost/80 uppercase">
          {label}
        </span>
      )}
    </motion.div>
  )
}

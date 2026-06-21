import { motion } from 'framer-motion'

export default function FantasyFrame({ children, className = '', glow = 'aurora' }) {
  const glowClass =
    glow === 'gold'
      ? 'shadow-[0_0_40px_rgba(232,200,122,0.15)]'
      : 'shadow-[0_0_40px_rgba(110,200,255,0.12)]'

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`fantasy-border glass-panel relative overflow-hidden rounded-2xl ${glowClass}`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl">
          <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-gold/50" />
          <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-gold/50" />
          <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-aurora/40" />
          <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-aurora/40" />
        </div>
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  )
}

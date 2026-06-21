import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-gradient-to-r from-gold/90 via-gold-bright/80 to-gold/90 text-void border-gold/40 glow-gold',
  secondary:
    'glass-panel text-pearl border-white/15 hover:border-gold/40 hover:text-gold-bright',
  ghost: 'bg-transparent text-frost border-white/10 hover:border-aurora/40 hover:text-pearl',
}

export default function FantasyButton({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  ...props
}) {
  const classes = `
    relative inline-flex items-center justify-center gap-2 overflow-hidden
    rounded-full border px-6 py-2.5 font-display text-[0.65rem] font-semibold
    tracking-[0.12em] uppercase transition-colors duration-300
    sm:px-7 sm:py-3 sm:text-xs sm:tracking-[0.14em]
    ${variants[variant]} ${className}
  `

  const content = (
    <>
      <motion.span
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.button>
  )
}

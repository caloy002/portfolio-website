import { motion } from 'framer-motion'

const variants = {
  primary: 'rpg-btn rpg-btn--primary',
  secondary: 'rpg-btn rpg-btn--secondary',
}

export default function RpgHeroButton({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  ...props
}) {
  const classes = `relative inline-flex items-center justify-center gap-2 ${variants[variant]} ${className}`

  const content = (
    <>
      <span className="rpg-btn__border rpg-btn__border--tl" aria-hidden="true" />
      <span className="rpg-btn__border rpg-btn__border--br" aria-hidden="true" />
      <motion.span
        className="rpg-btn__shine pointer-events-none absolute inset-0"
        initial={{ x: '-120%' }}
        whileHover={{ x: '120%' }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <span className="rpg-btn__label relative z-10 font-display">{children}</span>
    </>
  )

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
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
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      {...props}
    >
      {content}
    </motion.button>
  )
}

import { motion } from 'framer-motion'

const variants = {
  primary: 'btn-primary glass-shine',
  secondary: 'btn-secondary glass-shine',
  outline: 'btn-secondary glass-shine',
  ghost: 'text-theme-muted hover:text-theme',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
}

export default function ModernButton({
  children,
  variant = 'primary',
  className = '',
  href,
  onClick,
  type = 'button',
  size = 'md',
  fullWidth = false,
  disabled = false,
  ...props
}) {
  const classes = `
    relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-medium
    transition-all duration-300 ease-out
    ${sizes[size]}
    ${variants[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'pointer-events-none opacity-40' : ''}
    ${className}
  `

  const motionProps = disabled
    ? {}
    : {
        whileHover: { y: -2, scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: { type: 'spring', stiffness: 400, damping: 22 },
      }

  if (href) {
    const isExternal = href.startsWith('http')
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={!disabled ? onClick : undefined}
        {...motionProps}
        {...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  )
}

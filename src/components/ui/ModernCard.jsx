import { motion } from 'framer-motion'

export default function ModernCard({
  children,
  className = '',
  hoverable = true,
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md p-6',
    elevated: 'rounded-2xl border-0 bg-white shadow-lg hover:shadow-xl p-6',
    glass: 'rounded-2xl border border-white/30 bg-white/80 backdrop-blur-sm shadow-sm p-6',
  }

  const hoverClass = hoverable ? 'transition-all duration-300 hover:scale-105' : ''

  return (
    <motion.div
      className={`${variants[variant]} ${hoverClass} ${className}`}
      whileHover={hoverable ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

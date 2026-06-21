import { motion } from 'framer-motion'

export default function ModernSection({
  children,
  className = '',
  id,
  title,
  subtitle,
  variant = 'default',
  ...props
}) {
  const variants = {
    default: 'section-padding',
    hero: 'section-padding py-24 sm:py-32 md:py-40',
    compact: 'py-8 sm:py-12 md:py-16',
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id={id}
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      <motion.div
        className="section-wrap"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
      >
        {(title || subtitle) && (
          <motion.div className="mb-12 text-center sm:mb-16 md:mb-20" variants={itemVariants}>
            {title && <h2 className="text-headline md:text-display gradient-text mb-4">{title}</h2>}
            {subtitle && <p className="text-body-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
          </motion.div>
        )}

        <motion.div variants={containerVariants}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  )
}

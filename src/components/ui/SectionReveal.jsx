import { motion } from 'framer-motion'
import { fadeUp } from './motion'

export default function SectionReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
}) {
  const MotionComp = motion[Component] ?? motion.div

  return (
    <MotionComp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2, margin: '-40px' }}
      variants={fadeUp}
      custom={delay}
    >
      {children}
    </MotionComp>
  )
}

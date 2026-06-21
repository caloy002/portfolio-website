import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  stagger = false,
  ...props
}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const variants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (idx) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        delay: stagger ? delay + idx * 0.1 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

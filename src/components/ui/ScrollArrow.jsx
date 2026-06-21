import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronsDown } from 'lucide-react'

export default function ScrollArrow({
  targetId,
  label = 'Scroll to next section',
  className = '',
}) {
  const [burstKey, setBurstKey] = useState(null)
  const [flashing, setFlashing] = useState(false)

  const handleClick = () => {
    const nextBurst = Date.now()
    setBurstKey(nextBurst)
    setFlashing(true)

    window.setTimeout(() => {
      const target = document.getElementById(targetId)
      if (!target) return

      const offset = parseFloat(
        window.getComputedStyle(document.documentElement).getPropertyValue('--section-scroll-offset'),
      ) || 72
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
      window.history.replaceState(null, '', `#${targetId}`)
    }, 170)

    window.setTimeout(() => setFlashing(false), 520)
  }

  return (
    <>
      <AnimatePresence>
        {flashing && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[90] bg-white mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.15, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`scroll-arrow group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/35 bg-slate-950/70 text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.22)] backdrop-blur-md ${className}`}
        onClick={handleClick}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        aria-label={label}
      >
        <span className="scroll-arrow__halo absolute inset-[-0.45rem] rounded-full" aria-hidden="true" />
        <AnimatePresence>
          {burstKey && (
            <motion.span
              key={burstKey}
              className="absolute inset-0 rounded-full border border-white/80 bg-cyan-200/35"
              initial={{ opacity: 0.9, scale: 0.6 }}
              animate={{ opacity: 0, scale: 6.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              aria-hidden="true"
            />
          )}
        </AnimatePresence>

        <motion.span
          className="relative z-10"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.35, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronsDown className="h-6 w-6" strokeWidth={1.8} />
        </motion.span>
      </motion.button>
    </>
  )
}

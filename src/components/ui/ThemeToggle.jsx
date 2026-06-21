import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle ${isDark ? 'theme-toggle--dark' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
    >
      <motion.div
        className="theme-toggle__icon"
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: isDark ? 1 : 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
      <span className="theme-toggle__text">{isDark ? 'Dark' : 'Light'}</span>
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__thumb" />
      </span>
    </motion.button>
  )
}

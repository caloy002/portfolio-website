import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

function getInitialTheme() {
  if (typeof window === 'undefined') return false

  const saved = window.localStorage.getItem('theme-preference')
  if (saved) return saved === 'dark'

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(getInitialTheme)

  // Apply theme to document
  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (isDark) {
      html.classList.add('dark')
      body.classList.add('dark')
      localStorage.setItem('theme-preference', 'dark')
    } else {
      html.classList.remove('dark')
      body.classList.remove('dark')
      localStorage.setItem('theme-preference', 'light')
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((current) => !current)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

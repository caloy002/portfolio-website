/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'Cinzel', 'serif'],
        body: ['Space Grotesk', 'Outfit', 'sans-serif'],
        accent: ['Rajdhani', 'Cormorant Garamond', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        // Modern brand colors
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        purple: {
          500: '#a855f7',
          600: '#9333ea',
        },
        pink: {
          500: '#ec4899',
        },
        cyan: {
          500: '#06b6d4',
        },
        // Dark mode colors
        dark: {
          900: '#0a0a0a',
          800: '#1a1a1a',
          700: '#2d2d2d',
          600: '#3f3f3f',
          500: '#525252',
        },
        // Legacy colors for compatibility
        void: '#060a14',
        abyss: '#0c1222',
        mist: '#141c32',
        frost: '#a8d4f0',
        aurora: '#6ec8ff',
        celestial: '#8b9eff',
        mystic: '#b8a0ff',
        gold: '#e8c87a',
        'gold-bright': '#f5e6b8',
        pearl: '#f0f6ff',
        anemo: '#74c7a8',
        geo: '#c4a574',
        electro: '#b8a0ff',
        hydro: '#6eb8e8',
        dendro: '#8fd48a',
        pyro: '#e8a070',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 16px 48px rgba(0, 0, 0, 0.15)',
        'glow-accent': '0 0 20px rgba(59, 130, 246, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'blur-in': 'blurIn 0.8s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'pulse-smooth': 'pulse-smooth 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blurIn: {
          '0%': { opacity: '0', filter: 'blur(12px)' },
          '100%': { opacity: '1', filter: 'blur(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' },
        },
        'pulse-smooth': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

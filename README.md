# 🎨 John Carlo Casing - Premium Modern Portfolio

A stunning, modern portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. Features a premium design system inspired by Linear, Framer, and Apple with smooth animations, dark mode support, and responsive layouts.

## ✨ Features

- **Premium Modern Design** - Inspired by Linear, Framer, Apple, and Stripe
- **🌙 Full Dark Mode** - Toggle between light and dark themes with persistent storage
- **✨ Smooth Animations** - Framer Motion powered animations with scroll reveals
- **📱 Fully Responsive** - Works perfectly on all device sizes
- **♿ Accessible** - WCAG compliant with keyboard navigation
- **⚡ High Performance** - GPU-accelerated animations, optimized bundle
- **🎨 Modern Component System** - Reusable, well-designed components
- **📚 Comprehensive Documentation** - Full guides and examples included

## 🚀 Quick Start

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

## 📖 Documentation

### For New Users
- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes with practical examples

### For Developers
- **[MODERN_DESIGN.md](MODERN_DESIGN.md)** - Complete design system documentation
- **[IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)** - Step-by-step integration guide
- **[REDESIGN_SUMMARY.md](REDESIGN_SUMMARY.md)** - Summary of all changes made

## 🎯 Key Sections

### Hero Section
- Animated introduction with gradient text
- Call-to-action buttons
- Professional imagery

### About Section  
- Personal introduction
- Key highlights
- Scroll animations

### Projects Showcase
- Modern card layout
- Hover effects
- Project details and links
- Filterable by category

### Skills Section
- Skill categories (Frontend, Backend, Design)
- Proficiency indicators
- Visual hierarchy

### Contact Section
- Professional contact form
- Multiple contact methods
- Form validation

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3b82f6)
- **Secondary**: Purple (#a855f7)
- **Accent**: Pink (#ec4899)
- **Tertiary**: Cyan (#06b6d4)

### Modern Components
- **ModernButton** - 4 variants (primary, secondary, outline, ghost)
- **ModernCard** - 3 variants (default, elevated, glass)
- **ModernSection** - Reusable section wrapper with animations
- **ScrollReveal** - Scroll-triggered animations
- **ThemeToggle** - Dark mode toggle button

### Typography
- Display headings (4xl-7xl)
- Headline and title styles
- Body text with optimal line-height
- Label and code text styles

## 🌙 Dark Mode

- Automatic theme detection
- Manual toggle with ThemeToggle component
- Persistent storage in localStorage
- Smooth transitions between themes
- Beautiful dark color palette

### Usage
```jsx
import { useTheme } from '@/context/ThemeContext'

function MyComponent() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}
```

## ✨ Animations

### Available Animations
- **Scroll Reveals** - Elements fade in as you scroll
- **Page Transitions** - Smooth blur fade transitions
- **Hover Effects** - Interactive button and card effects
- **Staggered Animations** - Sequential element animations
- **Floating Elements** - Continuous floating animations

### Using Animations
```jsx
import { fadeUp, pageTransition } from '@/components/ui/motion'
import { motion } from 'framer-motion'

<motion.h1 variants={fadeUp} initial="hidden" whileInView="visible">
  Animated heading
</motion.h1>
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite 8** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion 13** - Animation library
- **Lucide Icons** - Icon library
- **Supabase** - Backend (optional)

## 📁 Project Structure

```
src/
├── components/
│   ├── background/    # Background effects
│   ├── hero/          # Hero section components
│   ├── layout/        # Layout components
│   └── ui/            # Reusable UI components
├── context/           # React context (themes)
├── data/              # Static data (portfolio content)
├── hooks/             # Custom React hooks
├── services/          # API services
├── App.jsx            # Main app component
├── index.css          # Global styles
└── main.jsx           # React entry point
```

## 🎯 Component Usage Examples

### Modern Button
```jsx
import ModernButton from '@/components/ui/ModernButton'

<ModernButton variant="primary" size="lg">
  Get Started
</ModernButton>

<ModernButton variant="secondary" href="/projects">
  View Projects
</ModernButton>
```

### Modern Card
```jsx
import ModernCard from '@/components/ui/ModernCard'

<ModernCard variant="elevated" hoverable={true}>
  <h3 className="text-title">Project Title</h3>
  <p className="text-body">Description</p>
</ModernCard>
```

### Modern Section
```jsx
import ModernSection from '@/components/layout/ModernSection'

<ModernSection 
  id="projects"
  title="Featured Projects"
  subtitle="My latest work"
>
  {/* Section content */}
</ModernSection>
```

### Scroll Reveal
```jsx
import ScrollReveal from '@/components/ui/ScrollReveal'

<ScrollReveal delay={0.1} stagger={true}>
  <div>This fades in on scroll</div>
</ScrollReveal>
```

## 🌐 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions  
- Mobile: iOS 12+, Android 80+

## 📊 Performance

- ✅ Optimized animations (GPU-accelerated)
- ✅ Minimal layout shifts (CLS)
- ✅ Fast load times
- ✅ Responsive images
- ✅ Code splitting with Vite

### Bundle Size
- CSS: 100.85 kB (17.00 kB gzip)
- JS: 379.75 kB (119.01 kB gzip)

## ♿ Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Respects prefers-reduced-motion
- ✅ High contrast support
- ✅ Screen reader friendly

## 🔧 Customization

### Change Colors
Edit color values in `src/index.css` @theme section or `tailwind.config.js`

### Modify Animations
Update animation variants in `src/components/ui/motion.js`

### Update Content
Edit portfolio data in `src/data/portfolioData.js`

### Adjust Spacing
Use Tailwind spacing utilities in component classes

## 📝 License

This project is open source and available for personal use.

## 👤 Author

**John Carlo Casing**
- [Portfolio](https://yourportfolio.com)
- [GitHub](https://github.com)
- [LinkedIn](https://linkedin.com)

## 📞 Contact

Feel free to reach out with questions or feedback!

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

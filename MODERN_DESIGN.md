# Modern Portfolio Redesign Documentation

## Overview

Your portfolio has been redesigned with a **premium, modern aesthetic** inspired by Linear, Framer, Apple, and Stripe. The redesign focuses on:

✨ **Premium Design**  
- Modern color palette with gradients  
- Smooth, sophisticated animations  
- Glassmorphism effects  
- Minimalist layouts with elegant spacing  

🎨 **Enhanced UX/UI**  
- Improved visual hierarchy  
- Better typography with modern fonts (Inter, Geist Mono)  
- Smooth micro-interactions  
- Responsive design with mobile-first approach  

🌗 **Dark Mode**  
- Full dark mode support with toggle  
- Persistent theme preference in localStorage  
- Smooth theme transitions  

🚀 **Performance**  
- GPU-accelerated animations  
- Optimized transitions using CSS transforms  
- Respects `prefers-reduced-motion` setting  
- Minimal layout shifts  

---

## Color System

### Light Mode (Default)
- **Background**: White (#ffffff)  
- **Text**: Black (#000000)  
- **Secondary Text**: Gray (#666666)  
- **Brand Colors**: Blue (#3b82f6), Purple (#a855f7), Pink (#ec4899)  

### Dark Mode
- **Background**: Deep Black (#0a0a0a)  
- **Text**: White (#ffffff)  
- **Secondary Text**: Light Gray (#b3b3b3)  
- **Brand Colors**: Same gradient palette  

---

## Components

### Modern Button (`ModernButton.jsx`)

A sleek button component with multiple variants and sizes.

**Usage:**
```jsx
import ModernButton from '@/components/ui/ModernButton'

// Primary button
<ModernButton variant="primary" size="lg">
  Get Started
</ModernButton>

// Secondary button
<ModernButton variant="secondary">
  Learn More
</ModernButton>

// Ghost button
<ModernButton variant="ghost" href="/projects">
  View Projects
</ModernButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (default: 'primary')  
- `size`: 'sm' | 'md' | 'lg' (default: 'md')  
- `fullWidth`: boolean (default: false)  
- `disabled`: boolean (default: false)  
- `href`: string (optional - renders as link)  
- `onClick`: function (optional)  

---

### Modern Card (`ModernCard.jsx`)

A flexible card component with hover effects and multiple variants.

**Usage:**
```jsx
import ModernCard from '@/components/ui/ModernCard'

<ModernCard variant="elevated" hoverable={true}>
  <h3 className="text-title mb-2">Project Title</h3>
  <p className="text-body text-gray-600">Project description</p>
</ModernCard>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'glass' (default: 'default')  
- `hoverable`: boolean (default: true)  
- `className`: string (optional)  

---

### Modern Section (`ModernSection.jsx`)

A full-width section with built-in animations and optional title/subtitle.

**Usage:**
```jsx
import ModernSection from '@/components/layout/ModernSection'

<ModernSection 
  id="projects" 
  title="Featured Projects" 
  subtitle="Explore my latest work"
  variant="default"
>
  {/* Section content with automatic animations */}
</ModernSection>
```

**Props:**
- `id`: string (optional)  
- `title`: string (optional)  
- `subtitle`: string (optional)  
- `variant`: 'default' | 'hero' | 'compact' (default: 'default')  
- `className`: string (optional)  

---

### Scroll Reveal (`ScrollReveal.jsx`)

Trigger animations when elements enter the viewport.

**Usage:**
```jsx
import ScrollReveal from '@/components/ui/ScrollReveal'

<ScrollReveal delay={0.1} stagger={true}>
  <div>Content that reveals on scroll</div>
</ScrollReveal>
```

**Props:**
- `delay`: number (default: 0)  
- `stagger`: boolean - stagger children animations (default: false)  
- `className`: string (optional)  

---

### Theme Toggle (`ThemeToggle.jsx`)

A button to toggle between light and dark modes.

**Usage:**
```jsx
import ThemeToggle from '@/components/ui/ThemeToggle'

<ThemeToggle />
```

---

## Animations

### Built-in Animation Variants (from `motion.js`)

```jsx
import {
  fadeUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  pageTransition,
  buttonHover,
  modalVariants,
  slideInRight,
  textReveal,
  // ... and more
} from '@/components/ui/motion'
```

**Example Usage:**
```jsx
<motion.h1 initial="hidden" whileInView="visible" variants={fadeUp}>
  Welcome
</motion.h1>

<motion.button 
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>
```

### CSS Animations

Modern animations are available in the CSS layer:

```css
/* Fade and slide animations */
.fade-up { animation: fadeUp 0.6s ease-out forwards; }
.fade-in { animation: fadeIn 0.6s ease-out forwards; }
.blur-in { animation: blurIn 0.8s ease-out forwards; }
.float { animation: float 3s ease-in-out infinite; }

/* Glow effects */
.glow-accent { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
```

---

## Styling Utilities

### Typography Classes

```jsx
<h1 className="text-display-lg">Large Display</h1>
<h2 className="text-display">Display</h2>
<h3 className="text-headline">Headline</h3>
<h4 className="text-title">Title</h4>
<p className="text-body">Body text</p>
<span className="text-label">Label</span>
```

### Gradient Text

```jsx
<h1 className="gradient-text">Modern Gradient Text</h1>
<h1 className="gradient-text-reverse">Reverse Gradient</h1>
```

### Glass Morphism

```jsx
<div className="glass">Glass effect with backdrop blur</div>
<div className="glass-sm">Smaller glass effect</div>
```

### Modern Cards and Buttons

```jsx
<div className="card">Modern card with hover effect</div>
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-secondary">Secondary Button</button>
<button className="btn btn-ghost">Ghost Button</button>
```

### Input Fields

```jsx
<input className="input" type="text" placeholder="Name" />
<textarea className="textarea" placeholder="Message"></textarea>
```

---

## Dark Mode Usage

The theme system automatically handles dark mode across all components.

**Add class to enable dark mode:**
```jsx
// This is automatically handled by ThemeContext
document.body.classList.add('dark')
```

**Style for dark mode:**
```css
body.dark {
  @apply bg-dark-900 text-white;
}

body.dark .card {
  @apply border-dark-700 bg-dark-800;
}
```

**React Example:**
```jsx
import { useTheme } from '@/context/ThemeContext'

export default function Component() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

---

## Page Transitions

Wrap page content with Framer Motion AnimatePresence for smooth transitions:

```jsx
import { motion, AnimatePresence } from 'framer-motion'
import { pageTransition } from '@/components/ui/motion'

<AnimatePresence mode="wait">
  <motion.div 
    key={currentPage} 
    variants={pageTransition}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {/* Page content */}
  </motion.div>
</AnimatePresence>
```

---

## Scroll Animations

Elements automatically animate when scrolling into view:

```jsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/components/ui/motion'

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-50px' }}
  variants={staggerContainer}
>
  <motion.div variants={fadeUp}>Item 1</motion.div>
  <motion.div variants={fadeUp}>Item 2</motion.div>
  <motion.div variants={fadeUp}>Item 3</motion.div>
</motion.div>
```

---

## Performance Considerations

✅ **GPU Accelerated**  
- Uses `transform` and `opacity` for animations  
- Avoids animating width/height  
- Leverages `will-change` for expensive animations  

✅ **Accessibility**  
- Respects `prefers-reduced-motion`  
- Proper semantic HTML  
- ARIA labels for interactive elements  

✅ **Mobile Optimized**  
- Touch-friendly interactions  
- Responsive layouts  
- Optimized animation timings for mobile  

---

## Tailwind CSS Integration

Modern utilities are built with Tailwind CSS v4. The theme extends Tailwind with custom colors and utilities:

```jsx
/* Custom colors available */
<div className="bg-blue-500 text-white">Blue accent</div>
<div className="bg-gradient-to-r from-blue-500 to-pink-500">Gradient</div>

/* Dark mode support */
<div className="dark:bg-dark-900 dark:text-white">Dark mode</div>
```

---

## Browser Support

- Chrome/Edge: Latest 2 versions  
- Firefox: Latest 2 versions  
- Safari: Latest 2 versions  
- Mobile browsers: iOS Safari 12+, Chrome Android 80+  

---

## Migration Guide

### From Fantasy Theme to Modern

**Old:**
```jsx
<div className="hero-role-badge glass-panel">Badge</div>
<button className="rpg-btn rpg-btn--primary">Button</button>
```

**New:**
```jsx
<div className="badge">Badge</div>
<button className="btn btn-primary">Button</button>
```

---

## Best Practices

1. **Use ScrollReveal for scroll animations**  
   ```jsx
   <ScrollReveal>Content</ScrollReveal>
   ```

2. **Combine motion variants for complex animations**  
   ```jsx
   variants={staggerContainer}
   ```

3. **Maintain consistent spacing**  
   Use Tailwind spacing classes: `p-4`, `mb-6`, `gap-8`

4. **Keep animations subtle**  
   Avoid durations > 0.8s for most animations

5. **Test dark mode**  
   Always test both light and dark themes

---

## Examples

See `/src/components/layout/ModernSection.jsx` for a complete example of how to structure modern pages with animations.

---

## Support

For questions about specific animations or components, refer to:
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)

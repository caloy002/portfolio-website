import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Home, User, FolderOpen, Send } from 'lucide-react'
import {
  about,
  contact,
  hero,
  heroSocials,
  navLinks,
  projects,
  skillCategories,
} from './data/portfolioData'
import SocialLinks from './components/ui/SocialLinks'
import { useScrollSpy } from './hooks/useScrollSpy'
import ModernButton from './components/ui/ModernButton'
import PageContainer from './components/ui/PageContainer'
import { backdropVariants, modalVariants, tagContainer, tagItem, projectCardEnter, skillCardContainer, skillCardItem } from './components/ui/motion'
import SectionReveal from './components/ui/SectionReveal'
import { useTheme } from './context/ThemeContext'
import ThemeToggle from './components/ui/ThemeToggle'

const EASE = [0.25, 0.1, 0.25, 1]
const EASE_EXPO = [0.22, 1, 0.36, 1]

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

function getNavOffset() {
  const nav = document.querySelector('[data-site-nav="true"]')
  const navHeight = nav?.getBoundingClientRect().height ?? 64
  const gap = window.matchMedia('(max-width: 767px)').matches ? 12 : 20
  return navHeight + gap
}

function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  const anchor = target.querySelector('[data-section-anchor]') ?? target
  const offset = getNavOffset()
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const top = Math.min(
    Math.max(0, anchor.getBoundingClientRect().top + window.scrollY - offset),
    Math.max(0, maxScroll),
  )

  window.scrollTo({ top, behavior: 'smooth' })
  window.history.replaceState(null, '', `#${id}`)
}

function SectionHeader({ eyebrow, title, description, className = '' }) {
  return (
    <SectionReveal className={`mb-8 text-center sm:mb-12 md:mb-14 ${className}`}>
      <div data-section-anchor className="scroll-anchor">
        {eyebrow && <p className="section-eyebrow mb-3 sm:mb-4">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
      </div>
      <span className="section-divider block" aria-hidden="true" />
      {description && <p className="section-description mx-auto mt-6 max-w-lg px-2">{description}</p>}
    </SectionReveal>
  )
}

function Section({ id, className = '', variant = 'default', children }) {
  const sectionRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`scroll-section ${variant === 'hero' ? 'scroll-section--hero' : ''} ${className}`}
      initial={prefersReducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={sectionVariants}
    >
      {children}
    </motion.section>
  )
}

const ORBIT_COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6']
const ORBIT_DURATIONS = [2.2, 2.8, 3.4]
const ORBIT_OFFSETS = [0, 120, 240]

function OrbitingCirclesLoader() {
  return (
    <div style={{ position: 'relative', width: 80, height: 80 }}>
      {/* Center core */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '50%',
          marginLeft: -6,
          marginTop: -6,
          width: 12,
          height: 12,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
          boxShadow: '0 0 20px rgba(6,182,212,0.8)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Orbit rings */}
      {ORBIT_COLORS.map((color, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: ORBIT_DURATIONS[i],
            repeat: Infinity,
            ease: 'linear',
            delay: 0,
          }}
          initial={{ rotate: ORBIT_OFFSETS[i] }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 12px ${color}, 0 0 24px ${color}66`,
            }}
          />
        </motion.div>
      ))}
      {/* Outer orbit ring glow */}
      <div
        style={{
          position: 'absolute',
          inset: 4,
          borderRadius: '50%',
          border: '1px solid rgba(6,182,212,0.15)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--bg)', backdropFilter: 'blur(20px)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: EASE_EXPO }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
          >
            <OrbitingCirclesLoader />
          </motion.div>
          <motion.p
            className="mt-8 text-xs tracking-[0.3em] text-theme-muted uppercase"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: EASE_EXPO }}
          >
            Loading
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const navIcons = {
  home: Home,
  about: User,
  projects: FolderOpen,
  contact: Send,
}

function MobileBottomNav({ active, onNavigate }) {
  return (
    <nav
      className="mobile-bottom-nav fixed right-0 bottom-0 left-0 z-50 md:hidden"
      aria-label="Section navigation"
    >
      <ul className="flex items-stretch justify-around px-1 pt-1">
        {navLinks.map((link) => {
          const isActive = active === link.id
          const Icon = navIcons[link.id]
          return (
            <li key={link.id} className="min-w-0 flex-1">
              <a
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(link.id)
                }}
                className={`touch-target relative flex min-h-[3.65rem] flex-col items-center justify-center gap-1 px-1 py-1.5 text-[0.65rem] font-medium tracking-wide transition-colors ${
                  isActive ? 'text-theme' : 'text-theme-muted'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-x-2 top-1 bottom-1 rounded-xl border border-theme bg-theme-surface"
                    style={{ boxShadow: '0 0 16px var(--glass-glow)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                {Icon && <Icon className="relative z-10 h-[18px] w-[18px]" />}
                <span className="relative z-10">{link.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const active = useScrollSpy(navLinks.map((link) => link.id))
  const { scrollY } = useScroll()

  // Scroll-driven navbar blur & opacity
  const navBgOpacity = useTransform(scrollY, [0, 80], [0.62, 0.88])
  const navBlur = useTransform(scrollY, [0, 80], [16, 36])

  useEffect(() => {
    const nav = document.querySelector('[data-site-nav="true"]')
    if (!nav) return

    const syncNavHeight = () => {
      const navHeight = nav.getBoundingClientRect().height
      document.documentElement.style.setProperty('--site-nav-height', `${navHeight}px`)
      document.documentElement.style.setProperty('--section-scroll-offset', `${navHeight}px`)
    }

    syncNavHeight()
    const observer = new ResizeObserver(syncNavHeight)
    observer.observe(nav)
    window.addEventListener('resize', syncNavHeight)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncNavHeight)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        data-site-nav="true"
        className="pointer-events-none fixed top-0 right-0 left-0 z-50 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6"
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <nav
          className={`minimal-nav pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full px-4 transition-all duration-300 sm:px-6 ${
            scrolled ? 'py-2.5' : 'py-3'
          }`}
          style={{
            boxShadow: scrolled ? '0 8px 24px var(--shadow)' : undefined,
          }}
        >
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
            className="text-sm font-semibold tracking-tight text-theme"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            Portfolio
          </motion.a>

          <div className="flex items-center gap-3 sm:gap-4">
            <ul className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => {
                const isActive = active === link.id
                return (
                  <li key={link.id}>
                    <motion.a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.id)
                      }}
                      className={`minimal-nav-link relative ${isActive ? 'minimal-nav-link--active' : ''}`}
                      whileHover={{ y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute -inset-x-2 -inset-y-1 rounded-full border border-theme bg-theme-surface backdrop-blur-sm"
                          style={{ boxShadow: '0 0 20px var(--glass-glow)' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                      {/* Animated underline on hover */}
                      {!isActive && (
                        <motion.span
                          className="absolute -bottom-0.5 left-0 h-px bg-current opacity-50"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          style={{ originX: 0, width: '100%' }}
                          transition={{ duration: 0.25, ease: EASE_EXPO }}
                        />
                      )}
                    </motion.a>
                  </li>
                )
              })}
            </ul>
            <ThemeToggle />
          </div>
        </nav>
      </motion.header>

      <MobileBottomNav active={active} onNavigate={scrollToSection} />
    </>
  )
}

function Hero() {
  const [typed, setTyped] = useState('')
  const [nameVisible, setNameVisible] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setTyped(hero.greeting.slice(0, i + 1))
      i += 1
      if (i >= hero.greeting.length) {
        clearInterval(timer)
        setTimeout(() => setNameVisible(true), 150)
      }
    }, 45)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!nameVisible) return
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % hero.roles.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [nameVisible])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <Section id="home" variant="hero">
      <PageContainer>
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <SectionReveal>
          <SectionReveal>
            <div data-section-anchor className="scroll-anchor">
              <p className="section-eyebrow mb-3 sm:mb-4">
                {typed}
                <span className="typewriter-cursor" />
              </p>
            </div>
            
            <motion.h1
              className="section-title text-[clamp(2.25rem,6vw,4rem)] flex flex-wrap gap-x-3 gap-y-1"
              variants={containerVariants}
              initial="hidden"
              animate={nameVisible ? "visible" : "hidden"}
            >
              {hero.name.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  variants={wordVariants}
                  className="text-gradient-primary inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            
            <span className="section-divider mt-6 block" aria-hidden="true" />

            {/* Dynamic Role Cycler */}
            <div className="mt-6 flex flex-wrap items-center gap-x-2 text-xs font-medium tracking-[0.25em] text-theme-muted uppercase min-h-[1.75rem]">
              <span>I am a</span>
              <div className="relative inline-flex items-center h-[1.75rem] overflow-hidden min-w-0 flex-1 max-w-[260px] sm:max-w-none sm:min-w-[280px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 15, opacity: 0, filter: 'blur(3px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -15, opacity: 0, filter: 'blur(3px)' }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-y-0 left-0 flex items-center font-semibold tracking-[0.25em] whitespace-nowrap"
                  >
                    <span className="text-gradient-primary">
                      {hero.roles[roleIndex]}
                    </span>
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <p className="section-description mt-8 max-w-xl">{hero.bio}</p>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">
              <ModernButton variant="primary" href={hero.cvUrl} download size="lg" className="w-full sm:w-auto">
                Download CV
              </ModernButton>
              <ModernButton
                variant="secondary"
                href="#contact"
                size="lg"
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('contact')
                }}
              >
                Contact me
              </ModernButton>
            </div>

            <div className="mt-8 sm:mt-10">
              <p className="section-eyebrow mb-3 normal-case tracking-normal">Connect</p>
              <SocialLinks links={heroSocials} size="lg" />
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15} className="flex justify-center lg:justify-end">
            <motion.div
              className="glass-frame relative w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02, rotate: 1 }}
            >
              <div className="glass-frame__glow" aria-hidden="true" />
              <div className="glass-frame__inner">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="aspect-square w-full object-cover object-top"
                />
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </PageContainer>
    </Section>
  )
}

const aboutCaptions = [
  "Graduation Ceremony",
  "Academic Presentation",
  "Certificate of Achievement",
  "Hardware Project Team",
  "Coding & Development Workspace",
  "Electronics & Microcontroller Prototype",
  "Hardware Interface Testing",
  "Hardware Assembly & Soldering",
  "System Integration & Debugging"
]

function AboutImageGallery({ images }) {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const activeIndex = (page % images.length + images.length) % images.length

  const navigate = (newDirection) => {
    setDirection(newDirection)
    setPage((prev) => prev + newDirection)
  }

  const setIndex = (index) => {
    const diff = index - activeIndex
    if (diff !== 0) {
      setDirection(diff > 0 ? 1 : -1)
      setPage((prev) => prev + diff)
    }
  }

  // Slide animations
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      filter: 'blur(4px)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 28 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 }
      }
    })
  }

  return (
    <div 
      className="flex flex-col gap-4 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Image Slider */}
      <motion.div
        className="glass-frame relative w-full select-none overflow-hidden"
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      >
        <div className="glass-frame__glow" aria-hidden="true" />
        
        {/* Main image container */}
        <div className="glass-frame__inner relative aspect-[4/5] max-h-[320px] w-full overflow-hidden bg-theme-surface sm:max-h-[420px] md:max-h-none">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.img
              key={page}
              src={images[activeIndex]}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              alt={`About gallery image - ${aboutCaptions[activeIndex]}`}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Navigation Overlay Buttons */}
          <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 active:scale-95 transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => navigate(1)}
              className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 active:scale-95 transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Thumbnails Row */}
      <div className="flex gap-2 overflow-x-auto pb-2 px-0.5 scrollbar-none snap-x snap-mandatory justify-start sm:justify-center">
        {images.map((img, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`relative aspect-square w-12 h-12 shrink-0 overflow-hidden rounded-md border transition-all duration-300 focus:outline-none cursor-pointer snap-center ${
                isActive 
                  ? 'border-[#06b6d4] scale-105 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10' 
                  : 'border-theme-strong opacity-50 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

function About() {
  const [catIndex, setCatIndex] = useState(0)
  const category = skillCategories[catIndex]

  return (
    <Section id="about">
      <PageContainer>
        <SectionHeader
          eyebrow="About"
          title={about.title}
          description="Developer profile, background, and technical skills."
        />

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <SectionReveal delay={0.1} className="mx-auto w-full max-w-md lg:max-w-none">
            <AboutImageGallery images={about.images} />
          </SectionReveal>

          <SectionReveal delay={0.15}>
            <div className="glass-panel flex h-full flex-col justify-center">
              <div className="space-y-5">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)} className="section-description leading-7">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-2">
                {['UI/UX', 'Web Apps', 'Game Dev'].map((item) => (
                  <span key={item} className="minimal-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.2} className="mt-8 sm:mt-12">
          <div className="glass-panel">
            <div className="mb-8 border-b border-theme pb-6">
              <p className="section-eyebrow mb-3">Skills</p>
              <h3 className="text-xl font-semibold tracking-tight text-theme sm:text-2xl">Tools & Tech Stack</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillCategories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  type="button"
                  onClick={() => setCatIndex(i)}
                  className={`skill-tab ${i === catIndex ? 'skill-tab--active' : ''}`}
                  whileHover={i !== catIndex ? { scale: 1.05, y: -2 } : { scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  animate={i === catIndex ? { scale: 1.03 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                >
                  {cat.label}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={category.id}
                className="mt-8 grid gap-4 sm:grid-cols-2"
                variants={skillCardContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              >
                {category.skills.map((skill, idx) => (
                  <motion.li
                    key={skill.name}
                    className="skill-item"
                    variants={skillCardItem}
                    custom={idx}
                    whileHover={{ y: -6, scale: 1.02, boxShadow: '0 12px 40px var(--glass-glow)', borderColor: 'var(--glass-edge)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-theme">{skill.name}</span>
                      <span className="text-xs text-theme-muted">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: idx * 0.05 }}
                      />
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </SectionReveal>
      </PageContainer>
    </Section>
  )
}

function ProjectDetailModal({ project, onClose }) {
  const [shotIndex, setShotIndex] = useState(0)

  useEffect(() => {
    if (!project) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setShotIndex((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setShotIndex((i) => Math.min(project.screenshots.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  const shots = project?.screenshots ?? []
  const current = shots[shotIndex]

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-modal-backdrop fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-8"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-detail-title"
        >
          <motion.button
            type="button"
            className="fixed inset-0 bg-theme-overlay"
            onClick={onClose}
            aria-label="Close project details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="project-modal-shell glass-modal relative z-10 mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl"
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex items-start justify-between gap-4 border-b border-theme px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="section-eyebrow mb-2">Project</p>
                <h2 id="project-detail-title" className="text-lg font-semibold text-theme sm:text-xl">
                  {project.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="touch-target icon-btn flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[85vh] overflow-y-auto overscroll-contain">
              <div className="relative border-b border-theme">
                <div className="relative aspect-video w-full overflow-hidden bg-theme-surface">
                  <AnimatePresence mode="wait">
                    {current?.type === 'video' ? (
                      <motion.video
                        key={current.src}
                        src={current.src}
                        className="h-full w-full object-contain"
                        controls
                        playsInline
                        preload="metadata"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    ) : (
                      <motion.img
                        key={current?.src}
                        src={current?.src}
                        alt={current?.label ?? project.title}
                        className="h-full w-full object-contain p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {shots.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="modal-nav-btn absolute top-1/2 left-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full disabled:opacity-30"
                      onClick={() => setShotIndex((i) => Math.max(0, i - 1))}
                      disabled={shotIndex === 0}
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="modal-nav-btn absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full disabled:opacity-30"
                      onClick={() => setShotIndex((i) => Math.min(shots.length - 1, i + 1))}
                      disabled={shotIndex === shots.length - 1}
                      aria-label="Next screenshot"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}

                {current && (
                  <div className="px-5 py-4 sm:px-6">
                    <p className="text-sm font-medium text-theme">{current.label}</p>
                    <p className="mt-1 text-sm text-theme-muted">{current.caption}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6 px-5 py-6 sm:px-6">
                {shots.length > 1 && (
                  <div>
                    <p className="section-eyebrow mb-3">Gallery</p>
                    <div className="flex gap-2 overflow-x-auto pb-3 px-0.5 scrollbar-none snap-x snap-mandatory justify-start">
                      {shots.map((shot, i) => {
                        const isActive = i === shotIndex
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setShotIndex(i)}
                            className={`relative aspect-square w-14 h-14 shrink-0 overflow-hidden rounded-md border transition-all duration-300 focus:outline-none cursor-pointer snap-center ${
                              isActive
                                ? 'border-[#06b6d4] scale-105 shadow-[0_0_12px_rgba(6,182,212,0.4)] z-10'
                                : 'border-theme-strong opacity-50 hover:opacity-100 hover:scale-105'
                            }`}
                          >
                            {shot.type === 'video' ? (
                              <div className="relative w-full h-full bg-theme-surface flex items-center justify-center">
                                <video src={shot.src} className="h-full w-full object-cover opacity-60" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Video</span>
                                </div>
                              </div>
                            ) : (
                              <img
                                src={shot.src}
                                alt={`Thumbnail ${i + 1}`}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <p className="section-eyebrow mb-3">Overview</p>
                  <div className="section-description space-y-4 leading-7 text-theme-muted">
                    {project.description.split('\n\n').map((block, i) => {
                      const trimmed = block.trim();
                      if (!trimmed) return null;

                      if (trimmed.startsWith('###')) {
                        return (
                          <h4 key={i} className="text-sm font-bold tracking-wider text-theme uppercase pt-3">
                            {trimmed.replace(/^###\s+/, '')}
                          </h4>
                        );
                      }

                      if (trimmed.includes('System Description')) {
                        const parts = trimmed.split('\n');
                        const systemTitle = parts.find(p => p.includes('System Description')) || 'System Description';
                        const systemSubtitle = parts.find(p => !p.includes('System Description')) || '';
                        return (
                          <div key={i} className="border-b border-theme pb-3 mb-4">
                            <h3 className="text-base font-bold text-theme">
                              {systemTitle}
                            </h3>
                            {systemSubtitle && (
                              <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-wider mt-1">
                                {systemSubtitle}
                              </p>
                            )}
                          </div>
                        );
                      }

                      return (
                        <p key={i} className="whitespace-pre-line text-sm sm:text-base">
                          {trimmed}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="section-eyebrow mb-3">Tech stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="minimal-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <ModernButton variant="secondary" onClick={onClose} fullWidth className="sm:w-auto">
                  Close
                </ModernButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All projects')

  const categories = ['All projects', 'System', 'UI/UX Design', 'Game']

  const filteredProjects = activeFilter === 'All projects'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  return (
    <Section id="projects">
      <PageContainer>
        <SectionHeader
          eyebrow="Work"
          title="Projects"
          description="Selected projects across development, design, and product work."
        />

        {/* Category Filter Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => {
            const isActive = activeFilter === cat
            return (
              <motion.button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`skill-tab relative px-4 py-2 text-xs font-semibold select-none cursor-pointer overflow-visible ${
                  isActive ? '' : 'text-theme-muted'
                }`}
                style={{ color: isActive ? 'var(--bg)' : undefined }}
                whileHover={!isActive ? { scale: 1.05, y: -2 } : { scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                {/* Animated gradient border glow for active */}
                {isActive && <span className="filter-btn-active-glow" aria-hidden="true" />}
                {isActive && (
                  <motion.span
                    layoutId="activeProjectCategory"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(135deg, var(--fg), color-mix(in srgb, var(--fg) 85%, transparent))',
                      boxShadow: '0 4px 20px var(--glass-glow), 0 0 0 1px var(--glass-glow)',
                      zIndex: 0,
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const isContain = project.coverFit === 'contain'

              return (
                <motion.div
                  key={project.id}
                  layout
                  custom={i}
                  variants={projectCardEnter}
                  initial="hidden"
                  animate="visible"
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: 20,
                    transition: { duration: 0.25, ease: EASE },
                  }}
                  className="flex flex-col"
                >
                  <motion.article
                    className="project-card-minimal group flex flex-col flex-1"
                    whileHover={{ y: -10, scale: 1.012 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                  >
                    {/* Card image with zoom + overlay */}
                    <div className="project-card-img-wrap relative aspect-[16/10] border-b border-theme bg-theme-surface">
                      {project.coverVideo ? (
                        <motion.video
                          src={project.coverVideo}
                          className="h-full w-full object-cover"
                          muted
                          loop
                          playsInline
                          autoPlay
                          preload="metadata"
                          aria-label={`${project.title} preview`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5, ease: EASE_EXPO }}
                        />
                      ) : (
                        <motion.img
                          src={project.coverImage}
                          alt={project.title}
                          className={
                            isContain
                              ? 'h-full w-full object-contain p-4'
                              : 'h-full w-full object-cover'
                          }
                          whileHover={!isContain ? { scale: 1.05, filter: 'brightness(1.08)' } : {}}
                          transition={{ duration: 0.5, ease: EASE_EXPO }}
                        />
                      )}
                      {/* Soft gradient overlay reveals on hover */}
                      <div className="project-card-img-overlay" aria-hidden="true" />
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <p className="section-eyebrow mb-2">
                        {String(projects.indexOf(project) + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-lg font-semibold tracking-tight text-theme">{project.title}</h3>
                      <p className="section-description mt-3 line-clamp-2 flex-1">{project.summary}</p>

                      {/* Tags with stagger animation */}
                      <motion.ul
                        className="mt-4 flex flex-wrap gap-2"
                        variants={tagContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {project.tags.slice(0, 3).map((tag) => (
                          <motion.li key={tag} className="minimal-tag text-[0.65rem]" variants={tagItem}>
                            {tag}
                          </motion.li>
                        ))}
                      </motion.ul>

                      {/* View Details button with arrow animation */}
                      <motion.button
                        type="button"
                        className="mt-6 btn-secondary glass-shine relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-2.5 text-sm font-medium w-full sm:w-auto"
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      >
                        <span>View details</span>
                        <motion.span
                          whileHover={{ x: 4 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          style={{ display: 'inline-flex' }}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </motion.span>
                      </motion.button>
                    </div>
                  </motion.article>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </PageContainer>

      <ProjectDetailModal
        key={selectedProject?.id ?? 'closed'}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  )
}

function FloatingInput({ id, label, type = 'text', placeholder, rows }) {
  const isTextarea = !!rows
  return (
    <div className="contact-field-wrap">
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          placeholder={placeholder || ' '}
          className={`contact-field-input contact-field-textarea mobile-input`}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder || ' '}
          className="contact-field-input mobile-input"
        />
      )}
      <label htmlFor={id} className="contact-field-label">{label}</label>
    </div>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      setTimeout(() => setSent(false), 4000)
    }, 600)
  }

  return (
    <Section id="contact">
      <PageContainer>
        <SectionHeader
          eyebrow="Contact"
          title="Get in touch"
          description="Have a project in mind or want to collaborate? Send a message."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 contact-grid-mobile">
          <SectionReveal>
            <form className="glass-panel space-y-5" onSubmit={handleSubmit}>
              <FloatingInput id="contact-name" label="Name" type="text" placeholder=" " />
              <FloatingInput id="contact-email" label="Email" type="email" placeholder=" " />
              <FloatingInput id="contact-message" label="Message" rows={5} placeholder=" " />

              {/* Submit button with shine + scale */}
              <motion.button
                type="submit"
                disabled={sent || submitting}
                className={`btn-submit-shine btn-primary relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-medium ${
                  sent || submitting ? 'opacity-70 pointer-events-none' : ''
                }`}
                whileHover={!sent && !submitting ? { scale: 1.03, y: -1 } : {}}
                whileTap={!sent && !submitting ? { scale: 0.97 } : {}}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span
                      key="sent"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: EASE_EXPO }}
                    >
                      <motion.span
                        className="success-checkmark"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 22, delay: 0.1 }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <motion.path
                            d="M2 6l3 3 5-5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                          />
                        </svg>
                      </motion.span>
                      Message sent!
                    </motion.span>
                  ) : submitting ? (
                    <motion.span
                      key="sending"
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      Sending...
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                    >
                      Send message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </SectionReveal>

          <SectionReveal delay={0.1} className="space-y-4">
            <motion.div
              className="glass-panel"
              whileHover={{ y: -4, boxShadow: '0 16px 48px var(--shadow), 0 0 0 1px var(--glass-glow)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <p className="section-eyebrow mb-3">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="break-all text-base text-theme transition-opacity hover:opacity-70 sm:text-lg"
              >
                {contact.email}
              </a>
            </motion.div>

            <motion.div
              className="glass-panel"
              whileHover={{ y: -4, boxShadow: '0 16px 48px var(--shadow), 0 0 0 1px var(--glass-glow)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <p className="section-eyebrow mb-3">Status</p>
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-2 w-2 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <p className="text-sm text-theme-muted">Available for new opportunities</p>
              </div>
            </motion.div>

            <motion.div
              className="glass-panel"
              whileHover={{ y: -4, boxShadow: '0 16px 48px var(--shadow), 0 0 0 1px var(--glass-glow)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            >
              <p className="section-eyebrow mb-3">Social</p>
              <SocialLinks links={contact.socials} />
            </motion.div>
          </SectionReveal>
        </div>
      </PageContainer>
    </Section>
  )
}

// ── AI Fireflies Digital Ecosystem Background ──

const drawFirefly = (ctx, x, y, r, color, pulseVal) => {
  const auraRad = r * (4.5 + Math.sin(pulseVal) * 1.5);

  // 1. Soft glowing aura bloom (high performance radial gradient)
  const glowGrad = ctx.createRadialGradient(x, y, r * 0.4, x, y, auraRad);
  glowGrad.addColorStop(0, `${color}bb`);
  glowGrad.addColorStop(0.35, `${color}20`);
  glowGrad.addColorStop(1, `${color}00`);

  ctx.beginPath();
  ctx.arc(x, y, auraRad, 0, Math.PI * 2);
  ctx.fillStyle = glowGrad;
  ctx.fill();

  // 2. Glossy core
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, r * 0.7, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
};

const darkenColor = (hex, percent) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.floor(r * (1 - percent));
  g = Math.floor(g * (1 - percent));
  b = Math.floor(b * (1 - percent));

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

function ChainReactionCanvas() {
  const canvasRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isReduced = prefersReducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const cellSize = isMobile ? 70 : 88;
    let cols = Math.max(4, Math.floor(width / cellSize));
    let rows = Math.max(6, Math.floor(height / cellSize));
    let cellW = width / cols;
    let cellH = height / rows;

    const COLORS = isDark
      ? [
          '#06b6d4', // Cyan
          '#3b82f6', // Blue
          '#a855f7', // Purple
          '#f97316', // Orange
          '#22c55e', // Green
          '#ec4899'  // Magenta
        ]
      : [
          '#0891b2', // Cyan (darker)
          '#2563eb', // Blue
          '#9333ea', // Purple
          '#ea580c', // Orange
          '#16a34a', // Green
          '#db2777'  // Magenta
        ];
    let currentColorIndex = 0;

    // Grid details
    let grid = [];
    const initGrid = () => {
      const newGrid = [];
      for (let c = 0; c < cols; c++) {
        const colArr = [];
        for (let r = 0; r < rows; r++) {
          const existing = grid[c]?.[r];
          const isCorner = (c === 0 || c === cols - 1) && (r === 0 || r === rows - 1);
          const isEdge = (c === 0 || c === cols - 1 || r === 0 || r === rows - 1) && !isCorner;
          const capacity = isCorner ? 2 : isEdge ? 3 : 4;

          colArr.push({
            capacity,
            hoverProgress: 0,
            ripple: null,
            isMerging: existing ? existing.isMerging : false,
            mergeTimer: 0
          });
        }
        newGrid.push(colArr);
      }
      grid = newGrid;
    };

    initGrid();

    // Fireflies and physics lists
    let fireflies = [];
    let travelingFireflies = [];
    let sparks = [];
    let shockwaves = [];
    let shootingStars = [];

    // Camera Shake
    const cameraShake = {
      intensity: 0,
      decay: 0.88
    };

    // User Activity Tracking
    const mouse = {
      x: 0,
      y: 0,
      hoverCol: -1,
      hoverRow: -1,
      isDragging: false,
      isHovering: false,
      lastActive: Date.now(),
      clickPulse: null // { x, y, radius, maxRadius }
    };

    // Evolution spawning logic
    let lastEvolutionCheck = Date.now();
    
    // Rare Event triggers
    let lastRareEventTime = Date.now() + 10000; // Trigger first event 10s after load
    let auroraWave = null; // { progress, speed, colorIndex }

    // Autonomous Burst details
    let lastBurstTime = Date.now();

    // Refresh background logic to prevent lag (every 10 minutes)
    let lastRefreshTime = Date.now();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.max(4, Math.floor(width / cellSize));
      rows = Math.max(6, Math.floor(height / cellSize));
      cellW = width / cols;
      cellH = height / rows;
      initGrid();
      
    };
    window.addEventListener('resize', handleResize);
    
    // Initialize hubs
    handleResize();

    const getNeighbors = (c, r) => {
      const list = [];
      if (c > 0) list.push({ col: c - 1, row: r });
      if (c < cols - 1) list.push({ col: c + 1, row: r });
      if (r > 0) list.push({ col: c, row: r - 1 });
      if (r < rows - 1) list.push({ col: c, row: r + 1 });
      return list;
    };

    // Spawn sparks helper
    const spawnSparks = (x, y, color) => {
      const count = isMobile ? 12 : 24;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 0.8 + Math.random() * 2,
          color,
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02
        });
      }
    };

    // Explosion triggers splitting traveling fireflies
    const triggerExplosion = (c, r, color) => {
      const cx = c * cellW + cellW / 2;
      const cy = r * cellH + cellH / 2;

      // Camera shake impact
      cameraShake.intensity = isMobile ? 4.5 : 8.0;

      // Shockwave
      shockwaves.push({
        x: cx,
        y: cy,
        radius: 12,
        maxRadius: Math.min(cellW, cellH) * 1.6,
        color,
        alpha: 1.0
      });

      // Sparks
      spawnSparks(cx, cy, color);

      // Spawn traveling firefly agents
      const neighbors = getNeighbors(c, r);
      neighbors.forEach(n => {
        const theta = Math.random() * Math.PI * 2;
        travelingFireflies.push({
          x: cx,
          y: cy,
          vx: Math.cos(theta) * 3,
          vy: Math.sin(theta) * 3,
          color,
          targetCol: n.col,
          targetRow: n.row,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.05 + Math.random() * 0.05,
          size: 2.2 + Math.random() * 1.0,
          trail: []
        });
      });
    };

    // User interaction handling
    const handleMouseMove = (e) => {
      mouse.lastActive = Date.now();
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isHovering = true;

      const isInteractive = e.target.closest('a, button, input, textarea, .glass-panel, [role="button"]');
      if (isInteractive) {
        mouse.hoverCol = -1;
        mouse.hoverRow = -1;
      } else {
        mouse.hoverCol = Math.floor(e.clientX / cellW);
        mouse.hoverRow = Math.floor(e.clientY / cellH);
      }
    };

    const handleMouseDown = () => {
      mouse.isDragging = true;
      mouse.lastActive = Date.now();
    };

    const handleMouseUp = () => {
      mouse.isDragging = false;
      mouse.lastActive = Date.now();
    };

    const handleWindowClick = (e) => {
      mouse.lastActive = Date.now();
      const targetElement = e.target;
      const isInteractive = targetElement.closest('a, button, input, textarea, [role="button"]') || 
                            targetElement.closest('.glass-modal') || 
                            targetElement.closest('.mobile-bottom-nav') || 
                            targetElement.closest('.minimal-nav');
      if (isInteractive) return;

      const clickX = e.clientX;
      const clickY = e.clientY;
      const clickCol = Math.floor(clickX / cellW);
      const clickRow = Math.floor(clickY / cellH);

      // Trigger attraction click pulse
      mouse.clickPulse = {
        x: clickX,
        y: clickY,
        radius: 10,
        maxRadius: 280
      };

      if (clickCol >= 0 && clickCol < cols && clickRow >= 0 && clickRow < rows) {
        const cell = grid[clickCol][clickRow];
        const clickColor = COLORS[currentColorIndex];

        // Add firefly to the cell swarm
        const cx = clickCol * cellW + cellW / 2;
        const cy = clickRow * cellH + cellH / 2;

        fireflies.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: clickColor,
          targetCol: clickCol,
          targetRow: clickRow,
          pulseOffset: Math.random() * Math.PI * 2,
          pulseSpeed: 0.04 + Math.random() * 0.04,
          size: 2.0 + Math.random() * 1.2,
          state: 'normal',
          wanderAngle: Math.random() * Math.PI * 2,
          trail: []
        });

        // Trigger local click cell ripples
        cell.ripple = {
          radius: 5,
          maxRadius: Math.min(cellW, cellH) * 0.75,
          alpha: 0.8
        };

        // Enforce conversion on click if color differs
        // Set cell color to clicked color
        const cellFireflies = fireflies.filter(f => f.targetCol === clickCol && f.targetRow === clickRow);
        cellFireflies.forEach(f => f.color = clickColor);

        // Check merge explosions
        if (cellFireflies.length >= cell.capacity && !cell.isMerging) {
          cell.isMerging = true;
          cell.mergeTimer = 0;
          cellFireflies.forEach(f => f.state = 'merging');
        }

        currentColorIndex = (currentColorIndex + 1) % COLORS.length;
      }
    };

    // Supernova Double Click Wave
    const handleDoubleClick = (e) => {
      mouse.lastActive = Date.now();
      const targetElement = e.target;
      if (targetElement.closest('a, button, input, textarea, [role="button"]')) return;

      const clickCol = Math.floor(e.clientX / cellW);
      const clickRow = Math.floor(e.clientY / cellH);

      if (clickCol >= 0 && clickCol < cols && clickRow >= 0 && clickRow < rows) {
        const cellsToTrigger = [{ col: clickCol, row: clickRow }];
        const neighbors = getNeighbors(clickCol, clickRow);
        neighbors.forEach(n => cellsToTrigger.push(n));

        cellsToTrigger.forEach(cellPos => {
          const cell = grid[cellPos.col][cellPos.row];
          const swarm = fireflies.filter(f => f.targetCol === cellPos.col && f.targetRow === cellPos.row);
          
          // Force pop immediately
          const popColor = swarm.length > 0 ? swarm[0].color : COLORS[Math.floor(Math.random() * COLORS.length)];
          
          // Clear fireflies in this cell
          fireflies = fireflies.filter(f => !(f.targetCol === cellPos.col && f.targetRow === cellPos.row));
          cell.isMerging = false;

          triggerExplosion(cellPos.col, cellPos.row, popColor);
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    window.addEventListener('click', handleWindowClick);
    window.addEventListener('dblclick', handleDoubleClick);

    // Simulation loops
    let time = 0;
    const tick = () => {
      time += 1;
      const now = Date.now();

      // Refresh background animation every 5 minutes OR when fireflies exceed limits to prevent clutter/lag
      const maxFireflies = isMobile ? 100 : 200;
      if (now - lastRefreshTime > 300000 || fireflies.length > maxFireflies) {
        lastRefreshTime = now;
        fireflies = [];
        travelingFireflies = [];
        sparks = [];
        shockwaves = [];
        shootingStars = [];
        currentColorIndex = 0;
        cameraShake.intensity = 0;
        auroraWave = null;
        lastBurstTime = now;
        lastRareEventTime = now + 10000;
        lastEvolutionCheck = now;
        time = 0;
        initGrid();
      }

      // 10-Second Triple Burst Logic
      if (now - lastBurstTime > 10000) {
        lastBurstTime = now;
        for (let i = 0; i < 3; i++) {
          const rc = Math.floor(Math.random() * cols);
          const rr = Math.floor(Math.random() * rows);
          const cell = grid[rc][rr];
          if (cell) {
            const swarm = fireflies.filter(f => f.targetCol === rc && f.targetRow === rr);
            const burstColor = swarm.length > 0 ? swarm[0].color : COLORS[Math.floor(Math.random() * COLORS.length)];
            
            // Clear cell and trigger explosion splits
            fireflies = fireflies.filter(f => !(f.targetCol === rc && f.targetRow === rr));
            cell.isMerging = false;
            triggerExplosion(rc, rr, burstColor);
          }
        }
      }

      // Rare Events Engine
      if (now - lastRareEventTime > 40000) {
        lastRareEventTime = now;
        const eventChoice = Math.random();
        
        if (eventChoice < 0.25) {
          // 1. Firefly Migration: spawn flock flying across screen
          const swarmCount = isMobile ? 30 : 60;
          const migrationColor = COLORS[Math.floor(Math.random() * COLORS.length)];
          for (let i = 0; i < swarmCount; i++) {
            fireflies.push({
              x: -40 - Math.random() * 100,
              y: Math.random() * height,
              vx: 2.5 + Math.random() * 2.5,
              vy: (Math.random() - 0.5) * 1.5,
              color: migrationColor,
              targetCol: -99, // Outside grid
              targetRow: -99,
              pulseOffset: Math.random() * Math.PI * 2,
              pulseSpeed: 0.06 + Math.random() * 0.05,
              size: 1.5 + Math.random() * 1.5,
              state: 'migration',
              wanderAngle: (Math.random() - 0.5) * 0.2,
              trail: []
            });
          }
        } else if (eventChoice < 0.5) {
          // 2. Aurora Wave trigger
          auroraWave = {
            progress: 0,
            speed: 0.008,
            colorIndex: Math.floor(Math.random() * COLORS.length)
          };
        } else if (eventChoice < 0.75) {
          // 3. Super Cluster: spawn pops in 4 random locations
          for (let i = 0; i < 4; i++) {
            const rc = Math.floor(Math.random() * cols);
            const rr = Math.floor(Math.random() * rows);
            const autoColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            const cell = grid[rc][rr];
            
            // Add fireflies directly to trigger cascading splits
            for (let j = 0; j < cell.capacity; j++) {
              fireflies.push({
                x: rc * cellW + cellW / 2 + (Math.random() - 0.5) * 10,
                y: rr * cellH + cellH / 2 + (Math.random() - 0.5) * 10,
                vx: 0, vy: 0,
                color: autoColor,
                targetCol: rc,
                targetRow: rr,
                pulseOffset: Math.random() * Math.PI * 2,
                pulseSpeed: 0.04,
                size: 2,
                state: 'normal',
                wanderAngle: 0,
                trail: []
              });
            }
          }
        } else {
          // 4. Shooting Stars
          const starCount = 2 + Math.floor(Math.random() * 3);
          for (let i = 0; i < starCount; i++) {
            shootingStars.push({
              x: width * (0.3 + Math.random() * 0.7),
              y: -50,
              vx: -7 - Math.random() * 5,
              vy: 4 + Math.random() * 4,
              color: COLORS[Math.floor(Math.random() * COLORS.length)],
              length: 60 + Math.random() * 60,
              alpha: 1.0,
              decay: 0.015 + Math.random() * 0.015
            });
          }
        }
      }

      // Continuous Evolution Spawn (Eco System refill)
      if (now - lastEvolutionCheck > 1200) {
        lastEvolutionCheck = now;
        // Small chance to spawn a baby firefly in empty grid cells
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            const swarm = fireflies.filter(f => f.targetCol === c && f.targetRow === r);
            if (swarm.length === 0 && Math.random() < 0.02) {
              const babyColor = COLORS[Math.floor(Math.random() * COLORS.length)];
              fireflies.push({
                x: c * cellW + cellW / 2 + (Math.random() - 0.5) * cellW * 0.5,
                y: r * cellH + cellH / 2 + (Math.random() - 0.5) * cellH * 0.5,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                color: babyColor,
                targetCol: c,
                targetRow: r,
                pulseOffset: Math.random() * Math.PI * 2,
                pulseSpeed: 0.03 + Math.random() * 0.03,
                size: 1.0, // tiny baby firefly
                state: 'normal',
                wanderAngle: Math.random() * Math.PI * 2,
                trail: []
              });
            }
          }
        }
      }

      // Apply camera shake translations
      ctx.save();
      if (cameraShake.intensity > 0.1) {
        const sx = (Math.random() - 0.5) * cameraShake.intensity;
        const sy = (Math.random() - 0.5) * cameraShake.intensity;
        ctx.translate(sx, sy);
        cameraShake.intensity *= cameraShake.decay;
      }

      // Draw background universe
      ctx.fillStyle = isDark ? '#050505' : '#eef2f8';
      ctx.fillRect(0, 0, width, height);

      // Draw Aurora wave if active
      if (auroraWave) {
        auroraWave.progress += auroraWave.speed;
        if (auroraWave.progress > 1.2) {
          auroraWave = null;
        } else {
          const waveY = height * auroraWave.progress;
          const waveHeight = height * 0.35;
          const aColor = COLORS[auroraWave.colorIndex];
          const grad = ctx.createLinearGradient(0, waveY - waveHeight, 0, waveY);
          grad.addColorStop(0, `${aColor}00`);
          grad.addColorStop(0.5, `${aColor}09`);
          grad.addColorStop(1, `${aColor}00`);

          ctx.fillStyle = grad;
          ctx.fillRect(0, waveY - waveHeight, width, waveHeight);
        }
      }

      // Render grid boundaries and hover highlights
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cell = grid[c][r];
          const cx = c * cellW;
          const cy = r * cellH;

          const isHovered = mouse.hoverCol === c && mouse.hoverRow === r;
          if (isHovered) {
            cell.hoverProgress += (1.0 - cell.hoverProgress) * 0.12;
          } else {
            cell.hoverProgress += (0.0 - cell.hoverProgress) * 0.12;
          }

          // Ambient grid fill
          if (cell.hoverProgress > 0.01) {
            ctx.fillStyle = isDark
              ? `rgba(0, 140, 255, ${cell.hoverProgress * 0.03})`
              : `rgba(0, 140, 255, ${cell.hoverProgress * 0.05})`;
            ctx.fillRect(cx, cy, cellW, cellH);
          }

          // Glowing blue cell borders
          ctx.strokeStyle = isDark
            ? `rgba(0, 140, 255, ${0.06 + cell.hoverProgress * 0.16})`
            : `rgba(0, 140, 255, ${0.04 + cell.hoverProgress * 0.1})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(cx, cy, cellW, cellH);

          // Click ripple
          if (cell.ripple) {
            cell.ripple.radius += (cell.ripple.maxRadius - cell.ripple.radius) * 0.14;
            cell.ripple.alpha -= 0.04;
            if (cell.ripple.alpha <= 0) {
              cell.ripple = null;
            } else {
              ctx.beginPath();
              ctx.arc(cx + cellW / 2, cy + cellH / 2, cell.ripple.radius, 0, Math.PI * 2);
              ctx.strokeStyle = isDark
                ? `rgba(0, 140, 255, ${cell.ripple.alpha * 0.6})`
                : `rgba(0, 140, 255, ${cell.ripple.alpha * 0.4})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
            }
          }
        }
      }

      // Update click repulsion/attraction pulse
      if (mouse.clickPulse) {
        mouse.clickPulse.radius += (mouse.clickPulse.maxRadius - mouse.clickPulse.radius) * 0.09;
        if (mouse.clickPulse.radius >= mouse.clickPulse.maxRadius - 5) {
          mouse.clickPulse = null;
        }
      }

      // 1. Update normal swarming firefly agents
      const centerX = width / 2;
      const centerY = height / 2;

      // Group fireflies by cell for O(N) swarming center calculations
      const cellSwarms = {};
      fireflies.forEach(f => {
        if (f.state === 'migration') return;
        const key = `${f.targetCol}_${f.targetRow}`;
        if (!cellSwarms[key]) cellSwarms[key] = [];
        cellSwarms[key].push(f);
      });

      fireflies.forEach((f, idx) => {
        // Individual glowing pulsing rate
        const pulse = f.pulseOffset + time * f.pulseSpeed;
        
        // Motion trail blur
        f.trail.push({ x: f.x, y: f.y });
        if (f.trail.length > 5) f.trail.shift();

        // Render trailing sparks
        for (let j = 0; j < f.trail.length; j++) {
          const pt = f.trail[j];
          const alpha = (j / f.trail.length) * 0.28;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, f.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `${f.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }

        if (f.state === 'migration') {
          // Boids Wander steering logic for migrations
          f.wanderAngle += (Math.random() - 0.5) * 0.22;
          f.vx += Math.cos(f.wanderAngle) * 0.25;
          f.vy += Math.sin(f.wanderAngle) * 0.15;
          
          f.vx *= 0.94;
          f.vy *= 0.94;

          f.x += f.vx;
          f.y += f.vy;
          
          drawFirefly(ctx, f.x, f.y, f.size, f.color, pulse);
          return;
        }

        const cell = grid[f.targetCol]?.[f.targetRow];
        const cellCentX = f.targetCol * cellW + cellW / 2;
        const cellCentY = f.targetRow * cellH + cellH / 2;

        if (f.state === 'merging' && cell) {
          // Fusing Animation: pull rapidly to center
          const dx = cellCentX - f.x;
          const dy = cellCentY - f.y;
          
          f.x += dx * 0.18;
          f.y += dy * 0.18;
          
          // Pulse extremely bright during merge
          drawFirefly(ctx, f.x, f.y, f.size * 1.5, f.color, pulse + time * 0.2);
          return;
        } else if (cell) {
          // Standard cell swarming / orbit logic
          const cellSwarm = cellSwarms[`${f.targetCol}_${f.targetRow}`] || [];
          const swarmIndex = cellSwarm.indexOf(f);
          const swarmCount = cellSwarm.length;

          // Orbit settings
          const baseAngle = cell.angle || 0;
          const orbitR = 9 + swarmCount * 2.5;

          let targetX = cellCentX;
          let targetY = cellCentY;

          if (swarmCount === 1) {
            targetX = cellCentX + Math.sin(time * 0.04 + f.pulseOffset) * 5;
            targetY = cellCentY + Math.cos(time * 0.03 + f.pulseOffset) * 5;
          } else if (swarmCount > 1) {
            const theta = baseAngle + swarmIndex * (2 * Math.PI / swarmCount);
            targetX = cellCentX + Math.cos(theta) * orbitR;
            targetY = cellCentY + Math.sin(theta) * orbitR;

            // Glow line connections between swarming buddies
            if (swarmIndex === 0) {
              for (let k = 1; k < swarmCount; k++) {
                const buddy = cellSwarm[k];
                ctx.beginPath();
                ctx.moveTo(f.x, f.y);
                ctx.lineTo(buddy.x, buddy.y);
                ctx.strokeStyle = `rgba(0, 180, 255, ${0.08 + Math.sin(pulse) * 0.05})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
              }
            }
          }

          // Attraction steering forces
          const dx = targetX - f.x;
          const dy = targetY - f.y;
          f.vx += dx * 0.065;
          f.vy += dy * 0.065;

          // Boids Separation steer between cell fireflies
          for (let k = swarmIndex + 1; k < swarmCount; k++) {
            const other = cellSwarm[k];
            const sdx = other.x - f.x;
            const sdy = other.y - f.y;
            const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
            if (sdist < 15 && sdist > 1) {
              const sf = (1 - sdist / 15) * 0.12;
              f.vx -= (sdx / sdist) * sf;
              f.vy -= (sdy / sdist) * sf;
              other.vx += (sdx / sdist) * sf;
              other.vy += (sdy / sdist) * sf;
            }
          }

          // Mouse Attraction / Vortex Interaction
          if (mouse.isHovering) {
            const mdx = mouse.x - f.x;
            const mdy = mouse.y - f.y;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            const maxRange = 160;

            if (mdist < maxRange && mdist > 5) {
              const pullPct = 1 - mdist / maxRange;

              if (mouse.isDragging) {
                // Swirl vortex
                const swirl = pullPct * 0.7;
                f.vx += (-mdy / mdist) * swirl;
                f.vy += (mdx / mdist) * swirl;
              } else {
                // Approaches cursor (curiosity)
                const pull = pullPct * 0.14;
                f.vx += (mdx / mdist) * pull;
                f.vy += (mdy / mdist) * pull;
              }
            }
          }

          // Click impulse force
          if (mouse.clickPulse) {
            const cdx = mouse.clickPulse.x - f.x;
            const cdy = mouse.clickPulse.y - f.y;
            const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cdist < mouse.clickPulse.radius && cdist > 5) {
              const strength = (1 - cdist / mouse.clickPulse.radius) * 1.5;
              f.vx += (cdx / cdist) * strength;
              f.vy += (cdy / cdist) * strength;
            }
          }

          f.vx *= 0.93;
          f.vy *= 0.93;

          f.x += f.vx;
          f.y += f.vy;
        }

        // Limit boundaries
        if (f.x < 0) { f.x = 0; f.vx *= -1; }
        else if (f.x > width) { f.x = width; f.vx *= -1; }
        if (f.y < 0) { f.y = 0; f.vy *= -1; }
        else if (f.y > height) { f.y = height; f.vy *= -1; }

        drawFirefly(ctx, f.x, f.y, f.size, f.color, pulse);
      });

      // Filter out off-screen migrations
      fireflies = fireflies.filter(f => !(f.state === 'migration' && f.x > width + 40));

      // 2. Process traveling firefly agents
      for (let i = travelingFireflies.length - 1; i >= 0; i--) {
        const tf = travelingFireflies[i];
        const pulse = tf.pulseOffset + time * tf.pulseSpeed;

        const targetX = tf.targetCol * cellW + cellW / 2;
        const targetY = tf.targetRow * cellH + cellH / 2;

        const dx = targetX - tf.x;
        const dy = targetY - tf.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Motion trail trail for traveling agents
        tf.trail.push({ x: tf.x, y: tf.y });
        if (tf.trail.length > 6) tf.trail.shift();

        for (let j = 0; j < tf.trail.length; j++) {
          const pt = tf.trail[j];
          const alpha = (j / tf.trail.length) * 0.4;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, tf.size * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `${tf.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
          ctx.fill();
        }

        // Active steering physics flying to neighbors
        tf.vx += (dx / dist) * 0.42;
        tf.vy += (dy / dist) * 0.42;
        
        tf.vx *= 0.88;
        tf.vy *= 0.88;

        tf.x += tf.vx;
        tf.y += tf.vy;

        drawFirefly(ctx, tf.x, tf.y, tf.size, tf.color, pulse);

        // Arrival detection
        if (dist < 8) {
          const tc = tf.targetCol;
          const tr = tf.targetRow;

          if (tc >= 0 && tc < cols && tr >= 0 && tr < rows) {
            const targetCell = grid[tc][tr];
            
            // Add normal swarming agent
            fireflies.push({
              x: tf.x,
              y: tf.y,
              vx: tf.vx * 0.5,
              vy: tf.vy * 0.5,
              color: tf.color,
              targetCol: tc,
              targetRow: tr,
              pulseOffset: tf.pulseOffset,
              pulseSpeed: tf.pulseSpeed,
              size: tf.size,
              state: 'normal',
              wanderAngle: Math.random() * Math.PI * 2,
              trail: []
            });

            // Convert cell colors on arrival
            const cellSwarm = fireflies.filter(f => f.targetCol === tc && f.targetRow === tr);
            cellSwarm.forEach(f => f.color = tf.color);

            // Cascade merges
            if (cellSwarm.length >= targetCell.capacity && !targetCell.isMerging) {
              targetCell.isMerging = true;
              targetCell.mergeTimer = 0;
              cellSwarm.forEach(f => f.state = 'merging');
            }
          }

          // Remove traveling agent
          travelingFireflies.splice(i, 1);
        }
      }

      // 3. Process Grid cells in merging state
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cell = grid[c][r];
          cell.angle += 0.025;

          if (cell.isMerging) {
            cell.mergeTimer++;

            // Draw fusion pre-pop ambient glow
            const cx = c * cellW + cellW / 2;
            const cy = r * cellH + cellH / 2;
            const sizeProgress = cell.mergeTimer / 15;
            const pulse = sizeProgress * Math.PI;

            ctx.fillStyle = `rgba(0, 140, 255, ${0.05 + Math.sin(pulse) * 0.1})`;
            ctx.fillRect(c * cellW, r * cellH, cellW, cellH);

            // Pop trigger at frame 15
            if (cell.mergeTimer >= 15) {
              const cellFireflies = fireflies.filter(f => f.targetCol === c && f.targetRow === r);
              const color = cellFireflies.length > 0 ? cellFireflies[0].color : COLORS[0];
              
              // Remove cell swarming members
              fireflies = fireflies.filter(f => !(f.targetCol === c && f.targetRow === r));
              cell.isMerging = false;

              triggerExplosion(c, r, color);
            }
          }
        }
      }

      // 4. Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.09;
        sw.alpha -= 0.038;

        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 160, 255, ${sw.alpha * 0.3})`;
        ctx.lineWidth = 2.0;
        ctx.stroke();
      }

      // 5. Update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.alpha -= ss.decay;

        if (ss.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.vx * 1.5, ss.y - ss.vy * 1.5);
        grad.addColorStop(0, `${ss.color}${Math.floor(ss.alpha * 255).toString(16).padStart(2, '0')}`);
        grad.addColorStop(1, `${ss.color}00`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.vx * 1.5, ss.y - ss.vy * 1.5);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // 6. Update sparks particles
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.97;
        sp.vy *= 0.97;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${sp.color}${Math.floor(sp.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('click', handleWindowClick);
      window.removeEventListener('dblclick', handleDoubleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, isDark]);

  return (
    <div className="liquid-bg pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true" style={{ background: isDark ? '#050505' : '#eef2f8' }}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="liquid-bg__noise" />
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.1) 60%, rgba(5,5,5,0.65) 100%)' 
            : 'radial-gradient(circle, rgba(238,242,248,0.4) 0%, rgba(238,242,248,0.1) 60%, rgba(238,242,248,0.65) 100%)',
          mixBlendMode: 'normal'
        }}
      />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return
    const hash = window.location.hash.slice(1)
    if (hash && navLinks.some((link) => link.id === hash)) {
      requestAnimationFrame(() => scrollToSection(hash))
    }
  }, [loading])

  return (
    <>
      <ChainReactionCanvas />
      <LoadingScreen visible={loading} />

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="site"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE_EXPO }}
          >
            <Navbar />
            <main className="relative z-10">
              <Hero />
              <About />
              <Projects />
              <Contact />
            </main>
            <footer className="border-t border-theme px-4 py-8 text-center backdrop-blur-sm pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-8">
              <p className="text-xs tracking-wide text-theme-muted">
                © 2026 John Carlo Casing
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App

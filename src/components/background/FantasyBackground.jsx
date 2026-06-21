import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function FantasyBackground() {
  const canvasRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const isReduced = prefersReducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Handle resizing
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Vibrant glassmorphic color hues matching the site's palette: Cyan, Purple, Blue, Magenta
    const hues = [190, 260, 220, 330]

    let bubbles = []
    let splinters = []
    let explosions = []

    const createBubble = (isFirstLoad = false) => {
      const radius = 12 + Math.random() * 8
      const hue = hues[Math.floor(Math.random() * hues.length)]
      let x, y

      if (isFirstLoad) {
        x = Math.random() * width
        y = Math.random() * height
      } else {
        // Spawn off-screen
        const side = Math.floor(Math.random() * 4)
        if (side === 0) { // top
          x = Math.random() * width
          y = -radius
        } else if (side === 1) { // right
          x = width + radius
          y = Math.random() * height
        } else if (side === 2) { // bottom
          x = Math.random() * width
          y = height + radius
        } else { // left
          x = -radius
          y = Math.random() * height
        }
      }

      // Generate angle and velocity pointing towards the screen
      let angle = Math.random() * Math.PI * 2
      if (!isFirstLoad) {
        const side = Math.floor(Math.random() * 4)
        if (side === 0) angle = Math.random() * Math.PI // moves down
        else if (side === 1) angle = Math.random() * Math.PI + Math.PI / 2 // moves left
        else if (side === 2) angle = Math.random() * Math.PI + Math.PI // moves up
        else angle = Math.random() * Math.PI - Math.PI / 2 // moves right
      }

      const speed = 0.4 + Math.random() * 0.8
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        baseRadius: radius,
        maxRadius: 55 + Math.random() * 12,
        hue,
        state: 'drifting', // 'drifting', 'exploding'
        explosionTimer: 0,
        alpha: 1,
      }
    }

    // Populate initial bubbles list
    const bubbleCount = 25
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(createBubble(true))
    }

    // Spawns a manual explosion ring at a coordinate
    const triggerExplosion = (x, y, hue = null) => {
      const targetHue = hue !== null ? hue : hues[Math.floor(Math.random() * hues.length)]
      explosions.push({
        x,
        y,
        radius: 0,
        maxRadius: 65,
        hue: targetHue,
        timer: 0,
        alpha: 1,
        splintersSpawned: false,
      })
    }

    // Capture global document clicks
    const handleWindowClick = (e) => {
      triggerExplosion(e.clientX, e.clientY)
    }
    window.addEventListener('click', handleWindowClick)

    // Launch splinter particles outwards
    const spawnSplinters = (x, y, hue) => {
      const count = 8
      for (let i = 0; i < count; i++) {
        const angle = i * ((Math.PI * 2) / count)
        const speed = 2.4 + Math.random() * 0.8
        splinters.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 2.5,
          hue,
          alpha: 1,
          distanceTraveled: 0,
          maxDistance: 200 + Math.random() * 50,
        })
      }
    }

    // Physics update and render loop
    const render = () => {
      const isDark = document.documentElement.classList.contains('dark')

      // Trail blending - translucent overlay colors
      ctx.fillStyle = isDark ? 'rgba(5, 5, 8, 0.22)' : 'rgba(238, 242, 248, 0.22)'
      ctx.fillRect(0, 0, width, height)

      // 1. Process Click-Triggered Explosions
      for (let i = explosions.length - 1; i >= 0; i--) {
        const exp = explosions[i]
        exp.timer += 1

        if (exp.timer < 18) {
          exp.radius = exp.maxRadius * (exp.timer / 18)
        } else if (exp.timer < 65) {
          exp.radius = exp.maxRadius
          exp.alpha = 1 - (exp.timer - 18) / 47
        } else {
          explosions.splice(i, 1)
          continue
        }

        // Spawn child splinters at peak expansion
        if (exp.timer >= 10 && !exp.splintersSpawned) {
          spawnSplinters(exp.x, exp.y, exp.hue)
          exp.splintersSpawned = true
        }

        // Draw Explosion core and concentric rings
        ctx.beginPath()
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${exp.hue}, 90%, 65%, ${exp.alpha})`
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(exp.x, exp.y, exp.radius * 1.15, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${exp.hue}, 85%, 60%, ${exp.alpha * 0.4})`
        ctx.lineWidth = 1
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(exp.x, exp.y, exp.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${exp.hue}, 90%, 65%, ${exp.alpha * 0.05})`
        ctx.fill()
      }

      // 2. Process Splinters (Particles radiating from explosions)
      for (let i = splinters.length - 1; i >= 0; i--) {
        const sp = splinters[i]
        
        if (!isReduced) {
          sp.x += sp.vx
          sp.y += sp.vy
          sp.distanceTraveled += Math.sqrt(sp.vx * sp.vx + sp.vy * sp.vy)
        }

        if (sp.x < 0 || sp.x > width) sp.vx *= -1
        if (sp.y < 0 || sp.y > height) sp.vy *= -1

        sp.alpha = Math.max(0, 1 - sp.distanceTraveled / sp.maxDistance)

        if (sp.alpha <= 0) {
          splinters.splice(i, 1)
          continue
        }

        // Render Splinter Particle
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${sp.hue}, 95%, 68%, ${sp.alpha})`
        ctx.shadowBlur = 6
        ctx.shadowColor = `hsla(${sp.hue}, 95%, 68%, ${sp.alpha * 0.8})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // 3. Process Bubbles (Drifting & Exploding states)
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i]

        if (b.state === 'drifting') {
          if (!isReduced) {
            b.x += b.vx
            b.y += b.vy
          }

          // Boundary bounce checks
          if (b.x - b.radius < 0) {
            b.x = b.radius
            b.vx *= -1
          } else if (b.x + b.radius > width) {
            b.x = width - b.radius
            b.vx *= -1
          }
          if (b.y - b.radius < 0) {
            b.y = b.radius
            b.vy *= -1
          } else if (b.y + b.radius > height) {
            b.y = height - b.radius
            b.vy *= -1
          }

          // A: Check collision with manual explosion rings
          for (let e = 0; e < explosions.length; e++) {
            const exp = explosions[e]
            const dx = b.x - exp.x
            const dy = b.y - exp.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < b.radius + exp.radius) {
              b.state = 'exploding'
              b.vx = 0
              b.vy = 0
              break
            }
          }

          // B: Check collision with active splinters
          if (b.state === 'drifting') {
            for (let s = splinters.length - 1; s >= 0; s--) {
              const sp = splinters[s]
              const dx = b.x - sp.x
              const dy = b.y - sp.y
              const dist = Math.sqrt(dx * dx + dy * dy)
              if (dist < b.radius + sp.radius) {
                b.state = 'exploding'
                b.vx = 0
                b.vy = 0
                splinters.splice(s, 1) // Consume splinter particle
                break
              }
            }
          }

          // C: Check collision with other exploding bubbles
          if (b.state === 'drifting') {
            for (let c = 0; c < bubbles.length; c++) {
              const other = bubbles[c]
              if (other.state === 'exploding') {
                const dx = b.x - other.x
                const dy = b.y - other.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < b.radius + other.radius) {
                  b.state = 'exploding'
                  b.vx = 0
                  b.vy = 0
                  break
                }
              }
            }
          }

          // Render Drifting Glass Bubble
          if (b.state === 'drifting') {
            ctx.beginPath()
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${isDark ? 0.06 : 0.14})`
            ctx.fill()

            const grad = ctx.createRadialGradient(
              b.x - b.radius * 0.22,
              b.y - b.radius * 0.22,
              b.radius * 0.08,
              b.x,
              b.y,
              b.radius
            )
            grad.addColorStop(0, `hsla(${b.hue}, 90%, 70%, 0.45)`)
            grad.addColorStop(0.5, `hsla(${b.hue}, 85%, 60%, 0.12)`)
            grad.addColorStop(1, `hsla(${b.hue}, 85%, 60%, 0)`)
            ctx.fillStyle = grad
            ctx.fill()

            ctx.beginPath()
            ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
            ctx.strokeStyle = `hsla(${b.hue}, 80%, 65%, ${isDark ? 0.35 : 0.55})`
            ctx.lineWidth = 1.3
            ctx.stroke()
          }
        }

        if (b.state === 'exploding') {
          b.explosionTimer += 1

          if (b.explosionTimer < 18) {
            const progress = b.explosionTimer / 18
            b.radius = b.baseRadius + (b.maxRadius - b.baseRadius) * progress
          } else if (b.explosionTimer < 60) {
            b.radius = b.maxRadius
            b.alpha = 1 - (b.explosionTimer - 18) / 42
          } else {
            // Replace with a new drifting bubble off-screen to keep count constant
            bubbles[i] = createBubble()
            continue
          }

          // Spawn splinter particles at peak blast
          if (b.explosionTimer === 8) {
            spawnSplinters(b.x, b.y, b.hue)
          }

          // Render Exploding Bubble Rings
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${b.hue}, 90%, 65%, ${b.alpha})`
          ctx.lineWidth = 2.5
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(b.x, b.y, b.radius * 1.15, 0, Math.PI * 2)
          ctx.strokeStyle = `hsla(${b.hue}, 85%, 60%, ${b.alpha * 0.35})`
          ctx.lineWidth = 1
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${b.hue}, 90%, 65%, ${b.alpha * 0.04})`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('click', handleWindowClick)
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReducedMotion])

  return (
    <div className="liquid-bg" aria-hidden="true" style={{ mixBlendMode: 'normal' }}>
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="liquid-bg__noise" />
      <div className="liquid-bg__vignette" />
    </div>
  )
}

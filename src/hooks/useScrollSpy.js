import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds, options = {}) {
  const [active, setActive] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      {
        rootMargin: options.rootMargin ?? '-35% 0px -55% 0px',
        threshold: [0, 0.15, 0.35, 0.5],
      },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [sectionIds, options.rootMargin])

  return active
}

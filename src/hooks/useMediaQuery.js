import { useSyncExternalStore } from 'react'

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      if (typeof window === 'undefined') return () => {}

      const mq = window.matchMedia(query)
      const handler = () => notify()

      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    },
    () => {
      if (typeof window === 'undefined') return false
      return window.matchMedia(query).matches
    },
    () => false,
  )
}

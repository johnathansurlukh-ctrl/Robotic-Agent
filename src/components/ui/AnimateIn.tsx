'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'left' | 'right'
}

export default function AnimateIn({ children, className = '', delay = 0, variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) el.style.transitionDelay = `${delay}ms`
          el.classList.add('in-view')
          observer.unobserve(el)
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const cls = variant === 'left' ? 'reveal-left' : variant === 'right' ? 'reveal-right' : 'reveal'

  return (
    <div ref={ref} className={`${cls} ${className}`}>
      {children}
    </div>
  )
}

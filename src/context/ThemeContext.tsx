'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeCtx { dark: boolean; toggle: () => void }
const Ctx = createContext<ThemeCtx>({ dark: false, toggle: () => {} })

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('rk_theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('rk_theme', next ? 'dark' : 'light')
      return next
    })
  }

  return <Ctx.Provider value={{ dark, toggle }}>{children}</Ctx.Provider>
}

export const useTheme = () => useContext(Ctx)

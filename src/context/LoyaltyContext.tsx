'use client'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

interface LoyaltyCtx {
  points: number
  earn: (inrAmount: number) => void
  redeem: (points: number) => void
  pointsValue: number
}

const Ctx = createContext<LoyaltyCtx>({ points: 0, earn: () => {}, redeem: () => {}, pointsValue: 0 })

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0)

  useEffect(() => {
    try { const s = localStorage.getItem('rk_points'); if (s) setPoints(parseInt(s)) } catch {}
  }, [])

  useEffect(() => { localStorage.setItem('rk_points', String(points)) }, [points])

  const earn = useCallback((inrAmount: number) => {
    const earned = Math.floor(inrAmount / 100)
    setPoints(p => p + earned)
  }, [])

  const redeem = useCallback((pts: number) => {
    setPoints(p => Math.max(0, p - pts))
  }, [])

  return <Ctx.Provider value={{ points, earn, redeem, pointsValue: points }}>{children}</Ctx.Provider>
}

export const useLoyalty = () => useContext(Ctx)

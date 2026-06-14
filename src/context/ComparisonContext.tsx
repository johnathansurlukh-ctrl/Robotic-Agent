'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface CompareItem {
  id: string; name: string; price: number; image: string; slug: string
  specs: Record<string, string>; rating: number; stock: string
}

interface CompareCtx {
  items: CompareItem[]
  add: (item: CompareItem) => void
  remove: (id: string) => void
  has: (id: string) => boolean
  clear: () => void
  count: number
}

const Ctx = createContext<CompareCtx>({ items: [], add: () => {}, remove: () => {}, has: () => false, clear: () => {}, count: 0 })

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([])

  const has = useCallback((id: string) => items.some(i => i.id === id), [items])
  const add = useCallback((item: CompareItem) => {
    setItems(prev => prev.some(i => i.id === item.id) || prev.length >= 3 ? prev : [...prev, item])
  }, [])
  const remove = useCallback((id: string) => setItems(prev => prev.filter(i => i.id !== id)), [])
  const clear = useCallback(() => setItems([]), [])

  return <Ctx.Provider value={{ items, add, remove, has, clear, count: items.length }}>{children}</Ctx.Provider>
}

export const useComparison = () => useContext(Ctx)

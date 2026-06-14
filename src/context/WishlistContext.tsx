'use client'
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

export interface WishlistItem {
  id: string; name: string; price: number; image: string; slug: string
}

interface WishlistCtx {
  items: WishlistItem[]
  toggle: (item: WishlistItem) => void
  has: (id: string) => boolean
  count: number
}

const Ctx = createContext<WishlistCtx>({ items: [], toggle: () => {}, has: () => false, count: 0 })

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    try { const s = localStorage.getItem('rk_wishlist'); if (s) setItems(JSON.parse(s)) } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('rk_wishlist', JSON.stringify(items))
  }, [items])

  const has = useCallback((id: string) => items.some(i => i.id === id), [items])

  const toggle = useCallback((item: WishlistItem) => {
    setItems(prev => prev.some(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, item])
  }, [])

  return <Ctx.Provider value={{ items, toggle, has, count: items.length }}>{children}</Ctx.Provider>
}

export const useWishlist = () => useContext(Ctx)

'use client'
import { useEffect, useState } from 'react'

export interface RecentItem {
  type: 'product' | 'project'
  slug: string
  name: string
  image: string
  price: number
}

const KEY = 'rk_recent'
const MAX = 6

export function useRecentlyViewed(current?: RecentItem) {
  const [items, setItems] = useState<RecentItem[]>([])

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setItems(JSON.parse(s)) } catch {}
  }, [])

  useEffect(() => {
    if (!current) return
    setItems(prev => {
      const filtered = prev.filter(i => !(i.type === current.type && i.slug === current.slug))
      const next = [current, ...filtered].slice(0, MAX)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [current?.slug])

  const others = current
    ? items.filter(i => !(i.type === current.type && i.slug === current.slug))
    : items

  return others
}

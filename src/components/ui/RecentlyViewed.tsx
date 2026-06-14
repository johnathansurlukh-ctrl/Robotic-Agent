'use client'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { RecentItem } from '@/hooks/useRecentlyViewed'

export default function RecentlyViewed({ items }: { items: RecentItem[] }) {
  if (items.length === 0) return null

  return (
    <section className="py-10 bg-gray-50 border-t border-gray-200">
      <div className="container-xl">
        <h3 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-5">
          <Clock size={18} className="text-blue-600" /> Recently Viewed
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {items.map(item => (
            <Link
              key={`${item.type}-${item.slug}`}
              href={`/${item.type === 'product' ? 'products' : 'projects'}/${item.slug}`}
              className="flex-shrink-0 w-44 card overflow-hidden group"
            >
              <div className="h-28 overflow-hidden">
                <img referrerPolicy="no-referrer" src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <div className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{item.name}</div>
                {item.price > 0 && <div className="text-sm font-black text-blue-600 mt-1">₹{item.price.toLocaleString()}</div>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'
import Link from 'next/link'
import { X, BarChart2 } from 'lucide-react'
import { useComparison } from '@/context/ComparisonContext'

export default function ComparisonBar() {
  const { items, remove, clear, count } = useComparison()
  if (count === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0f2744] border-t-2 border-blue-500 shadow-2xl">
      <div className="container-xl py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 text-white text-sm font-bold flex-shrink-0">
          <BarChart2 size={18} className="text-blue-400" />
          Compare ({count}/3)
        </div>

        <div className="flex-1 flex gap-3 overflow-x-auto">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2 flex-shrink-0">
              <img referrerPolicy="no-referrer" src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
              <span className="text-white text-xs font-semibold max-w-[100px] truncate">{item.name}</span>
              <button onClick={() => remove(item.id)} className="text-gray-400 hover:text-white ml-1">
                <X size={14} />
              </button>
            </div>
          ))}
          {Array.from({ length: 3 - count }).map((_, i) => (
            <div key={i} className="flex items-center justify-center w-32 h-12 border-2 border-dashed border-white/20 rounded-xl text-white/40 text-xs flex-shrink-0">
              + Add product
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {count >= 2 && (
            <Link href="/compare" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors">
              Compare Now
            </Link>
          )}
          <button onClick={clear} className="px-3 py-2 text-gray-400 hover:text-white text-sm transition-colors">
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}

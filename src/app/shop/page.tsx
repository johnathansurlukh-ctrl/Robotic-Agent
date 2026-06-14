'use client'
import { useState } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, Search, Grid3X3, List, ChevronDown, X } from 'lucide-react'
import ProductCard from '@/components/product/ProductCard'
import { products } from '@/data/products'
import { categories } from '@/data/categories'

const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest']
const difficultyOptions = ['Beginner', 'Intermediate', 'Advanced']
const compatibilityOptions = ['Arduino Uno', 'Arduino Nano', 'ESP32', 'Raspberry Pi', 'STM32']

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([])
  const [selectedCompatibility, setSelectedCompatibility] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(10000)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('Most Popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(true)

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]

  const filtered = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false
    if (selectedDifficulty.length && !selectedDifficulty.map((d) => d.toLowerCase()).includes(p.difficultyLevel)) return false
    if (selectedCompatibility.length && !selectedCompatibility.some((c) => p.compatibility.includes(c))) return false
    if (p.price > maxPrice) return false
    if (inStockOnly && p.stock === 'out_of_stock') return false
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const checkboxClass = 'w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer'

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0f2744] text-white py-10">
        <div className="container-xl">
          <nav className="text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-white">Home</Link> / <span className="text-white">Shop</span>
          </nav>
          <h1 className="text-3xl font-black mb-2">Shop Robotics Components</h1>
          <p className="text-gray-300 text-sm">500+ tested robotics components with datasheets, wiring diagrams, and code.</p>
        </div>
      </div>

      <div className="container-xl py-8">
        {/* Search + sort bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-200">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, part numbers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
              {sortOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2 border-l pl-3 border-gray-200">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <Grid3X3 size={18} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>
              <List size={18} />
            </button>
          </div>
          <span className="text-sm text-gray-500">{filtered.length} products</span>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 flex items-center gap-2"><SlidersHorizontal size={16} /> Filters</h3>
                <button className="text-xs text-blue-600 hover:text-blue-800" onClick={() => { setSelectedCategory('all'); setSelectedDifficulty([]); setSelectedCompatibility([]); setInStockOnly(false); setMaxPrice(10000) }}>
                  Clear all
                </button>
              </div>

              {/* Category */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="cat" value="all" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} className={checkboxClass} />
                    <span className="text-sm text-gray-600">All Categories</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="cat" value={cat.id} checked={selectedCategory === cat.id} onChange={() => setSelectedCategory(cat.id)} className={checkboxClass} />
                        <span className="text-sm text-gray-600">{cat.icon} {cat.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{cat.productCount}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Max Price: ₹{maxPrice.toLocaleString()}</h4>
                <input type="range" min={100} max={10000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>₹100</span><span>₹10,000</span></div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Difficulty Level</h4>
                {difficultyOptions.map((d) => (
                  <label key={d} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" checked={selectedDifficulty.includes(d)} onChange={() => setSelectedDifficulty(toggle(selectedDifficulty, d))} className={checkboxClass} />
                    <span className="text-sm text-gray-600">{d}</span>
                  </label>
                ))}
              </div>

              {/* Compatibility */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Board Compatibility</h4>
                {compatibilityOptions.map((c) => (
                  <label key={c} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" checked={selectedCompatibility.includes(c)} onChange={() => setSelectedCompatibility(toggle(selectedCompatibility, c))} className={checkboxClass} />
                    <span className="text-sm text-gray-600">{c}</span>
                  </label>
                ))}
              </div>

              {/* In stock */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className={checkboxClass} />
                <span className="text-sm font-medium text-gray-700">In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">We couldn&apos;t find that exact part. Try adjusting your filters or search by project name.</p>
                <Link href="/build-my-project" className="btn-primary inline-flex">Tell us what you need →</Link>
              </div>
            ) : (
              <div className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

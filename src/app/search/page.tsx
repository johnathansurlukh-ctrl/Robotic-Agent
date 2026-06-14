'use client'

import { Suspense, useState, useMemo, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Search,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  X,
  Check,
  ChevronDown,
  Filter,
  Grid3X3,
  List,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

// ─── Types ────────────────────────────────────────────────────────────────────

type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'
type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'rating' | 'newest'
type PriceRange = 'under_199' | '199_499' | '499_999' | '999_plus' | ''
type RatingFilter = '4' | '3' | ''
type CategoryFilter =
  | 'all'
  | 'sensors'
  | 'motors'
  | 'boards'
  | 'kits'
  | 'power'
  | 'displays'
  | 'modules'

interface MockProduct {
  id: string
  slug: string
  name: string
  price: number
  originalPrice: number
  stock: StockStatus
  rating: number
  reviewCount: number
  image: string
  category: CategoryFilter
  badge?: string
  compatibility: string[]
  addedAt: number
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: 's001',
    slug: 'hc-sr04-ultrasonic-sensor',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    price: 49,
    originalPrice: 79,
    stock: 'in_stock',
    rating: 4.7,
    reviewCount: 842,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop',
    category: 'sensors',
    badge: 'Best Seller',
    compatibility: ['Arduino', 'ESP32', 'Raspberry Pi'],
    addedAt: 1700000000,
  },
  {
    id: 's002',
    slug: 'dht11-temperature-humidity-sensor',
    name: 'DHT11 Temperature & Humidity Sensor',
    price: 79,
    originalPrice: 119,
    stock: 'in_stock',
    rating: 4.5,
    reviewCount: 631,
    image: 'https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=600&h=600&fit=crop',
    category: 'sensors',
    badge: 'Popular',
    compatibility: ['Arduino', 'ESP32', 'Raspberry Pi'],
    addedAt: 1701000000,
  },
  {
    id: 's003',
    slug: 'ir-obstacle-sensor',
    name: 'IR Obstacle Avoidance Sensor Module',
    price: 59,
    originalPrice: 89,
    stock: 'in_stock',
    rating: 4.3,
    reviewCount: 417,
    image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&h=600&fit=crop',
    category: 'sensors',
    compatibility: ['Arduino', 'ESP32'],
    addedAt: 1702000000,
  },
  {
    id: 's004',
    slug: 'mpu6050-gyroscope-accelerometer',
    name: 'MPU6050 6-Axis Gyroscope & Accelerometer',
    price: 199,
    originalPrice: 279,
    stock: 'low_stock',
    rating: 4.8,
    reviewCount: 529,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=600&fit=crop',
    category: 'sensors',
    badge: 'Top Rated',
    compatibility: ['Arduino', 'ESP32', 'Raspberry Pi'],
    addedAt: 1703000000,
  },
  {
    id: 's005',
    slug: 'flame-sensor-module',
    name: 'Flame Sensor Detection Module',
    price: 89,
    originalPrice: 129,
    stock: 'in_stock',
    rating: 4.2,
    reviewCount: 203,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=600&fit=crop',
    category: 'sensors',
    compatibility: ['Arduino', 'ESP32'],
    addedAt: 1704000000,
  },
  {
    id: 's006',
    slug: 'soil-moisture-sensor',
    name: 'Soil Moisture Sensor Module',
    price: 79,
    originalPrice: 109,
    stock: 'in_stock',
    rating: 4.4,
    reviewCount: 358,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop',
    category: 'sensors',
    compatibility: ['Arduino', 'ESP32', 'Raspberry Pi'],
    addedAt: 1705000000,
  },
  {
    id: 'b001',
    slug: 'arduino-uno-r3',
    name: 'Arduino Uno R3 Microcontroller Board',
    price: 349,
    originalPrice: 499,
    stock: 'in_stock',
    rating: 4.9,
    reviewCount: 1204,
    image: 'https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=600&h=600&fit=crop',
    category: 'boards',
    badge: 'Best Seller',
    compatibility: ['Arduino'],
    addedAt: 1706000000,
  },
  {
    id: 'b002',
    slug: 'esp32-development-board',
    name: 'ESP32 Development Board (Wi-Fi + Bluetooth)',
    price: 249,
    originalPrice: 349,
    stock: 'in_stock',
    rating: 4.8,
    reviewCount: 967,
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&h=600&fit=crop',
    category: 'boards',
    badge: 'Popular',
    compatibility: ['ESP32'],
    addedAt: 1707000000,
  },
  {
    id: 'b003',
    slug: 'nodemcu-esp8266-v3',
    name: 'NodeMCU ESP8266 V3 Wi-Fi Module Board',
    price: 199,
    originalPrice: 279,
    stock: 'in_stock',
    rating: 4.6,
    reviewCount: 734,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=600&fit=crop',
    category: 'boards',
    compatibility: ['ESP32'],
    addedAt: 1708000000,
  },
  {
    id: 'm001',
    slug: 'sg90-servo-motor',
    name: 'SG90 Micro Servo Motor 9g',
    price: 149,
    originalPrice: 199,
    stock: 'in_stock',
    rating: 4.5,
    reviewCount: 876,
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop',
    category: 'motors',
    badge: 'Best Seller',
    compatibility: ['Arduino', 'ESP32', 'Raspberry Pi'],
    addedAt: 1709000000,
  },
  {
    id: 'm002',
    slug: 'l298n-dual-motor-driver',
    name: 'L298N Dual H-Bridge Motor Driver Module',
    price: 149,
    originalPrice: 199,
    stock: 'in_stock',
    rating: 4.6,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=600&h=600&fit=crop',
    category: 'motors',
    compatibility: ['Arduino', 'ESP32', 'Raspberry Pi'],
    addedAt: 1710000000,
  },
  {
    id: 'k001',
    slug: 'line-follower-robot-kit',
    name: 'Line Follower Robot Complete Kit',
    price: 799,
    originalPrice: 1099,
    stock: 'in_stock',
    rating: 4.7,
    reviewCount: 445,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop',
    category: 'kits',
    badge: 'New',
    compatibility: ['Arduino'],
    addedAt: 1711000000,
  },
]

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'sensors', label: 'Sensors' },
  { value: 'motors', label: 'Motors' },
  { value: 'boards', label: 'Boards' },
  { value: 'kits', label: 'Kits' },
  { value: 'power', label: 'Power' },
  { value: 'displays', label: 'Displays' },
  { value: 'modules', label: 'Modules' },
]

const COMPATIBILITY_OPTIONS = ['Arduino', 'ESP32', 'Raspberry Pi']

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'newest', label: 'Newest' },
]

const ITEMS_PER_PAGE = 12

// ─── Helpers ──────────────────────────────────────────────────────────────────

function categoryCount(cat: CategoryFilter): number {
  if (cat === 'all') return MOCK_PRODUCTS.length
  return MOCK_PRODUCTS.filter((p) => p.category === cat).length
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={12}
      className={
        i < Math.floor(rating)
          ? 'text-yellow-400 fill-yellow-400'
          : i < rating
          ? 'text-yellow-400 fill-yellow-200'
          : 'text-gray-300 fill-gray-100'
      }
    />
  ))
}

function badgeColor(badge?: string) {
  if (!badge) return ''
  if (badge === 'Best Seller') return 'bg-orange-500 text-white'
  if (badge === 'Popular') return 'bg-blue-500 text-white'
  if (badge === 'Top Rated') return 'bg-purple-500 text-white'
  if (badge === 'New') return 'bg-green-500 text-white'
  return 'bg-gray-500 text-white'
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface ProductCardProps {
  product: MockProduct
  view: 'grid' | 'list'
}

function ProductCard({ product, view }: ProductCardProps) {
  const { addItem } = useCart()
  const { toggle, has } = useWishlist()
  const [added, setAdded] = useState(false)

  const wishlisted = has(product.id)

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 800)
  }

  function handleWishlist() {
    toggle({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    })
  }

  const stockLabel =
    product.stock === 'in_stock'
      ? 'In Stock'
      : product.stock === 'low_stock'
      ? 'Low Stock'
      : 'Out of Stock'
  const stockColor =
    product.stock === 'in_stock'
      ? 'text-green-600'
      : product.stock === 'low_stock'
      ? 'text-orange-500'
      : 'text-red-500'

  if (view === 'list') {
    return (
      <div className="card flex gap-4 p-4 hover:shadow-md transition-shadow">
        <div className="relative w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
          <img
            referrerPolicy="no-referrer"
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badgeColor(product.badge)}`}>
              {product.badge}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-snug mb-1">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
              <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-2">
              {product.compatibility.map((c) => (
                <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-gray-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className={`text-xs font-medium ${stockColor}`}>{stockLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleWishlist}
                className={`p-2 rounded-lg border transition-all ${
                  wishlisted
                    ? 'bg-pink-50 border-pink-200 text-pink-500 dark:bg-pink-900/20 dark:border-pink-800'
                    : 'border-gray-200 text-gray-400 hover:border-pink-200 hover:text-pink-400 dark:border-gray-600'
                }`}
              >
                <Heart size={15} className={wishlisted ? 'fill-pink-500' : ''} />
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 'out_of_stock'}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  product.stock === 'out_of_stock'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                    : added
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {added ? <Check size={13} /> : <ShoppingCart size={13} />}
                {added ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card group flex flex-col overflow-hidden">
      <div className="relative h-44 bg-gray-50 overflow-hidden">
        <img
          referrerPolicy="no-referrer"
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${badgeColor(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full shadow transition-all ${
            wishlisted
              ? 'bg-pink-500 text-white'
              : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-pink-500 hover:bg-white dark:bg-gray-800/80 dark:text-gray-400'
          }`}
        >
          <Heart size={14} className={wishlisted ? 'fill-white' : ''} />
        </button>
      </div>
      <div className="p-3.5 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-1.5 leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
          <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.compatibility.map((c) => (
            <span key={c} className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
              {c}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-base font-black text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
            <span className={`text-[10px] font-semibold ml-auto ${stockColor}`}>{stockLabel}</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 'out_of_stock'}
            className={`w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              product.stock === 'out_of_stock'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                : added
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {added ? <Check size={13} /> : <ShoppingCart size={13} />}
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Filter sidebar ───────────────────────────────────────────────────────────

interface SidebarProps {
  selectedCategories: CategoryFilter[]
  onCategoryChange: (cat: CategoryFilter) => void
  priceRange: PriceRange
  onPriceChange: (r: PriceRange) => void
  ratingFilter: RatingFilter
  onRatingChange: (r: RatingFilter) => void
  selectedCompatibility: string[]
  onCompatibilityChange: (c: string) => void
  inStockOnly: boolean
  onInStockChange: (v: boolean) => void
  onClearAll: () => void
  activeFilterCount: number
}

function FilterSidebar({
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceChange,
  ratingFilter,
  onRatingChange,
  selectedCompatibility,
  onCompatibilityChange,
  inStockOnly,
  onInStockChange,
  onClearAll,
  activeFilterCount,
}: SidebarProps) {
  return (
    <aside className="lg:w-72 flex-shrink-0">
      <div className="card p-5 sticky top-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={18} className="text-blue-600" />
            <h2 className="font-bold text-gray-900">Filters</h2>
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-red-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
            >
              <X size={12} /> Clear All
            </button>
          )}
        </div>

        {/* Category */}
        <div className="mb-5 border-b border-gray-100 dark:border-gray-700 pb-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Category</h3>
          <ul className="space-y-1.5">
            {CATEGORIES.map((cat) => {
              const count = categoryCount(cat.value)
              const isSelected =
                cat.value === 'all'
                  ? selectedCategories.length === 0 || selectedCategories.includes('all')
                  : selectedCategories.includes(cat.value)
              return (
                <li key={cat.value}>
                  <button
                    onClick={() => onCategoryChange(cat.value)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isSelected && <Check size={12} className="text-blue-600 dark:text-blue-400" />}
                      {!isSelected && <span className="w-3" />}
                      {cat.label}
                    </span>
                    {count > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                        isSelected ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Price Range */}
        <div className="mb-5 border-b border-gray-100 dark:border-gray-700 pb-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Price Range</h3>
          <ul className="space-y-2">
            {(
              [
                { value: '', label: 'All Prices' },
                { value: 'under_199', label: 'Under ₹199' },
                { value: '199_499', label: '₹199 – ₹499' },
                { value: '499_999', label: '₹499 – ₹999' },
                { value: '999_plus', label: '₹999+' },
              ] as { value: PriceRange; label: string }[]
            ).map((opt) => (
              <li key={opt.value}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="price_range"
                    checked={priceRange === opt.value}
                    onChange={() => onPriceChange(opt.value)}
                    className="accent-blue-600 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className={`text-sm transition-colors ${priceRange === opt.value ? 'text-blue-700 font-semibold dark:text-blue-300' : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300'}`}>
                    {opt.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Rating */}
        <div className="mb-5 border-b border-gray-100 dark:border-gray-700 pb-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Minimum Rating</h3>
          <ul className="space-y-2">
            {(
              [
                { value: '', label: 'Any Rating' },
                { value: '4', label: '4★ & above' },
                { value: '3', label: '3★ & above' },
              ] as { value: RatingFilter; label: string }[]
            ).map((opt) => (
              <li key={opt.value}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="rating_filter"
                    checked={ratingFilter === opt.value}
                    onChange={() => onRatingChange(opt.value)}
                    className="accent-blue-600 w-3.5 h-3.5 cursor-pointer"
                  />
                  <span className={`text-sm flex items-center gap-1 transition-colors ${ratingFilter === opt.value ? 'text-blue-700 font-semibold dark:text-blue-300' : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300'}`}>
                    {opt.value ? (
                      <>
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        {opt.label}
                      </>
                    ) : opt.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Compatibility */}
        <div className="mb-5 border-b border-gray-100 dark:border-gray-700 pb-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Compatibility</h3>
          <ul className="space-y-2">
            {COMPATIBILITY_OPTIONS.map((c) => {
              const checked = selectedCompatibility.includes(c)
              return (
                <li key={c}>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => onCompatibilityChange(c)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all flex-shrink-0 ${
                        checked
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-500 group-hover:border-blue-400'
                      }`}
                    >
                      {checked && <Check size={10} className="text-white" strokeWidth={3} />}
                    </div>
                    <span
                      onClick={() => onCompatibilityChange(c)}
                      className={`text-sm cursor-pointer transition-colors ${checked ? 'text-blue-700 font-semibold dark:text-blue-300' : 'text-gray-700 group-hover:text-gray-900 dark:text-gray-300'}`}
                    >
                      {c}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Stock */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Availability</h3>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-700 dark:text-gray-300">In Stock Only</span>
            <button
              onClick={() => onInStockChange(!inStockOnly)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                inStockOnly ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                  inStockOnly ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </label>
        </div>

        {/* Clear all bottom */}
        {activeFilterCount > 0 && (
          <button
            onClick={onClearAll}
            className="mt-5 w-full py-2 rounded-xl border border-red-200 text-red-500 text-sm font-semibold hover:bg-red-50 transition-colors dark:border-red-800 dark:hover:bg-red-900/20"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </aside>
  )
}

// ─── Main search content ──────────────────────────────────────────────────────

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [showSortDropdown, setShowSortDropdown] = useState(false)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<CategoryFilter[]>([])
  const [priceRange, setPriceRange] = useState<PriceRange>('')
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('')
  const [selectedCompatibility, setSelectedCompatibility] = useState<string[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedCategories.length > 0) count += 1
    if (priceRange) count += 1
    if (ratingFilter) count += 1
    if (selectedCompatibility.length > 0) count += selectedCompatibility.length
    if (inStockOnly) count += 1
    return count
  }, [selectedCategories, priceRange, ratingFilter, selectedCompatibility, inStockOnly])

  function handleCategoryChange(cat: CategoryFilter) {
    if (cat === 'all') {
      setSelectedCategories([])
    } else {
      setSelectedCategories((prev) =>
        prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
      )
    }
    setCurrentPage(1)
  }

  function handleCompatibilityChange(c: string) {
    setSelectedCompatibility((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    )
    setCurrentPage(1)
  }

  function handleClearAll() {
    setSelectedCategories([])
    setPriceRange('')
    setRatingFilter('')
    setSelectedCompatibility([])
    setInStockOnly(false)
    setCurrentPage(1)
  }

  function handleSearch() {
    setQuery(inputValue.trim())
    setCurrentPage(1)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSearch()
  }

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS]

    // Text search
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.compatibility.some((c) => c.toLowerCase().includes(q))
      )
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // Price
    if (priceRange === 'under_199') result = result.filter((p) => p.price < 199)
    else if (priceRange === '199_499') result = result.filter((p) => p.price >= 199 && p.price <= 499)
    else if (priceRange === '499_999') result = result.filter((p) => p.price > 499 && p.price <= 999)
    else if (priceRange === '999_plus') result = result.filter((p) => p.price > 999)

    // Rating
    if (ratingFilter === '4') result = result.filter((p) => p.rating >= 4)
    else if (ratingFilter === '3') result = result.filter((p) => p.rating >= 3)

    // Compatibility
    if (selectedCompatibility.length > 0) {
      result = result.filter((p) =>
        selectedCompatibility.some((c) => p.compatibility.includes(c))
      )
    }

    // Stock
    if (inStockOnly) {
      result = result.filter((p) => p.stock !== 'out_of_stock')
    }

    // Sort
    if (sortBy === 'price_asc') result.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price_desc') result.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'newest') result.sort((a, b) => b.addedAt - a.addedAt)

    return result
  }, [query, selectedCategories, priceRange, ratingFilter, selectedCompatibility, inStockOnly, sortBy])

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const currentSortLabel = SORT_OPTIONS.find((s) => s.value === sortBy)?.label ?? 'Relevance'

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    []
  )

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="container-xl py-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="mx-1">/</span>
          <span className="text-gray-700 dark:text-gray-300">Search</span>
          {query && (
            <>
              <span className="mx-1">/</span>
              <span className="text-gray-700 dark:text-gray-300 truncate max-w-[200px] inline-block align-bottom">"{query}"</span>
            </>
          )}
        </div>
      </div>

      <div className="container-xl py-6">
        {/* Search bar */}
        <div className="mb-6">
          <div className="flex gap-3 max-w-2xl">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search sensors, boards, motors, kits..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500 transition-all"
              />
              {inputValue && (
                <button
                  onClick={() => { setInputValue(''); setQuery(''); setCurrentPage(1) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="btn-primary px-5 py-3"
            >
              <Search size={16} />
              <span className="hidden sm:inline">Search</span>
            </button>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
            >
              <Filter size={16} />
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceChange={(r) => { setPriceRange(r); setCurrentPage(1) }}
              ratingFilter={ratingFilter}
              onRatingChange={(r) => { setRatingFilter(r); setCurrentPage(1) }}
              selectedCompatibility={selectedCompatibility}
              onCompatibilityChange={handleCompatibilityChange}
              inStockOnly={inStockOnly}
              onInStockChange={(v) => { setInStockOnly(v); setCurrentPage(1) }}
              onClearAll={handleClearAll}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Mobile filter drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute inset-y-0 left-0 w-80 max-w-full bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700">
                  <span className="font-bold text-gray-900 dark:text-white">Filters</span>
                  <button onClick={() => setShowMobileFilters(false)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
                    <X size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <FilterSidebar
                    selectedCategories={selectedCategories}
                    onCategoryChange={handleCategoryChange}
                    priceRange={priceRange}
                    onPriceChange={(r) => { setPriceRange(r); setCurrentPage(1) }}
                    ratingFilter={ratingFilter}
                    onRatingChange={(r) => { setRatingFilter(r); setCurrentPage(1) }}
                    selectedCompatibility={selectedCompatibility}
                    onCompatibilityChange={handleCompatibilityChange}
                    inStockOnly={inStockOnly}
                    onInStockChange={(v) => { setInStockOnly(v); setCurrentPage(1) }}
                    onClearAll={handleClearAll}
                    activeFilterCount={activeFilterCount}
                  />
                </div>
                <div className="sticky bottom-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
                  >
                    Show {filteredProducts.length} Results
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Results header */}
            <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProducts.length === 0
                    ? 'No results'
                    : filteredProducts.length === 1
                    ? '1 product found'
                    : `${filteredProducts.length} products found`}
                  {query && (
                    <span className="ml-1">
                      for <span className="font-semibold text-gray-900 dark:text-gray-100">"{query}"</span>
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {/* View toggle */}
                <div className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setView('grid')}
                    className={`p-1.5 rounded transition-colors ${view === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                    title="Grid view"
                  >
                    <Grid3X3 size={15} />
                  </button>
                  <button
                    onClick={() => setView('list')}
                    className={`p-1.5 rounded transition-colors ${view === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                    title="List view"
                  >
                    <List size={15} />
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown((v) => !v)}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="hidden sm:inline text-gray-400 text-xs">Sort:</span>
                    {currentSortLabel}
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-1.5 w-52 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => { setSortBy(opt.value); setShowSortDropdown(false); setCurrentPage(1) }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                            sortBy === opt.value
                              ? 'bg-blue-50 text-blue-700 font-semibold dark:bg-blue-900/30 dark:text-blue-300'
                              : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                          }`}
                        >
                          {opt.label}
                          {sortBy === opt.value && <Check size={14} className="text-blue-600 dark:text-blue-400" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active filters chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium"
                  >
                    {CATEGORIES.find((c) => c.value === cat)?.label ?? cat}
                    <button onClick={() => handleCategoryChange(cat)} className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {priceRange && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium">
                    {priceRange === 'under_199' ? 'Under ₹199' : priceRange === '199_499' ? '₹199–₹499' : priceRange === '499_999' ? '₹499–₹999' : '₹999+'}
                    <button onClick={() => { setPriceRange(''); setCurrentPage(1) }} className="hover:text-green-900 dark:hover:text-green-100 transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {ratingFilter && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 text-xs font-medium">
                    {ratingFilter}★+
                    <button onClick={() => { setRatingFilter(''); setCurrentPage(1) }} className="hover:text-yellow-900 dark:hover:text-yellow-100 transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                )}
                {selectedCompatibility.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium"
                  >
                    {c}
                    <button onClick={() => handleCompatibilityChange(c)} className="hover:text-purple-900 dark:hover:text-purple-100 transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                ))}
                {inStockOnly && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-medium">
                    In Stock Only
                    <button onClick={() => { setInStockOnly(false); setCurrentPage(1) }} className="hover:text-teal-900 dark:hover:text-teal-100 transition-colors">
                      <X size={11} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Product grid or empty state */}
            {paginatedProducts.length === 0 ? (
              <div className="py-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-5">
                  <Search size={28} className="text-gray-300 dark:text-gray-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">No products found</h2>
                <p className="text-gray-400 dark:text-gray-500 mb-6 max-w-sm">
                  We couldn't find anything matching your filters. Try broadening your search or clearing some filters.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {['Sensors', 'Boards', 'Motors', 'Kits'].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        handleClearAll()
                        setInputValue(s)
                        setQuery(s)
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors border border-blue-100 dark:border-blue-800"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleClearAll}
                  className="btn-secondary text-sm"
                >
                  <X size={14} /> Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={
                    view === 'grid'
                      ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                      : 'flex flex-col gap-3'
                  }
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} view={view} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      const isActive = page === currentPage
                      const isNear = Math.abs(page - currentPage) <= 2
                      const isEdge = page === 1 || page === totalPages
                      if (!isNear && !isEdge) {
                        if (page === 2 || page === totalPages - 1) {
                          return <span key={page} className="px-1 text-gray-400 text-sm">…</span>
                        }
                        return null
                      }
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// ─── Page export with Suspense ────────────────────────────────────────────────

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">Loading search...</p>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}

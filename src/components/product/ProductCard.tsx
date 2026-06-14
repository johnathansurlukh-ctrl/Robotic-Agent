'use client'
import Link from 'next/link'
import { Star, ShoppingCart, Zap, CheckCircle, Heart, BarChart2 } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useComparison } from '@/context/ComparisonContext'

const stockColors = { in_stock: 'text-green-600', low_stock: 'text-orange-500', out_of_stock: 'text-red-500' }
const stockLabels = { in_stock: 'In Stock', low_stock: 'Low Stock', out_of_stock: 'Out of Stock' }
const LOW_STOCK_QTY: Record<string, number> = {
  'p001': 4, 'p002': 7, 'p003': 3, 'p004': 5, 'p005': 8, 'p006': 2, 'p007': 6, 'p008': 9, 'p009': 4, 'p010': 5,
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toggle: toggleWishlist, has: inWishlist } = useWishlist()
  const { add: addCompare, remove: removeCompare, has: inCompare } = useComparison()

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0
  const lowQty = product.stock === 'low_stock' ? (LOW_STOCK_QTY[product.id] || 5) : null
  const wished = inWishlist(product.id)
  const compared = inCompare(product.id)

  function handleAddToCart() {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0], slug: product.slug })
  }

  function handleCompare() {
    if (compared) removeCompare(product.id)
    else addCompare({ id: product.id, name: product.name, price: product.price, image: product.images[0], slug: product.slug, specs: product.specs, rating: product.rating, stock: product.stock })
  }

  return (
    <div className="card overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img referrerPolicy="no-referrer" src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        {/* Badges */}
        {product.badge && <span className="absolute top-3 left-3 px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">{product.badge}</span>}
        {discount > 0 && <span className="absolute top-3 right-10 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">-{discount}%</span>}
        {lowQty && <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-red-600 text-white text-xs font-bold rounded-full animate-pulse">Only {lowQty} left!</span>}

        {/* Wishlist button */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist({ id: product.id, name: product.name, price: product.price, image: product.images[0], slug: product.slug }) }}
          className={`absolute top-3 right-3 p-1.5 rounded-full transition-all ${wished ? 'bg-pink-500 text-white' : 'bg-white/80 text-gray-400 hover:bg-pink-50 hover:text-pink-500'}`}
        >
          <Heart size={15} className={wished ? 'fill-white' : ''} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{product.brand}</div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">{product.name}</h3>
        </Link>

        {/* Compatibility */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.compatibility.slice(0, 3).map((c) => (
            <span key={c} className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full font-medium flex items-center gap-1">
              <CheckCircle size={9} /> {c}
            </span>
          ))}
        </div>

        {/* Rating + Stock */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>
          <span className={`text-xs font-semibold ${stockColors[product.stock]}`}>● {stockLabels[product.stock]}</span>
        </div>

        {/* Key spec */}
        {Object.entries(product.specs).slice(0, 1).map(([k, v]) => (
          <div key={k} className="text-xs text-gray-500 mb-3">
            <span className="font-medium text-gray-700">{k}:</span> {v}
          </div>
        ))}

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            <div className="text-xl font-black text-gray-900">₹{product.price.toLocaleString()}</div>
            {product.originalPrice && <div className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</div>}
          </div>
          <div className="flex gap-1.5">
            <button onClick={handleCompare} title="Compare" className={`p-2 rounded-lg transition-colors ${compared ? 'bg-blue-600 text-white' : 'text-blue-600 bg-blue-50 hover:bg-blue-100'}`}>
              <BarChart2 size={15} />
            </button>
            <Link href={`/products/${product.slug}`} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <Zap size={15} />
            </Link>
            <button onClick={handleAddToCart} disabled={product.stock === 'out_of_stock'}
              className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white text-xs font-bold rounded-lg transition-colors">
              <ShoppingCart size={14} /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

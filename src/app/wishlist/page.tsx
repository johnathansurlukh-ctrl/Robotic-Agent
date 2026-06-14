'use client'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'

export default function WishlistPage() {
  const { items, toggle } = useWishlist()
  const { addItem } = useCart()

  function handleAddToCart(item: typeof items[0]) {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image, slug: item.slug })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="container-xl py-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-600">Home</Link> /
          <span className="text-gray-700 ml-1">Wishlist</span>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={24} className="text-pink-500 fill-pink-500" />
          <h1 className="text-3xl font-black text-gray-900">My Wishlist</h1>
          {items.length > 0 && (
            <span className="px-3 py-1 bg-pink-100 text-pink-700 text-sm font-bold rounded-full">{items.length} items</span>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Heart size={32} className="text-pink-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">Save products you love by tapping the heart icon on any product card.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden group flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <img referrerPolicy="no-referrer" src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button onClick={() => toggle(item)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                      title="Remove from wishlist">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <Link href={`/products/${item.slug}`}>
                      <h3 className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-3">{item.name}</h3>
                    </Link>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="text-xl font-black text-gray-900">₹{item.price.toLocaleString()}</div>
                      <button onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors">
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => items.forEach(item => addItem({ id: item.id, name: item.name, price: item.price, image: item.image, slug: item.slug }))}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                <ShoppingCart size={18} /> Add All to Cart
              </button>
              <Link href="/shop" className="flex items-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

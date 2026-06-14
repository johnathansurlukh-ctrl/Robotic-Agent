'use client'
import Link from 'next/link'
import { BarChart2, ShoppingCart, X, Star, CheckCircle, XCircle, ArrowRight } from 'lucide-react'
import { useComparison } from '@/context/ComparisonContext'
import { useCart } from '@/context/CartContext'

const stockLabel: Record<string, string> = { in_stock: 'In Stock', low_stock: 'Low Stock', out_of_stock: 'Out of Stock' }
const stockColor: Record<string, string> = { in_stock: 'text-green-600', low_stock: 'text-orange-500', out_of_stock: 'text-red-500' }

export default function ComparePage() {
  const { items, remove, clear } = useComparison()
  const { addItem } = useCart()

  const allSpecKeys = Array.from(new Set(items.flatMap(item => Object.keys(item.specs ?? {}))))

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="container-xl py-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-600">Home</Link> /
          <span className="text-gray-700 ml-1">Compare Products</span>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <BarChart2 size={24} className="text-blue-600" />
            <h1 className="text-3xl font-black text-gray-900">Compare Products</h1>
            {items.length > 0 && <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">{items.length}/3 selected</span>}
          </div>
          {items.length > 0 && (
            <button onClick={clear} className="text-sm text-red-500 hover:text-red-700 font-semibold flex items-center gap-1.5">
              <X size={15} /> Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <BarChart2 size={32} className="text-blue-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-700 mb-2">No products to compare</h2>
            <p className="text-gray-400 mb-6">Tap the compare icon on any product card to add it here. Compare up to 3 products side by side.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Browse Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr>
                  <td className="w-40 pb-6" />
                  {items.map((item) => (
                    <td key={item.id} className="pb-6 pr-4 align-top">
                      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <div className="relative h-40 overflow-hidden">
                          <img referrerPolicy="no-referrer" src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <button onClick={() => remove(item.id)}
                            className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow">
                            <X size={14} />
                          </button>
                        </div>
                        <div className="p-4">
                          <Link href={`/products/${item.slug}`}>
                            <div className="font-bold text-gray-900 hover:text-blue-600 transition-colors text-sm mb-2 line-clamp-2">{item.name}</div>
                          </Link>
                          <div className="text-xl font-black text-gray-900 mb-3">₹{item.price.toLocaleString()}</div>
                          <button onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image, slug: item.slug })}
                            className="w-full flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors">
                            <ShoppingCart size={13} /> Add to Cart
                          </button>
                        </div>
                      </div>
                    </td>
                  ))}
                  {/* Empty slot */}
                  {items.length < 3 && (
                    <td className="pb-6 pr-4 align-top">
                      <Link href="/shop">
                        <div className="h-full min-h-[240px] rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 transition-colors cursor-pointer p-6">
                          <BarChart2 size={28} className="mb-2" />
                          <span className="text-sm font-semibold text-center">Add a product to compare</span>
                        </div>
                      </Link>
                    </td>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Rating row */}
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-gray-700 bg-gray-50 rounded-l-xl">Rating</td>
                  {items.map((item) => (
                    <td key={item.id} className="px-4 py-3 pr-4">
                      <div className="flex items-center gap-1.5">
                        <div className="flex">
                          {[1,2,3,4,5].map(s => (
                            <Star key={s} size={12} className={s <= Math.floor(item.rating ?? 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                          ))}
                        </div>
                        <span className="text-xs font-bold">{item.rating ?? '—'}</span>
                      </div>
                    </td>
                  ))}
                  {items.length < 3 && <td />}
                </tr>

                {/* Stock row */}
                <tr className="bg-white border-b border-gray-100">
                  <td className="px-4 py-3 font-semibold text-gray-700 bg-gray-50">Availability</td>
                  {items.map((item) => (
                    <td key={item.id} className="px-4 py-3 pr-4">
                      <span className={`text-xs font-bold ${stockColor[item.stock ?? 'in_stock']}`}>
                        {stockLabel[item.stock ?? 'in_stock']}
                      </span>
                    </td>
                  ))}
                  {items.length < 3 && <td />}
                </tr>

                {/* Spec rows */}
                {allSpecKeys.map((key, idx) => (
                  <tr key={key} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-4 py-3 font-semibold text-gray-700 bg-gray-50">{key}</td>
                    {items.map((item) => {
                      const val = item.specs?.[key]
                      const vals = items.map(it => it.specs?.[key])
                      const allSame = vals.every(v => v === val)
                      return (
                        <td key={item.id} className="px-4 py-3 pr-4">
                          {val ? (
                            <div className="flex items-center gap-1.5">
                              {!allSame && items.length > 1 ? (
                                <CheckCircle size={13} className="text-green-500 flex-shrink-0" />
                              ) : null}
                              <span className="text-xs text-gray-700">{val}</span>
                            </div>
                          ) : (
                            <XCircle size={14} className="text-gray-300" />
                          )}
                        </td>
                      )
                    })}
                    {items.length < 3 && <td />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

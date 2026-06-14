'use client'
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, totalItems, totalPrice } = useCart()
  const { fmt, currency, loading } = useCurrency()
  const router = useRouter()

  function handleCheckout() {
    setIsOpen(false)
    router.push('/checkout')
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      )}

      <div className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-[#0f2744]">
          <div className="flex items-center gap-2 text-white">
            <ShoppingBag size={20} />
            <span className="font-bold text-lg">Cart</span>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">{totalItems}</span>
            )}
          </div>
          {!loading && currency !== 'INR' && (
            <div className="flex items-center gap-1 text-xs text-blue-300">
              <Globe size={12} /> {currency}
            </div>
          )}
          <button onClick={() => setIsOpen(false)} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag size={28} className="text-gray-400" />
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-1">Your cart is empty</div>
                <div className="text-sm text-gray-400">Add products or project kits to get started.</div>
              </div>
              <button onClick={() => setIsOpen(false)} className="btn-primary mt-2">
                Continue Shopping <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-200">
                    <img referrerPolicy="no-referrer" src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.slug}`} onClick={() => setIsOpen(false)} className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 leading-snug block">
                      {item.name}
                    </Link>
                    <div className="text-sm font-black text-blue-600 mt-1">{fmt(item.price)}</div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                          <Minus size={11} />
                        </button>
                        <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded-md bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                          <Plus size={11} />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 space-y-3 bg-white">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
              <span className="font-semibold text-gray-900">{fmt(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-green-600">
              <span>Shipping</span>
              <span className="font-semibold">{totalPrice >= 999 ? 'Free' : fmt(99)}</span>
            </div>
            <div className="flex items-center justify-between font-black text-gray-900 text-lg border-t border-gray-100 pt-3">
              <span>Total</span>
              <span>{fmt(totalPrice + (totalPrice >= 999 ? 0 : 99))}</span>
            </div>
            <button onClick={handleCheckout} className="w-full btn-primary justify-center py-3.5 text-base">
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            <button onClick={() => setIsOpen(false)} className="w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors py-1">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}

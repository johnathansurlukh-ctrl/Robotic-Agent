'use client'

import { useState, useMemo } from 'react'
import { Plus, Minus, ShoppingCart, Save, Share2, Package, Tag, Trash2 } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Boards' | 'Sensors' | 'Motors' | 'Chassis' | 'Tools'

interface Product {
  id: string
  name: string
  price: number
  category: Exclude<Category, 'All'>
}

// ── Product catalogue ──────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  { id: 'arduino-uno',    name: 'Arduino Uno R3',         price: 599,  category: 'Boards'   },
  { id: 'esp32',          name: 'ESP32 Dev Module',        price: 349,  category: 'Boards'   },
  { id: 'rpi4',           name: 'Raspberry Pi 4 (2GB)',    price: 4999, category: 'Boards'   },
  { id: 'hcsr04',         name: 'HC-SR04 Ultrasonic',      price: 49,   category: 'Sensors'  },
  { id: 'ir-sensor',      name: 'IR Obstacle Sensor',      price: 78,   category: 'Sensors'  },
  { id: 'hc05',           name: 'HC-05 Bluetooth Module',  price: 179,  category: 'Sensors'  },
  { id: 'l298n',          name: 'L298N Motor Driver',      price: 149,  category: 'Motors'   },
  { id: 'sg90',           name: 'SG90 Servo Motor',        price: 99,   category: 'Motors'   },
  { id: 'bo-motor',       name: 'BO Motor (300 RPM)',       price: 89,   category: 'Motors'   },
  { id: '4wd-chassis',    name: '4WD Robot Chassis',        price: 449,  category: 'Chassis'  },
  { id: 'jumper-wires',   name: 'Jumper Wires (40pcs)',     price: 49,   category: 'Tools'    },
  { id: 'breadboard',     name: 'Breadboard 830 Tie',       price: 69,   category: 'Tools'    },
]

const CATEGORIES: Category[] = ['All', 'Boards', 'Sensors', 'Motors', 'Chassis', 'Tools']

// ── Discount logic (based on total item COUNT, not value) ──────────────────────

function getDiscount(totalItems: number): { pct: number; label: string } {
  if (totalItems >= 8) return { pct: 15, label: '15% off — Pro Bundle!' }
  if (totalItems >= 5) return { pct: 10, label: '10% off — Great Bundle!' }
  if (totalItems >= 3) return { pct: 5,  label: '5% off — Starter Bundle' }
  return { pct: 0, label: '' }
}

// ── Kit summary panel ──────────────────────────────────────────────────────────

interface KitItem {
  product: Product
  qty: number
}

interface KitPanelProps {
  items: KitItem[]
  onRemove: (id: string) => void
  onQtyChange: (id: string, delta: number) => void
}

function KitPanel({ items, onRemove, onQtyChange }: KitPanelProps) {
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.product.price * i.qty, 0), [items])
  const totalCount = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items])
  const { pct, label } = getDiscount(totalCount)
  const discount = Math.round(subtotal * pct / 100)
  const total = subtotal - discount

  const handleAddToCart = () => {
    if (items.length === 0) {
      alert('Your kit is empty — add some products first!')
      return
    }
    alert(`Kit added to cart!\n\nItems: ${totalCount}\nTotal: ₹${total.toLocaleString('en-IN')}`)
  }

  return (
    <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#0f2744] px-5 py-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          <Package size={18} />
          Your Kit
        </h2>
        <p className="text-blue-200 text-xs mt-0.5">
          {totalCount === 0 ? 'No items yet' : `${totalCount} item${totalCount !== 1 ? 's' : ''} added`}
        </p>
      </div>

      {/* Item list */}
      <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
        {items.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <Package size={32} className="text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Add products from the left panel to build your kit.</p>
          </div>
        ) : (
          items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[#0f2744] truncate">{product.name}</div>
                <div className="text-xs text-gray-400">₹{product.price} × {qty}</div>
              </div>
              {/* Qty controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onQtyChange(product.id, -1)}
                  className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => onQtyChange(product.id, 1)}
                  className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
              <div className="text-sm font-bold text-[#0f2744] w-16 text-right">
                ₹{(product.price * qty).toLocaleString('en-IN')}
              </div>
              <button
                onClick={() => onRemove(product.id)}
                className="text-gray-300 hover:text-red-400 transition-colors ml-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Totals */}
      <div className="border-t border-gray-100 px-5 pt-4 pb-2 space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        {pct > 0 ? (
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1.5 text-orange-600 font-semibold">
              <Tag size={13} />
              {label}
            </span>
            <span className="text-orange-600 font-semibold">−₹{discount.toLocaleString('en-IN')}</span>
          </div>
        ) : (
          <div className="text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2 text-center">
            Add {3 - totalCount > 0 ? `${3 - totalCount} more item${3 - totalCount !== 1 ? 's' : ''}` : 'items'} to unlock 5% off
          </div>
        )}

        <div className="flex justify-between font-extrabold text-[#0f2744] text-lg pt-1 border-t border-gray-100">
          <span>Total</span>
          <span>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-5 pt-3 space-y-2">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors"
        >
          <ShoppingCart size={17} />
          Add Kit to Cart
        </button>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors">
            <Save size={14} />
            Save Kit
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors">
            <Share2 size={14} />
            Share Kit
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Product row ────────────────────────────────────────────────────────────────

interface ProductRowProps {
  product: Product
  qty: number
  onAdd: (product: Product) => void
  onQtyChange: (id: string, delta: number) => void
}

function ProductRow({ product, qty, onAdd, onQtyChange }: ProductRowProps) {
  const inKit = qty > 0
  return (
    <div className="flex items-center gap-4 px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
      {/* Colour dot by category */}
      <div className={`w-2 h-8 rounded-full shrink-0 ${
        product.category === 'Boards'  ? 'bg-blue-400' :
        product.category === 'Sensors' ? 'bg-green-400' :
        product.category === 'Motors'  ? 'bg-orange-400' :
        product.category === 'Chassis' ? 'bg-purple-400' :
        'bg-gray-300'
      }`} />

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[#0f2744] text-sm">{product.name}</div>
        <div className="text-xs text-gray-400">{product.category}</div>
      </div>

      <div className="font-bold text-[#0f2744] text-sm w-16 text-right">
        ₹{product.price.toLocaleString('en-IN')}
      </div>

      {inKit ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onQtyChange(product.id, -1)}
            className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <Minus size={13} />
          </button>
          <span className="w-5 text-center font-bold text-[#0f2744] text-sm">{qty}</span>
          <button
            onClick={() => onQtyChange(product.id, 1)}
            className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center justify-center transition-colors"
          >
            <Plus size={13} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => onAdd(product)}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
        >
          <Plus size={13} />
          Add
        </button>
      )}
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────

export default function BundleBuilderPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [kitQty, setKitQty] = useState<Record<string, number>>({})

  const filteredProducts = useMemo(
    () => activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  const kitItems: KitItem[] = useMemo(
    () => PRODUCTS
      .filter(p => (kitQty[p.id] ?? 0) > 0)
      .map(p => ({ product: p, qty: kitQty[p.id] as number })),
    [kitQty]
  )

  const handleAdd = (product: Product) => {
    setKitQty(prev => ({ ...prev, [product.id]: (prev[product.id] ?? 0) + 1 }))
  }

  const handleQtyChange = (id: string, delta: number) => {
    setKitQty(prev => {
      const next = (prev[id] ?? 0) + delta
      if (next <= 0) {
        return Object.fromEntries(Object.entries(prev).filter(([k]) => k !== id))
      }
      return { ...prev, [id]: next }
    })
  }

  const handleRemove = (id: string) => {
    setKitQty(prev => Object.fromEntries(Object.entries(prev).filter(([k]) => k !== id)))
  }

  const totalCount = useMemo(() => Object.values(kitQty).reduce((s, v) => s + v, 0), [kitQty])
  const { pct } = getDiscount(totalCount)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero header */}
      <section className="bg-[#0f2744] py-12 px-4">
        <div className="container-xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Package size={15} />
            Bundle Builder
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
            Build Your Custom Kit
          </h1>
          <p className="text-blue-200 text-lg">
            Save{' '}
            <span className="text-orange-400 font-bold">5%</span> on 3+ items &bull;{' '}
            <span className="text-orange-400 font-bold">10%</span> on 5+ items &bull;{' '}
            <span className="text-orange-400 font-bold">15%</span> on 8+ items
          </p>
        </div>
      </section>

      {/* Discount progress bar */}
      {totalCount > 0 && totalCount < 8 && (
        <div className="bg-white border-b border-gray-100 px-4 py-2.5">
          <div className="container-xl mx-auto flex items-center gap-3 text-sm">
            <Tag size={15} className="text-orange-500 shrink-0" />
            {pct > 0 ? (
              <span className="text-orange-600 font-semibold">
                {pct}% discount applied! Add {
                  totalCount < 5 ? `${5 - totalCount} more` : `${8 - totalCount} more`
                } item{(totalCount < 5 ? 5 - totalCount : 8 - totalCount) !== 1 ? 's' : ''} to get{' '}
                {totalCount < 5 ? '10%' : '15%'} off.
              </span>
            ) : (
              <span className="text-gray-500">
                Add {3 - totalCount} more item{3 - totalCount !== 1 ? 's' : ''} to unlock 5% off.
              </span>
            )}
          </div>
        </div>
      )}

      <div className="container-xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left panel — product browser */}
          <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Category tabs */}
            <div className="flex gap-1 p-3 border-b border-gray-100 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeCategory === cat
                      ? 'bg-[#0f2744] text-white'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product list */}
            <div>
              {filteredProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  qty={kitQty[product.id] ?? 0}
                  onAdd={handleAdd}
                  onQtyChange={handleQtyChange}
                />
              ))}
            </div>

            <div className="px-5 py-3 text-xs text-gray-400 border-t border-gray-50">
              Showing {filteredProducts.length} of {PRODUCTS.length} products
            </div>
          </div>

          {/* Right panel — kit summary (sticky) */}
          <div className="w-full lg:w-80 shrink-0">
            <KitPanel items={kitItems} onRemove={handleRemove} onQtyChange={handleQtyChange} />
          </div>

        </div>
      </div>
    </div>
  )
}

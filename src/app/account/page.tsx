'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Star,
  Award,
  Plus,
  X,
  CheckCircle,
  Truck,
  Clock,
  ChevronRight,
  Edit2,
  Trash2,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Tab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'loyalty'

type OrderStatus = 'Delivered' | 'Shipped' | 'Processing'

interface Order {
  id: string
  date: string
  items: string
  amount: number
  status: OrderStatus
}

interface WishlistItem {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
}

interface Address {
  id: string
  type: 'Home' | 'Office' | 'Other'
  name: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

interface PointsEntry {
  date: string
  description: string
  points: number
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_ORDERS: Order[] = [
  { id: '#ORD-10421', date: '05 Jun 2026', items: 'L298N Motor Driver × 2', amount: 298, status: 'Delivered' },
  { id: '#ORD-10389', date: '28 May 2026', items: 'Arduino Mega 2560 × 1', amount: 749, status: 'Delivered' },
  { id: '#ORD-10367', date: '20 May 2026', items: 'MPU-6050 IMU Module × 3', amount: 447, status: 'Shipped' },
  { id: '#ORD-10311', date: '09 May 2026', items: 'Raspberry Pi 4 (4GB) × 1', amount: 3999, status: 'Delivered' },
  { id: '#ORD-10278', date: '01 May 2026', items: 'TB6612FNG Driver × 2, Servo SG90 × 4', amount: 618, status: 'Processing' },
]

const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: 'w1',
    name: 'NEMA 17 Stepper Motor',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop',
  },
  {
    id: 'w2',
    name: 'ESP32 Dev Board',
    price: 349,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
  },
  {
    id: 'w3',
    name: 'LiPo Battery 3000mAh',
    price: 899,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop',
  },
  {
    id: 'w4',
    name: 'Ultrasonic Sensor HC-SR04',
    price: 89,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&h=400&fit=crop',
  },
]

const MOCK_ADDRESSES: Address[] = [
  {
    id: 'addr1',
    type: 'Home',
    name: 'Arjun Sharma',
    phone: '9876543210',
    address: '42, Sundarvan Society, Near Makarba Flyover',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    isDefault: true,
  },
  {
    id: 'addr2',
    type: 'Office',
    name: 'Arjun Sharma',
    phone: '9988776655',
    address: 'Block B3, GIFT City SEZ, Gandhinagar',
    city: 'Gandhinagar',
    state: 'Gujarat',
    pincode: '382355',
    isDefault: false,
  },
]

const MOCK_POINTS: PointsEntry[] = [
  { date: '05 Jun 2026', description: 'Order #ORD-10421 — Purchase reward', points: 60 },
  { date: '28 May 2026', description: 'Order #ORD-10389 — Purchase reward', points: 150 },
  { date: '20 May 2026', description: 'Order #ORD-10367 — Purchase reward', points: 90 },
  { date: '15 May 2026', description: 'Referral bonus — Friend signed up', points: 200 },
  { date: '01 May 2026', description: 'Order #ORD-10278 — Purchase reward', points: 124 },
]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: OrderStatus }) {
  const styles: Record<OrderStatus, string> = {
    Delivered: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
    Shipped: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
    Processing: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400',
  }
  const icons: Record<OrderStatus, JSX.Element> = {
    Delivered: <CheckCircle size={13} />,
    Shipped: <Truck size={13} />,
    Processing: <Clock size={13} />,
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Tab: Overview
// ---------------------------------------------------------------------------

function OverviewTab({ setActiveTab, userName, userEmail }: { setActiveTab: (t: Tab) => void; userName: string; userEmail: string }) {
  const firstName = userName.split(' ')[0]
  const stats = [
    { label: 'Total Orders', value: '7', icon: ShoppingBag, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30', tab: 'orders' as Tab },
    { label: 'Loyalty Points', value: '1,240', icon: Award, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/30', tab: 'loyalty' as Tab },
    { label: 'Wishlist Items', value: '4', icon: Heart, color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/30', tab: 'wishlist' as Tab },
    { label: 'Tier', value: 'Gold Member', icon: Star, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/30', tab: 'loyalty' as Tab },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Welcome back, {firstName}!</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{userEmail}</p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
            Gold Member
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          You&apos;re 1,260 points away from Platinum tier. Keep shopping to unlock exclusive rewards!
        </p>
        <div className="mt-4 h-2 w-full rounded-full bg-gray-100 dark:bg-gray-700">
          <div className="h-2 rounded-full bg-amber-400" style={{ width: '49.6%' }} />
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-400 dark:text-gray-500">
          <span>1,000 pts (Gold)</span>
          <span>1,240 pts current</span>
          <span>2,500 pts (Platinum)</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <button
              key={s.label}
              onClick={() => setActiveTab(s.tab)}
              className={`card flex flex-col items-center gap-2 p-5 text-center transition-transform hover:scale-105 ${s.bg}`}
            >
              <Icon size={22} className={s.color} />
              <span className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{s.label}</span>
            </button>
          )
        })}
      </div>

      {/* Quick links */}
      <div className="card divide-y divide-gray-100 p-0 dark:divide-gray-700">
        {[
          { label: 'My Orders', desc: 'Track and manage your purchases', tab: 'orders' as Tab, icon: ShoppingBag },
          { label: 'Wishlist', desc: 'Items you saved for later', tab: 'wishlist' as Tab, icon: Heart },
          { label: 'Saved Addresses', desc: 'Manage delivery addresses', tab: 'addresses' as Tab, icon: MapPin },
          { label: 'Loyalty Points', desc: 'Check your rewards balance', tab: 'loyalty' as Tab, icon: Award },
        ].map((link) => {
          const Icon = link.icon
          return (
            <button
              key={link.label}
              onClick={() => setActiveTab(link.tab)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/60"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
                <Icon size={18} className="text-blue-600 dark:text-blue-400" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium text-gray-900 dark:text-white">{link.label}</span>
                <span className="block text-xs text-gray-500 dark:text-gray-400">{link.desc}</span>
              </span>
              <ChevronRight size={16} className="text-gray-400 dark:text-gray-500" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab: My Orders
// ---------------------------------------------------------------------------

function OrdersTab() {
  return (
    <div className="space-y-4">
      <h3 className="section-heading text-xl">My Orders</h3>

      {/* Desktop table */}
      <div className="card hidden overflow-hidden p-0 md:block">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/60">
            <tr>
              {['Order ID', 'Date', 'Items', 'Amount', 'Status', ''].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="px-5 py-4 text-sm font-medium text-blue-600 dark:text-blue-400">{order.id}</td>
                <td className="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">{order.date}</td>
                <td className="max-w-[220px] px-5 py-4 text-sm text-gray-700 dark:text-gray-200">{order.items}</td>
                <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                  ₹{order.amount.toLocaleString()}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-5 py-4">
                  <Link href="/tracking" className="btn-secondary py-1.5 text-xs">
                    Track
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="card p-4">
            <div className="flex items-start justify-between">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{order.id}</span>
              <StatusBadge status={order.status} />
            </div>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">{order.items}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">{order.date}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">₹{order.amount.toLocaleString()}</span>
            </div>
            <Link href="/tracking" className="btn-secondary mt-3 block w-full py-1.5 text-center text-xs">
              Track Order
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab: Wishlist
// ---------------------------------------------------------------------------

function WishlistTab() {
  const [items, setItems] = useState<WishlistItem[]>(MOCK_WISHLIST)
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set())

  function handleAddToCart(id: string) {
    setAddedIds((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 1500)
  }

  function handleRemove(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-4">
      <h3 className="section-heading text-xl">Wishlist ({items.length} items)</h3>
      {items.length === 0 ? (
        <div className="card flex flex-col items-center justify-center gap-3 py-16 text-center">
          <Heart size={40} className="text-gray-300 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">Your wishlist is empty.</p>
          <Link href="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="card flex flex-col overflow-hidden p-0">
              <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-red-500 shadow transition-colors hover:bg-red-500 hover:text-white dark:bg-gray-800/90"
                  aria-label="Remove from wishlist"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{item.name}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-base font-bold text-blue-600 dark:text-blue-400">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-400 line-through dark:text-gray-500">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    className={`btn-primary flex-1 py-1.5 text-xs ${
                      addedIds.has(item.id) ? 'bg-green-600 hover:bg-green-700' : ''
                    }`}
                  >
                    {addedIds.has(item.id) ? 'Added!' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn-secondary flex h-8 w-8 items-center justify-center p-0 text-red-500 hover:border-red-400 hover:text-red-500"
                    aria-label="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab: Addresses
// ---------------------------------------------------------------------------

interface AddressFormData {
  name: string
  phone: string
  address: string
  city: string
  pincode: string
  state: string
  type: 'Home' | 'Office' | 'Other'
}

const EMPTY_FORM: AddressFormData = {
  name: '',
  phone: '',
  address: '',
  city: '',
  pincode: '',
  state: '',
  type: 'Home',
}

function AddressesTab() {
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<AddressFormData>(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  function handleChange(field: keyof AddressFormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => {
      const newAddr: Address = {
        id: `addr${Date.now()}`,
        ...form,
        isDefault: addresses.length === 0,
      }
      setAddresses((prev) => [...prev, newAddr])
      setSaving(false)
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setShowForm(false)
        setForm(EMPTY_FORM)
      }, 1200)
    }, 800)
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="section-heading text-xl">Saved Addresses</h3>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 py-2 text-sm">
            <Plus size={15} />
            Add Address
          </button>
        )}
      </div>

      {/* Existing addresses */}
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((addr) => (
          <div key={addr.id} className="card relative p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                  {addr.type}
                </span>
                {addr.isDefault && (
                  <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    Default
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Edit">
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="text-gray-400 hover:text-red-500"
                  aria-label="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">{addr.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">+91 {addr.phone}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {addr.address}, {addr.city}, {addr.state} — {addr.pincode}
            </p>
          </div>
        ))}
      </div>

      {/* Add new address form */}
      {showForm && (
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white">Add New Address</h4>
            <button
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM) }}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close form"
            >
              <X size={18} />
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <CheckCircle size={32} className="text-green-500" />
              <p className="font-medium text-green-600 dark:text-green-400">Address saved successfully!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Arjun Sharma"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Phone *</label>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{10}"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="10-digit mobile"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">
                  Address (flat, street, landmark) *
                </label>
                <input
                  required
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="42, Example Street"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">City *</label>
                  <input
                    required
                    value={form.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Ahmedabad"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">State *</label>
                  <input
                    required
                    value={form.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Gujarat"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Pincode *</label>
                  <input
                    required
                    pattern="[0-9]{6}"
                    value={form.pincode}
                    onChange={(e) => handleChange('pincode', e.target.value)}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="380015"
                  />
                </div>
              </div>

              {/* Address type radio */}
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-600 dark:text-gray-300">Address Type</label>
                <div className="flex gap-4">
                  {(['Home', 'Office', 'Other'] as const).map((t) => (
                    <label
                      key={t}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${
                        form.type === t
                          ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-gray-600 dark:text-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="addressType"
                        value={t}
                        checked={form.type === t}
                        onChange={() => handleChange('type', t)}
                        className="sr-only"
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1 disabled:opacity-60"
                >
                  {saving ? 'Saving...' : 'Save Address'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setForm(EMPTY_FORM) }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab: Loyalty Points
// ---------------------------------------------------------------------------

function LoyaltyTab() {
  const currentPoints = 1240
  const goldMin = 1000
  const platinumMin = 2500
  const progress = ((currentPoints - goldMin) / (platinumMin - goldMin)) * 100

  return (
    <div className="space-y-6">
      {/* Balance card */}
      <div className="card overflow-hidden p-0">
        <div className="bg-gradient-to-r from-[#0f2744] to-[#1a3a6e] px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-200">Your Points Balance</p>
              <p className="mt-1 text-4xl font-bold">{currentPoints.toLocaleString()}</p>
              <p className="mt-0.5 text-sm text-blue-200">pts</p>
            </div>
            <Award size={48} className="text-amber-400 opacity-80" />
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-blue-200">
              <span>Gold (1,000)</span>
              <span>{currentPoints.toLocaleString()} pts</span>
              <span>Platinum (2,500)</span>
            </div>
            <div className="mt-1.5 h-2.5 w-full rounded-full bg-blue-900/50">
              <div
                className="h-2.5 rounded-full bg-amber-400 transition-all duration-700"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-blue-200">
              {(platinumMin - currentPoints).toLocaleString()} more points to Platinum
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 divide-x divide-gray-100 bg-gray-50 dark:divide-gray-700 dark:bg-gray-800/50">
          {[
            { label: 'Current Tier', value: 'Gold' },
            { label: 'Points Earned', value: '1,240' },
            { label: 'Points Used', value: '0' },
          ].map((s) => (
            <div key={s.label} className="px-4 py-3 text-center">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Points history */}
      <div className="card overflow-hidden p-0">
        <div className="border-b border-gray-100 px-5 py-4 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Points History</h4>
        </div>
        <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800/60">
            <tr>
              {['Date', 'Description', 'Points'].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {MOCK_POINTS.map((entry, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="whitespace-nowrap px-5 py-3 text-sm text-gray-500 dark:text-gray-400">{entry.date}</td>
                <td className="px-5 py-3 text-sm text-gray-700 dark:text-gray-200">{entry.description}</td>
                <td className="whitespace-nowrap px-5 py-3 text-sm font-semibold text-green-600 dark:text-green-400">
                  +{entry.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Earn more tips */}
      <div className="card p-5">
        <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">How to Earn More Points</h4>
        <ul className="space-y-3">
          {[
            { tip: 'Make a purchase', points: '₹1 = 1 point', icon: ShoppingBag },
            { tip: 'Refer a friend', points: '+200 points per referral', icon: User },
            { tip: 'Write a product review', points: '+50 points per review', icon: Star },
            { tip: 'Reach Platinum tier (2,500 pts)', points: '2× points multiplier', icon: Award },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <li
                key={idx}
                className="flex items-center gap-3 rounded-lg bg-blue-50/60 px-4 py-3 dark:bg-blue-900/20"
              >
                <Icon size={16} className="shrink-0 text-blue-600 dark:text-blue-400" />
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-200">{item.tip}</span>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{item.points}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'My Orders', icon: ShoppingBag },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'loyalty', label: 'Loyalty Points', icon: Award },
]

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [user, loading, router])

  if (loading || !user) return null

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Page banner */}
      <div className="bg-[#0f2744] py-10">
        <div className="container-xl">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl font-bold text-white ring-2 ring-white/30">
              {user.initials}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-sm text-blue-200">{user.email}</p>
            </div>
            <div className="ml-auto hidden sm:block">
              <span className="flex items-center gap-1.5 rounded-full bg-amber-400/20 px-4 py-1.5 text-sm font-semibold text-amber-300 ring-1 ring-amber-400/40">
                <Star size={14} className="fill-amber-300 text-amber-300" />
                Gold Member
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar navigation */}
          <aside className="shrink-0 lg:w-52">
            <nav className="card flex flex-row overflow-x-auto p-1.5 lg:flex-col lg:overflow-visible">
              {TABS.map((tab) => {
                const Icon = tab.icon
                const active = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors lg:w-full ${
                      active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={16} />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Tab content */}
          <section className="min-w-0 flex-1">
            {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} userName={user.name} userEmail={user.email} />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'wishlist' && <WishlistTab />}
            {activeTab === 'addresses' && <AddressesTab />}
            {activeTab === 'loyalty' && <LoyaltyTab />}
          </section>
        </div>
      </div>
    </main>
  )
}

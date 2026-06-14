'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  CheckCircle2,
  Circle,
  Truck,
  Shield,
  Headphones,
  RotateCcw,
  MessageCircle,
  ChevronRight,
  Package,
  MapPin,
} from 'lucide-react'

type StepStatus = 'done' | 'active' | 'pending'

interface TrackingStep {
  id: number
  label: string
  timestamp: string
  status: StepStatus
  detail?: string
}

const steps: TrackingStep[] = [
  { id: 1, label: 'Order Placed', timestamp: 'Jun 12 · 9:00 AM', status: 'done' },
  { id: 2, label: 'Payment Confirmed', timestamp: 'Jun 12 · 9:05 AM', status: 'done' },
  { id: 3, label: 'Packed & Ready', timestamp: 'Jun 13 · 2:00 PM', status: 'done' },
  {
    id: 4,
    label: 'Shipped',
    timestamp: 'Jun 13 · 6:00 PM',
    status: 'active',
    detail: 'Delhivery · DLVY8472910',
  },
  { id: 5, label: 'Out for Delivery', timestamp: 'Pending', status: 'pending' },
  { id: 6, label: 'Delivered', timestamp: 'Pending', status: 'pending' },
]

const trustBadges = [
  { icon: Shield, label: 'SSL Secured', sub: '256-bit encryption' },
  { icon: Headphones, label: '24/7 Support', sub: 'Always here to help' },
  { icon: RotateCcw, label: 'Free Returns', sub: '7-day return policy' },
]

const orderItems = [
  {
    name: 'Arduino Mega 2560 Kit',
    qty: 1,
    price: '₹1,299',
    img: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=200&q=80',
  },
  {
    name: 'HC-SR04 Ultrasonic Sensor (Pack of 5)',
    qty: 2,
    price: '₹499',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&q=80',
  },
]

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const displayOrderId = orderId.trim() || 'RK-ABC123'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero header ── */}
      <section className="bg-[#0f2744] py-14">
        <div className="container-xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-blue-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Track Order</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Track Your Order</h1>
          <p className="text-blue-200 text-lg max-w-xl">
            Enter your order ID and email address to see real-time shipping updates.
          </p>
        </div>
      </section>

      {/* ── Search form ── */}
      <section className="py-12">
        <div className="container-xl">
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Search size={20} className="text-blue-600" />
              Find Your Order
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Order ID
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="RK-ABC123"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Track Order
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Tracking result ── */}
      {submitted && (
        <section className="pb-16">
          <div className="container-xl space-y-8 max-w-4xl mx-auto">

            {/* Order details card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Order Number</p>
                <p className="text-2xl font-black text-gray-900">{displayOrderId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Placed On</p>
                <p className="text-base font-semibold text-gray-800">June 12, 2026</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Est. Delivery</p>
                <p className="text-base font-semibold text-gray-800">June 16, 2026</p>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                  <Truck size={14} />
                  In Transit
                </span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-8">Shipment Progress</h3>

              {/* Desktop: horizontal */}
              <div className="hidden md:block">
                <div className="relative flex items-start justify-between">
                  {/* Background connecting line */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
                  {/* Completed line overlay — covers first 3.5 steps out of 6 */}
                  <div className="absolute top-5 left-0 h-0.5 bg-green-500" style={{ width: '58.33%' }} />

                  {steps.map((step) => (
                    <div key={step.id} className="relative flex flex-col items-center flex-1 px-1">
                      {/* Dot */}
                      <div className="relative z-10 mb-3">
                        {step.status === 'done' && (
                          <CheckCircle2 size={40} className="text-green-500 bg-white rounded-full" />
                        )}
                        {step.status === 'active' && (
                          <div className="relative">
                            <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60" />
                            <div className="relative w-10 h-10 rounded-full bg-blue-600 border-4 border-white shadow-md flex items-center justify-center">
                              <Truck size={18} className="text-white" />
                            </div>
                          </div>
                        )}
                        {step.status === 'pending' && (
                          <Circle size={40} className="text-gray-300 bg-white rounded-full" />
                        )}
                      </div>
                      {/* Label */}
                      <p className={`text-xs font-bold text-center leading-tight mb-1 ${
                        step.status === 'done' ? 'text-green-700' :
                        step.status === 'active' ? 'text-blue-700' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      {step.detail && (
                        <p className="text-[10px] text-blue-600 font-semibold text-center">{step.detail}</p>
                      )}
                      <p className="text-[10px] text-gray-400 text-center mt-0.5">{step.timestamp}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile: vertical */}
              <div className="md:hidden relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {steps.map((step, i) => (
                    <div key={step.id} className="relative flex gap-4 items-start">
                      {/* Dot */}
                      <div className="relative z-10 flex-shrink-0">
                        {step.status === 'done' && (
                          <CheckCircle2 size={36} className="text-green-500 bg-white" />
                        )}
                        {step.status === 'active' && (
                          <div className="relative">
                            <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-60" />
                            <div className="relative w-9 h-9 rounded-full bg-blue-600 border-4 border-white shadow flex items-center justify-center">
                              <Truck size={16} className="text-white" />
                            </div>
                          </div>
                        )}
                        {step.status === 'pending' && (
                          <Circle size={36} className="text-gray-300 bg-white" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pt-1">
                        <p className={`font-bold text-sm ${
                          step.status === 'done' ? 'text-green-700' :
                          step.status === 'active' ? 'text-blue-700' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </p>
                        {step.detail && (
                          <p className="text-xs text-blue-600 font-semibold mt-0.5">{step.detail}</p>
                        )}
                        <p className="text-xs text-gray-400 mt-0.5">{step.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Items in order */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Package size={20} className="text-blue-600" />
                Items in This Order
              </h3>
              <div className="space-y-4">
                {orderItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm leading-snug">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm flex-shrink-0">{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <p className="text-sm text-gray-500">Need help with your order?</p>
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 hover:border-blue-500 hover:text-blue-600 text-gray-700 text-sm font-semibold rounded-xl transition-colors"
                >
                  <MessageCircle size={16} />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Trust badges ── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{label}</p>
                  <p className="text-xs text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

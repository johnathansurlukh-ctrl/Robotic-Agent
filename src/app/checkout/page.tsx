'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  CheckCircle, CreditCard, Smartphone, Package, Truck, Zap, Tag,
  Lock, ArrowLeft, MapPin, Shield, ChevronRight, Banknote, Globe,
  Building2, Wallet, X, Info,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useCurrency } from '@/context/CurrencyContext'
import { applyCoupon, getPaymentMethods, type PaymentMethod } from '@/lib/currency'

// ─── helpers ────────────────────────────────────────────────────────────────
function addBusinessDays(days: number): Date {
  const d = new Date()
  let added = 0
  while (added < days) {
    d.setDate(d.getDate() + 1)
    if (d.getDay() !== 0 && d.getDay() !== 6) added++
  }
  return d
}
function fmtDate(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}
function formatCard(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(val: string) {
  const digits = val.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard Delivery', sub: '5–7 business days', minDays: 5, maxDays: 7, inrPrice: 0,   icon: Package },
  { id: 'express',  label: 'Express Delivery',  sub: '2–3 business days', minDays: 2, maxDays: 3, inrPrice: 199, icon: Truck },
  { id: 'nextday',  label: 'Next Day Delivery',  sub: '1 business day',   minDays: 1, maxDays: 1, inrPrice: 499, icon: Zap },
]

const METHOD_META: Record<PaymentMethod, { label: string; icon: React.ElementType; color: string }> = {
  upi:        { label: 'UPI',             icon: Smartphone,  color: 'bg-purple-50 border-purple-200 text-purple-700' },
  card:       { label: 'Credit / Debit Card', icon: CreditCard, color: 'bg-blue-50 border-blue-200 text-blue-700' },
  netbanking: { label: 'Net Banking',     icon: Building2,   color: 'bg-green-50 border-green-200 text-green-700' },
  cod:        { label: 'Cash on Delivery',icon: Banknote,    color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
  paypal:     { label: 'PayPal',          icon: Globe,       color: 'bg-sky-50 border-sky-200 text-sky-700' },
  cashapp:    { label: 'Cash App',        icon: Wallet,      color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
}

const BANKS = ['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'PNB', 'Bank of Baroda', 'Canara Bank']

// ─── component ───────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { fmt, currency, country, loading: locLoading } = useCurrency()

  const [step, setStep] = useState(1)
  const [orderRef] = useState(() => `RK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)

  // Step 1 state
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    line1: '', line2: '', city: '', state: '', zip: '', country: 'India',
    delivery: 'standard',
  })

  // Step 2 state
  const [payMethod, setPayMethod] = useState<PaymentMethod>('card')
  const [cardNum, setCardNum] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [upiId, setUpiId] = useState('')
  const [bank, setBank] = useState(BANKS[0])
  const [couponInput, setCouponInput] = useState('')
  const [couponResult, setCouponResult] = useState<{ discount: number; label: string; code: string } | null>(null)
  const [couponError, setCouponError] = useState('')

  // Computed
  const deliveryOpt = DELIVERY_OPTIONS.find(d => d.id === form.delivery)!
  const shippingINR = totalPrice >= 999 && form.delivery === 'standard' ? 0 : deliveryOpt.inrPrice
  const discountINR = couponResult?.discount ?? 0
  const grandTotalINR = totalPrice + shippingINR - discountINR
  const availableMethods = getPaymentMethods(country)
  const estimatedDate = `${fmtDate(addBusinessDays(deliveryOpt.minDays))}${
    deliveryOpt.minDays !== deliveryOpt.maxDays ? ' – ' + fmtDate(addBusinessDays(deliveryOpt.maxDays)) : ''
  }`

  useEffect(() => {
    if (availableMethods.length > 0) setPayMethod(availableMethods[0])
  }, [country])

  function applyCode() {
    const result = applyCoupon(couponInput, totalPrice)
    if (result) {
      setCouponResult({ ...result, code: couponInput.toUpperCase() })
      setCouponError('')
    } else {
      setCouponResult(null)
      setCouponError('Invalid coupon or minimum order not met.')
    }
  }

  function validateStep1() {
    return form.fullName && form.email && form.phone && form.line1 && form.city && form.state && form.zip
  }

  function placeOrder() {
    setStep(3)
    clearCart()
  }

  // Empty cart guard
  if (!locLoading && items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add items before checking out.</p>
          <Link href="/shop" className="btn-primary">Browse Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top bar */}
      <div className="bg-[#0f2744] text-white">
        <div className="container-xl py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <Zap size={16} />
            </div>
            <span className="font-black text-lg">RoboKit</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Lock size={14} className="text-green-400" />
            Secure Checkout
          </div>
          <Link href="/shop" className="flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to shop
          </Link>
        </div>
      </div>

      {/* Step indicator */}
      {step < 3 && (
        <div className="bg-white border-b border-gray-100">
          <div className="container-xl py-4">
            <div className="flex items-center gap-3 justify-center">
              {[
                { n: 1, label: 'Delivery' },
                { n: 2, label: 'Payment' },
                { n: 3, label: 'Confirmed' },
              ].map(({ n, label }, i, arr) => (
                <div key={n} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                      step === n ? 'bg-blue-600 border-blue-600 text-white' :
                      step > n  ? 'bg-green-500 border-green-500 text-white' :
                      'border-gray-300 text-gray-400'
                    }`}>
                      {step > n ? <CheckCircle size={16} /> : n}
                    </div>
                    <span className={`text-sm font-semibold hidden sm:block ${step === n ? 'text-blue-600' : step > n ? 'text-green-600' : 'text-gray-400'}`}>{label}</span>
                  </div>
                  {i < arr.length - 1 && <div className={`w-12 h-0.5 ${step > n ? 'bg-green-400' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container-xl py-8">

        {/* ───────────── STEP 1: DELIVERY ───────────── */}
        {step === 1 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                  <MapPin size={18} className="text-blue-600" /> Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                    <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="John Doe" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                  <Package size={18} className="text-blue-600" /> Delivery Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address Line 1 *</label>
                    <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="House / Flat No., Street Name" value={form.line1} onChange={e => setForm({ ...form, line1: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address Line 2 <span className="font-normal text-gray-400">(optional)</span></label>
                    <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Apartment, Building, Landmark" value={form.line2} onChange={e => setForm({ ...form, line2: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">City *</label>
                    <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Mumbai" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">State / Province *</label>
                    <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Maharashtra" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">ZIP / Postal Code *</label>
                    <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="400001" value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country *</label>
                    <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-gray-50" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
                  </div>
                </div>
              </div>

              {/* Delivery options */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                  <Truck size={18} className="text-blue-600" /> Delivery Method
                </h2>
                <div className="space-y-3">
                  {DELIVERY_OPTIONS.map(opt => {
                    const Icon = opt.icon
                    const isFree = opt.id === 'standard' && totalPrice >= 999
                    const dispPrice = isFree ? 'Free' : fmt(opt.inrPrice) || 'Free'
                    return (
                      <label key={opt.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${form.delivery === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="delivery" value={opt.id} checked={form.delivery === opt.id} onChange={() => setForm({ ...form, delivery: opt.id })} className="hidden" />
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${form.delivery === opt.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">{opt.label}</div>
                          <div className="text-sm text-gray-500">{opt.sub}</div>
                          <div className="text-xs text-blue-600 font-semibold mt-0.5">
                            Arrives by {fmtDate(addBusinessDays(opt.maxDays))}
                          </div>
                        </div>
                        <div className={`font-black text-base ${isFree || opt.inrPrice === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                          {isFree ? 'FREE' : opt.inrPrice === 0 ? 'FREE' : fmt(opt.inrPrice)}
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={() => validateStep1() && setStep(2)}
                disabled={!validateStep1()}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl text-base transition-colors flex items-center justify-center gap-2"
              >
                Continue to Payment <ChevronRight size={18} />
              </button>
            </div>

            {/* Right: Mini order summary */}
            <OrderSummary items={items} totalINR={totalPrice} shippingINR={shippingINR} discountINR={0} fmt={fmt} currency={currency} compact />
          </div>
        )}

        {/* ───────────── STEP 2: PAYMENT ───────────── */}
        {step === 2 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery summary bar */}
              <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                  <div className="text-sm">
                    <span className="font-semibold text-gray-900">{form.fullName}</span>
                    <span className="text-gray-500 ml-2">{form.line1}, {form.city} {form.zip}</span>
                  </div>
                </div>
                <button onClick={() => setStep(1)} className="text-xs text-blue-600 font-semibold hover:text-blue-800">Change</button>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-center gap-3">
                <Truck size={16} className="text-blue-600" />
                <div className="text-sm">
                  <span className="font-bold text-blue-800">{deliveryOpt.label}</span>
                  <span className="text-blue-600 ml-2">· Estimated delivery: <strong>{estimatedDate}</strong></span>
                </div>
              </div>

              {/* Coupon */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Tag size={18} className="text-orange-500" /> Coupon Code
                </h2>
                <div className="flex gap-3">
                  <input
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 uppercase tracking-widest font-semibold"
                    placeholder="e.g. ROBO10"
                    value={couponInput}
                    onChange={e => { setCouponInput(e.target.value); setCouponError(''); setCouponResult(null) }}
                  />
                  <button onClick={applyCode} className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-colors">Apply</button>
                </div>
                {couponResult && (
                  <div className="mt-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{couponResult.label} — saving {fmt(couponResult.discount)}</span>
                    <button onClick={() => { setCouponResult(null); setCouponInput('') }} className="ml-auto text-gray-400 hover:text-red-500">
                      <X size={16} />
                    </button>
                  </div>
                )}
                {couponError && <p className="mt-2 text-sm text-red-500">{couponError}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {['ROBO10', 'SCHOOL20', 'FIRST15', 'SAVE100'].map(c => (
                    <button key={c} onClick={() => { setCouponInput(c); setCouponResult(null); setCouponError('') }} className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-600 text-gray-600 rounded-lg font-semibold transition-colors">
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h2 className="text-lg font-black text-gray-900 mb-5 flex items-center gap-2">
                  <CreditCard size={18} className="text-blue-600" /> Payment Method
                </h2>

                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {availableMethods.map(m => {
                    const meta = METHOD_META[m]
                    const Icon = meta.icon
                    return (
                      <label key={m} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === m ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                        <input type="radio" name="paymethod" value={m} checked={payMethod === m} onChange={() => setPayMethod(m)} className="hidden" />
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border ${payMethod === m ? 'bg-blue-600 border-blue-600 text-white' : meta.color}`}>
                          <Icon size={18} />
                        </div>
                        <span className={`font-semibold text-sm ${payMethod === m ? 'text-blue-700' : 'text-gray-700'}`}>{meta.label}</span>
                        {payMethod === m && <CheckCircle size={16} className="ml-auto text-blue-600" />}
                      </label>
                    )
                  })}
                </div>

                {/* Card form */}
                {payMethod === 'card' && (
                  <div className="space-y-4 p-5 bg-gray-50 rounded-2xl border border-gray-200">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
                      <div className="relative">
                        <input
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-mono tracking-widest bg-white pr-14"
                          placeholder="1234 5678 9012 3456"
                          value={cardNum}
                          onChange={e => setCardNum(formatCard(e.target.value))}
                          maxLength={19}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                          <div className="w-6 h-4 bg-red-500 rounded-sm opacity-70" />
                          <div className="w-6 h-4 bg-yellow-400 rounded-sm opacity-70 -ml-3" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cardholder Name</label>
                      <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white" placeholder="Name on card" value={cardName} onChange={e => setCardName(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                        <input className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white" placeholder="MM/YY" value={cardExp} onChange={e => setCardExp(formatExpiry(e.target.value))} maxLength={5} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
                        <input type="password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 bg-white" placeholder="•••" maxLength={4} value={cardCvv} onChange={e => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                      <Lock size={12} className="text-green-500" />
                      Your card details are encrypted and never stored.
                    </div>
                  </div>
                )}

                {/* PayPal */}
                {payMethod === 'paypal' && (
                  <div className="p-5 bg-sky-50 rounded-2xl border border-sky-200 text-center">
                    <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Globe size={30} className="text-white" />
                    </div>
                    <p className="text-sm text-sky-800 font-medium mb-4">You will be redirected to PayPal to complete your payment securely.</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-sky-200 text-sky-700 text-sm font-semibold">
                      <Lock size={14} /> SSL Secured · PayPal Buyer Protection
                    </div>
                  </div>
                )}

                {/* Cash App */}
                {payMethod === 'cashapp' && (
                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center">
                        <Wallet size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-emerald-900">Pay via Cash App</div>
                        <div className="text-sm text-emerald-700">Send to our $cashtag after placing order</div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl border border-emerald-200 p-4 text-center mb-3">
                      <div className="text-2xl font-black text-emerald-700">$RoboKitStore</div>
                      <div className="text-sm text-gray-500 mt-1">Cash App $cashtag</div>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-emerald-700 bg-emerald-100 p-3 rounded-xl">
                      <Info size={14} className="flex-shrink-0 mt-0.5" />
                      Please include your order number <strong className="ml-1">{orderRef}</strong> in the Cash App note. Order ships after payment confirmation.
                    </div>
                  </div>
                )}

                {/* UPI */}
                {payMethod === 'upi' && (
                  <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Enter UPI ID</label>
                      <input
                        className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-900 bg-white"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={e => setUpiId(e.target.value)}
                      />
                    </div>
                    <div className="text-center text-sm text-gray-500">— or scan QR code —</div>
                    <div className="flex justify-center">
                      <div className="w-36 h-36 bg-white rounded-xl border-2 border-dashed border-purple-300 flex items-center justify-center text-purple-400 text-xs text-center p-2">
                        QR Code<br />(demo)
                      </div>
                    </div>
                    <div className="text-xs text-center text-gray-400">Accepted: GPay · PhonePe · Paytm · BHIM</div>
                  </div>
                )}

                {/* Net Banking */}
                {payMethod === 'netbanking' && (
                  <div className="p-5 bg-green-50 rounded-2xl border border-green-200 space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Select Your Bank</label>
                      <select className="w-full px-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-900 bg-white" value={bank} onChange={e => setBank(e.target.value)}>
                        {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <p className="text-sm text-green-800">You will be redirected to {bank}'s secure net banking portal to complete payment.</p>
                  </div>
                )}

                {/* COD */}
                {payMethod === 'cod' && (
                  <div className="p-5 bg-yellow-50 rounded-2xl border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <Banknote size={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-yellow-900 mb-1">Cash on Delivery</div>
                        <p className="text-sm text-yellow-800">Pay in cash when your order arrives. Please keep the exact amount ready.</p>
                        <div className="mt-3 p-3 bg-yellow-100 rounded-xl text-sm font-bold text-yellow-900">
                          Amount to pay: {fmt(grandTotalINR)}
                          <span className="ml-1 font-normal text-yellow-700">+ ₹30 COD fee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 px-6 py-4 border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={placeOrder} className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-base transition-colors flex items-center justify-center gap-2">
                  <Lock size={16} /> Place Order — {fmt(grandTotalINR + (payMethod === 'cod' ? 30 : 0))}
                </button>
              </div>
            </div>

            {/* Right: Order summary */}
            <OrderSummary
              items={items}
              totalINR={totalPrice}
              shippingINR={shippingINR}
              discountINR={discountINR}
              fmt={fmt}
              currency={currency}
            />
          </div>
        )}

        {/* ───────────── STEP 3: CONFIRMATION ───────────── */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
              {/* Success header */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-8 py-12 text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={44} className="text-white" />
                </div>
                <h1 className="text-3xl font-black mb-2">Order Confirmed!</h1>
                <p className="text-green-100 text-lg">Thank you, your order has been placed successfully.</p>
                <div className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 rounded-full text-sm font-bold">
                  Order #{orderRef}
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Delivery info */}
                <div className="flex items-start gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-200">
                  <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-0.5">Estimated Delivery</div>
                    <div className="text-blue-600 font-black text-lg">{estimatedDate}</div>
                    <div className="text-sm text-gray-500 mt-1">{deliveryOpt.label} to {form.line1}, {form.city}</div>
                  </div>
                </div>

                {/* Delivery address */}
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <MapPin size={16} className="text-gray-500" /> Shipping to
                  </div>
                  <div className="text-gray-700 text-sm leading-relaxed">
                    <div className="font-semibold">{form.fullName}</div>
                    <div>{form.line1}{form.line2 ? `, ${form.line2}` : ''}</div>
                    <div>{form.city}, {form.state} {form.zip}</div>
                    <div>{form.country}</div>
                    <div className="text-gray-500 mt-1">{form.phone} · {form.email}</div>
                  </div>
                </div>

                {/* Payment method */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <div className="text-sm font-semibold text-gray-700">Payment via {METHOD_META[payMethod].label}</div>
                  <div className="font-black text-gray-900">{fmt(grandTotalINR)}</div>
                </div>

                {/* Confirmation email notice */}
                <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-2xl text-sm">
                  <Info size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <div className="text-orange-800">
                    A confirmation email has been sent to <strong>{form.email}</strong>. Track your order using <strong>{orderRef}</strong>.
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/" className="flex-1 text-center py-3.5 border border-gray-200 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                    Continue Shopping
                  </Link>
                  <Link href="/support" className="flex-1 text-center py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Shield size={16} /> Track / Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Order Summary sidebar ───────────────────────────────────────────────────
function OrderSummary({
  items, totalINR, shippingINR, discountINR, fmt, currency, compact,
}: {
  items: { id: string; name: string; price: number; image: string; slug: string; quantity: number }[]
  totalINR: number
  shippingINR: number
  discountINR: number
  fmt: (n: number) => string
  currency: string
  compact?: boolean
}) {
  const grandTotal = totalINR + shippingINR - discountINR
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-24 h-fit">
      <h3 className="font-black text-gray-900 mb-4">
        Order Summary <span className="text-gray-400 font-normal text-sm">({items.length} item{items.length > 1 ? 's' : ''})</span>
      </h3>

      <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
        {items.map(item => (
          <div key={item.id} className="flex gap-3 items-center">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
              <img referrerPolicy="no-referrer" src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-800 line-clamp-1">{item.name}</div>
              <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
            </div>
            <div className="text-sm font-bold text-gray-900 flex-shrink-0">{fmt(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-100 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span><span className="font-semibold">{fmt(totalINR)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className={`font-semibold ${shippingINR === 0 ? 'text-green-600' : ''}`}>
            {shippingINR === 0 ? 'Free' : fmt(shippingINR)}
          </span>
        </div>
        {discountINR > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon discount</span><span className="font-semibold">−{fmt(discountINR)}</span>
          </div>
        )}
        {currency !== 'INR' && (
          <div className="text-xs text-gray-400 flex items-center gap-1 pt-1">
            <Info size={11} /> Prices shown in {currency}. All amounts based on live rates.
          </div>
        )}
        <div className="flex justify-between text-gray-900 font-black text-base pt-2 border-t border-gray-100">
          <span>Total</span><span>{fmt(grandTotal)}</span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 text-xs text-gray-400 border-t border-gray-100 pt-4">
        <Shield size={13} className="text-green-500" />
        Secured by 256-bit SSL encryption
      </div>
    </div>
  )
}

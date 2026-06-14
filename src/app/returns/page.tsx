import type { Metadata } from 'next'
import { CheckCircle, XCircle, MessageCircle, RefreshCw, Package, Banknote } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Returns & Refund Policy',
  description: '7-day hassle-free returns on all eligible products. Learn how to initiate a return and get your refund.',
}

const steps = [
  {
    icon: MessageCircle,
    step: '01',
    title: 'Contact Us',
    desc: 'Reach out within 7 days of delivery via WhatsApp (+91 98765 43210) or email (support@robokit.in) with your order number and reason for return.',
  },
  {
    icon: Package,
    step: '02',
    title: 'Ship It Back',
    desc: 'We\'ll share a return address. Pack the item securely in its original packaging. Courier charges for returns are borne by the customer unless the product is defective.',
  },
  {
    icon: Banknote,
    step: '03',
    title: 'Get Your Refund',
    desc: 'Once we receive and inspect the item (usually 1-2 business days), your refund is processed within 3-5 business days back to the original payment method.',
  },
]

const covered = [
  'Dead-on-arrival (DOA) or defective products',
  'Wrong item delivered',
  'Item significantly different from description',
  'Damaged in transit (with unboxing video evidence)',
  'Missing components from a kit',
]

const notCovered = [
  'Products damaged by misuse, wrong wiring, or reverse polarity',
  'Items returned after 7 days of delivery',
  'Products without original packaging',
  'Software / downloadable content',
  'Custom or made-to-order items',
  'Products showing signs of burn, water damage, or physical abuse',
]

export default function ReturnsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="bg-[#0f2744] py-14 px-4 text-center">
        <div className="container-xl max-w-3xl mx-auto">
          <RefreshCw size={40} className="text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-black text-white mb-3">Returns &amp; Refund Policy</h1>
          <p className="text-gray-300 text-base">
            We stand behind every product we sell. If something&apos;s not right, we&apos;ll make it right.
          </p>
          <div className="mt-5 inline-block px-5 py-2 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 font-semibold text-sm">
            7-Day Hassle-Free Returns
          </div>
        </div>
      </section>

      <div className="container-xl max-w-4xl mx-auto py-14 px-4 space-y-12">

        {/* Return window callout */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <p className="text-2xl font-black text-blue-800 mb-1">7-Day Return Window</p>
          <p className="text-blue-700 text-sm">
            You have <strong>7 calendar days</strong> from the date of delivery to request a return.
            Beyond this window, we are unable to accept returns.
          </p>
        </div>

        {/* How it works */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-7 text-center">How the Return Process Works</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl font-black text-gray-100">{step}</span>
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-blue-600" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's covered / not covered */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-7 text-center">What&apos;s Covered</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600" /> Eligible for Return / Refund
              </h3>
              <ul className="space-y-2">
                {covered.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-900">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
              <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                <XCircle size={18} className="text-red-500" /> Not Eligible for Return
              </h3>
              <ul className="space-y-2">
                {notCovered.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-red-900">
                    <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Refund timeline */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-black text-gray-900 mb-4">Refund Timeline</h2>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-gray-500 flex-shrink-0">UPI / Wallet</span>
              <span>1–3 business days after approval</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-gray-500 flex-shrink-0">Debit / Credit Card</span>
              <span>3–5 business days after approval</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-gray-500 flex-shrink-0">Net Banking</span>
              <span>3–5 business days after approval</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-28 font-semibold text-gray-500 flex-shrink-0">COD Orders</span>
              <span>Refunded via bank transfer within 5–7 business days</span>
            </div>
          </div>
        </div>

        {/* Contact for returns */}
        <div className="bg-[#0f2744] rounded-2xl p-7 text-center text-white">
          <MessageCircle size={32} className="text-green-400 mx-auto mb-3" />
          <h2 className="text-xl font-black mb-2">Need to Start a Return?</h2>
          <p className="text-gray-300 text-sm mb-5">The fastest way is to message us on WhatsApp with your order number and photos.</p>
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20initiate%20a%20return%20for%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <MessageCircle size={18} /> WhatsApp Us for Returns
          </a>
          <p className="text-gray-400 text-xs mt-4">Or email: support@robokit.in · Mon–Sat, 10am–7pm IST</p>
        </div>

      </div>
    </div>
  )
}

import Link from 'next/link'
import { MessageCircle, Mail, Package, RefreshCw, Shield, AlertCircle, ChevronRight, Phone, Search } from 'lucide-react'

const categories = [
  { icon: '🤖', title: 'My robot is not moving', href: '#' },
  { icon: '📡', title: 'Sensor values are wrong', href: '#' },
  { icon: '💻', title: 'Code is not uploading', href: '#' },
  { icon: '🔥', title: 'Motor driver heating up', href: '#' },
  { icon: '🔋', title: 'Battery not working', href: '#' },
  { icon: '📱', title: 'Bluetooth not connecting', href: '#' },
  { icon: '📶', title: 'ESP32 not connecting to WiFi', href: '#' },
  { icon: '📦', title: 'Product damaged in shipping', href: '#' },
  { icon: '🔩', title: 'Missing part in kit', href: '#' },
]

const faqs = [
  { q: 'How do I track my order?', a: 'You will receive a tracking link via WhatsApp and email once your order is shipped. Orders are typically shipped within 24 hours.' },
  { q: 'What is your return policy?', a: 'We accept returns within 7 days of delivery for unopened products. Defective products can be returned within 30 days. Contact us on WhatsApp for return processing.' },
  { q: 'Do you provide warranty?', a: 'Yes. Most products come with 3–12 months warranty. Check the product page for specific warranty terms. Defective products are replaced within 48 hours.' },
  { q: 'Can I get a tax invoice for my order?', a: 'Yes! Select "Request Tax Invoice" during checkout or contact us on WhatsApp with your order number and GSTIN.' },
  { q: 'Do you ship outside India?', a: 'Currently we ship within India only. International shipping is coming soon.' },
  { q: 'What if a component in my kit is missing?', a: 'Contact us immediately via WhatsApp with your order number and a photo. We will send the missing component within 2 business days at no charge.' },
]

export default function SupportPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0f2744] text-white py-12">
        <div className="container-xl">
          <h1 className="text-4xl font-black mb-3">Support Center</h1>
          <p className="text-gray-300 mb-6">Get help with your order, products, and projects. We&apos;re here to help.</p>
          <div className="relative max-w-lg">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search for help..." className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        {/* Contact options */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {[
            { icon: MessageCircle, color: 'bg-green-500', title: 'WhatsApp Support', desc: 'Fastest response. Typical reply: under 30 minutes.', action: 'Chat Now', href: 'https://wa.me/919876543210' },
            { icon: Mail, color: 'bg-blue-500', title: 'Email Support', desc: 'For detailed queries. Response within 24 hours.', action: 'Send Email', href: 'mailto:support@robokit.in' },
            { icon: Phone, color: 'bg-purple-500', title: 'Call Us', desc: 'Mon–Sat, 9am–6pm IST.', action: 'Call Now', href: 'tel:+919876543210' },
          ].map(({ icon: Icon, color, title, desc, action, href }) => (
            <a key={title} href={href} className="card p-6 flex items-start gap-4 hover:-translate-y-1">
              <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">{desc}</p>
                <span className="text-sm font-semibold text-blue-600">{action} →</span>
              </div>
            </a>
          ))}
        </div>

        {/* Quick issue categories */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Common Issues</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <Link key={cat.title} href={cat.href} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{cat.title}</span>
                <ChevronRight size={14} className="text-gray-300 ml-auto flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Package, title: 'Track Order', desc: 'Enter your order ID', href: '#' },
            { icon: Shield, title: 'Warranty Claim', desc: 'Submit a warranty request', href: '#' },
            { icon: RefreshCw, title: 'Return / Replacement', desc: 'Start a return process', href: '#' },
            { icon: AlertCircle, title: 'Missing Part', desc: 'Report a missing component', href: '#' },
          ].map(({ icon: Icon, title, desc, href }) => (
            <Link key={title} href={href} className="card p-4 text-center group hover:-translate-y-1">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon size={20} className="text-blue-600" />
              </div>
              <div className="font-bold text-sm text-gray-900 group-hover:text-blue-600 transition-colors">{title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
            </Link>
          ))}
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group">
                <summary className="px-6 py-4 text-sm font-semibold text-gray-800 cursor-pointer flex items-center justify-between hover:bg-gray-50 list-none">
                  {q}
                  <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

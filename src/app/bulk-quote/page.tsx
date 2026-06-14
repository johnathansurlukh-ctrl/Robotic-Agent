'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FileText, Download, Phone, CheckCircle, Users, Award, Truck, Shield, AlertCircle, PartyPopper } from 'lucide-react'

interface FormData {
  name: string
  institution: string
  department: string
  city: string
  email: string
  phone: string
  requirementType: string
  students: string
  budget: string
  notes: string
  needWorkshop: boolean
  needInvoice: boolean
  needInstallation: boolean
}

const EMPTY: FormData = {
  name: '', institution: '', department: '', city: '', email: '', phone: '',
  requirementType: 'School Lab Setup', students: '',
  budget: '₹10,000 – ₹25,000', notes: '',
  needWorkshop: false, needInvoice: false, needInstallation: false,
}

export default function BulkQuotePage() {
  const [form, setForm] = useState<FormData>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(field: keyof FormData, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim())        e.name = 'Your name is required'
    if (!form.institution.trim()) e.institution = 'Institution name is required'
    if (!form.email.trim())       e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.phone.trim())       e.phone = 'Phone number is required'
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit phone number'
    if (!form.city.trim())        e.city = 'City is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    // Use requestAnimationFrame to ensure state update is flushed before showing success
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  function handleDownload() {
    const lines = [
      'RoboKit Product Catalogue 2025',
      '================================',
      '',
      'CATEGORIES:',
      '• Microcontrollers: Arduino Uno (₹349), Arduino Nano (₹299), ESP32 (₹449)',
      '• Sensors: Ultrasonic HC-SR04 (₹99), DHT11 (₹79), MPU6050 (₹199)',
      '• Motors: BO Motor (₹79), Servo SG90 (₹149), Stepper 28BYJ-48 (₹149)',
      '• Motor Drivers: L298N (₹149), L293D Shield (₹249)',
      '• Displays: LCD 16×2 (₹99), OLED 0.96" (₹199)',
      '• Power: Li-Po 1000mAh (₹299), 18650 Cell (₹199)',
      '• Kits: Line Follower (₹799), Obstacle Avoidance (₹999), Robotic Arm (₹2499)',
      '',
      'BULK PRICING:',
      '• 5–9 units:   10–15% off',
      '• 10–24 units: 20–25% off',
      '• 25+ units:   30–40% off',
      '',
      'CONTACT: support@robokit.in | +91 98765 43210',
      'WEBSITE: robokit.in | GST: 27AABCR1234A1Z5',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'RoboKit-Catalogue-2025.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const inputCls = (field: keyof FormData) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300 bg-red-50 dark:bg-red-950/30'
        : 'border-gray-200 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'
    }`

  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl border border-gray-200 p-10 max-w-lg w-full text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <PartyPopper size={36} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Request Submitted!</h2>
          <p className="text-gray-500 mb-6">
            Thanks, <strong>{form.name}</strong>! We&apos;ve received your bulk quote request for <strong>{form.institution}</strong>. Our team will send a custom quote to <strong>{form.email}</strong> within <strong>24 hours</strong>.
          </p>
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 text-left space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Your Request Summary</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Type:</span> {form.requirementType}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Students:</span> {form.students || 'Not specified'}</div>
            <div className="text-sm text-gray-700"><span className="font-semibold">Budget:</span> {form.budget}</div>
            {form.needInvoice && <div className="text-sm text-gray-700 flex items-center gap-1.5"><CheckCircle size={13} className="text-green-500" /> GST invoice requested</div>}
            {form.needWorkshop && <div className="text-sm text-gray-700 flex items-center gap-1.5"><CheckCircle size={13} className="text-green-500" /> Workshop facilitation requested</div>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm">
              <Phone size={16} /> WhatsApp for faster response
            </a>
            <Link href="/" className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0f2744] text-white py-12">
        <div className="container-xl">
          <h1 className="text-4xl font-black mb-3">Request Bulk Quote</h1>
          <p className="text-gray-300 max-w-xl">Up to 40% off for schools, colleges, and clubs. Tax invoice provided. Dedicated support for bulk orders.</p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Request a Quotation</h2>
            <p className="text-sm text-gray-500 mb-6">Fill in your requirements and we&apos;ll send a custom quote within 24 hours.</p>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                  placeholder="Your name" className={inputCls('name')} />
                {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.name}</p>}
              </div>

              {/* Institution */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Institution Name *</label>
                <input type="text" value={form.institution} onChange={e => set('institution', e.target.value)}
                  placeholder="School / College name" className={inputCls('institution')} />
                {errors.institution && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.institution}</p>}
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department</label>
                <input type="text" value={form.department} onChange={e => set('department', e.target.value)}
                  placeholder="ECE / Robotics / Mechatronics" className={inputCls('department')} />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">City *</label>
                <input type="text" value={form.city} onChange={e => set('city', e.target.value)}
                  placeholder="City" className={inputCls('city')} />
                {errors.city && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.city}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                  placeholder="email@institution.edu" className={inputCls('email')} />
                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                  placeholder="+91 XXXXX XXXXX" className={inputCls('phone')} />
                {errors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{errors.phone}</p>}
              </div>

              {/* Requirement Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Requirement Type</label>
                <select value={form.requirementType} onChange={e => set('requirementType', e.target.value)}
                  className={inputCls('requirementType')}>
                  <option>School Lab Setup</option>
                  <option>Engineering College Lab</option>
                  <option>Robotics Club</option>
                  <option>Workshop / Event</option>
                  <option>Bulk Components</option>
                  <option>Atal Tinkering Lab</option>
                </select>
              </div>

              {/* Students */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of Students</label>
                <input type="number" min="1" value={form.students} onChange={e => set('students', e.target.value)}
                  placeholder="e.g. 30" className={inputCls('students')} />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Budget Range</label>
                <select value={form.budget} onChange={e => set('budget', e.target.value)}
                  className={inputCls('budget')}>
                  <option>Under ₹10,000</option>
                  <option>₹10,000 – ₹25,000</option>
                  <option>₹25,000 – ₹50,000</option>
                  <option>₹50,000 – ₹1,00,000</option>
                  <option>₹1,00,000 – ₹5,00,000</option>
                  <option>₹5,00,000+</option>
                </select>
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Requirements</label>
                <textarea rows={4} value={form.notes} onChange={e => set('notes', e.target.value)}
                  placeholder="Describe your requirements, specific components needed, delivery timeline, etc."
                  className={`${inputCls('notes')} resize-none`} />
              </div>

              {/* Checkboxes */}
              <div className="md:col-span-2 flex flex-wrap gap-5">
                {([
                  { field: 'needWorkshop' as const, label: 'Need workshop facilitation?' },
                  { field: 'needInvoice' as const, label: 'Need tax invoice?' },
                  { field: 'needInstallation' as const, label: 'Need installation support?' },
                ]).map(({ field, label }) => (
                  <label key={field} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={form[field] as boolean} onChange={e => set(field, e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 accent-blue-600" />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors">
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting…
                  </>
                ) : (
                  <><FileText size={18} /> Submit Request</>
                )}
              </button>
              <button type="button" onClick={handleDownload}
                className="inline-flex items-center gap-2 px-8 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                <Download size={18} /> Download Catalogue
              </button>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors">
                <Phone size={18} /> WhatsApp Us
              </a>
            </div>
          </form>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Why Buy Bulk from RoboKit?</h3>
              <div className="space-y-3">
                {[
                  { icon: Award, text: 'Up to 40% bulk discount on orders above 5 units' },
                  { icon: Shield, text: 'GST invoice for institutional reimbursement' },
                  { icon: Truck, text: 'Fast delivery within 2–4 business days' },
                  { icon: Users, text: 'Dedicated support for institutional accounts' },
                  { icon: CheckCircle, text: 'Warranty on all eligible products' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <Icon size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-3">Bulk Pricing Tiers</h3>
              <div className="space-y-2 text-sm">
                {[
                  { qty: '5–9 units', disc: '10–15% off' },
                  { qty: '10–24 units', disc: '20–25% off' },
                  { qty: '25+ units', disc: '30–40% off' },
                ].map(({ qty, disc }) => (
                  <div key={qty} className="flex items-center justify-between py-1.5 border-b border-blue-100 last:border-0">
                    <span className="text-gray-700">{qty}</span>
                    <span className="font-bold text-green-600">{disc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 text-sm">
              <div className="font-bold text-gray-900 mb-1">Typical response time</div>
              <div className="text-green-700 font-semibold text-lg">Within 24 hours</div>
              <div className="text-gray-500 mt-2">Or WhatsApp us directly for immediate assistance.</div>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                className="mt-3 flex items-center gap-2 text-green-700 font-semibold hover:text-green-900 transition-colors">
                <Phone size={14} /> +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

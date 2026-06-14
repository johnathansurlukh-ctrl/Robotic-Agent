'use client'
import { useState } from 'react'
import Link from 'next/link'
import { School, Building2, CheckCircle, Users, FileText, Phone, Download, Award, Truck, Shield, AlertCircle, PartyPopper, Calendar, Clock } from 'lucide-react'

const schoolPackages = [
  { name: 'Robotics Lab Starter Pack', students: 10, price: '₹12,999', badge: 'Most Popular', includes: ['10× Basic robotics kits', 'Teacher guide PDF', 'Spare parts', 'Setup support'] },
  { name: '10-Student Classroom Kit', students: 10, price: '₹18,499', badge: 'Recommended', includes: ['10× Line follower kits', '10× Obstacle avoidance kits', 'Instructor manual', 'WhatsApp support'] },
  { name: '25-Student Robotics Kit', students: 25, price: '₹39,999', badge: 'Best Value', includes: ['25× Complete robotics kits', 'Teacher resources', 'Workshop facilitation guide', 'Dedicated support'] },
  { name: 'School Competition Kit', students: 5, price: '₹8,999', badge: 'Competition', includes: ['5× Competition robot kits', 'Competition rulebook guide', 'High-performance motors', 'Spare parts pack'] },
]

const collegePackages = [
  { name: 'First-Year Robotics Starter', students: 30, price: '₹24,999', includes: ['30× Arduino starter kits', 'Sensor lab components', 'Motor control kits', 'Lab manual PDF'] },
  { name: 'Mechatronics Lab Kit', students: 20, price: '₹34,999', includes: ['20× Mechatronics project kits', 'Servo and stepper motors', 'Motor drivers and sensors', 'Circuit diagram booklet'] },
  { name: 'Embedded Systems Lab Kit', students: 20, price: '₹29,999', includes: ['20× ESP32 development boards', 'IoT sensor modules', 'Communication modules', 'Project guide'] },
  { name: 'Final-Year Project Kit', students: 5, price: '₹14,999', includes: ['5× Advanced project components', 'Raspberry Pi boards', 'AI / Vision hardware', 'Documentation templates'] },
]

const TIME_SLOTS = ['9:00 AM – 10:00 AM', '10:00 AM – 11:00 AM', '11:00 AM – 12:00 PM', '2:00 PM – 3:00 PM', '3:00 PM – 4:00 PM', '4:00 PM – 5:00 PM']

interface QuoteForm { name: string; institution: string; department: string; city: string; email: string; phone: string; requirement: string; students: string; budget: string; notes: string; needWorkshop: boolean; needInvoice: boolean }
interface DemoForm { name: string; phone: string; institution: string; slot: string }

const EMPTY_QUOTE: QuoteForm = { name: '', institution: '', department: '', city: '', email: '', phone: '', requirement: 'School Lab Setup', students: '', budget: '₹10,000 – ₹25,000', notes: '', needWorkshop: false, needInvoice: false }
const EMPTY_DEMO: DemoForm = { name: '', phone: '', institution: '', slot: TIME_SLOTS[0] }

export default function SchoolsPage() {
  const [quote, setQuote] = useState<QuoteForm>(EMPTY_QUOTE)
  const [quoteErrors, setQuoteErrors] = useState<Partial<Record<keyof QuoteForm, string>>>({})
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)

  const [demo, setDemo] = useState<DemoForm>(EMPTY_DEMO)
  const [demoErrors, setDemoErrors] = useState<Partial<Record<keyof DemoForm, string>>>({})
  const [demoLoading, setDemoLoading] = useState(false)
  const [demoSubmitted, setDemoSubmitted] = useState(false)

  function setQ(field: keyof QuoteForm, value: string | boolean) {
    setQuote(prev => ({ ...prev, [field]: value }))
    setQuoteErrors(prev => ({ ...prev, [field]: undefined }))
  }
  function setD(field: keyof DemoForm, value: string) {
    setDemo(prev => ({ ...prev, [field]: value }))
    setDemoErrors(prev => ({ ...prev, [field]: undefined }))
  }

  function validateQuote(): boolean {
    const e: Partial<Record<keyof QuoteForm, string>> = {}
    if (!quote.name.trim()) e.name = 'Required'
    if (!quote.institution.trim()) e.institution = 'Required'
    if (!quote.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(quote.email)) e.email = 'Invalid email'
    if (!quote.phone.trim()) e.phone = 'Required'
    else if (quote.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter 10-digit number'
    if (!quote.city.trim()) e.city = 'Required'
    setQuoteErrors(e)
    return Object.keys(e).length === 0
  }
  function validateDemo(): boolean {
    const e: Partial<Record<keyof DemoForm, string>> = {}
    if (!demo.name.trim()) e.name = 'Required'
    if (!demo.phone.trim()) e.phone = 'Required'
    else if (demo.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter 10-digit number'
    if (!demo.institution.trim()) e.institution = 'Required'
    setDemoErrors(e)
    return Object.keys(e).length === 0
  }

  function handleQuoteSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateQuote()) return
    setQuoteLoading(true)
    setTimeout(() => { setQuoteLoading(false); setQuoteSubmitted(true) }, 800)
  }
  function handleDemoSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateDemo()) return
    setDemoLoading(true)
    setTimeout(() => { setDemoLoading(false); setDemoSubmitted(true) }, 800)
  }

  function handleDownload() {
    const lines = [
      'RoboKit Institutional Catalogue 2025', '====================================', '',
      'SCHOOL PACKAGES:', '• Robotics Lab Starter Pack (10 students): ₹12,999', '• 10-Student Classroom Kit: ₹18,499', '• 25-Student Robotics Kit: ₹39,999', '• School Competition Kit: ₹8,999', '',
      'COLLEGE PACKAGES:', '• First-Year Robotics Starter (30 students): ₹24,999', '• Mechatronics Lab Kit (20 students): ₹34,999', '• Embedded Systems Lab Kit (20 students): ₹29,999', '• Final-Year Project Kit (5 students): ₹14,999', '',
      'BULK DISCOUNTS:', '• 5–9 units: 10–15% off', '• 10–24 units: 20–25% off', '• 25+ units: 30–40% off', '',
      'CONTACT: support@robokit.in | +91 98765 43210', 'GST: 27AABCR1234A1Z5',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'RoboKit-Institutional-Catalogue-2025.txt'; a.click()
    URL.revokeObjectURL(url)
  }

  const iCls = (err?: string) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-colors ${err ? 'border-red-400 focus:ring-red-300 bg-red-50 dark:bg-red-950/30' : 'border-gray-200 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100'}`

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0f2744] text-white py-14">
        <div className="container-xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-4">
            <School size={14} /> For Institutions
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">Robotics Kits for Schools & Colleges</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">Bulk pricing, tax invoices, dedicated support, and complete lab setup packages. Over 200+ institutions trust RoboKit.</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#quote" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-colors text-base"><FileText size={18} /> Request Bulk Quote</a>
            <button onClick={handleDownload} className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-base"><Download size={18} /> Download Catalogue</button>
            <a href="#demo" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-base"><Phone size={18} /> Schedule Demo Call</a>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-white border-b border-gray-100 py-6">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Users, value: '200+', label: 'Institutions' },
              { icon: Award, value: '10,000+', label: 'Students' },
              { icon: Truck, value: '2–4 days', label: 'Delivery' },
              { icon: Shield, value: 'GST Invoice', label: 'Tax Invoice' },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-1">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <div className="text-xl font-black text-gray-900">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-12">
        {/* School packages */}
        <div id="schools" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
              <School size={26} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">School Lab Packages</h2>
              <p className="text-gray-500 text-sm">Class 6–12 · Robotics labs · Science clubs · ATL labs</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {schoolPackages.map((pkg) => (
              <div key={pkg.name} className="card p-5 relative">
                {pkg.badge && <span className="absolute -top-3 left-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">{pkg.badge}</span>}
                <div className="mt-2">
                  <div className="flex items-center gap-1.5 mb-1"><Users size={14} className="text-blue-400" /><span className="text-xs text-gray-400">Up to {pkg.students} students</span></div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="text-2xl font-black text-blue-600 mb-3">{pkg.price}</div>
                  <ul className="space-y-1.5 mb-5">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600"><CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" />{item}</li>
                    ))}
                  </ul>
                  <a href="#quote" className="block text-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">Request Quote</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* College packages */}
        <div id="colleges" className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center">
              <Building2 size={26} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900">Engineering College Packages</h2>
              <p className="text-gray-500 text-sm">Diploma · B.Tech · Mechatronics · Embedded Systems · AI labs</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {collegePackages.map((pkg) => (
              <div key={pkg.name} className="card p-5">
                <div className="flex items-center gap-1.5 mb-1"><Users size={14} className="text-purple-400" /><span className="text-xs text-gray-400">Up to {pkg.students} students</span></div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <div className="text-2xl font-black text-purple-600 mb-3">{pkg.price}</div>
                <ul className="space-y-1.5 mb-5">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray-600"><CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
                <a href="#quote" className="block text-center py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-xl transition-colors">Request Quote</a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quotation form ── */}
        <div id="quote" className="bg-white rounded-3xl border border-gray-200 p-8 mb-10">
          {quoteSubmitted ? (
            <div className="text-center py-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <PartyPopper size={36} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Quote Request Sent!</h2>
              <p className="text-gray-500 mb-6">Thanks, <strong>{quote.name}</strong>! We&apos;ll send a custom quote to <strong>{quote.email}</strong> within <strong>24 hours</strong>.</p>
              <div className="bg-blue-50 rounded-2xl p-4 text-left space-y-1.5 mb-6">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Summary</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Institution:</span> {quote.institution}</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Type:</span> {quote.requirement}</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Students:</span> {quote.students || 'Not specified'}</div>
                <div className="text-sm text-gray-700"><span className="font-semibold">Budget:</span> {quote.budget}</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm">
                  <Phone size={16} /> WhatsApp for faster reply
                </a>
                <button onClick={() => setQuoteSubmitted(false)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Request a Quotation</h2>
              <p className="text-gray-500 mb-6">Fill in your requirements and we&apos;ll send a custom quote within 24 hours.</p>
              <form onSubmit={handleQuoteSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                    <input type="text" value={quote.name} onChange={e => setQ('name', e.target.value)} placeholder="Full name" className={iCls(quoteErrors.name)} />
                    {quoteErrors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{quoteErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Institution Name *</label>
                    <input type="text" value={quote.institution} onChange={e => setQ('institution', e.target.value)} placeholder="School / College name" className={iCls(quoteErrors.institution)} />
                    {quoteErrors.institution && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{quoteErrors.institution}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Department</label>
                    <input type="text" value={quote.department} onChange={e => setQ('department', e.target.value)} placeholder="ECE / Robotics / Mechatronics" className={iCls()} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">City *</label>
                    <input type="text" value={quote.city} onChange={e => setQ('city', e.target.value)} placeholder="City" className={iCls(quoteErrors.city)} />
                    {quoteErrors.city && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{quoteErrors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input type="email" value={quote.email} onChange={e => setQ('email', e.target.value)} placeholder="your@email.com" className={iCls(quoteErrors.email)} />
                    {quoteErrors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{quoteErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                    <input type="tel" value={quote.phone} onChange={e => setQ('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={iCls(quoteErrors.phone)} />
                    {quoteErrors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{quoteErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Requirement Type</label>
                    <select value={quote.requirement} onChange={e => setQ('requirement', e.target.value)} className={iCls()}>
                      <option>School Lab Setup</option>
                      <option>Engineering College Lab</option>
                      <option>Robotics Club</option>
                      <option>Workshop / Event</option>
                      <option>Atal Tinkering Lab</option>
                      <option>Bulk Components</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of Students</label>
                    <input type="number" min="1" value={quote.students} onChange={e => setQ('students', e.target.value)} placeholder="e.g. 30" className={iCls()} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Budget Range</label>
                    <select value={quote.budget} onChange={e => setQ('budget', e.target.value)} className={iCls()}>
                      <option>Under ₹10,000</option>
                      <option>₹10,000 – ₹25,000</option>
                      <option>₹25,000 – ₹50,000</option>
                      <option>₹50,000 – ₹1,00,000</option>
                      <option>₹1,00,000 – ₹5,00,000</option>
                      <option>₹5,00,000+</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Requirements</label>
                    <textarea rows={3} value={quote.notes} onChange={e => setQ('notes', e.target.value)} placeholder="Describe what you need, specific components, delivery timeline, etc." className={`${iCls()} resize-none`} />
                  </div>
                  <div className="md:col-span-2 flex flex-wrap gap-5">
                    {([{ field: 'needWorkshop' as const, label: 'Need workshop facilitation?' }, { field: 'needInvoice' as const, label: 'Need tax invoice?' }]).map(({ field, label }) => (
                      <label key={field} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={quote[field] as boolean} onChange={e => setQ(field, e.target.checked)} className="w-4 h-4 accent-blue-600" />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="submit" disabled={quoteLoading}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors">
                    {quoteLoading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Submitting…</>) : (<><FileText size={18} />Submit Request</>)}
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
            </>
          )}
        </div>

        {/* ── Demo Call form ── */}
        <div id="demo" className="bg-white rounded-3xl border border-gray-200 p-8 mb-10">
          {demoSubmitted ? (
            <div className="text-center py-8 max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <Calendar size={36} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Demo Call Scheduled!</h2>
              <p className="text-gray-500 mb-6">
                Hi <strong>{demo.name}</strong>! We&apos;ll call you at <strong>{demo.phone}</strong> during your selected slot: <strong>{demo.slot}</strong>.
              </p>
              <div className="bg-blue-50 rounded-2xl p-4 text-left mb-6">
                <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">What to expect</div>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" />Live product demo over video call</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" />Custom quote based on your requirements</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" />Q&A with our education specialist</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-green-500" />30-minute session</li>
                </ul>
              </div>
              <button onClick={() => setDemoSubmitted(false)}
                className="py-3 px-8 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                Schedule another call
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Schedule a Demo Call</h2>
                  <p className="text-gray-500 text-sm">Book a free 30-minute call with our education specialist</p>
                </div>
              </div>
              <form onSubmit={handleDemoSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                    <input type="text" value={demo.name} onChange={e => setD('name', e.target.value)} placeholder="Full name" className={iCls(demoErrors.name)} />
                    {demoErrors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{demoErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                    <input type="tel" value={demo.phone} onChange={e => setD('phone', e.target.value)} placeholder="+91 XXXXX XXXXX" className={iCls(demoErrors.phone)} />
                    {demoErrors.phone && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{demoErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Institution Name *</label>
                    <input type="text" value={demo.institution} onChange={e => setD('institution', e.target.value)} placeholder="School / College name" className={iCls(demoErrors.institution)} />
                    {demoErrors.institution && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={11} />{demoErrors.institution}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Time Slot</label>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map(slot => (
                        <button key={slot} type="button" onClick={() => setD('slot', slot)}
                          className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-medium border transition-colors ${demo.slot === slot ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'}`}>
                          <Clock size={12} />{slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button type="submit" disabled={demoLoading}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors">
                    {demoLoading ? (<><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>Booking…</>) : (<><Calendar size={18} />Book Demo Call</>)}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#0f2744] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Users size={24} className="text-blue-400 flex-shrink-0" />
            <div className="text-white">
              <div className="font-bold">Bulk pricing available for 5+ units</div>
              <div className="text-sm text-gray-300">Up to 40% off for schools, colleges, and clubs</div>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a href="#quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl text-sm transition-colors">
              <FileText size={16} /> Request Quotation
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors">
              <Phone size={16} /> Schedule Demo Call
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

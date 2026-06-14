'use client'

import { useState, useEffect, useRef, useCallback, type FormEvent } from 'react'
import { X, Mail, BookOpen, Tag, Zap, CheckCircle2 } from 'lucide-react'

const STORAGE_KEY = 'rk_newsletter_dismissed'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const hasShown = useRef(false)

  const tryShow = useCallback(() => {
    if (hasShown.current) return
    try {
      if (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY)) return
    } catch {
      // localStorage unavailable
    }
    hasShown.current = true
    setVisible(true)
  }, [])

  useEffect(() => {
    // Trigger 1: 12-second delay
    const timer = setTimeout(tryShow, 12000)

    // Trigger 2: mouse leaves top of viewport (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) tryShow()
    }
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [tryShow])

  const dismiss = () => {
    setVisible(false)
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Close newsletter popup"
          className="absolute top-3 right-3 z-10 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Left panel */}
        <div className="bg-[#0f2744] text-white p-8 md:w-5/12 flex flex-col justify-center gap-6">
          <div>
            <div className="text-orange-400 text-sm font-semibold mb-2 uppercase tracking-wider">For Students &amp; Makers</div>
            <h2 className="text-2xl font-extrabold leading-snug">
              Join 10,000+<br />students learning<br />robotics
            </h2>
          </div>

          <ul className="space-y-3">
            {[
              { icon: <Zap size={16} className="text-orange-400 shrink-0" />, text: 'Early access to new kits &amp; products' },
              { icon: <Tag size={16} className="text-orange-400 shrink-0" />, text: 'Exclusive coupons for subscribers' },
              { icon: <BookOpen size={16} className="text-orange-400 shrink-0" />, text: 'Free project guides &amp; tutorials' },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-blue-100">
                {item.icon}
                <span dangerouslySetInnerHTML={{ __html: item.text }} />
              </li>
            ))}
          </ul>

          <div className="text-xs text-blue-300/70">
            No spam. Unsubscribe any time.
          </div>
        </div>

        {/* Right panel */}
        <div className="p-8 md:flex-1 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center py-4">
              <CheckCircle2 size={52} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0f2744] mb-2">You&apos;re in!</h3>
              <p className="text-gray-500 text-sm mb-4">Check your inbox for your welcome email.</p>
              <div className="bg-orange-50 border border-orange-200 rounded-xl px-5 py-3">
                <div className="text-xs text-orange-600 font-semibold uppercase tracking-wide mb-0.5">Your discount code</div>
                <div className="text-2xl font-extrabold text-orange-500 tracking-widest">WELCOME10</div>
                <div className="text-xs text-gray-400 mt-1">10% off your first order</div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
                  <Tag size={12} />
                  Get 10% off your first order
                </div>
                <h3 className="text-xl font-bold text-[#0f2744] mb-1">Subscribe &amp; Save</h3>
                <p className="text-gray-500 text-sm">
                  Enter your email to get an instant 10% discount coupon plus weekly robotics tips.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm"
                >
                  Get 10% Off
                </button>
              </form>

              <button
                onClick={dismiss}
                className="mt-4 w-full text-center text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                No thanks, I&apos;ll pay full price
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

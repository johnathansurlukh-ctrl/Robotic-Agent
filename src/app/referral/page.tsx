'use client'

import { useState } from 'react'
import { Copy, Check, Share2, Mail, MessageCircle, Gift, Users, IndianRupee, Clock, ChevronRight } from 'lucide-react'

const REFERRAL_LINK = 'https://robokit.in/ref/USER123'

export default function ReferralPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(REFERRAL_LINK)
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = REFERRAL_LINK
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const whatsappText = encodeURIComponent(
    `Hey! Use my referral link to buy robotics kits on RoboKit and save on your first order! ${REFERRAL_LINK}`
  )
  const emailSubject = encodeURIComponent('Check out RoboKit — Robotics kits for students!')
  const emailBody = encodeURIComponent(
    `Hi,\n\nI've been using RoboKit for my robotics projects and thought you'd love it too.\n\nUse my referral link: ${REFERRAL_LINK}\n\nYou get great kits and I earn ₹100 credit. Win-win!\n\nCheers`
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#0f2744] py-16 px-4">
        <div className="container-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
            <Gift size={15} />
            Referral Program
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Refer a Friend, Earn{' '}
            <span className="text-orange-500">₹100</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Share your unique link. When your friend places their first order above ₹500, you both win — they get great kits and you earn store credit.
          </p>
        </div>
      </section>

      <div className="container-xl mx-auto px-4 py-12 space-y-12">

        {/* How it works */}
        <section>
          <h2 className="text-2xl font-bold text-[#0f2744] mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <Share2 size={28} className="text-blue-600" />,
                title: 'Share Your Link',
                desc: 'Copy your unique referral link and share it with friends, classmates, or teachers.',
              },
              {
                step: '02',
                icon: <Users size={28} className="text-orange-500" />,
                title: 'Friend Places an Order',
                desc: 'Your friend visits RoboKit using your link and places their first order of ₹500 or more.',
              },
              {
                step: '03',
                icon: <IndianRupee size={28} className="text-green-600" />,
                title: 'You Earn ₹100 Credit',
                desc: '₹100 store credit is automatically added to your account within 48 hours of delivery.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col gap-4"
              >
                <span className="absolute top-5 right-5 text-6xl font-black text-gray-50 select-none leading-none">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f2744]">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                {item.step !== '03' && (
                  <ChevronRight
                    size={20}
                    className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 z-10"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Referral link box */}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-[#0f2744] mb-2">Your Referral Link</h2>
          <p className="text-gray-500 text-sm mb-5">Share this link with anyone who might love robotics.</p>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <span className="flex-1 text-sm font-mono text-gray-700 truncate px-1">
              {REFERRAL_LINK}
            </span>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check size={15} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Share buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <MessageCircle size={16} />
              Share on WhatsApp
            </a>
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0f2744] hover:bg-[#1a3a6b] text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <Mail size={16} />
              Share via Email
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
            >
              <Copy size={16} />
              Copy Link
            </button>
          </div>
        </section>

        {/* Stats */}
        <section>
          <h2 className="text-2xl font-bold text-[#0f2744] mb-6 text-center">Your Referral Stats</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Total Referrals', value: '0', icon: <Users size={22} className="text-blue-600" />, note: 'friends referred' },
              { label: 'Total Earned', value: '₹0', icon: <IndianRupee size={22} className="text-orange-500" />, note: 'in store credit' },
              { label: 'Credit Expiring', value: '—', icon: <Clock size={22} className="text-green-600" />, note: 'no active credit' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-2">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-1">
                  {stat.icon}
                </div>
                <div className="text-3xl font-extrabold text-[#0f2744]">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Terms */}
        <section className="bg-[#0f2744]/5 rounded-2xl border border-[#0f2744]/10 p-7">
          <h2 className="text-lg font-bold text-[#0f2744] mb-4">Terms &amp; Conditions</h2>
          <ul className="space-y-2.5 text-sm text-gray-600">
            {[
              'Referred friend must place their first order of ₹500 or more for the credit to be valid.',
              'You earn ₹100 in store credit per successful referral. There is no cap — refer as many friends as you like.',
              'Credit is valid for 90 days from the date it is issued.',
              'Credit cannot be redeemed for cash and is non-transferable.',
              'RoboKit reserves the right to revoke credits in cases of fraud or abuse.',
              'Self-referrals (creating multiple accounts) are not permitted.',
            ].map((term, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-[#0f2744]/10 text-[#0f2744] text-[10px] font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                {term}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  )
}

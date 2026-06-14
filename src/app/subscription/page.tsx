'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, Package2, ChevronDown, Star, Zap } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
}

const faqs: FAQItem[] = [
  {
    q: 'When does my box ship?',
    a: 'Boxes ship on the 1st of every month. Orders placed before the 25th are included in the next month\'s shipment. Orders after the 25th will start the following month.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes! Cancel anytime from your account dashboard with no fees or penalties. You\'ll continue to receive boxes until your paid period ends — no surprise charges.',
  },
  {
    q: 'What if I receive a damaged component?',
    a: 'We offer a 100% replacement guarantee. Contact our support team within 7 days with a photo and we\'ll send a replacement free of charge, no questions asked.',
  },
  {
    q: 'Can I choose my components?',
    a: 'Our team curates each box for maximum learning value. However, Pro subscribers can fill out a monthly preference form to influence the component selection.',
  },
  {
    q: 'Is there a student discount?',
    a: 'Yes! Students with a valid college ID get 15% off any plan. Email us at hello@robokit.in with your ID proof and we\'ll apply the discount to your account.',
  },
]

interface PastBox {
  month: string
  tier: string
  components: string[]
  color: string
}

const pastBoxes: PastBox[] = [
  {
    month: 'May 2026',
    tier: 'Builder Box',
    color: 'bg-blue-50 border-blue-200',
    components: [
      'Arduino Nano',
      'OLED Display 0.96"',
      'PIR Motion Sensor',
      'Servo Motor SG90',
      'RGB LED Matrix',
      'Buzzer Module',
      'Jumper Wire Kit',
    ],
  },
  {
    month: 'April 2026',
    tier: 'Starter Box',
    color: 'bg-green-50 border-green-200',
    components: [
      'LED Strip (1m)',
      'LM35 Temp Sensor',
      '9V Battery Connector',
      'Breadboard 400pts',
      'Push Buttons (10pc)',
      'Resistor Kit',
    ],
  },
  {
    month: 'March 2026',
    tier: 'Pro Box',
    color: 'bg-orange-50 border-orange-200',
    components: [
      'Raspberry Pi Zero 2W',
      'Camera Module v2',
      'MPU6050 IMU',
      'Stepper Motor + Driver',
      '18650 Li-ion Battery',
      'DC-DC Converter',
      'Custom PCB',
    ],
  },
]

interface TierPlan {
  name: string
  price: string
  subtitle: string
  popular: boolean
  features: string[]
}

const plans: TierPlan[] = [
  {
    name: 'Starter Box',
    price: '₹499',
    subtitle: 'Perfect for beginners',
    popular: false,
    features: [
      '5–6 carefully selected components',
      '1 beginner Arduino-compatible project',
      'Step-by-step project guide (PDF)',
      'Basic wiring diagrams included',
      'Community forum access',
    ],
  },
  {
    name: 'Builder Box',
    price: '₹999',
    subtitle: 'Most popular for enthusiasts',
    popular: true,
    features: [
      '8–10 premium components',
      '2 intermediate projects',
      'Sensor pack included',
      'Video tutorials + Discord access',
      'Email support (24hr response)',
      'Exclusive member discounts',
    ],
  },
  {
    name: 'Pro Box',
    price: '₹1,999',
    subtitle: 'For serious builders',
    popular: false,
    features: [
      '15+ advanced components',
      '1 advanced featured project',
      'Exclusive limited parts',
      'Priority WhatsApp support',
      'Monthly live Q&A session',
      'Early access to new products',
      'Certificate of completion',
    ],
  },
]

export default function SubscriptionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  function toggleFaq(i: number) {
    setOpenFaq(openFaq === i ? null : i)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-[#0f2744] py-16 md:py-24">
        <div className="container-xl text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-orange-400 text-orange-400 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
            <Zap size={12} />
            New Parts Every Month
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            RoboKit Monthly Box
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Discover, Build, and Learn — a curated box of robotics components delivered to your door every month.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg text-base"
            >
              Subscribe Now
            </Link>
            <a
              href="#whats-inside"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 transition-colors text-base"
            >
              See What&apos;s Inside
            </a>
          </div>
          <p className="text-gray-400 text-sm">Cancel anytime · No commitment</p>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-10">
            {[
              { stat: '2,500+', label: 'Subscribers' },
              { stat: '4.8/5', label: 'Rating' },
              { stat: '99%', label: 'On-time Delivery' },
              { stat: '12 Cities', label: 'Covered' },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-white">{stat}</p>
                <p className="text-blue-300 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">Choose Your Plan</h2>
            <p className="text-gray-500 text-lg">Start building today. Cancel or upgrade anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl p-8 shadow-sm flex flex-col ${
                  plan.popular
                    ? 'border-2 border-blue-600 shadow-blue-100 shadow-lg'
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 right-5">
                    <span className="inline-flex items-center px-3 py-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mb-5">{plan.subtitle}</p>
                  <div>
                    <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                    <span className="text-gray-400 text-sm ml-1">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/checkout"
                  className={`w-full text-center py-3.5 rounded-xl font-bold text-sm transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Get {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's inside ── */}
      <section id="whats-inside" className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Past Box Highlights</h2>
            <p className="text-gray-500">A look at what our subscribers have received recently.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastBoxes.map((box) => (
              <div key={box.month} className={`rounded-xl border p-6 ${box.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg">{box.month}</h3>
                    <span className="text-xs font-semibold text-gray-500">{box.tier}</span>
                  </div>
                  <Package2 size={22} className="text-gray-400" />
                </div>
                <ul className="space-y-2">
                  {box.components.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-gray-700">
                      <Package2 size={13} className="text-gray-400 flex-shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container-xl max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-500">Everything you need to know before subscribing.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-colors ${
                  openFaq === i ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA banner ── */}
      <section className="py-16 bg-[#0f2744]">
        <div className="container-xl text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">
            Join over 2,500 students and makers who receive fresh robotics components every month.
          </p>
          <Link
            href="/checkout"
            className="inline-flex items-center gap-2 px-10 py-4 bg-orange-500 hover:bg-orange-400 text-white font-black text-lg rounded-xl transition-colors shadow-xl"
          >
            <Zap size={20} />
            Subscribe Now
          </Link>
          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Cancel anytime — no questions asked
          </div>
        </div>
      </section>
    </div>
  )
}

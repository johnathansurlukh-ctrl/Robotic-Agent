'use client'
import Link from 'next/link'
import { ArrowRight, Zap, Shield, Truck, Star, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCurrency } from '@/context/CurrencyContext'

const headlines = [
  'Build Your Robot. We Supply the Parts.',
  'Trusted Kits for Every Engineering Project.',
  'From Line Followers to AI Vision Robots.',
]

const stats = [
  { value: '500+', label: 'Products' },
  { value: '50+', label: 'Project Kits' },
  { value: '10,000+', label: 'Students Served' },
  { value: '4.8★', label: 'Average Rating' },
]

export default function HeroSection() {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const { fmt } = useCurrency()

  useEffect(() => {
    const t = setInterval(() => setHeadlineIndex((i) => (i + 1) % headlines.length), 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative bg-[#0f2744] overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-float animate-orb-pulse" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-orange-500 rounded-full blur-3xl animate-float-slow animate-orb-pulse" />

      <div className="container-xl relative z-10 pt-20 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              Rated #1 Robotics Store for Students
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Robotics Hardware for{' '}
              <span className="text-blue-400">School Labs</span>,{' '}
              <span className="text-orange-400">Engineering Projects</span>,{' '}
              and Competitions.
            </h1>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl">
              Buy tested robotics kits, sensors, motors, controllers, batteries, tools, and complete project bundles with wiring diagrams, code, and support.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Tested before shipping', 'Wiring diagrams included', 'Code examples', 'Fast replacement', 'Tax invoice'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-sm text-gray-200">
                  <CheckCircle size={13} className="text-green-400" /> {t}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/starter-kits" className="btn-primary text-base px-8 py-4 animate-pulse-glow">
                <Zap size={18} /> Shop Starter Kits
              </Link>
              <Link href="/build-my-project" className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-semibold rounded-lg transition-all text-base shadow-lg">
                <ArrowRight size={18} /> Build My Project
              </Link>
              <Link href="/bulk-quote" className="btn-outline text-base px-8 py-4">
                Get School / College Quote
              </Link>
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-up anim-delay-200">
            {[
              { img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&h=120&fit=crop', title: 'Line Follower Kit', sub: 'Complete kit · Beginner', price: 1351, badge: 'Popular', href: '/projects/line-follower-robot' },
              { img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=120&fit=crop', title: 'Obstacle Avoidance', sub: 'With ultrasonic sensor', price: 1743, badge: 'Best Seller', href: '/projects/obstacle-avoidance-robot' },
              { img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=120&h=120&fit=crop', title: 'Bluetooth Robot Car', sub: 'Smartphone controlled', price: 1725, badge: 'New', href: '/projects/bluetooth-controlled-robot' },
              { img: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=120&h=120&fit=crop', title: 'Robotic Arm Kit', sub: '4-DOF servo arm', price: 1833, badge: 'Advanced', href: '/projects/robotic-arm-kit' },
            ].map((card) => (
              <Link key={card.title} href={card.href} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-colors cursor-pointer group block">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-white/20">
                    <img referrerPolicy="no-referrer" src={card.img} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs font-bold px-2 py-1 bg-orange-500/80 text-white rounded-full">{card.badge}</span>
                </div>
                <div className="text-white font-bold text-sm mb-1">{card.title}</div>
                <div className="text-gray-300 text-xs mb-3">{card.sub}</div>
                <div className="text-blue-300 font-black text-lg">{fmt(card.price)}</div>
                <div className="mt-2 text-xs text-gray-400 group-hover:text-blue-300 transition-colors">View full kit →</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-8 animate-fade-up anim-delay-400">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-white">{value}</div>
              <div className="text-sm text-gray-400 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

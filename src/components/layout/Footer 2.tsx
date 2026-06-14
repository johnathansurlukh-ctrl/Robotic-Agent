import Link from 'next/link'
import { Zap, MessageCircle, Mail, Phone, MapPin, Shield, Truck, Award, Headphones } from 'lucide-react'

const footerLinks = {
  'Shop': [
    { label: 'Robotics Kits', href: '/shop?category=robotics-kits' },
    { label: 'Boards & Controllers', href: '/shop?category=boards' },
    { label: 'Sensors', href: '/shop?category=sensors' },
    { label: 'Motors & Actuators', href: '/shop?category=motors' },
    { label: 'Chassis & Wheels', href: '/shop?category=chassis' },
    { label: 'Starter Kits', href: '/starter-kits' },
  ],
  'Projects': [
    { label: 'Line Follower Robot', href: '/projects/line-follower-robot' },
    { label: 'Obstacle Avoidance', href: '/projects/obstacle-avoidance-robot' },
    { label: 'Bluetooth Robot', href: '/projects/bluetooth-controlled-robot' },
    { label: 'Robotic Arm', href: '/projects/robotic-arm-kit' },
    { label: 'IoT Robot', href: '/projects/iot-robot' },
    { label: 'All Projects', href: '/projects' },
  ],
  'Institutions': [
    { label: 'For Schools', href: '/schools#schools' },
    { label: 'For Colleges', href: '/schools#colleges' },
    { label: 'Bulk Quote', href: '/bulk-quote' },
    { label: 'Lab Setup Packages', href: '/schools#lab-setup' },
    { label: 'Download Catalogue', href: '/bulk-quote#catalogue' },
    { label: 'Schedule Demo Call', href: '/schools#demo' },
  ],
  'Learning': [
    { label: 'Tutorials', href: '/learning-hub' },
    { label: 'Wiring Diagrams', href: '/learning-hub?tab=wiring' },
    { label: 'Code Examples', href: '/learning-hub?tab=code' },
    { label: 'Buying Guides', href: '/learning-hub?tab=guides' },
    { label: 'Troubleshooting', href: '/learning-hub?tab=troubleshooting' },
    { label: 'Project Ideas', href: '/learning-hub?tab=ideas' },
  ],
  'Support': [
    { label: 'Track Order', href: '/support#track' },
    { label: 'Warranty', href: '/support#warranty' },
    { label: 'Return Policy', href: '/support#returns' },
    { label: 'Missing Parts', href: '/support#missing' },
    { label: 'WhatsApp Support', href: 'https://wa.me/919876543210' },
    { label: 'FAQ', href: '/support#faq' },
  ],
}

const trustBadges = [
  { icon: Shield, label: 'Tested Parts', sub: 'Quality checked' },
  { icon: Truck, label: 'Fast Delivery', sub: '2–4 days' },
  { icon: Award, label: 'Warranty', sub: 'On eligible products' },
  { icon: Headphones, label: '24/7 Support', sub: 'WhatsApp + Email' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300">
      {/* Trust badges bar */}
      <div className="border-b border-white/10">
        <div className="container-xl py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <span className="text-xl font-black text-white">RoboKit</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              A robotics project success platform for students, clubs, and institutions. Everything you need to build, learn, and succeed.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <MessageCircle size={14} className="text-green-400" />
                <a href="https://wa.me/919876543210" className="hover:text-white transition-colors">WhatsApp: +91 98765 43210</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Mail size={14} className="text-blue-400" />
                <a href="mailto:support@robokit.in" className="hover:text-white transition-colors">support@robokit.in</a>
              </div>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={14} className="text-orange-400 mt-0.5 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">{heading}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2024 RoboKit. All rights reserved. | GST: 27XXXXX0000X1ZX</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
          </div>
          <div className="flex items-center gap-2">
            <span>Payments:</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-300">UPI</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-300">Cards</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-300">NetBanking</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-300">COD</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

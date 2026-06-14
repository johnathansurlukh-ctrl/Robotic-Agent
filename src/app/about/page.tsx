import type { Metadata } from 'next'
import { Shield, Star, Users, Package, Zap, Truck, RefreshCw, MessageCircle, Award, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — India\'s Most Trusted Robotics Hardware Store',
  description: 'Learn about RoboKit — founded in Pune in 2019 to make quality robotics hardware accessible to every student and school in India.',
}

const stats = [
  { value: '500+', label: 'Products' },
  { value: '10,000+', label: 'Students Served' },
  { value: '4.8★', label: 'Average Rating' },
  { value: '50+', label: 'Project Kits' },
]

const team = [
  { name: 'Rajesh Sharma', role: 'CEO & Founder', seed: 'Rajesh+Sharma' },
  { name: 'Meera Nair', role: 'Head of Products', seed: 'Meera+Nair' },
  { name: 'Ankit Patel', role: 'Robotics Engineer', seed: 'Ankit+Patel' },
  { name: 'Kavitha Reddy', role: 'Customer Support Lead', seed: 'Kavitha+Reddy' },
]

const whyTrust = [
  { icon: CheckCircle, title: 'Every Product Tested', desc: 'We test all components before they reach you — no dead-on-arrival surprises.', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: Shield, title: 'GST Registered Business', desc: 'Fully registered with GST IN 27AABCR1234A1Z5. Valid tax invoices for every order.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: RefreshCw, title: '7-Day Easy Returns', desc: 'Not happy? Return within 7 days for a full refund — no questions asked.', color: 'text-purple-600', bg: 'bg-purple-50' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'We ship to every pin code in India via trusted courier partners.', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: MessageCircle, title: 'Real Human Support', desc: 'Reach us on WhatsApp or email. Our engineers answer technical questions too.', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: Award, title: 'Community Trusted', desc: 'Recommended by students, teachers, and makers across India since 2019.', color: 'text-yellow-600', bg: 'bg-yellow-50' },
]

const featuredIn = [
  'Electronics For You',
  'Circuit Digest',
  'Last Minute Engineers',
  'Instructables',
  'Make: Magazine',
]

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="bg-[#0f2744] py-20 px-4 text-center">
        <div className="container-xl max-w-3xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 bg-blue-500/20 text-blue-300 text-sm font-semibold rounded-full border border-blue-400/30">
            Founded in Pune · 2019
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            India&apos;s Most Trusted<br />Robotics Hardware Store
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            We make quality robotics components, kits, and learning resources accessible
            to every student, school, and maker across India.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-xl py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="py-4">
                <div className="text-4xl font-black text-[#0f2744] mb-1">{value}</div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="container-xl py-16 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Our Story</h2>
        <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4 text-base">
          <p>
            RoboKit was founded in 2019 by Rajesh Sharma, a robotics engineer who grew frustrated
            watching engineering students in Pune struggle to find reliable, well-documented hardware
            for their projects. Components were either hard to source, poorly tested, or arrived
            without any documentation — leaving students to figure things out from scratch. He set out
            to build a store that solved all three problems at once.
          </p>
          <p>
            What started as a small operation out of a garage in Baner, Pune, has grown into one of
            India&apos;s most recommended online robotics hardware stores, serving over 10,000 students,
            hundreds of schools, and dozens of engineering colleges. Every product in our catalogue
            comes with wiring diagrams, sample code, datasheets, and real human support — because we
            believe the hardware is only half of the learning journey.
          </p>
        </div>
      </section>

      {/* Legal Info */}
      <section className="container-xl max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200 text-sm text-gray-700">
          <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
            <Shield size={18} className="text-blue-600" /> Legal &amp; Business Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-2">
            <div><span className="font-semibold text-gray-500">GST No:</span> 27AABCR1234A1Z5</div>
            <div><span className="font-semibold text-gray-500">CIN:</span> U52100MH2019PTC123456</div>
            <div className="sm:col-span-2">
              <span className="font-semibold text-gray-500">Registered Address:</span>{' '}
              401 TechHub Building, Baner Road, Pune 411045, Maharashtra, India
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 px-4">
        <div className="container-xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, seed }) => (
              <div key={name} className="text-center">
                <img
                  referrerPolicy="no-referrer"
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=0f2744&textColor=ffffff`}
                  alt={name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 border-2 border-gray-100 shadow"
                />
                <div className="font-bold text-gray-900 text-sm">{name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container-xl max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Why Trust Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyTrust.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In */}
      <section className="bg-white py-12 px-4 border-t border-gray-100">
        <div className="container-xl max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">As Featured In</p>
          <div className="flex flex-wrap justify-center gap-3">
            {featuredIn.map((pub) => (
              <span
                key={pub}
                className="px-5 py-2 bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-sm rounded-full"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

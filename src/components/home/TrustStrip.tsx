import { Shield, Zap, BookOpen, RefreshCw, FileText, Users, Star, Award, Lock, Truck } from 'lucide-react'

const trustPoints = [
  { icon: Lock, title: 'SSL Secured', desc: '256-bit HTTPS encryption', color: 'text-green-400' },
  { icon: FileText, title: 'GST Invoice', desc: 'Valid tax invoice on every order', color: 'text-blue-400' },
  { icon: RefreshCw, title: '7-Day Returns', desc: 'Hassle-free return policy', color: 'text-purple-400' },
  { icon: Zap, title: 'Expert Support', desc: 'Engineers answer your questions', color: 'text-orange-400' },
  { icon: Shield, title: 'Tested Products', desc: 'Every item quality-checked', color: 'text-teal-400' },
  { icon: Users, title: '10,000+ Students', desc: 'Trusted across India', color: 'text-pink-400' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'Ships to every pin code', color: 'text-yellow-400' },
  { icon: Award, title: '4.8★ Rated', desc: 'Loved by students & schools', color: 'text-red-400' },
]

const featuredIn = [
  'Electronics For You',
  'Circuit Digest',
  'Last Minute Engineers',
  'Instructables',
  'Make: Magazine',
]

export default function TrustStrip() {
  return (
    <section className="bg-[#0f2744] py-12">
      <div className="container-xl">
        <h2 className="text-center text-2xl font-bold text-white mb-8">Why Students Trust RoboKit</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-10">
          {trustPoints.map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="text-center p-3">
              <div className={`w-10 h-10 mx-auto mb-2 rounded-xl bg-white/10 flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </div>
              <div className="text-xs font-bold text-white leading-tight">{title}</div>
              <div className="text-xs text-gray-400 mt-1 leading-tight">{desc}</div>
            </div>
          ))}
        </div>

        {/* As Featured In */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">As Featured In</p>
          <div className="flex flex-wrap justify-center gap-3">
            {featuredIn.map((pub) => (
              <span
                key={pub}
                className="px-4 py-1.5 bg-white/5 border border-white/10 text-gray-300 font-semibold text-xs rounded-full hover:bg-white/10 transition-colors"
              >
                {pub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

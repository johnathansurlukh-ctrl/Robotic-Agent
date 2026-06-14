import Link from 'next/link'
import { School, Building2, Users, FileText, Phone, ArrowRight, CheckCircle } from 'lucide-react'

const schoolFeatures = ['Beginner-safe kits', 'Age-appropriate components', 'Teacher guides', 'Classroom activity sets', 'Workshop kits']
const collegeFeatures = ['Final year project hardware', 'Embedded systems kits', 'IoT and AI robotics', 'Lab setup packages', 'Bulk purchase and quotation']

export default function ForSchools() {
  return (
    <section className="py-16 bg-white">
      <div className="container-xl">
        <div className="text-center mb-12">
          <h2 className="section-heading">For Schools & Colleges</h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Need kits for a lab, robotics club, workshop, or semester course? We supply institutions with bulk pricing, tax invoices, and dedicated support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* School card */}
          <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-3xl p-8 border border-blue-200 dark:border-blue-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 dark:bg-blue-800 rounded-full opacity-30 -mr-10 -mt-10" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <School size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">For Schools</h3>
              <p className="text-gray-600 dark:text-blue-200 text-sm mb-5">Class 6–12 robotics labs, science clubs, and Atal Tinkering Labs.</p>
              <ul className="space-y-2 mb-6">
                {schoolFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-blue-100">
                    <CheckCircle size={16} className="text-blue-500 dark:text-blue-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link href="/schools#schools" className="btn-primary text-sm px-5 py-2.5">Explore School Kits</Link>
                <Link href="/bulk-quote" className="btn-secondary text-sm px-5 py-2.5">Get Quote</Link>
              </div>
            </div>
          </div>

          {/* College card */}
          <div className="relative bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-3xl p-8 border border-purple-200 dark:border-purple-800 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200 dark:bg-purple-800 rounded-full opacity-30 -mr-10 -mt-10" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Building2 size={28} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">For Engineering Colleges</h3>
              <p className="text-gray-600 dark:text-purple-200 text-sm mb-5">Diploma, B.Tech, and M.Tech labs for robotics, mechatronics, and embedded systems.</p>
              <ul className="space-y-2 mb-6">
                {collegeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-purple-100">
                    <CheckCircle size={16} className="text-purple-500 dark:text-purple-400 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link href="/schools#colleges" className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors text-sm">
                  College Packages
                </Link>
                <Link href="/bulk-quote" className="btn-secondary text-sm px-5 py-2.5">Request Quote</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="bg-[#0f2744] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Users size={24} className="text-blue-400 flex-shrink-0" />
            <div className="text-white">
              <div className="font-bold">Bulk pricing available for 5+ units</div>
              <div className="text-sm text-gray-300">Up to 40% off for schools, colleges, and clubs</div>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/bulk-quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl text-sm transition-colors">
              <FileText size={16} /> Request Quotation
            </Link>
            <Link href="/schools#demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors">
              <Phone size={16} /> Schedule Demo Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Zap, ChevronDown, ArrowRight } from 'lucide-react'

const projectTypes = [
  'Line Follower Robot', 'Obstacle Avoidance Robot', 'Bluetooth Robot Car',
  'IoT WiFi Robot', 'Robotic Arm', 'Drone / Quadcopter', 'Sumo Robot',
  'AI Vision Robot', 'Maze Solver', 'Final Year Project',
]

const controllers = ['Arduino Uno', 'Arduino Nano', 'ESP32', 'Raspberry Pi', 'Not sure yet']
const budgets = ['Under ₹1,000', '₹1,000 – ₹2,500', '₹2,500 – ₹5,000', '₹5,000 – ₹10,000', '₹10,000+']

export default function ProjectFinder() {
  const [projectType, setProjectType] = useState('')
  const [controller, setController] = useState('')
  const [budget, setBudget] = useState('')

  const canSearch = projectType && controller && budget

  const selectClass = 'w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'

  return (
    <section className="bg-gradient-to-b from-[#0f2744] to-white py-0">
      <div className="container-xl">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 -mt-6 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Zap size={22} className="text-orange-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Find the Right Components for Your Project</h2>
              <p className="text-sm text-gray-500">Tell us what you&apos;re building. We&apos;ll suggest the right kit or bill of materials.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">What are you building?</label>
              <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className={selectClass}>
                <option value="">Select project type</option>
                {projectTypes.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-10 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Which controller?</label>
              <select value={controller} onChange={(e) => setController(e.target.value)} className={selectClass}>
                <option value="">Select controller</option>
                {controllers.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-10 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">What is your budget?</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className={selectClass}>
                <option value="">Select budget range</option>
                {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <ChevronDown size={16} className="absolute right-3 top-10 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href={canSearch ? `/build-my-project?type=${encodeURIComponent(projectType)}&controller=${encodeURIComponent(controller)}&budget=${encodeURIComponent(budget)}` : '/build-my-project'}
              className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all ${canSearch ? 'bg-blue-600 hover:bg-blue-700 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              <Zap size={18} /> Find My Components
            </Link>
            <span className="text-sm text-gray-400">or</span>
            <Link href="/build-my-project" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm">
              Use the full Build My Project wizard <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

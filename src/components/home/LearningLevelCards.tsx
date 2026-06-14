import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const levels = [
  {
    icon: '🏫',
    title: 'School Beginner',
    description: 'Class 6–10 students. Safe components, guided projects, and simple tutorials.',
    href: '/starter-kits?level=school',
    color: 'from-green-400 to-green-600',
    badge: 'Ages 11–16',
    kits: ['LED Blink Kit', 'Obstacle Avoidance Robot', 'Line Follower Kit'],
  },
  {
    icon: '🎓',
    title: 'Engineering First Year',
    description: 'Diploma and B.Tech Year 1. Core components and semester lab kits.',
    href: '/starter-kits?level=engineering-1',
    color: 'from-blue-400 to-blue-600',
    badge: 'Year 1 & 2',
    kits: ['Arduino Starter Kit', 'Sensor Lab Kit', 'Basic Robotics Kit'],
  },
  {
    icon: '⚙️',
    title: 'Final Year Project',
    description: 'B.Tech Year 3–4. Advanced components for mini and major projects.',
    href: '/starter-kits?level=final-year',
    color: 'from-purple-400 to-purple-600',
    badge: 'Year 3 & 4',
    kits: ['IoT Robot Kit', 'AI Vision Kit', 'ROS Robotics Kit'],
  },
  {
    icon: '🏆',
    title: 'Robotics Club',
    description: 'Competition teams. High-performance components, bulk pricing, fast reorder.',
    href: '/starter-kits?level=club',
    color: 'from-orange-400 to-orange-600',
    badge: 'Competitions',
    kits: ['Sumo Robot Kit', 'Maze Solver Kit', 'Competition Pack'],
  },
  {
    icon: '🏆',
    title: 'Competition Team',
    description: 'Serious competitors. Precision motors, advanced sensors, spare part packs.',
    href: '/starter-kits?level=competition',
    color: 'from-red-400 to-red-600',
    badge: 'Advanced',
    kits: ['Robo Race Kit', 'Combat Robot Parts', 'High-Speed Motors'],
  },
  {
    icon: '🏫',
    title: 'Teacher / Lab Setup',
    description: 'Classroom and lab kits for 10–30 students with teacher guides.',
    href: '/schools',
    color: 'from-teal-400 to-teal-600',
    badge: 'Institutional',
    kits: ['10-Student Lab Kit', 'Classroom Robotics Set', 'Workshop Bundle'],
  },
]

export default function LearningLevelCards() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-xl">
        <div className="text-center mb-10">
          <h2 className="section-heading">Shop by Your Level</h2>
          <p className="section-subheading">Curated kits and components for every stage of your robotics journey.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {levels.map((level) => (
            <Link
              key={level.title}
              href={level.href}
              className="card p-6 group hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center text-2xl mb-4 shadow-md`}>
                {level.icon}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{level.title}</h3>
                <span className="badge-blue text-xs">{level.badge}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">{level.description}</p>
              <div className="space-y-1 mb-4">
                {level.kits.map((kit) => (
                  <div key={kit} className="text-xs text-gray-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-blue-400 rounded-full" /> {kit}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                Explore kits <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

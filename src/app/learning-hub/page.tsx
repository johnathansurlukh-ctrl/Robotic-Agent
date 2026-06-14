import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, Search } from 'lucide-react'

const tabs = ['All', 'Beginner Guides', 'Project Tutorials', 'Buying Guides', 'Troubleshooting']

const articles = [
  { id: 1, category: 'Beginner Guide', title: 'What is Arduino? A complete beginner\'s guide', excerpt: 'Learn what Arduino is, how it works, and why it\'s the best platform to start with robotics.', time: '7 min', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop', badge: 'badge-green', tags: ['Arduino', 'Beginner'] },
  { id: 2, category: 'Beginner Guide', title: 'What is ESP32? WiFi + Bluetooth microcontroller explained', excerpt: 'ESP32 vs Arduino — when to choose ESP32, what projects it\'s best for, and how to get started.', time: '6 min', image: 'https://images.unsplash.com/photo-1563191911-e65f8655ebf9?w=400&h=250&fit=crop', badge: 'badge-green', tags: ['ESP32', 'WiFi', 'Beginner'] },
  { id: 3, category: 'Buying Guide', title: 'Arduino vs ESP32: Which should you choose for your robotics project?', excerpt: 'Compare the two most popular microcontrollers. Price, GPIO, WiFi, power usage, and best use cases.', time: '8 min', image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&h=250&fit=crop', badge: 'badge-orange', tags: ['Arduino', 'ESP32', 'Comparison'] },
  { id: 4, category: 'Buying Guide', title: 'L298N vs TB6612FNG: Best motor driver for Arduino robots?', excerpt: 'Detailed comparison: power efficiency, heat generation, current capacity, and price.', time: '6 min', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop', badge: 'badge-orange', tags: ['Motor Driver', 'L298N', 'TB6612FNG'] },
  { id: 5, category: 'Buying Guide', title: 'Servo vs DC motor vs stepper motor: Which do you need?', excerpt: 'A practical guide to choosing the right motor type for your robotics application.', time: '7 min', image: 'https://images.unsplash.com/photo-1565034946487-077786996e27?w=400&h=250&fit=crop', badge: 'badge-orange', tags: ['Motors', 'Servo', 'Stepper'] },
  { id: 6, category: 'Project Tutorial', title: 'How to build a Line Follower Robot — Complete beginner guide', excerpt: 'Step-by-step with wiring diagrams, Arduino code, and calibration tips for IR sensors.', time: '12 min', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop', badge: 'badge-blue', tags: ['Line Follower', 'Arduino', 'Tutorial'] },
  { id: 7, category: 'Project Tutorial', title: 'Build a Bluetooth Controlled Car — Arduino + HC-05', excerpt: 'Complete guide to building a smartphone-controlled robot with Bluetooth module.', time: '10 min', image: 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=400&h=250&fit=crop', badge: 'badge-blue', tags: ['Bluetooth', 'Arduino', 'Tutorial'] },
  { id: 8, category: 'Troubleshooting', title: 'Robot not moving? 10 common causes and how to fix them', excerpt: 'Diagnose motors, wiring, power, and code issues that stop your robot from working.', time: '8 min', image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=250&fit=crop', badge: 'badge-red', tags: ['Troubleshooting', 'Motors'] },
  { id: 9, category: 'Troubleshooting', title: 'Arduino not uploading code — 7 fixes that actually work', excerpt: 'Serial port issues, driver problems, board selection, and other common upload failures.', time: '5 min', image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop', badge: 'badge-red', tags: ['Arduino', 'Troubleshooting', 'IDE'] },
  { id: 10, category: 'Buying Guide', title: 'Battery selection for robotics projects: LiPo, Li-ion, NiMH explained', excerpt: 'How to choose the right battery voltage, capacity, and chemistry for your robot.', time: '6 min', image: 'https://images.unsplash.com/photo-1620714223084-8fcacc2f47be?w=400&h=250&fit=crop', badge: 'badge-orange', tags: ['Battery', 'Power', 'Buying Guide'] },
  { id: 11, category: 'Beginner Guide', title: 'How sensors work: Ultrasonic, IR, temperature, and more', excerpt: 'A visual guide to how the most common robotics sensors work and when to use them.', time: '9 min', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=250&fit=crop', badge: 'badge-green', tags: ['Sensors', 'Beginner'] },
  { id: 12, category: 'Project Tutorial', title: 'How to build an obstacle avoiding robot with servo scanning', excerpt: 'Build a robot that scans left and right with a servo to avoid obstacles intelligently.', time: '11 min', image: 'https://images.unsplash.com/photo-1561144257-e32e8506e763?w=400&h=250&fit=crop', badge: 'badge-blue', tags: ['Obstacle Avoidance', 'Servo', 'Tutorial'] },
]

const badgeColors: Record<string, string> = {
  'badge-green': 'bg-green-100 text-green-700',
  'badge-blue': 'bg-blue-100 text-blue-700',
  'badge-orange': 'bg-orange-100 text-orange-700',
  'badge-red': 'bg-red-100 text-red-700',
}

export default function LearningHubPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0f2744] text-white py-12">
        <div className="container-xl">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={20} className="text-blue-400" />
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wide">Learning Hub</span>
          </div>
          <h1 className="text-4xl font-black mb-3">Tutorials, Guides & Resources</h1>
          <p className="text-gray-300 max-w-2xl">Everything you need to build, learn, and succeed in robotics. Each article links to the exact products you need.</p>

          {/* Search */}
          <div className="relative max-w-xl mt-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search tutorials, buying guides, troubleshooting..." className="w-full pl-12 pr-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-xl">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => (
              <button key={tab} className={`px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-lg transition-colors ${tab === 'All' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        {/* Featured article */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden mb-8 md:flex">
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img referrerPolicy="no-referrer" src={articles[5].image} alt={articles[5].title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <span className="badge-blue mb-3 inline-flex">Featured Tutorial</span>
            <h2 className="text-2xl font-black text-gray-900 mb-3">{articles[5].title}</h2>
            <p className="text-gray-600 mb-4">{articles[5].excerpt}</p>
            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center gap-1 text-sm text-gray-400"><Clock size={14} /> {articles[5].time} read</span>
              {articles[5].tags.map((t) => <span key={t} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">{t}</span>)}
            </div>
            <Link href="#" className="btn-primary inline-flex w-fit">Read Tutorial <ArrowRight size={16} /></Link>
          </div>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.filter((_, i) => i !== 5).map((article) => (
            <Link key={article.id} href="#" className="card overflow-hidden group">
              <div className="h-44 overflow-hidden">
                <img referrerPolicy="no-referrer" src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeColors[article.badge]}`}>{article.category}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} /> {article.time}</span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">{article.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((t) => <span key={t} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md">{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { ArrowRight, Clock, BookOpen, Tag } from 'lucide-react'

const articles = [
  {
    category: 'Buying Guide',
    title: 'Arduino vs ESP32: Which should you choose for your robotics project?',
    excerpt: 'Compare the two most popular microcontrollers for robotics. We cover price, performance, WiFi, and use cases.',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1580584126903-c17d41830450?w=400&h=250&fit=crop',
    href: '/learning-hub/arduino-vs-esp32',
    tag: 'Buying Guide',
    tagColor: 'badge-orange',
  },
  {
    category: 'Tutorial',
    title: 'How to build a Line Follower Robot — Complete guide for beginners',
    excerpt: 'Step-by-step tutorial with wiring diagrams, Arduino code, and troubleshooting tips.',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop',
    href: '/learning-hub/line-follower-robot-tutorial',
    tag: 'Tutorial',
    tagColor: 'badge-blue',
  },
  {
    category: 'Buying Guide',
    title: 'L298N vs TB6612FNG: Best motor driver for Arduino robots?',
    excerpt: 'A detailed comparison of the two most common DC motor driver modules for beginner and advanced projects.',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop',
    href: '/learning-hub/l298n-vs-tb6612fng',
    tag: 'Buying Guide',
    tagColor: 'badge-orange',
  },
  {
    category: 'Troubleshooting',
    title: 'Why is my robot not moving? 10 common wiring mistakes and fixes',
    excerpt: 'Diagnose and fix the most common issues that cause robots to fail. Motor wiring, power, and code errors.',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=250&fit=crop',
    href: '/learning-hub/robot-not-moving-fix',
    tag: 'Troubleshooting',
    tagColor: 'badge-red',
  },
]

export default function LearningHubPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Learning Hub</span>
            </div>
            <h2 className="section-heading">Tutorials, Guides & Resources</h2>
            <p className="section-subheading">Learn robotics, compare components, and troubleshoot your build.</p>
          </div>
          <Link href="/learning-hub" className="hidden md:flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:text-blue-800">
            All articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {articles.map((article) => (
            <Link key={article.title} href={article.href} className="card overflow-hidden group">
              <div className="h-40 overflow-hidden">
                <img referrerPolicy="no-referrer" src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className={article.tagColor}>{article.tag}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={11} /> {article.readTime}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">{article.title}</h4>
                <p className="text-xs text-gray-500 line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

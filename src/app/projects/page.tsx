'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Clock, Star, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react'
import { projects } from '@/data/projects'
import { useCart } from '@/context/CartContext'
import AnimateIn from '@/components/ui/AnimateIn'

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 border-green-200',
  intermediate: 'bg-orange-100 text-orange-700 border-orange-200',
  advanced: 'bg-red-100 text-red-700 border-red-200',
}

const categories = [
  { label: 'All Projects', value: 'all' },
  { label: 'School', value: 'school' },
  { label: 'College', value: 'college' },
  { label: 'Competition', value: 'competition' },
  { label: 'IoT', value: 'iot' },
  { label: 'AI / Vision', value: 'ai' },
]

export default function ProjectsPage() {
  const { addItem } = useCart()
  const [added, setAdded] = useState<Record<string, boolean>>({})

  function handleAdd(project: typeof projects[number]) {
    addItem({ id: `kit-${project.id}`, name: project.name, price: project.fullKitPrice, image: project.image, slug: `/projects/${project.slug}` })
    setAdded(prev => ({ ...prev, [project.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [project.id]: false })), 2000)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0f2744] text-white py-12">
        <div className="container-xl">
          <nav className="text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-white">Home</Link> / <span className="text-white">Projects</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">Shop by Project</h1>
          <p className="text-gray-300 max-w-2xl">
            Don&apos;t just buy components — buy everything you need for your project. Each page includes a complete bill of materials, wiring diagram, code, and assembly guide.
          </p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[104px] z-20">
        <div className="container-xl">
          <div className="flex gap-1 overflow-x-auto py-2">
            {categories.map((cat) => (
              <button key={cat.value} className="px-4 py-2 text-sm font-semibold whitespace-nowrap rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 60}>
            <div className="card overflow-hidden group flex flex-col h-full">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img referrerPolicy="no-referrer" src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${difficultyColors[project.difficultyLevel]}`}>
                      {project.difficultyLevel}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-700 flex items-center gap-1">
                      <Clock size={11} /> {project.buildTime}
                    </span>
                  </div>
                  {project.featured && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500 text-white">Featured</span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1.5 group-hover:text-blue-600 transition-colors">{project.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.tagline}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skillsLearned.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium">{skill}</span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-gray-100 text-center">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{project.components.length}</div>
                    <div className="text-xs text-gray-400">Components</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{project.assemblySteps.length}</div>
                    <div className="text-xs text-gray-400">Steps</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 flex items-center justify-center gap-0.5">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" /> 4.8
                    </div>
                    <div className="text-xs text-gray-400">Rating</div>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <div className="text-xs text-gray-400">Full kit</div>
                    <div className="text-2xl font-black text-gray-900">₹{project.fullKitPrice.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/projects/${project.slug}`} className="px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center gap-1.5">
                      View Kit <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => handleAdd(project)}
                      className="px-4 py-2.5 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      {added[project.id] ? <><CheckCircle size={15} /> Added!</> : <><ShoppingCart size={15} /> Add All</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </div>
  )
}

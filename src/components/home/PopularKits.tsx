'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Clock, Star, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react'
import { getFeaturedProjects } from '@/data/projects'
import { useCart } from '@/context/CartContext'

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-orange-100 text-orange-700',
  advanced: 'bg-red-100 text-red-700',
}

export default function PopularKits() {
  const projects = getFeaturedProjects()
  const { addItem } = useCart()
  const [added, setAdded] = useState<Record<string, boolean>>({})

  function handleAddKit(project: ReturnType<typeof getFeaturedProjects>[number]) {
    addItem({ id: `kit-${project.id}`, name: project.name, price: project.fullKitPrice, image: project.image, slug: `/projects/${project.slug}` })
    setAdded(prev => ({ ...prev, [project.id]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [project.id]: false })), 2000)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Popular Project Bundles</h2>
            <p className="section-subheading">Everything you need in one kit — components, wiring diagrams, and code.</p>
          </div>
          <Link href="/projects" className="hidden md:flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm">
            View all projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="card overflow-hidden group">
              {/* Image */}
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img referrerPolicy="no-referrer"
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${difficultyColors[project.difficultyLevel]}`}>
                    {project.difficultyLevel.charAt(0).toUpperCase() + project.difficultyLevel.slice(1)}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-700 flex items-center gap-1">
                    <Clock size={11} /> {project.buildTime}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{project.tagline}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.skillsLearned.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Components count */}
                <div className="flex items-center justify-between mb-4 py-3 border-y border-gray-100">
                  <div className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">{project.components.length}</span> components included
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.8</span>
                    <span className="text-gray-400">(124)</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400">Full kit price</div>
                    <div className="text-2xl font-black text-gray-900">₹{project.fullKitPrice.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                      View Kit
                    </Link>
                    <button onClick={() => handleAddKit(project)} className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-1.5">
                      {added[project.id] ? <><CheckCircle size={15} /> Added!</> : <><ShoppingCart size={15} /> Add All</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link href="/projects" className="btn-secondary">View all project kits <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

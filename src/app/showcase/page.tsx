'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, User, Star, Upload } from 'lucide-react'

interface Project {
  id: number
  name: string
  student: string
  city: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  likes: number
  photo: string
}

const projects: Project[] = [
  { id: 1, name: 'Autonomous Line Tracker', student: 'Arjun Sharma', city: 'Delhi', category: 'Line Follower', difficulty: 'Beginner', likes: 142, photo: 'photo-1485827404703-89b55fcc595e' },
  { id: 2, name: 'Ultrasonic Maze Solver', student: 'Priya Patel', city: 'Mumbai', category: 'Obstacle Avoidance', difficulty: 'Intermediate', likes: 98, photo: 'photo-1561144257-e32e8506e763' },
  { id: 3, name: '5-DOF Robotic Arm', student: 'Rahul Verma', city: 'Bangalore', category: 'Robotic Arm', difficulty: 'Advanced', likes: 215, photo: 'photo-1509966756634-9c23dd6e6815' },
  { id: 4, name: 'Smart Home Bot', student: 'Sneha Iyer', city: 'Chennai', category: 'IoT', difficulty: 'Intermediate', likes: 76, photo: 'photo-1507494924047-60b8ee826ca9' },
  { id: 5, name: 'Custom Hexapod Walker', student: 'Vikram Singh', city: 'Pune', category: 'Custom', difficulty: 'Advanced', likes: 334, photo: 'photo-1550745165-9bc0b252726f' },
  { id: 6, name: 'PCB Trace Follower', student: 'Ananya Gupta', city: 'Hyderabad', category: 'Line Follower', difficulty: 'Beginner', likes: 89, photo: 'photo-1518770660439-4636190af475' },
  { id: 7, name: 'Vision-Guided Arm', student: 'Karthik Nair', city: 'Kochi', category: 'Robotic Arm', difficulty: 'Advanced', likes: 178, photo: 'photo-1581092918056-0c4c3acd3789' },
  { id: 8, name: 'ESP32 Weather Robot', student: 'Meera Joshi', city: 'Ahmedabad', category: 'IoT', difficulty: 'Intermediate', likes: 63, photo: 'photo-1565034946487-077786996e27' },
  { id: 9, name: 'PID Speed Controller', student: 'Rohan Desai', city: 'Jaipur', category: 'Obstacle Avoidance', difficulty: 'Intermediate', likes: 112, photo: 'photo-1558618666-fcd25c85cd64' },
  { id: 10, name: 'Biped Walking Robot', student: 'Divya Krishnan', city: 'Chandigarh', category: 'Custom', difficulty: 'Advanced', likes: 267, photo: 'photo-1601648764658-cf37e8c89b70' },
  { id: 11, name: 'Color Sorting Bot', student: 'Aditya Malhotra', city: 'Lucknow', category: 'Line Follower', difficulty: 'Beginner', likes: 55, photo: 'photo-1485827404703-89b55fcc595e' },
  { id: 12, name: 'Swarm Mini-Robots', student: 'Lakshmi Reddy', city: 'Vizag', category: 'IoT', difficulty: 'Advanced', likes: 198, photo: 'photo-1561144257-e32e8506e763' },
]

const filterCategories = ['All', 'Line Follower', 'Obstacle Avoidance', 'Robotic Arm', 'IoT', 'Custom']

const difficultyBadge: Record<Project['difficulty'], string> = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-orange-100 text-orange-700',
}

export default function ShowcasePage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [submitName, setSubmitName] = useState('')
  const [submitProject, setSubmitProject] = useState('')
  const [submitDesc, setSubmitDesc] = useState('')
  const [submitImageUrl, setSubmitImageUrl] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitSuccess(true)
    setSubmitName('')
    setSubmitProject('')
    setSubmitDesc('')
    setSubmitImageUrl('')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="bg-[#0f2744] py-16 md:py-20">
        <div className="container-xl text-center">
          <p className="inline-block text-orange-400 text-sm font-bold uppercase tracking-widest mb-4">
            Community Builds
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Student Project Showcase
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto mb-10">
            See what students across India are building with RoboKit components. From line followers to hexapod walkers — the creativity never stops.
          </p>
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { stat: '1,200+', label: 'Projects Submitted' },
              { stat: '450+', label: 'Schools Represented' },
              { stat: '4.9★', label: 'Average Rating' },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-white">{stat}</p>
                <p className="text-blue-300 text-sm mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-xl">
          <div className="overflow-x-auto flex gap-0 scrollbar-hide">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`flex-shrink-0 px-5 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeFilter === cat
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Projects grid ── */}
      <section className="py-12">
        <div className="container-xl">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl font-semibold">No projects found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                    <Image
                      src={`https://images.unsplash.com/${project.photo}?w=400&q=80`}
                      alt={project.name}
                      width={400}
                      height={220}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                  </div>

                  {/* Card body */}
                  <div className="p-5">
                    {/* Top row: difficulty + likes */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${difficultyBadge[project.difficulty]}`}>
                        {project.difficulty}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Heart size={14} className="text-rose-400 fill-rose-300" />
                        {project.likes}
                      </span>
                    </div>

                    {/* Project name */}
                    <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">
                      {project.name}
                    </h3>

                    {/* Student info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {project.student}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {project.city}
                      </span>
                    </div>

                    {/* CTA */}
                    <button className="w-full py-2.5 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-sm rounded-xl transition-colors">
                      View Build
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Submit your build ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-2xl mb-4">
                <Upload size={26} className="text-blue-600" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 mb-3">
                Share Your Build With The Community
              </h2>
              <p className="text-gray-500 text-lg">
                Inspire thousands of students by showcasing what you have built. Submissions are reviewed within 48 hours.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <Star size={32} className="text-green-500 mx-auto mb-3" />
                <h3 className="font-bold text-green-800 text-xl mb-2">Build Submitted!</h3>
                <p className="text-green-700">
                  Thanks for sharing your project. Our team will review and publish it within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 text-sm text-green-600 hover:underline font-semibold"
                >
                  Submit another build
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={submitName}
                    onChange={(e) => setSubmitName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Name</label>
                  <input
                    type="text"
                    value={submitProject}
                    onChange={(e) => setSubmitProject(e.target.value)}
                    placeholder="e.g. 5-DOF Robotic Arm"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project Description</label>
                  <textarea
                    value={submitDesc}
                    onChange={(e) => setSubmitDesc(e.target.value)}
                    rows={3}
                    placeholder="Describe your project, components used, and what you learned..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL</label>
                  <input
                    type="url"
                    value={submitImageUrl}
                    onChange={(e) => setSubmitImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Upload size={18} />
                  Submit Project
                </button>
                <p className="text-center text-xs text-gray-400">
                  We review all submissions within 48 hours before publishing.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

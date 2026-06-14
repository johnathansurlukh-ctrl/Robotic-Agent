'use client'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShoppingCart, Clock, ChevronRight, CheckCircle, Download, Code2, Wrench, Star, ArrowRight, Zap, AlertCircle, Play, Youtube } from 'lucide-react'
import { getProjectBySlug } from '@/data/projects'
import { useCart } from '@/context/CartContext'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import RecentlyViewed from '@/components/ui/RecentlyViewed'

const VIDEO_IDS: Record<string, string> = {
  'line-follower-robot': 'QbLSTkggqYA',
  'obstacle-avoidance-robot': 'I6e1CJpjnek',
  'bluetooth-controlled-robot': 'sXs9V8_Uh0A',
  'robotic-arm-kit': 'fnA19D1M3RM',
  'iot-robot': 'VoNcbu7GbU4',
  'ai-vision-robot': 'MmB9b5njVbA',
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  if (!project) return null

  const { addItem } = useCart()
  const [activeStep, setActiveStep] = useState(0)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [addedToCart, setAddedToCart] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const recentItems = useRecentlyViewed({
    type: 'project', slug: project.slug, name: project.name, image: project.image, price: project.fullKitPrice,
  })

  const requiredComponents = project.components.filter((c) => c.required)
  const optionalComponents = project.components.filter((c) => !c.required)
  const ownedIds = Array.from(checkedItems)
  const missingComponents = requiredComponents.filter(c => !checkedItems.has(c.productId))
  const missingTotal = missingComponents.reduce((s, c) => s + c.price, 0)
  const totalRequired = requiredComponents.reduce((s, c) => s + c.price, 0)
  const difficultyColor = { beginner: 'bg-green-500', intermediate: 'bg-orange-500', advanced: 'bg-red-500' }
  const videoId = VIDEO_IDS[project.slug]

  function toggleCheck(id: string) {
    setCheckedItems(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  function addMissingToCart() {
    missingComponents.forEach(c => {
      addItem({ id: c.productId, name: c.productName, price: c.price, image: project!.image, slug: c.productId })
    })
    setAddedToCart(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-xl py-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-600">Home</Link> /
          <Link href="/projects" className="hover:text-blue-600 mx-1">Projects</Link> /
          <span className="text-gray-700 ml-1">{project.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative bg-[#0f2744] text-white overflow-hidden">
        <img referrerPolicy="no-referrer" src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative z-10 container-xl py-12">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 ${difficultyColor[project.difficultyLevel]} text-white text-xs font-bold rounded-full capitalize`}>{project.difficultyLevel}</span>
            <span className="flex items-center gap-1.5 text-gray-300 text-sm"><Clock size={14} /> {project.buildTime}</span>
            <span className="flex items-center gap-1.5 text-yellow-400 text-sm"><Star size={14} className="fill-yellow-400" /> 4.8 (124 builds)</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">{project.name}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mb-6">{project.tagline}</p>
          <div className="flex flex-wrap gap-2">
            {project.skillsLearned.map((s) => (
              <span key={s} className="px-3 py-1 bg-white/10 border border-white/20 text-sm rounded-full">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left — Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Video tutorial */}
            {videoId && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Youtube size={20} className="text-red-500" /> Video Tutorial
                  </h2>
                  <span className="text-xs text-gray-400">Full step-by-step guide</span>
                </div>
                {showVideo ? (
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gray-900 cursor-pointer group" onClick={() => setShowVideo(true)}>
                    <img referrerPolicy="no-referrer" src={project.image} alt="Tutorial thumbnail" className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Play size={32} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="font-bold text-lg">{project.name} — Full Tutorial</div>
                      <div className="text-sm text-gray-300">Click to watch</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Interactive BOM */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">📦 Bill of Materials</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Check items you already own — we'll add only the missing ones to your cart</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-green-600">{checkedItems.size}/{requiredComponents.length} owned</span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-2 bg-green-500 rounded-full transition-all" style={{ width: `${(checkedItems.size / requiredComponents.length) * 100}%` }} />
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {requiredComponents.map((item) => {
                  const owned = checkedItems.has(item.productId)
                  return (
                    <div key={item.productId} className={`px-6 py-3 flex items-center justify-between transition-colors ${owned ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleCheck(item.productId)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${owned ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-green-400'}`}>
                          {owned && <CheckCircle size={12} className="text-white fill-white" />}
                        </button>
                        <div>
                          <div className={`text-sm font-semibold ${owned ? 'text-green-700 line-through opacity-60' : 'text-gray-900'}`}>{item.productName}</div>
                          {item.notes && <div className="text-xs text-gray-400">{item.notes}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <span className="text-xs text-gray-400">×{item.quantity}</span>
                        <span className={`text-sm font-bold ${owned ? 'text-gray-300 line-through' : 'text-gray-900'}`}>₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })}
                {optionalComponents.length > 0 && (
                  <>
                    <div className="px-6 py-2 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wide">Optional Upgrades</div>
                    {optionalComponents.map((item) => (
                      <div key={item.productId} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50 opacity-70">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item.productName}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">×{item.quantity}</span>
                          <span className="text-sm font-bold text-gray-700">₹{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="px-6 py-4 bg-blue-50 border-t border-blue-100 flex flex-wrap items-center justify-between gap-3">
                <div>
                  {missingComponents.length > 0 ? (
                    <>
                      <div className="text-sm text-blue-700 font-medium">{missingComponents.length} components needed · ₹{missingTotal.toLocaleString()}</div>
                      <div className="text-xs text-blue-500">Full kit: ₹{project.fullKitPrice.toLocaleString()}</div>
                    </>
                  ) : (
                    <div className="text-sm text-green-700 font-bold">✓ You own all required components!</div>
                  )}
                </div>
                {missingComponents.length > 0 && (
                  <button onClick={addMissingToCart}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl transition-colors ${addedToCart ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                    <ShoppingCart size={15} />
                    {addedToCart ? '✓ Added!' : `Add ${missingComponents.length} missing to cart`}
                  </button>
                )}
              </div>
            </div>

            {/* Assembly steps */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">🔧 Assembly Guide</h2>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.assemblySteps.map((step, i) => (
                    <button key={step.step} onClick={() => setActiveStep(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeStep === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      Step {step.step}
                    </button>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-2xl p-5">
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Step {project.assemblySteps[activeStep]?.step}</div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{project.assemblySteps[activeStep]?.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{project.assemblySteps[activeStep]?.description}</p>
                </div>
              </div>
            </div>

            {/* Code snippet */}
            {project.codeSnippet && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Code2 size={20} /> Sample Code</h2>
                  <button className="btn-secondary text-xs px-3 py-2 flex items-center gap-1.5"><Download size={14} /> Download Full Code</button>
                </div>
                <pre className="bg-[#0f172a] text-green-400 p-6 text-sm font-mono overflow-x-auto leading-relaxed">{project.codeSnippet}</pre>
              </div>
            )}

            {/* Troubleshooting */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><Wrench size={20} /> Troubleshooting</h2>
              </div>
              <div className="p-6 space-y-3">
                {project.troubleshootingTips.map((tip) => (
                  <div key={tip} className="flex items-start gap-3 p-3 rounded-xl bg-orange-50 border border-orange-100">
                    <AlertCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-900">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Sticky CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <div className="text-center mb-5">
                <div className="text-3xl font-black text-gray-900">₹{project.fullKitPrice.toLocaleString()}</div>
                <div className="text-sm text-gray-400 mt-0.5">All {project.components.length} components included</div>
              </div>
              <div className="space-y-3 mb-5">
                {['All required components', 'Wiring diagram PDF', 'Sample code download', 'Assembly guide', 'WhatsApp support'].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle size={15} className="text-green-500 flex-shrink-0" /> {benefit}
                  </div>
                ))}
              </div>
              <button
                onClick={addMissingToCart}
                className={`w-full py-3.5 font-bold rounded-xl transition-all flex items-center justify-center gap-2 mb-3 ${addedToCart ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
              >
                <ShoppingCart size={18} />
                {addedToCart ? '✓ Added to Cart!' : checkedItems.size > 0 ? `Add ${missingComponents.length} missing parts` : 'Add Full Kit to Cart'}
              </button>
              <Link href="/shop" className="w-full py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                Buy Components Separately <ArrowRight size={15} />
              </Link>
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <button className="w-full py-2 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center gap-1.5 transition-colors">
                  <Download size={14} /> Download PDF Guide
                </button>
                <Link href="/bulk-quote" className="w-full py-2 text-sm font-medium text-green-600 hover:text-green-800 flex items-center justify-center gap-1.5 transition-colors">
                  <Zap size={14} /> Ask for Bulk Lab Kit
                </Link>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-xl text-center">
                <div className="text-xs text-gray-500 mb-1">Estimated difficulty</div>
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold capitalize text-white ${difficultyColor[project.difficultyLevel]}`}>{project.difficultyLevel}</div>
                <div className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1"><Clock size={11} /> Build time: {project.buildTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RecentlyViewed items={recentItems} />
    </div>
  )
}

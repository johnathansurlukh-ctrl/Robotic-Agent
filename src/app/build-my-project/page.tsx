'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle, Zap, ShoppingCart } from 'lucide-react'

const steps = [
  { id: 1, label: 'Level', question: 'What is your level?' },
  { id: 2, label: 'Project', question: 'What are you building?' },
  { id: 3, label: 'Controller', question: 'Which controller are you using?' },
  { id: 4, label: 'Budget', question: 'What is your budget?' },
  { id: 5, label: 'Support', question: 'How much support do you need?' },
]

const levelOptions = [
  { value: 'school', label: 'School Student', desc: 'Class 6–12', icon: '🏫' },
  { value: 'diploma', label: 'Diploma / Polytechnic', desc: 'Engineering diploma', icon: '📐' },
  { value: 'engineering', label: 'B.Tech / B.E Student', desc: 'Year 1–4', icon: '🎓' },
  { value: 'competition', label: 'Competition Team', desc: 'Robotics club / competition', icon: '🏆' },
]

const projectOptions = [
  { value: 'line-follower', label: 'Line Follower Robot', icon: '🤖' },
  { value: 'obstacle', label: 'Obstacle Avoidance Robot', icon: '📡' },
  { value: 'bluetooth', label: 'Bluetooth Controlled Car', icon: '📱' },
  { value: 'arm', label: 'Robotic Arm', icon: '🦾' },
  { value: 'iot', label: 'IoT / WiFi Robot', icon: '🌐' },
  { value: 'drone', label: 'Drone / Quadcopter', icon: '🚁' },
  { value: 'sumo', label: 'Sumo Robot', icon: '⚡' },
  { value: 'ai', label: 'AI Vision Robot', icon: '👁️' },
  { value: 'maze', label: 'Maze Solver', icon: '🔄' },
  { value: 'custom', label: 'Custom / Final Year Project', icon: '🔬' },
]

const controllerOptions = [
  { value: 'arduino-uno', label: 'Arduino Uno', desc: 'Best for beginners', icon: '🔵' },
  { value: 'arduino-nano', label: 'Arduino Nano', desc: 'Compact version', icon: '🟦' },
  { value: 'esp32', label: 'ESP32', desc: 'WiFi + Bluetooth', icon: '🟠' },
  { value: 'raspberry-pi', label: 'Raspberry Pi', desc: 'For AI / Linux projects', icon: '🍓' },
  { value: 'not-sure', label: 'Not sure yet', desc: 'We\'ll recommend', icon: '❓' },
]

const budgetOptions = [
  { value: 'under-1000', label: 'Under ₹1,000', desc: 'Starter level', icon: '💰' },
  { value: '1000-2500', label: '₹1,000 – ₹2,500', desc: 'Basic project kit', icon: '💳' },
  { value: '2500-5000', label: '₹2,500 – ₹5,000', desc: 'Mid-range project', icon: '💎' },
  { value: '5000-10000', label: '₹5,000 – ₹10,000', desc: 'Advanced project', icon: '🚀' },
  { value: '10000plus', label: '₹10,000+', desc: 'Professional / lab', icon: '🏆' },
]

const supportOptions = [
  { value: 'parts-only', label: 'Parts Only', desc: 'I know what to do, just need components', icon: '🔩' },
  { value: 'parts-code', label: 'Parts + Code', desc: 'Components with code examples', icon: '💻' },
  { value: 'full-kit', label: 'Full Kit', desc: 'Everything: parts, wiring diagrams, code, tutorials', icon: '📦' },
]

const recommendations: Record<string, { title: string; price: string; kitUrl: string; components: string[] }> = {
  default: {
    title: 'Line Follower Robot Kit',
    price: '₹1,351',
    kitUrl: '/projects/line-follower-robot',
    components: ['Arduino Uno R3', 'L298N Motor Driver', '2× IR Sensor', '2× BO Motor + Wheel', 'Robot Chassis', 'Battery Holder', 'Jumper Wires'],
  },
}

export default function BuildMyProjectPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selections, setSelections] = useState<Record<string, string>>({})
  const [showResult, setShowResult] = useState(false)

  const stepOptions = [levelOptions, projectOptions, controllerOptions, budgetOptions, supportOptions]

  const handleSelect = (value: string) => {
    const key = steps[currentStep].id.toString()
    setSelections((prev) => ({ ...prev, [key]: value }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResult(true)
    }
  }

  const result = recommendations['default']
  const progress = ((currentStep) / steps.length) * 100

  if (showResult) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container-xl max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Here&apos;s Your Recommended Kit!</h1>
            <p className="text-gray-500">Based on your selections, we recommend the following.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{result.title}</h2>
            <div className="text-3xl font-black text-blue-600 mb-4">{result.price}</div>

            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Required Components</h3>
              {result.components.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-green-500" /> {c}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link href={result.kitUrl} className="flex-1 btn-primary justify-center">
                <Zap size={18} /> View Full Kit
              </Link>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-colors">
                <ShoppingCart size={18} /> Add All to Cart
              </button>
            </div>
          </div>

          <button onClick={() => { setShowResult(false); setCurrentStep(0); setSelections({}) }} className="w-full btn-secondary justify-center">
            Start Over
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0f2744] text-white py-10">
        <div className="container-xl max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm font-medium mb-4">
            <Zap size={14} /> Build My Project Wizard
          </div>
          <h1 className="text-4xl font-black mb-2">Find Your Perfect Kit</h1>
          <p className="text-gray-300">Answer 5 quick questions. We&apos;ll recommend the exact components for your project.</p>
        </div>
      </div>

      <div className="container-xl max-w-2xl mx-auto py-8">
        {/* Progress bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            {steps.map((step, i) => (
              <div key={step.id} className="flex flex-col items-center gap-1 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < currentStep ? 'bg-green-500 text-white' : i === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {i < currentStep ? <CheckCircle size={16} /> : step.id}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${i === currentStep ? 'text-blue-600' : 'text-gray-400'}`}>{step.label}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <div className="text-sm font-semibold text-blue-600 mb-1">Step {currentStep + 1} of {steps.length}</div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">{steps[currentStep].question}</h2>

          <div className={`grid gap-3 ${stepOptions[currentStep].length > 4 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {(stepOptions[currentStep] as Array<{ value: string; label: string; desc?: string; icon: string }>).map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`p-4 text-left rounded-2xl border-2 transition-all ${selections[steps[currentStep].id.toString()] === opt.value ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/30'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{opt.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{opt.label}</div>
                    {opt.desc && <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>}
                  </div>
                  {selections[steps[currentStep].id.toString()] === opt.value && (
                    <CheckCircle size={18} className="text-blue-600 ml-auto flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-3 text-gray-600 font-semibold rounded-xl border border-gray-200 disabled:opacity-30 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <button
            onClick={handleNext}
            disabled={!selections[steps[currentStep].id.toString()]}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl disabled:opacity-40 transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Find My Kit' : 'Next'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

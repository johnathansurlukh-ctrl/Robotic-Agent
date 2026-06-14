'use client'
import Link from 'next/link'
import { Award, Star, Zap, Lock, CheckCircle, ShoppingCart } from 'lucide-react'
import { useLoyalty } from '@/context/LoyaltyContext'

interface Badge {
  id: string
  icon: string
  name: string
  description: string
  points: number
  category: 'builder' | 'explorer' | 'learner' | 'supporter'
  unlockCondition: string
}

const BADGES: Badge[] = [
  { id: 'first-build', icon: '🔨', name: 'First Build', description: 'Complete your first project kit order', points: 50, category: 'builder', unlockCondition: 'Place your first order' },
  { id: 'junior-builder', icon: '🤖', name: 'Junior Builder', description: 'Build 3 different robotics projects', points: 150, category: 'builder', unlockCondition: 'Order 3 different project kits' },
  { id: 'sensor-expert', icon: '📡', name: 'Sensor Expert', description: 'Purchase 5 different sensor types', points: 200, category: 'explorer', unlockCondition: 'Buy 5 sensor variants' },
  { id: 'speed-builder', icon: '⚡', name: 'Speed Builder', description: 'Complete a project within 24 hours of ordering', points: 100, category: 'builder', unlockCondition: 'Rate a build within 24 hours of delivery' },
  { id: 'stem-champion', icon: '🏆', name: 'STEM Champion', description: 'Complete all beginner-level projects', points: 500, category: 'learner', unlockCondition: 'Order all 3 beginner project kits' },
  { id: 'code-warrior', icon: '💻', name: 'Code Warrior', description: 'Download sample code for 10 products', points: 120, category: 'learner', unlockCondition: 'Download code from 10 product pages' },
  { id: 'school-hero', icon: '🎓', name: 'School Hero', description: 'Bulk order for a class or lab', points: 300, category: 'supporter', unlockCondition: 'Place a bulk order of 10+ units' },
  { id: 'referral-king', icon: '👑', name: 'Referral King', description: 'Refer 5 friends who place orders', points: 400, category: 'supporter', unlockCondition: 'Get 5 successful referrals' },
  { id: 'early-adopter', icon: '🚀', name: 'Early Adopter', description: 'Be among the first 500 customers', points: 250, category: 'explorer', unlockCondition: 'Automatically granted to early customers' },
  { id: 'iot-pioneer', icon: '📶', name: 'IoT Pioneer', description: 'Build an IoT project with ESP32', points: 175, category: 'explorer', unlockCondition: 'Order the IoT Robot (ESP32) kit' },
  { id: 'arm-specialist', icon: '🦾', name: 'Arm Specialist', description: 'Complete the robotic arm project', points: 220, category: 'builder', unlockCondition: 'Order and review the Robotic Arm Kit' },
  { id: 'perfect-rating', icon: '⭐', name: 'Perfect Reviewer', description: 'Leave a detailed review with photos', points: 80, category: 'supporter', unlockCondition: 'Submit a review with photo attachment' },
]

const CATEGORY_META: Record<string, { label: string; color: string; bg: string }> = {
  builder:   { label: 'Builder',   color: 'text-blue-700',  bg: 'bg-blue-50 border-blue-200' },
  explorer:  { label: 'Explorer',  color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
  learner:   { label: 'Learner',   color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
  supporter: { label: 'Supporter', color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
}

const LEVELS = [
  { name: 'Rookie', minPoints: 0,    maxPoints: 199,  color: 'from-gray-400 to-gray-500',     icon: '🌱' },
  { name: 'Maker',  minPoints: 200,  maxPoints: 499,  color: 'from-green-400 to-green-600',   icon: '🔧' },
  { name: 'Pro',    minPoints: 500,  maxPoints: 999,  color: 'from-blue-400 to-blue-700',     icon: '⚙️' },
  { name: 'Expert', minPoints: 1000, maxPoints: 1999, color: 'from-purple-400 to-purple-700', icon: '🏆' },
  { name: 'Legend', minPoints: 2000, maxPoints: Infinity, color: 'from-yellow-400 to-orange-500', icon: '👑' },
]

export default function BadgesPage() {
  const { points } = useLoyalty()

  const currentLevel = LEVELS.find(l => points >= l.minPoints && points <= l.maxPoints) ?? LEVELS[0]
  const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1]
  const progress = nextLevel
    ? ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100

  // Simulate some earned badges based on points
  const earnedIds = new Set<string>(
    points >= 50  ? ['first-build'] :
    points >= 100 ? ['first-build', 'speed-builder'] :
    []
  )

  const categories = Array.from(new Set(BADGES.map(b => b.category)))

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="container-xl py-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-600">Home</Link> /
          <span className="text-gray-700 ml-1">Skill Badges</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-[#0f2744] text-white py-12">
        <div className="container-xl text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 px-4 py-2 rounded-full text-yellow-300 text-sm font-semibold mb-4">
            <Award size={16} /> Gamified Learning
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Skill Badges</h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">Earn badges as you build, learn, and grow. Each badge unlocks exclusive discounts and perks.</p>
        </div>
      </div>

      <div className="container-xl py-10">
        {/* Level card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <div className="flex flex-wrap items-center gap-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentLevel.color} flex items-center justify-center text-4xl shadow-lg flex-shrink-0`}>
              {currentLevel.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Current Level</div>
              <div className="text-2xl font-black text-gray-900">{currentLevel.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-yellow-600">{points} points</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              {nextLevel ? (
                <>
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>{points} pts</span>
                    <span>{nextLevel.minPoints} pts → {nextLevel.name}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-3 rounded-full bg-gradient-to-r ${currentLevel.color} transition-all`} style={{ width: `${Math.min(progress, 100)}%` }} />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{nextLevel.minPoints - points} points to next level</div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-yellow-600 font-bold">
                  <CheckCircle size={18} className="text-yellow-500" /> Maximum level reached!
                </div>
              )}
            </div>
            <div className="text-center flex-shrink-0">
              <div className="text-3xl font-black text-gray-900">{earnedIds.size}</div>
              <div className="text-xs text-gray-400">Badges earned</div>
            </div>
          </div>
        </div>

        {/* All levels */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">All Levels</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {LEVELS.map((level) => {
              const isActive = level.name === currentLevel.name
              const isUnlocked = points >= level.minPoints
              return (
                <div key={level.name} className={`rounded-xl p-4 text-center border-2 transition-all ${isActive ? 'border-blue-500 bg-blue-50' : isUnlocked ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
                  <div className="text-2xl mb-1">{level.icon}</div>
                  <div className="font-bold text-sm text-gray-900">{level.name}</div>
                  <div className="text-xs text-gray-500">{level.minPoints}+ pts</div>
                  {isActive && <div className="mt-1 text-[10px] font-bold text-blue-600 uppercase">Current</div>}
                  {isUnlocked && !isActive && <CheckCircle size={12} className="text-green-500 mx-auto mt-1" />}
                  {!isUnlocked && <Lock size={12} className="text-gray-400 mx-auto mt-1" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Badges by category */}
        {categories.map((cat) => {
          const meta = CATEGORY_META[cat]
          const catBadges = BADGES.filter(b => b.category === cat)
          return (
            <div key={cat} className="mb-8">
              <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${meta.bg} ${meta.color}`}>{meta.label}</span>
                Badges
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {catBadges.map((badge) => {
                  const earned = earnedIds.has(badge.id)
                  return (
                    <div key={badge.id} className={`bg-white rounded-2xl border overflow-hidden transition-all ${earned ? 'border-yellow-400 shadow-md shadow-yellow-100' : 'border-gray-200'}`}>
                      <div className={`p-5 text-center ${earned ? 'bg-gradient-to-b from-yellow-50 to-white' : 'bg-gray-50'}`}>
                        <div className={`text-5xl mb-3 ${!earned ? 'grayscale opacity-40' : ''}`}>{badge.icon}</div>
                        <div className={`font-black text-base ${earned ? 'text-gray-900' : 'text-gray-400'}`}>{badge.name}</div>
                        {earned ? (
                          <div className="flex items-center justify-center gap-1 mt-1 text-green-600 text-xs font-bold">
                            <CheckCircle size={12} /> Earned
                          </div>
                        ) : (
                          <div className="flex items-center justify-center gap-1 mt-1 text-gray-400 text-xs">
                            <Lock size={11} /> Locked
                          </div>
                        )}
                      </div>
                      <div className="px-4 pb-4">
                        <p className="text-xs text-gray-500 mb-2">{badge.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-yellow-600 text-xs font-bold">
                            <Zap size={11} /> +{badge.points} pts
                          </div>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${meta.bg} ${meta.color}`}>{meta.label}</span>
                        </div>
                        {!earned && (
                          <div className="mt-2 text-[10px] text-gray-400 bg-gray-50 rounded-lg px-2 py-1">
                            Unlock: {badge.unlockCondition}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* CTA */}
        <div className="bg-[#0f2744] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-black mb-2">Start Earning Today</h2>
          <p className="text-gray-300 mb-5">Every purchase earns points. Every badge unlocks perks.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/shop" className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-colors">
              <ShoppingCart size={18} /> Shop Now
            </Link>
            <Link href="/projects" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/20">
              Browse Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

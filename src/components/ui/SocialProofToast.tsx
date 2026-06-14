'use client'
import { useState, useEffect } from 'react'
import { X, ShoppingBag } from 'lucide-react'

const notifications = [
  { name: 'Arjun K.', city: 'Pune', action: 'just ordered', item: 'Line Follower Kit', time: '2 min ago' },
  { name: 'Delhi Public School', city: 'Delhi', action: 'purchased 10×', item: 'Arduino Starter Kits', time: '8 min ago' },
  { name: 'Priya S.', city: 'Bangalore', action: 'left a 5★ review on', item: 'HC-SR04 Sensor', time: '12 min ago' },
  { name: 'Vikram M.', city: 'Chennai', action: 'added to cart', item: '4WD Robot Chassis', time: '3 min ago' },
  { name: 'IIT Bombay', city: 'Mumbai', action: 'placed bulk order for', item: 'ESP32 Dev Boards', time: '25 min ago' },
  { name: 'Sneha R.', city: 'Hyderabad', action: 'just completed checkout for', item: 'Obstacle Avoidance Kit', time: '1 min ago' },
  { name: 'Rohan M.', city: 'Jaipur', action: 'reviewed', item: 'L298N Motor Driver — 5★', time: '18 min ago' },
  { name: 'Nithya K.', city: 'Coimbatore', action: 'ordered', item: 'Bluetooth Robot Car Kit', time: '6 min ago' },
  { name: '143 students', city: '', action: 'viewed this store', item: 'today', time: '' },
  { name: 'Amit S.', city: 'Ahmedabad', action: 'just ordered', item: 'Raspberry Pi 4 (4GB)', time: '4 min ago' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function SocialProofToast() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [opacity, setOpacity] = useState(1)

  // Initial delay before first appearance
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) setVisible(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [dismissed])

  // Rotate through notifications every 5 seconds with fade
  useEffect(() => {
    if (!visible || dismissed) return

    const interval = setInterval(() => {
      // Fade out
      setOpacity(0)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % notifications.length)
        setOpacity(1)
      }, 400)
    }, 5000)

    return () => clearInterval(interval)
  }, [visible, dismissed])

  const handleDismiss = () => {
    setOpacity(0)
    setTimeout(() => {
      setDismissed(true)
      setVisible(false)
    }, 300)
  }

  if (!visible || dismissed) return null

  const n = notifications[index]
  const initials = getInitials(n.name)

  return (
    <div
      className="fixed bottom-6 left-6 z-30 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-3 flex items-start gap-3"
      style={{ opacity, transition: 'opacity 0.4s ease' }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-[#0f2744] flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
        {/* Green online dot */}
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <ShoppingBag size={11} className="text-green-600 flex-shrink-0" />
          <p className="text-xs text-gray-800 leading-snug">
            <span className="font-bold">{n.name}</span>
            {n.city ? <span className="text-gray-500"> ({n.city})</span> : null}
            {' '}{n.action}{' '}
            <span className="font-semibold text-blue-700">{n.item}</span>
          </p>
        </div>
        {n.time ? (
          <p className="text-[10px] text-gray-400">{n.time}</p>
        ) : null}
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 text-gray-300 hover:text-gray-500 transition-colors mt-0.5"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}

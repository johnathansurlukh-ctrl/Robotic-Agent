import Link from 'next/link'
import { CheckCircle, ShoppingCart, ArrowRight, Star, Zap } from 'lucide-react'

const kits = [
  {
    id: 'sk1',
    name: 'Beginner Robotics Kit',
    subtitle: 'Perfect first kit for school students',
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=350&fit=crop',
    badge: 'Best Seller',
    target: 'School Students · Beginners',
    includes: ['Arduino Uno R3', '5× Sensor modules', 'Breadboard + jumper wires', 'USB cable', 'Getting started guide'],
  },
  {
    id: 'sk2',
    name: 'School Robotics Kit',
    subtitle: 'Complete robotics lab kit for class 8–12',
    price: 1599,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1561144257-e32e8506e763?w=500&h=350&fit=crop',
    badge: 'Recommended',
    target: 'Class 8–12 · School Lab',
    includes: ['Arduino Uno R3', 'L298N Motor Driver', '4WD Chassis + motors', 'Sensors pack', 'Wiring diagram PDF', 'Project tutorials'],
  },
  {
    id: 'sk3',
    name: 'Arduino Starter Kit',
    subtitle: 'Learn Arduino with 10 progressive projects',
    price: 1299,
    rating: 4.7,
    reviews: 445,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=350&fit=crop',
    badge: 'Most Loved',
    target: 'Year 1 Engineering · Beginners',
    includes: ['Arduino Uno R3 + USB cable', 'Breadboard + 200 jumpers', '30+ components', 'LCD, LEDs, buzzers', '20 projects guide PDF', 'Arduino IDE guide'],
  },
  {
    id: 'sk4',
    name: 'ESP32 IoT Starter Kit',
    subtitle: 'Build WiFi and IoT projects with ESP32',
    price: 1499,
    rating: 4.8,
    reviews: 221,
    image: 'https://images.unsplash.com/photo-1563191911-e65f8655ebf9?w=500&h=350&fit=crop',
    badge: 'New',
    target: 'College Students · IoT',
    includes: ['ESP32 Dev Board', 'DHT22 sensor', 'OLED display', 'Relay module', 'Jumper wires + breadboard', '10 IoT project examples'],
  },
  {
    id: 'sk5',
    name: 'College Project Kit',
    subtitle: 'All-in-one kit for final year projects',
    price: 3499,
    originalPrice: 4199,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=350&fit=crop',
    badge: 'Final Year',
    target: 'B.Tech Year 3–4',
    includes: ['Arduino Mega 2560', 'ESP32 Module', '15+ sensor modules', 'Servo + stepper motors', 'Motor drivers', 'Project report template'],
  },
  {
    id: 'sk6',
    name: 'Competition Robotics Kit',
    subtitle: 'High-performance kit for robotics competitions',
    price: 2999,
    originalPrice: 3599,
    rating: 4.9,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1509966756634-9c23dd6e6815?w=500&h=350&fit=crop',
    badge: 'Competition',
    target: 'Robotics Clubs · Competitions',
    includes: ['High-speed BO motors', 'L298N + TB6612FNG drivers', 'Metal chassis', 'High-precision IR sensors', 'LiPo battery + charger', 'Spare parts pack'],
  },
]

export default function StarterKitsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0f2744] text-white py-12">
        <div className="container-xl">
          <nav className="text-sm text-gray-400 mb-3">
            <Link href="/" className="hover:text-white">Home</Link> / <span className="text-white">Starter Kits</span>
          </nav>
          <h1 className="text-4xl font-black mb-3">Starter Kits</h1>
          <p className="text-gray-300 max-w-xl">Curated kits for every level — school beginners to college final year projects. All tested, all ready to build.</p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kits.map((kit) => (
            <div key={kit.id} className="card overflow-hidden group flex flex-col">
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img referrerPolicy="no-referrer" src={kit.image} alt={kit.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {kit.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1.5 bg-orange-500 text-white text-xs font-bold rounded-full">{kit.badge}</span>
                )}
                {kit.originalPrice && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    -{Math.round((1 - kit.price / kit.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-gray-400 font-medium mb-1">{kit.target}</div>
                <h3 className="text-lg font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{kit.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{kit.subtitle}</p>

                {/* Includes */}
                <div className="space-y-1.5 mb-4 flex-1">
                  {kit.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle size={12} className="text-green-500 flex-shrink-0" /> {item}
                    </div>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4 pt-3 border-t border-gray-100">
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={13} className={s <= Math.floor(kit.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />)}
                  </div>
                  <span className="text-sm font-semibold">{kit.rating}</span>
                  <span className="text-xs text-gray-400">({kit.reviews})</span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-gray-900">₹{kit.price.toLocaleString()}</div>
                    {kit.originalPrice && <div className="text-sm text-gray-400 line-through">₹{kit.originalPrice.toLocaleString()}</div>}
                  </div>
                  <div className="flex gap-2">
                    <Link href="#" className="px-3 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1">
                      Details <ArrowRight size={14} />
                    </Link>
                    <button className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors">
                      <ShoppingCart size={15} /> Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

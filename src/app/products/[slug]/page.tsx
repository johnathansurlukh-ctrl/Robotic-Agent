'use client'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShoppingCart, Zap, CheckCircle, Star, Shield, Truck, RefreshCw, MessageCircle, ChevronDown, AlertTriangle, Download, Bell, Send, ThumbsUp } from 'lucide-react'
import { getProductBySlug } from '@/data/products'
import { useCart } from '@/context/CartContext'
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed'
import RecentlyViewed from '@/components/ui/RecentlyViewed'

const tabList = ['Description', 'Specifications', 'Wiring', 'Code', 'Projects', 'Reviews', 'Q&A', 'FAQ']

interface QA { q: string; a: string; asker: string; helpful: number }
const DEFAULT_QAS: QA[] = [
  { q: 'Does this work with 3.3V logic (ESP32)?', a: 'Yes! This sensor supports both 3.3V and 5V logic levels. No level shifter needed for ESP32.', asker: 'Rahul M.', helpful: 14 },
  { q: 'Is a datasheet available?', a: 'Yes, click the "Download Wiring Diagrams PDF" button in the Wiring tab — it includes the full datasheet and pinout.', asker: 'Sneha K.', helpful: 8 },
  { q: 'Can I get a GST invoice for institutional purchase?', a: 'Absolutely. Every order comes with a proper GST invoice. For bulk/institutional orders, contact us on WhatsApp.', asker: 'Dr. Rajesh P.', helpful: 22 },
]

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()
  if (!product) return null

  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('Description')
  const [activeImage, setActiveImage] = useState(0)
  const [notifyEmail, setNotifyEmail] = useState('')
  const [notifyDone, setNotifyDone] = useState(false)
  const [qas, setQas] = useState<QA[]>(DEFAULT_QAS)
  const [newQ, setNewQ] = useState('')
  const [questionSent, setQuestionSent] = useState(false)
  const { addItem } = useCart()

  const bulkPrice = product.bulkPricing.find((b) => qty >= b.minQty && (!b.maxQty || qty <= b.maxQty))
  const currentPrice = bulkPrice ? bulkPrice.price : product.price

  const recentItems = useRecentlyViewed({
    type: 'product', slug: product.slug, name: product.name, image: product.images[0], price: product.price,
  })

  function handleAddToCart() {
    addItem({ id: product!.id, name: product!.name, price: currentPrice, image: product!.images[0], slug: product!.slug, initialQty: qty })
  }

  function handleNotify(e: React.FormEvent) {
    e.preventDefault()
    setNotifyDone(true)
  }

  function handleAskQuestion(e: React.FormEvent) {
    e.preventDefault()
    if (!newQ.trim()) return
    setQas(prev => [{ q: newQ.trim(), a: 'Our team will answer this within 24 hours. Check back soon!', asker: 'You', helpful: 0 }, ...prev])
    setNewQ('')
    setQuestionSent(true)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-xl py-3 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-600">Home</Link> /
          <Link href="/shop" className="hover:text-blue-600 mx-1">Shop</Link> /
          <Link href={`/shop?category=${product.category}`} className="hover:text-blue-600 mx-1 capitalize">{product.category.replace('-', ' ')}</Link> /
          <span className="text-gray-700 ml-1">{product.name}</span>
        </div>
      </div>

      <div className="container-xl py-8">
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Left — images */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-3 aspect-square">
              <img referrerPolicy="no-referrer" src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`w-16 h-16 rounded-xl border-2 overflow-hidden transition-colors ${activeImage === i ? 'border-blue-500' : 'border-gray-200'}`}>
                    <img referrerPolicy="no-referrer" src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — product info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{product.brand}</span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-400">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={16} className={s <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                ))}
              </div>
              <span className="font-bold text-sm">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-gray-600 mb-5 leading-relaxed">{product.shortDescription}</p>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-5">
              <h3 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-1.5">
                <CheckCircle size={16} className="text-green-600" /> Compatible with:
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.compatibility.map((c) => (
                  <span key={c} className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">{c}</span>
                ))}
              </div>
            </div>

            {product.safetyWarning && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-5 flex gap-3">
                <AlertTriangle size={18} className="text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-orange-800">{product.safetyWarning}</p>
              </div>
            )}

            {/* Out of stock — Notify Me */}
            {product.stock === 'out_of_stock' ? (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Bell size={18} className="text-red-500" />
                  <span className="font-bold text-red-800">Currently Out of Stock</span>
                </div>
                {notifyDone ? (
                  <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                    <CheckCircle size={16} className="text-green-500" /> You&apos;ll be notified when this restocks!
                  </div>
                ) : (
                  <form onSubmit={handleNotify} className="flex gap-2">
                    <input type="email" required value={notifyEmail} onChange={e => setNotifyEmail(e.target.value)}
                      placeholder="Enter your email" className="flex-1 px-3 py-2 text-sm border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-300 bg-white" />
                    <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5">
                      <Bell size={14} /> Notify Me
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl font-black text-gray-900">₹{currentPrice.toLocaleString()}</div>
                  {product.originalPrice && (
                    <div className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</div>
                  )}
                  {product.badge && (
                    <span className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">{product.badge}</span>
                  )}
                </div>

                {product.bulkPricing.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Bulk Pricing</p>
                    <div className="grid grid-cols-3 gap-2">
                      {product.bulkPricing.map((b) => (
                        <div key={b.minQty} className={`text-center p-2 rounded-xl border transition-colors ${qty >= b.minQty && (!b.maxQty || qty <= b.maxQty) ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}>
                          <div className="text-xs text-gray-500">{b.maxQty ? `${b.minQty}–${b.maxQty}` : `${b.minQty}+`} pcs</div>
                          <div className="font-bold text-sm">₹{b.price}</div>
                          <div className="text-xs text-green-600 font-semibold">-{b.discount}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-gray-100 font-bold text-gray-600 transition-colors">−</button>
                    <span className="px-4 font-bold text-gray-900">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-gray-100 font-bold text-gray-600 transition-colors">+</button>
                  </div>
                  <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button className="flex items-center justify-center gap-2 px-5 py-3 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-xl transition-colors">
                    <Zap size={18} /> Buy Now
                  </button>
                </div>

                <button className="w-full py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  + Add to Project Kit
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: Shield, text: product.warranty },
                { icon: Truck, text: 'Estimated delivery: 2–4 days' },
                { icon: RefreshCw, text: 'Easy returns within 7 days' },
                { icon: MessageCircle, text: 'WhatsApp support available' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-600">
                  <Icon size={15} className="text-blue-500 flex-shrink-0" />
                  <span className="text-xs">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8">
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {tabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'Description' && (
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p>{product.longDescription}</p>
                <h4 className="font-bold mt-4 mb-2">What&apos;s Included</h4>
                <ul>{product.includedItems.map((i) => <li key={i}>{i}</li>)}</ul>
                {product.requiredAccessories.length > 0 && (
                  <>
                    <h4 className="font-bold mt-4 mb-2">Required Accessories (sold separately)</h4>
                    <ul>{product.requiredAccessories.map((a) => <li key={a}>{a}</li>)}</ul>
                  </>
                )}
              </div>
            )}

            {activeTab === 'Specifications' && (
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-semibold text-gray-700 w-48">{key}</td>
                        <td className="px-4 py-3 text-gray-600">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Wiring' && (
              <div className="text-center py-8 text-gray-500">
                <div className="text-4xl mb-3">🔌</div>
                <p className="font-semibold mb-2">Wiring Diagrams Available</p>
                <p className="text-sm mb-4">Includes Arduino, ESP32, and Raspberry Pi wiring guides.</p>
                <button className="btn-primary inline-flex gap-2"><Download size={16} /> Download Wiring Diagrams PDF</button>
              </div>
            )}

            {activeTab === 'Code' && (
              <div>
                <div className="flex gap-3 mb-4">
                  {['Arduino', 'ESP32', 'Python', 'Library'].map((lang) => (
                    <button key={lang} className="px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-lg transition-colors">{lang}</button>
                  ))}
                </div>
                <pre className="bg-[#0f172a] text-green-400 p-5 rounded-xl text-sm overflow-x-auto font-mono leading-relaxed">
{`// ${product.name} — Arduino Example
#include <Arduino.h>

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT);
  pinMode(9, OUTPUT);
  Serial.println("${product.name} initialized!");
}

void loop() {
  int value = digitalRead(2);
  if (value == HIGH) {
    digitalWrite(9, HIGH);
  } else {
    digitalWrite(9, LOW);
  }
  delay(100);
}`}
                </pre>
                <button className="mt-3 btn-secondary inline-flex gap-2 text-sm"><Download size={15} /> Download Full Code Pack</button>
              </div>
            )}

            {activeTab === 'Projects' && (
              <div>
                <p className="text-sm text-gray-600 mb-4">This component is used in these projects:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {product.projectTags.map((tag) => (
                    <Link key={tag} href={`/projects/${tag}`} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                      <span className="text-2xl">🤖</span>
                      <div>
                        <div className="text-sm font-bold text-gray-900 capitalize">{tag.replace(/-/g, ' ')}</div>
                        <div className="text-xs text-gray-400">View full kit →</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Reviews' && (
              <div>
                <div className="flex flex-col sm:flex-row gap-6 mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-center flex-shrink-0">
                    <div className="text-5xl font-black text-gray-900">4.8</div>
                    <div className="flex justify-center my-1.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={16} className={s <= 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-yellow-200 text-yellow-200'} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">out of 5</div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[{stars: 5,pct: 72},{stars: 4,pct: 18},{stars: 3,pct: 6},{stars: 2,pct: 2},{stars: 1,pct: 2}].map(({ stars, pct }) => (
                      <div key={stars} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-3 text-right">{stars}</span>
                        <Star size={10} className="fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-7">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Arjun S.', city: 'Pune', rating: 5, date: '14 Mar 2025', project: 'Line Follower Robot', text: 'Absolutely brilliant product. I used this in my college mini-project to build a PID-controlled line follower robot. Followed the wiring guide from the Learning Hub and had the robot running in under 3 hours. The sensor came neatly packaged with all pins labeled — no guesswork at all.', helpful: 24 },
                    { name: 'Meera J.', city: 'Bangalore', rating: 5, date: '2 Apr 2025', project: 'Smart Home Automation', text: 'Ordered three of these for a smart home prototype as part of my final year B.Tech project. All three worked perfectly out of the box with ESP32. RoboKit ships fast — received in just 2 days to Bangalore. The included sample code saved me hours of setup time.', helpful: 17 },
                    { name: 'Vikram T.', city: 'Chennai', rating: 4, date: '18 Apr 2025', project: 'Obstacle Avoidance Bot', text: 'Good quality product that performed reliably throughout my obstacle avoidance robot build. My only minor gripe is that the mounting holes are slightly smaller than I expected. Signal quality and range were excellent. Very satisfied with the purchase overall.', helpful: 12 },
                    { name: 'Priya N.', city: 'Hyderabad', rating: 5, date: '1 May 2025', project: 'Robotics Lab Setup', text: 'Our school purchased 15 units for the robotics club and every single one worked perfectly. RoboKit sent a proper GST invoice which was important for school procurement. The team even answered our technical questions on WhatsApp on a Sunday — that level of support is rare!', helpful: 31 },
                    { name: 'Ravi K.', city: 'Jaipur', rating: 4, date: '20 May 2025', project: 'Bluetooth Controlled Car', text: 'Used this in a Bluetooth-controlled car project with an Arduino Nano and L298N motor driver. Worked exactly as described. The code example was a great starting point. Delivery was quick, packaging was secure, and the product is genuinely good quality.', helpful: 9 },
                  ].map((review) => (
                    <div key={review.name + review.city} className="p-5 rounded-xl border border-gray-100 bg-white shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-9 h-9 rounded-full bg-[#0f2744] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {review.name.slice(0, 1)}{review.name.split(' ')[1]?.slice(0, 1) ?? ''}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-gray-900">{review.name}</span>
                            <span className="text-xs text-gray-400">{review.city}</span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 border border-green-200 rounded-full text-[10px] font-bold text-green-700">
                              <CheckCircle size={9} className="text-green-500" /> Verified
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex">
                              {[1,2,3,4,5].map((s) => (
                                <Star key={s} size={11} className={s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-blue-600 font-semibold mb-2">Project: {review.project}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
                      <p className="text-xs text-gray-400 mt-3">{review.helpful} people found this helpful</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Q&A' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Ask a Question</h3>
                  {questionSent && (
                    <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center gap-2">
                      <CheckCircle size={15} className="text-green-500" /> Question submitted! Our team will respond within 24 hours.
                    </div>
                  )}
                  <form onSubmit={handleAskQuestion} className="flex gap-2">
                    <input type="text" value={newQ} onChange={e => setNewQ(e.target.value)}
                      placeholder="Type your question about this product..."
                      className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300" />
                    <button type="submit" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5">
                      <Send size={14} /> Ask
                    </button>
                  </form>
                </div>
                <div className="space-y-4">
                  {qas.map((qa, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                      <div className="px-4 py-3 bg-gray-50 flex items-start gap-2">
                        <span className="text-blue-600 font-bold text-sm flex-shrink-0">Q</span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{qa.q}</p>
                          <p className="text-xs text-gray-400 mt-0.5">Asked by {qa.asker}</p>
                        </div>
                      </div>
                      <div className="px-4 py-3 flex items-start gap-2">
                        <span className="text-green-600 font-bold text-sm flex-shrink-0">A</span>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{qa.a}</p>
                          {qa.helpful > 0 && (
                            <button className="mt-2 flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors">
                              <ThumbsUp size={11} /> {qa.helpful} found helpful
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'FAQ' && (
              <div className="space-y-3">
                {[
                  { q: `Will this work with my ${product.compatibility[0]}?`, a: `Yes! This product is fully compatible with ${product.compatibility.join(', ')}.` },
                  { q: 'Is wiring diagram included?', a: 'Yes, wiring diagrams for all compatible boards are available in the Wiring tab above and can be downloaded as PDF.' },
                  { q: 'Is this genuine/original product?', a: 'Yes, all products on RoboKit are sourced from verified suppliers and tested before shipping.' },
                  { q: 'Can I get bulk pricing?', a: `Yes! Bulk pricing starts from ${product.bulkPricing[0]?.minQty || 5} units. Check the bulk pricing table above or contact us for custom quotes.` },
                ].map(({ q, a }) => (
                  <details key={q} className="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="px-4 py-3 text-sm font-semibold text-gray-800 cursor-pointer flex items-center justify-between hover:bg-gray-50">
                      {q}
                      <ChevronDown size={16} className="text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-600">{a}</div>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <RecentlyViewed items={recentItems} />
    </div>
  )
}

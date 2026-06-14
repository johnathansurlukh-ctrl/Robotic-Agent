'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Search, Menu, X, ChevronDown, Zap, BookOpen, School, Package, Phone, Star, Heart, Moon, Sun, Coins } from 'lucide-react'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { projects } from '@/data/projects'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useLoyalty } from '@/context/LoyaltyContext'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useCurrency } from '@/context/CurrencyContext'
import { LogIn, LogOut, UserCircle } from 'lucide-react'

const navLinks = [
  { label: 'Shop by Category', href: '/shop', mega: true },
  { label: 'Shop by Project', href: '/projects', children: [
    { label: 'Line Follower Robot', href: '/projects/line-follower-robot' },
    { label: 'Obstacle Avoidance Robot', href: '/projects/obstacle-avoidance-robot' },
    { label: 'Bluetooth Controlled Car', href: '/projects/bluetooth-controlled-robot' },
    { label: 'Robotic Arm Kit', href: '/projects/robotic-arm-kit' },
    { label: 'IoT Robot (ESP32)', href: '/projects/iot-robot' },
    { label: 'AI Vision Robot', href: '/projects/ai-vision-robot' },
    { label: 'View All Projects →', href: '/projects' },
  ]},
  { label: 'Starter Kits', href: '/starter-kits' },
  { label: 'For Schools & Colleges', href: '/schools' },
  { label: 'Learning Hub', href: '/learning-hub' },
  { label: 'Bulk Quote', href: '/bulk-quote' },
]

interface SearchResult {
  type: 'product' | 'project'
  slug: string
  name: string
  image: string
  price: number
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { totalItems, setIsOpen: openCart } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { points } = useLoyalty()
  const { dark, toggle: toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const { fmt } = useCurrency()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    const q = searchQuery.trim().toLowerCase()
    if (q.length < 2) { setSearchResults([]); return }

    const pResults: SearchResult[] = products
      .filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      .slice(0, 5)
      .map(p => ({ type: 'product', slug: p.slug, name: p.name, image: p.images[0], price: p.price }))

    const prResults: SearchResult[] = projects
      .filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)))
      .slice(0, 3)
      .map(p => ({ type: 'project', slug: p.slug, name: p.name, image: p.image, price: p.fullKitPrice }))

    setSearchResults([...pResults, ...prResults])
  }, [searchQuery])

  function handleResultClick(r: SearchResult) {
    setSearchQuery('')
    setSearchResults([])
    setSearchOpen(false)
    router.push(r.type === 'product' ? `/products/${r.slug}` : `/projects/${r.slug}`)
  }

  return (
    <>
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        <span className="flex items-center justify-center gap-2">
          <Zap size={14} />
          Free shipping on orders above ₹999 · Tax Invoice Available · WhatsApp Support: +91 98765 43210
        </span>
      </div>

      <header className={`sticky top-0 z-50 bg-[#0f2744] transition-shadow duration-200 ${scrolled ? 'shadow-2xl' : ''}`}>
        <div className="container-xl">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                <Zap size={20} className="text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight">RoboKit</span>
                <div className="text-[10px] text-blue-300 leading-none -mt-0.5">Project Store</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    onMouseEnter={() => (link.mega || link.children) && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.label}
                    {(link.mega || link.children) && <ChevronDown size={14} />}
                  </Link>

                  {link.mega && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-[640px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-3 gap-3 mt-1"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {categories.slice(0, 9).map((cat) => (
                        <Link key={cat.id} href={`/shop?category=${cat.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors group">
                          <span className="text-2xl">{cat.icon}</span>
                          <div>
                            <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">{cat.name}</div>
                            <div className="text-xs text-gray-400">{cat.productCount} products</div>
                          </div>
                        </Link>
                      ))}
                      <Link href="/shop" className="col-span-3 text-center py-3 text-sm font-semibold text-blue-600 hover:text-blue-800 border-t border-gray-100">
                        View All Categories →
                      </Link>
                    </div>
                  )}

                  {link.children && activeDropdown === link.label && (
                    <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 mt-1"
                      onMouseEnter={() => setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <Link key={child.label} href={child.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">{child.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              {/* Search */}
              <button onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(''); setSearchResults([]) }}
                className="p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Search size={20} />
              </button>

              {/* Dark mode toggle */}
              <button onClick={toggleTheme} className="p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
                {dark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Loyalty points */}
              {points > 0 && (
                <div className="hidden md:flex items-center gap-1 px-2.5 py-1.5 bg-yellow-500/20 rounded-lg">
                  <Coins size={14} className="text-yellow-400" />
                  <span className="text-yellow-300 text-xs font-bold">{points} pts</span>
                </div>
              )}

              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{wishlistCount}</span>
                )}
              </Link>

              {/* Auth */}
              {user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/account" className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{user.initials}</div>
                    <span className="text-sm text-white font-medium max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  </Link>
                  <button onClick={logout} className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Sign out">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden md:flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-colors">
                  <LogIn size={16} /> Sign In
                </Link>
              )}

              {/* Build My Project */}
              <Link href="/build-my-project" className="hidden md:flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-lg transition-colors">
                <Zap size={16} /> Build My Project
              </Link>

              {/* Cart */}
              <button onClick={() => openCart(true)} className="relative p-2 text-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{totalItems}</span>
                )}
              </button>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden p-2 text-gray-200 hover:text-white">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar with autocomplete */}
        {searchOpen && (
          <div className="border-t border-white/10 bg-[#0a1f38]">
            <div className="container-xl py-3">
              <div className="relative max-w-2xl mx-auto" ref={searchRef}>
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search products, kits, sensors... e.g. "Arduino Uno" or "line follower"'
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Dropdown results */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    {searchResults.some(r => r.type === 'product') && (
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">Products</div>
                    )}
                    {searchResults.filter(r => r.type === 'product').map(r => (
                      <button key={r.slug} onClick={() => handleResultClick(r)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left">
                        <img referrerPolicy="no-referrer" src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate">{r.name}</div>
                          <div className="text-xs text-blue-600 font-bold">{fmt(r.price)}</div>
                        </div>
                      </button>
                    ))}
                    {searchResults.some(r => r.type === 'project') && (
                      <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide bg-gray-50 border-b border-gray-100">Project Kits</div>
                    )}
                    {searchResults.filter(r => r.type === 'project').map(r => (
                      <button key={r.slug} onClick={() => handleResultClick(r)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left">
                        <img referrerPolicy="no-referrer" src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 truncate">{r.name}</div>
                          <div className="text-xs text-green-600 font-bold">Kit {fmt(r.price)}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="xl:hidden bg-[#0a1f38] border-t border-white/10">
            <div className="container-xl py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>
                  {link.label === 'Shop by Category' && <Package size={18} />}
                  {link.label === 'For Schools & Colleges' && <School size={18} />}
                  {link.label === 'Learning Hub' && <BookOpen size={18} />}
                  {link.label === 'Bulk Quote' && <Phone size={18} />}
                  {link.label}
                </Link>
              ))}
              <Link href="/wishlist" className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>
                <Heart size={18} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link href="/build-my-project" className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white font-bold rounded-xl mt-2" onClick={() => setMobileOpen(false)}>
                <Zap size={18} /> Build My Project
              </Link>
              {user ? (
                <>
                  <Link href="/account" className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">{user.initials}</div>
                    My Account
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false) }} className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors w-full text-left">
                    <LogOut size={18} /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors" onClick={() => setMobileOpen(false)}>
                  <LogIn size={18} /> Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  )
}

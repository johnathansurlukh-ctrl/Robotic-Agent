import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/data/categories'

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="section-heading">Shop by Category</h2>
            <p className="section-subheading">500+ products across all robotics categories.</p>
          </div>
          <Link href="/shop" className="hidden md:flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:text-blue-800">
            Browse all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="card p-4 text-center group hover:-translate-y-1"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">{cat.name}</div>
              <div className="text-xs text-gray-400 mt-1">{cat.productCount} items</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

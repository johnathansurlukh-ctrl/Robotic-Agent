export interface Product {
  id: string
  slug: string
  name: string
  sku: string
  category: string
  brand: string
  price: number
  originalPrice?: number
  stock: 'in_stock' | 'low_stock' | 'out_of_stock'
  rating: number
  reviewCount: number
  images: string[]
  shortDescription: string
  longDescription: string
  specs: Record<string, string>
  compatibility: string[]
  requiredAccessories: string[]
  includedItems: string[]
  safetyWarning?: string
  warranty: string
  datasheetUrl?: string
  codeUrl?: string
  wiringDiagramUrl?: string
  projectTags: string[]
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  suitableFor: ('school' | 'college' | 'competition')[]
  bulkPricing: BulkPrice[]
  relatedProducts: string[]
  featured?: boolean
  badge?: string
}

export interface BulkPrice {
  minQty: number
  maxQty?: number
  price: number
  discount: number
}

export interface Project {
  id: string
  slug: string
  name: string
  tagline: string
  image: string
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced'
  buildTime: string
  skillsLearned: string[]
  components: BOMItem[]
  circuitDiagram?: string
  assemblySteps: AssemblyStep[]
  codeSnippet?: string
  troubleshootingTips: string[]
  fullKitPrice: number
  category: 'school' | 'college' | 'competition' | 'iot' | 'ai'
  tags: string[]
  featured?: boolean
}

export interface BOMItem {
  productId: string
  productName: string
  quantity: number
  price: number
  required: boolean
  notes?: string
}

export interface AssemblyStep {
  step: number
  title: string
  description: string
  image?: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  icon: string
  image: string
  productCount: number
  color: string
}

export interface Bundle {
  id: string
  name: string
  description: string
  type: 'beginner' | 'project' | 'competition' | 'lab' | 'spare'
  products: BOMItem[]
  originalPrice: number
  bundlePrice: number
  savings: number
  image: string
  badge?: string
  targetAudience: string[]
}

export interface Tutorial {
  id: string
  slug: string
  title: string
  excerpt: string
  category: 'beginner' | 'project' | 'buying-guide' | 'troubleshooting'
  readTime: string
  image: string
  relatedProducts: string[]
  date: string
}

export interface FilterState {
  priceRange: [number, number]
  brands: string[]
  difficultyLevels: string[]
  compatibility: string[]
  inStock: boolean
  hasDiscount: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface QuoteRequest {
  name: string
  institutionName: string
  department: string
  city: string
  email: string
  phone: string
  requirementType: string
  numberOfStudents: number
  budgetRange: string
  needWorkshop: boolean
  needTaxInvoice: boolean
  notes: string
}

export interface BuildMyProjectState {
  level: string
  projectType: string
  controller: string
  budget: string
  supportLevel: string
}

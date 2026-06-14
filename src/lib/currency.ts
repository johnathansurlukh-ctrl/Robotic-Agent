export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'SGD' | 'AED' | 'JPY' | 'BRL' | 'MXN'
export type PaymentMethod = 'card' | 'paypal' | 'cashapp' | 'upi' | 'netbanking' | 'cod'

export const CURRENCIES: Record<CurrencyCode, { symbol: string; name: string; rate: number; decimals: number }> = {
  INR: { symbol: '₹',    name: 'Indian Rupee',       rate: 1,       decimals: 0 },
  USD: { symbol: '$',    name: 'US Dollar',           rate: 0.012,   decimals: 2 },
  EUR: { symbol: '€',    name: 'Euro',                rate: 0.011,   decimals: 2 },
  GBP: { symbol: '£',    name: 'British Pound',       rate: 0.0095,  decimals: 2 },
  AUD: { symbol: 'A$',   name: 'Australian Dollar',   rate: 0.0183,  decimals: 2 },
  CAD: { symbol: 'C$',   name: 'Canadian Dollar',     rate: 0.0163,  decimals: 2 },
  SGD: { symbol: 'S$',   name: 'Singapore Dollar',    rate: 0.0162,  decimals: 2 },
  AED: { symbol: 'AED ', name: 'UAE Dirham',           rate: 0.044,   decimals: 2 },
  JPY: { symbol: '¥',    name: 'Japanese Yen',         rate: 1.8,     decimals: 0 },
  BRL: { symbol: 'R$',   name: 'Brazilian Real',       rate: 0.066,   decimals: 2 },
  MXN: { symbol: 'MX$',  name: 'Mexican Peso',         rate: 0.2,     decimals: 2 },
}

export const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  IN: 'INR', US: 'USD', CA: 'CAD', GB: 'GBP', AU: 'AUD', NZ: 'AUD',
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR',
  AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR', GR: 'EUR',
  SG: 'SGD', AE: 'AED', SA: 'AED', JP: 'JPY', BR: 'BRL', MX: 'MXN',
}

export function formatCurrency(inrAmount: number, code: CurrencyCode): string {
  const { symbol, rate, decimals } = CURRENCIES[code]
  const val = inrAmount * rate
  return decimals === 0
    ? `${symbol}${Math.round(val).toLocaleString()}`
    : `${symbol}${val.toFixed(decimals)}`
}

export function getPaymentMethods(country: string): PaymentMethod[] {
  if (country === 'IN') return ['upi', 'card', 'netbanking', 'cod']
  if (country === 'US') return ['paypal', 'card', 'cashapp']
  return ['paypal', 'card']
}

export const COUPONS: Record<string, { type: 'percent' | 'flat'; value: number; label: string; minOrder?: number; max?: number }> = {
  ROBO10:   { type: 'percent', value: 10, label: '10% off your order' },
  SCHOOL20: { type: 'percent', value: 20, label: '20% off for schools' },
  FIRST15:  { type: 'percent', value: 15, label: '15% off first order' },
  SAVE100:  { type: 'flat',    value: 100, label: '₹100 off (min ₹500)', minOrder: 500 },
  SUMMER25: { type: 'percent', value: 25, label: '25% off', max: 500 },
}

export function applyCoupon(code: string, subtotalINR: number): { discount: number; label: string } | null {
  const coupon = COUPONS[code.toUpperCase()]
  if (!coupon) return null
  if (coupon.minOrder && subtotalINR < coupon.minOrder) return null
  const raw = coupon.type === 'percent'
    ? subtotalINR * (coupon.value / 100)
    : coupon.value
  const discount = coupon.max ? Math.min(raw, coupon.max) : raw
  return { discount, label: coupon.label }
}

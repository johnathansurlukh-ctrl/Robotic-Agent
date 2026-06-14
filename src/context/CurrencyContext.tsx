'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { CurrencyCode, COUNTRY_CURRENCY, CURRENCIES, formatCurrency } from '@/lib/currency'

interface CurrencyContextType {
  currency: CurrencyCode
  country: string
  city: string
  setCurrency: (c: CurrencyCode) => void
  fmt: (inrAmount: number) => string
  loading: boolean
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'INR', country: 'IN', city: '', loading: true,
  setCurrency: () => {},
  fmt: (n) => `₹${n.toLocaleString()}`,
})

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('INR')
  const [country, setCountry] = useState('IN')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/location')
      .then(r => r.json())
      .then(data => {
        const detected = COUNTRY_CURRENCY[data.country] ?? 'INR'
        setCurrency(detected)
        setCountry(data.country ?? 'IN')
        setCity(data.city ?? '')
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const fmt = (inrAmount: number) => formatCurrency(inrAmount, currency)

  return (
    <CurrencyContext.Provider value={{ currency, country, city, setCurrency, fmt, loading }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => useContext(CurrencyContext)
export { CURRENCIES }

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1'
    const isLocal = ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')

    if (isLocal) {
      return NextResponse.json({ country: 'IN', country_name: 'India', city: 'Mumbai', currency: 'INR' })
    }

    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'RoboKit/1.0' },
      next: { revalidate: 3600 },
    })
    const data = await res.json()

    return NextResponse.json({
      country: data.country_code ?? 'IN',
      country_name: data.country_name ?? 'India',
      city: data.city ?? '',
      currency: data.currency ?? 'INR',
    })
  } catch {
    return NextResponse.json({ country: 'IN', country_name: 'India', city: '', currency: 'INR' })
  }
}

import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: { default: 'RoboKit — Robotics Hardware for Students & Schools', template: '%s | RoboKit' },
  description: 'Buy tested robotics kits, sensors, motors, controllers, and complete project bundles with wiring diagrams, code, and support.',
  keywords: ['robotics kits', 'arduino', 'esp32', 'school robotics', 'engineering project kits'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

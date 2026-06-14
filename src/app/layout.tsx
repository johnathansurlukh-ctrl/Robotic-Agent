import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ComparisonProvider } from '@/context/ComparisonContext'
import { LoyaltyProvider } from '@/context/LoyaltyContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import CartDrawer from '@/components/cart/CartDrawer'
import ComparisonBar from '@/components/ui/ComparisonBar'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import SocialProofToast from '@/components/ui/SocialProofToast'
import NewsletterPopup from '@/components/ui/NewsletterPopup'
import AIAssistant from '@/components/ui/AIAssistant'
import FlashSaleBanner from '@/components/ui/FlashSaleBanner'
import LiveChat from '@/components/ui/LiveChat'

export const metadata: Metadata = {
  title: { default: 'RoboKit — Robotics Hardware for Students & Schools', template: '%s | RoboKit' },
  description: 'Buy tested robotics kits, sensors, motors, controllers, and complete project bundles with wiring diagrams, code, and support.',
  keywords: ['robotics kits', 'arduino', 'esp32', 'school robotics', 'engineering project kits'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider><ThemeProvider>
          <CurrencyProvider>
            <LoyaltyProvider>
              <WishlistProvider>
                <ComparisonProvider>
                  <CartProvider>
                    <FlashSaleBanner />
                    <Header />
                    <CartDrawer />
                    <main>{children}</main>
                    <Footer />
                    <ComparisonBar />
                    <WhatsAppButton />
                    <SocialProofToast />
                    <NewsletterPopup />
                    <AIAssistant />
                    <LiveChat />
                  </CartProvider>
                </ComparisonProvider>
              </WishlistProvider>
            </LoyaltyProvider>
          </CurrencyProvider>
        </ThemeProvider></AuthProvider>
      </body>
    </html>
  )
}

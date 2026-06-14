'use client'

import { useState, useEffect } from 'react'
import { Camera, Box, RotateCcw, ZoomIn, RotateCw, Smartphone, X } from 'lucide-react'

interface ARPreviewProps {
  productName: string
  productImage: string
}

export default function ARPreview({ productName, productImage }: ARPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        @keyframes ar-scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        @keyframes ar-float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(-3deg); }
        }
        .ar-scan-line {
          animation: ar-scan 2s linear infinite;
        }
        .ar-float-image {
          animation: ar-float 3s ease-in-out infinite;
        }
      `}</style>

      <button
        className="btn-secondary flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Camera size={18} />
        <Box size={18} />
        <span>AR Preview</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80"
          onClick={handleOverlayClick}
        >
          <div className="relative bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl w-[380px] max-w-[95vw]">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Box size={18} className="text-indigo-400" />
                <span>AR Preview</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col items-center gap-4">
              {isMobile ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <Smartphone size={48} className="text-indigo-400" />
                  <p className="text-white/80 text-sm">
                    AR Preview is only available on mobile devices. Open this page on your phone to experience it in your space.
                  </p>
                </div>
              ) : (
                <>
                  {/* Mock Camera Feed */}
                  <div
                    className="relative w-full overflow-hidden rounded-xl"
                    style={{
                      height: '340px',
                      backgroundColor: '#1a1f2e',
                      backgroundImage: `
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 39px,
                          rgba(99, 102, 241, 0.15) 39px,
                          rgba(99, 102, 241, 0.15) 40px
                        ),
                        repeating-linear-gradient(
                          90deg,
                          transparent,
                          transparent 39px,
                          rgba(99, 102, 241, 0.15) 39px,
                          rgba(99, 102, 241, 0.15) 40px
                        )
                      `,
                    }}
                  >
                    {/* AR Corner Markers */}
                    {/* Top Left */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-400 rounded-tl" />
                    {/* Top Right */}
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-400 rounded-tr" />
                    {/* Bottom Left */}
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-indigo-400 rounded-bl" />
                    {/* Bottom Right */}
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-indigo-400 rounded-br" />

                    {/* Scanning Line */}
                    <div
                      className="ar-scan-line absolute left-0 right-0 h-[2px] opacity-70"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.8), transparent)',
                      }}
                    />

                    {/* Floating Product Image */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <img
                        src={productImage}
                        alt={productName}
                        className="ar-float-image w-36 h-36 object-contain"
                        style={{
                          filter: 'drop-shadow(0 12px 24px rgba(99,102,241,0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
                        }}
                      />
                      {/* Pill Text */}
                      <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 text-white/80 text-xs">
                        Place it anywhere in your room
                      </div>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => showToast('Rotating left...')}
                      className="flex flex-col items-center gap-1 text-white/60 hover:text-indigo-400 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-500/10 border border-white/10 flex items-center justify-center transition-colors">
                        <RotateCcw size={18} />
                      </div>
                      <span className="text-[10px]">Rotate L</span>
                    </button>
                    <button
                      onClick={() => showToast('Zooming in...')}
                      className="flex flex-col items-center gap-1 text-white/60 hover:text-indigo-400 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-500/10 border border-white/10 flex items-center justify-center transition-colors">
                        <ZoomIn size={18} />
                      </div>
                      <span className="text-[10px]">Zoom In</span>
                    </button>
                    <button
                      onClick={() => showToast('Rotating right...')}
                      className="flex flex-col items-center gap-1 text-white/60 hover:text-indigo-400 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-indigo-500/10 border border-white/10 flex items-center justify-center transition-colors">
                        <RotateCw size={18} />
                      </div>
                      <span className="text-[10px]">Rotate R</span>
                    </button>
                  </div>
                </>
              )}

              {/* Fallback Link */}
              <button
                className="text-white/40 hover:text-white/70 text-xs underline underline-offset-2 transition-colors"
                onClick={() => showToast('AR Preview requires a mobile device with a camera. Open this page on your phone to use it.')}
              >
                Not supported on this device?
              </button>
            </div>
          </div>

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] bg-[#1a1f2e] border border-indigo-500/30 text-white text-sm px-5 py-3 rounded-xl shadow-lg">
              {toast}
            </div>
          )}
        </div>
      )}
    </>
  )
}

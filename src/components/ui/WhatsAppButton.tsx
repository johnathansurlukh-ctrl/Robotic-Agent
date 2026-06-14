import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group flex items-center gap-2"
      aria-label="Chat with us on WhatsApp"
    >
      {/* Tooltip */}
      <span className="hidden group-hover:flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap mr-1 transition-all">
        WhatsApp us
      </span>

      {/* Pulse ring */}
      <span className="relative flex items-center justify-center">
        <span className="absolute inline-flex h-14 w-14 rounded-full bg-green-400 opacity-40 animate-ping" />
        <span className="relative flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full shadow-lg shadow-green-500/50 ring-2 ring-white/30 transition-colors">
          <MessageCircle size={26} className="text-white fill-white" />
        </span>
      </span>
    </a>
  )
}

'use client'
import { useState, useRef, useEffect } from 'react'
import { Headphones, X, Send, ChevronDown } from 'lucide-react'

interface ChatMessage {
  from: 'agent' | 'user'
  text: string
  time: string
}

function getAutoReply(input: string): string {
  const q = input.toLowerCase()
  if (/track|order/.test(q))
    return 'I can help with that! Please share your order ID and I\'ll look it up right away.'
  if (/bulk|school|college/.test(q))
    return 'Great! For bulk orders, I can offer special pricing. Could you share how many units you need?'
  if (/technical|help|sensor|motor|arduino/.test(q))
    return 'Sure, I\'ll connect you with our technical team. Meanwhile, check our Learning Hub at /learning-hub for quick answers!'
  return 'Thanks for reaching out! Let me check that for you. One moment please. 😊'
}

function timeAgo(minsAgo: number): string {
  if (minsAgo === 0) return 'Just now'
  if (minsAgo === 1) return '1 min ago'
  return `${minsAgo} mins ago`
}

function nowTime(): string {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

const QUICK_CHIPS = [
  'Track my order',
  'Product question',
  'Bulk order inquiry',
  'Technical help',
]

export default function LiveChat() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [chipsVisible, setChipsVisible] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: 'agent',
      text: "Hi! 👋 I'm Rohit from RoboKit support. How can I help you today?",
      time: '',
    },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setMounted(true)
    setMessages(prev => [{ ...prev[0], time: timeAgo(2) }])
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setChipsVisible(false)
    setMessages(prev => [...prev, { from: 'user', text: trimmed, time: nowTime() }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [
        ...prev,
        { from: 'agent', text: getAutoReply(trimmed), time: nowTime() },
      ])
    }, 1500)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  if (!mounted) return null

  return (
    <>
      {/* ── Expanded chat window ── */}
      {open && (
        <div
          className={[
            'fixed z-50 bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden',
            // Desktop: fixed bottom-left panel
            'sm:bottom-24 sm:left-6 sm:w-[380px] sm:h-[480px] sm:rounded-3xl',
            // Mobile: full-width bottom sheet
            'bottom-0 left-0 right-0 sm:right-auto h-[90dvh] sm:h-[480px] rounded-t-3xl sm:rounded-3xl',
          ].join(' ')}
        >
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-emerald-600 to-emerald-700 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                <Headphones size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-tight">Live Support</div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-emerald-100 text-xs">Online — avg reply 2 min</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Minimize chat"
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Agent info bar */}
          <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900">
            {/* Avatar with initials */}
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold tracking-wide">RS</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                Rohit S. — Support Agent
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                Typically replies in 2 minutes
              </div>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50 dark:bg-gray-950">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold ${
                    msg.from === 'agent'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {msg.from === 'agent' ? 'RS' : 'You'}
                </div>

                <div
                  className={`max-w-[80%] flex flex-col gap-1 ${
                    msg.from === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.from === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-sm'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-sm shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.time && (
                    <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white">
                  RS
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 150, 300].map(delay => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quick reply chips — shown only before first user message */}
            {chipsVisible && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_CHIPS.map(chip => (
                  <button
                    key={chip}
                    onClick={() => sendMessage(chip)}
                    className="text-xs px-3 py-1.5 bg-white dark:bg-gray-800 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors font-medium shadow-sm"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <form
            onSubmit={handleSubmit}
            className="flex-shrink-0 px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 px-4 py-2.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              aria-label="Send message"
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Footer */}
          <div className="flex-shrink-0 py-2 text-center bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <span className="text-[10px] text-gray-400">Powered by RoboKit Support</span>
          </div>
        </div>
      )}

      {/* ── Collapsed trigger button — bottom-left ── */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label="Live Support"
        className="fixed bottom-6 left-6 z-50 group flex items-center gap-2"
      >
        {/* Tooltip */}
        {!open && (
          <span className="hidden group-hover:flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap ml-0 mr-auto transition-all">
            Live Support
          </span>
        )}

        <span className="relative flex items-center justify-center order-first">
          {/* Pulse ring */}
          {!open && (
            <span className="absolute inline-flex h-14 w-14 rounded-full bg-emerald-400 opacity-40 animate-ping" />
          )}
          {/* Button circle */}
          <span
            className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg ring-2 ring-white/30 transition-all duration-300 ${
              open
                ? 'bg-gray-700 hover:bg-gray-800 shadow-gray-500/40'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/50 hover:scale-110'
            }`}
          >
            <Headphones size={24} className="text-white" />
          </span>
          {/* Green "Online" dot */}
          {!open && (
            <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full" />
          )}
        </span>
      </button>
    </>
  )
}

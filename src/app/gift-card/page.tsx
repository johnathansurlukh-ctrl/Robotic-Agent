'use client';

import { useState } from 'react';
import {
  Gift,
  Mail,
  Calendar,
  CheckCircle,
  CreditCard,
  Tag,
  Clock,
  AlertCircle,
  PartyPopper,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const DENOMINATIONS = [500, 1000, 2000, 5000];

const VALID_CODES: Record<string, number> = {
  'DEMO-1234-5678-XXXX': 500,
  'TEST-ABCD-EFGH-XXXX': 1000,
};

function generateGiftCode(): string {
  const seg = () =>
    Math.random().toString(36).substring(2, 6).toUpperCase();
  return `GIFT-${seg()}-${seg()}-${seg()}`;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

export default function GiftCardPage() {
  // --- Buy state ---
  const [selectedDenom, setSelectedDenom] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryMode, setDeliveryMode] = useState<'instant' | 'schedule'>('instant');
  const [scheduleDate, setScheduleDate] = useState('');
  const [buyLoading, setBuyLoading] = useState(false);
  const [buySuccess, setBuySuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [buyErrors, setBuyErrors] = useState<Record<string, string>>({});

  // --- Redeem state ---
  const [redeemCode, setRedeemCode] = useState('');
  const [redeemLoading, setRedeemLoading] = useState(false);
  const [redeemError, setRedeemError] = useState('');
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [balance, setBalance] = useState(0);
  const [lastRedeemed, setLastRedeemed] = useState(0);

  // --- FAQ state ---
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ---- Buy logic ----
  const getFinalAmount = (): number | null => {
    if (selectedDenom !== null) return selectedDenom;
    const val = parseInt(customAmount, 10);
    if (!isNaN(val)) return val;
    return null;
  };

  function validateBuy(): boolean {
    const errors: Record<string, string> = {};
    const amount = getFinalAmount();
    if (!amount || amount < 100 || amount > 10000) {
      errors.amount = 'Please select a denomination or enter a custom amount between ₹100 and ₹10,000.';
    }
    if (!recipientName.trim()) {
      errors.recipientName = 'Recipient name is required.';
    }
    if (!recipientEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      errors.recipientEmail = 'Please enter a valid recipient email.';
    }
    if (deliveryMode === 'schedule' && !scheduleDate) {
      errors.scheduleDate = 'Please select a delivery date.';
    }
    setBuyErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleBuySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateBuy()) return;
    setBuyLoading(true);
    setTimeout(() => {
      const code = generateGiftCode();
      setGeneratedCode(code);
      setBuyLoading(false);
      setBuySuccess(true);
    }, 800);
  }

  function handleBuyReset() {
    setSelectedDenom(1000);
    setCustomAmount('');
    setRecipientName('');
    setRecipientEmail('');
    setSenderName('');
    setMessage('');
    setDeliveryMode('instant');
    setScheduleDate('');
    setBuyErrors({});
    setBuySuccess(false);
    setGeneratedCode('');
  }

  // ---- Redeem logic ----
  function handleRedeemSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRedeemError('');
    setRedeemSuccess(false);
    if (!redeemCode.trim()) {
      setRedeemError('Please enter a gift card code.');
      return;
    }
    setRedeemLoading(true);
    setTimeout(() => {
      const amount = VALID_CODES[redeemCode.trim().toUpperCase()];
      if (amount !== undefined) {
        setBalance((prev) => prev + amount);
        setLastRedeemed(amount);
        setRedeemSuccess(true);
        setRedeemCode('');
      } else {
        setRedeemError('Invalid or already-used gift card code. Please try again.');
      }
      setRedeemLoading(false);
    }, 800);
  }

  const faqs = [
    {
      q: 'When do gift cards expire?',
      a: 'Gift cards are valid for 12 months from the date of purchase. Any unused balance will expire after this period and cannot be refunded.',
    },
    {
      q: 'How do I check my gift card balance?',
      a: 'You can check your balance by entering your gift card code in the Redeem section on this page. Your current account balance is displayed at the top of the section.',
    },
    {
      q: 'Are there any terms or restrictions?',
      a: 'Gift cards can be used to purchase any product on our platform. They cannot be exchanged for cash, combined with other discount codes, or used to purchase additional gift cards.',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="bg-[#0f2744] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-3">
          <div className="flex items-center gap-3">
            <Gift className="w-9 h-9 text-violet-300" />
            <h1 className="text-3xl font-bold tracking-tight">Gift Cards</h1>
          </div>
          <p className="text-blue-200 max-w-xl text-sm">
            Give the gift of robotics. Send a gift card instantly by email or schedule it for a special date.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ===== BUY SECTION ===== */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-2 mb-5">
            <CreditCard className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-semibold">Buy a Gift Card</h2>
          </div>

          {buySuccess ? (
            <div className="flex flex-col items-center gap-5 py-4">
              <PartyPopper className="w-12 h-12 text-violet-500" />
              <p className="text-xl font-bold text-center">Gift Card Sent!</p>

              {/* Card mockup */}
              <div className="w-full max-w-xs rounded-xl bg-gradient-to-br from-violet-600 via-blue-500 to-cyan-400 p-5 shadow-lg text-white">
                <div className="flex justify-between items-start mb-6">
                  <Gift className="w-7 h-7 opacity-90" />
                  <span className="text-xs font-semibold uppercase tracking-widest opacity-80">Gift Card</span>
                </div>
                <p className="text-2xl font-bold mb-1">₹{getFinalAmount()?.toLocaleString('en-IN')}</p>
                <p className="font-mono text-sm tracking-widest opacity-90 mb-3">{generatedCode}</p>
                <p className="text-xs opacity-75">For {recipientName}</p>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                A confirmation has been sent to{' '}
                <span className="font-medium text-gray-700 dark:text-gray-200">{recipientEmail}</span>.
              </p>
              <button
                onClick={handleBuyReset}
                className="mt-2 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleBuySubmit} className="flex flex-col gap-4">
              {/* Denomination */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Select Amount
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {DENOMINATIONS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setSelectedDenom(d);
                        setCustomAmount('');
                      }}
                      className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${
                        selectedDenom === d
                          ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                          : 'border-gray-200 dark:border-gray-700 hover:border-violet-300 dark:hover:border-violet-600 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      ₹{d.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Custom amount (₹100 – ₹10,000)"
                    value={customAmount}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '');
                      setCustomAmount(v);
                      if (v) setSelectedDenom(null);
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-gray-100"
                  />
                </div>
                {buyErrors.amount && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {buyErrors.amount}
                  </p>
                )}
              </div>

              {/* Recipient name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-gray-100"
                />
                {buyErrors.recipientName && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {buyErrors.recipientName}
                  </p>
                )}
              </div>

              {/* Recipient email */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Recipient Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="recipient@email.com"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-gray-100"
                  />
                </div>
                {buyErrors.recipientEmail && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {buyErrors.recipientEmail}
                  </p>
                )}
              </div>

              {/* Sender name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Your Name <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Maria"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-gray-100"
                />
              </div>

              {/* Personal message */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Personal Message <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Write a short note..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-gray-100 resize-none"
                />
              </div>

              {/* Delivery toggle */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Delivery
                </label>
                <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('instant')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                      deliveryMode === 'instant'
                        ? 'bg-violet-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email Instantly
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('schedule')}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 text-sm font-medium transition-colors ${
                      deliveryMode === 'schedule'
                        ? 'bg-violet-600 text-white'
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule for Date
                  </button>
                </div>

                {deliveryMode === 'schedule' && (
                  <div className="mt-3">
                    <input
                      type="date"
                      min={today()}
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 dark:text-gray-100"
                    />
                    {buyErrors.scheduleDate && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {buyErrors.scheduleDate}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={buyLoading}
                className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                {buyLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Gift className="w-4 h-4" />
                    Send Gift Card
                  </>
                )}
              </button>
            </form>
          )}
        </section>

        {/* ===== REDEEM SECTION ===== */}
        <section className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Tag className="w-5 h-5 text-cyan-500" />
              <h2 className="text-lg font-semibold">Redeem a Gift Card</h2>
            </div>

            {/* Balance display */}
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <CreditCard className="w-4 h-4" />
                Current Balance
              </div>
              <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                ₹{balance.toLocaleString('en-IN')}
              </span>
            </div>

            {redeemSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 px-4 py-3 text-green-700 dark:text-green-300 text-sm">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>
                  Successfully added{' '}
                  <span className="font-semibold">₹{lastRedeemed.toLocaleString('en-IN')}</span> to your account.
                </span>
              </div>
            )}

            <form onSubmit={handleRedeemSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Gift Card Code
                </label>
                <input
                  type="text"
                  value={redeemCode}
                  onChange={(e) => {
                    setRedeemCode(e.target.value);
                    setRedeemError('');
                    setRedeemSuccess(false);
                  }}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:text-gray-100 uppercase"
                />
                {redeemError && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {redeemError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={redeemLoading}
                className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                {redeemLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Apply to Account
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sample codes */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Sample Codes for Testing</h3>
            </div>
            <div className="flex flex-col gap-3">
              {Object.entries(VALID_CODES).map(([code, amount]) => (
                <div
                  key={code}
                  className="flex items-center justify-between rounded-lg bg-gray-50 dark:bg-gray-800 px-4 py-3"
                >
                  <div>
                    <p className="font-mono text-xs text-gray-700 dark:text-gray-200 tracking-wide">{code}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                      Worth ₹{amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRedeemCode(code);
                      setRedeemError('');
                      setRedeemSuccess(false);
                    }}
                    className="text-xs px-3 py-1.5 rounded-md bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-medium hover:bg-cyan-200 dark:hover:bg-cyan-800/40 transition-colors"
                  >
                    Use
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-base font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
            {faqs.map((faq, i) => (
              <div key={i} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between text-left gap-4"
                >
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  )}
                </button>
                {openFaq === i && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

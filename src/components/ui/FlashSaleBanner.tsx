"use client";

import { useEffect, useRef, useState } from "react";

interface CountdownValue {
  hours: string;
  minutes: string;
  seconds: string;
}

function CountdownSegment({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="bg-white/20 backdrop-blur-sm text-white font-mono tabular-nums text-lg font-bold px-3 py-1 rounded-lg min-w-[2.5rem] text-center">
        {value}
      </span>
      <span className="text-white/80 text-xs mt-1 uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

const STORAGE_KEY = "rk_flash_sale_dismissed";
const SALE_DURATION_MS = 2 * 60 * 60 * 1000; // 2 hours

function toTwoDigits(n: number): string {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getRemainingMs(endTime: number): number {
  return Math.max(0, endTime - Date.now());
}

function msToCountdown(ms: number): CountdownValue {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: toTwoDigits(hours),
    minutes: toTwoDigits(minutes),
    seconds: toTwoDigits(seconds),
  };
}

export default function FlashSaleBanner() {
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [countdown, setCountdown] = useState<CountdownValue | null>(null);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Check dismissed state before anything else
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        setDismissed(true);
        setMounted(true);
        return;
      }
    } catch {
      // private mode or storage unavailable — proceed normally
    }

    // Write end time once into a ref — never triggers a re-render
    endTimeRef.current = Date.now() + SALE_DURATION_MS;

    // Set initial countdown value
    setCountdown(msToCountdown(getRemainingMs(endTimeRef.current)));
    setMounted(true);

    const interval = setInterval(() => {
      if (endTimeRef.current === null) return;
      const remaining = getRemainingMs(endTimeRef.current);
      setCountdown(msToCountdown(remaining));
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function handleDismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // private mode or storage unavailable
    }
  }

  // Mount guard — prevents hydration mismatch; server always renders null
  if (!mounted) return null;
  if (dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="Flash sale"
      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Left: label */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-extrabold text-sm tracking-wide uppercase whitespace-nowrap">
              Flash Sale
            </span>
            <span className="hidden sm:inline text-orange-100 text-sm font-medium">
              &mdash; Limited time offer!
            </span>
            <span className="sm:hidden text-orange-100 text-xs font-medium">
              Limited time offer!
            </span>
          </div>

          {/* Center: countdown */}
          <div className="flex items-center gap-3 shrink-0">
            {countdown ? (
              <>
                <CountdownSegment label="HH" value={countdown.hours} />
                <span className="text-yellow-200 font-bold text-xl leading-none select-none mb-4">
                  :
                </span>
                <CountdownSegment label="MM" value={countdown.minutes} />
                <span className="text-yellow-200 font-bold text-xl leading-none select-none mb-4">
                  :
                </span>
                <CountdownSegment label="SS" value={countdown.seconds} />
              </>
            ) : (
              <>
                <CountdownSegment label="HH" value="--" />
                <span className="text-yellow-200 font-bold text-xl leading-none select-none mb-4">
                  :
                </span>
                <CountdownSegment label="MM" value="--" />
                <span className="text-yellow-200 font-bold text-xl leading-none select-none mb-4">
                  :
                </span>
                <CountdownSegment label="SS" value="--" />
              </>
            )}
          </div>

          {/* Right: CTA + dismiss */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/shop"
              className="bg-white text-orange-600 hover:bg-orange-50 active:bg-orange-100 font-bold text-xs px-4 py-1.5 rounded-full transition-colors whitespace-nowrap shadow-sm"
            >
              Shop Now
            </a>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss flash sale banner"
              className="p-1 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors text-white text-xl leading-none"
            >
              &times;
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

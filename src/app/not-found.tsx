'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, ShoppingBag, BookOpen, Headphones, ArrowLeft, Bot } from 'lucide-react';

const quickLinks = [
  {
    href: '/',
    icon: Home,
    title: 'Home',
    description: 'Return to the main page and start fresh.',
  },
  {
    href: '/shop',
    icon: ShoppingBag,
    title: 'Shop',
    description: 'Browse our full catalog of robotics components.',
  },
  {
    href: '/projects',
    icon: BookOpen,
    title: 'Projects',
    description: 'Explore build guides and project inspiration.',
  },
  {
    href: '/support',
    icon: Headphones,
    title: 'Support',
    description: 'Our team is ready to help you get unstuck.',
  },
];

export default function NotFound() {
  const [count, setCount] = useState(0);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const target = 404;
    const duration = 800;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setEyeOffset({
        x: Math.max(-3, Math.min(3, dx * 3)),
        y: Math.max(-3, Math.min(3, dy * 3)),
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 py-16">
      {/* 404 heading */}
      <div className="text-8xl font-black bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-none select-none tabular-nums">
        {count}
      </div>

      {/* Robot SVG */}
      <div className="mt-6 mb-2 flex items-center justify-center">
        <svg
          width="120"
          height="130"
          viewBox="0 0 120 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="drop-shadow-lg"
        >
          {/* Antenna */}
          <line x1="60" y1="10" x2="60" y2="25" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="7" r="5" fill="#6366f1" />

          {/* Head */}
          <rect x="25" y="25" width="70" height="52" rx="12" fill="#3b82f6" />
          <rect x="29" y="29" width="62" height="44" rx="9" fill="#1d4ed8" />

          {/* Left eye */}
          <circle cx="44" cy="51" r="10" fill="white" />
          <circle
            cx={44 + eyeOffset.x}
            cy={51 + eyeOffset.y}
            r="5"
            fill="#1e3a8a"
          />
          <circle
            cx={44 + eyeOffset.x + 1.5}
            cy={51 + eyeOffset.y - 1.5}
            r="1.5"
            fill="white"
          />

          {/* Right eye */}
          <circle cx="76" cy="51" r="10" fill="white" />
          <circle
            cx={76 + eyeOffset.x}
            cy={51 + eyeOffset.y}
            r="5"
            fill="#1e3a8a"
          />
          <circle
            cx={76 + eyeOffset.x + 1.5}
            cy={51 + eyeOffset.y - 1.5}
            r="1.5"
            fill="white"
          />

          {/* Mouth */}
          <rect x="42" y="63" width="36" height="6" rx="3" fill="#93c5fd" />
          <rect x="46" y="64" width="6" height="4" rx="1" fill="#1d4ed8" />
          <rect x="57" y="64" width="6" height="4" rx="1" fill="#1d4ed8" />
          <rect x="68" y="64" width="6" height="4" rx="1" fill="#1d4ed8" />

          {/* Body */}
          <rect x="30" y="82" width="60" height="38" rx="10" fill="#3b82f6" />
          <rect x="36" y="88" width="20" height="14" rx="4" fill="#1d4ed8" />
          <rect x="64" y="88" width="20" height="14" rx="4" fill="#1d4ed8" />
          <circle cx="60" cy="108" r="5" fill="#93c5fd" />

          {/* Left arm */}
          <rect x="8" y="84" width="18" height="30" rx="9" fill="#3b82f6" />
          <circle cx="17" cy="119" r="7" fill="#2563eb" />

          {/* Right arm */}
          <rect x="94" y="84" width="18" height="30" rx="9" fill="#3b82f6" />
          <circle cx="103" cy="119" r="7" fill="#2563eb" />

          {/* Legs */}
          <rect x="38" y="118" width="16" height="12" rx="6" fill="#2563eb" />
          <rect x="66" y="118" width="16" height="12" rx="6" fill="#2563eb" />
        </svg>
      </div>

      {/* Bot label */}
      <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400 mb-4 text-sm font-medium tracking-widest uppercase">
        <Bot size={16} />
        <span>Unit 404 — Lost in Cyberspace</span>
      </div>

      {/* Headings */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mt-2">
        Oops! Page not found
      </h1>
      <p className="mt-3 text-base sm:text-lg text-gray-500 dark:text-gray-400 text-center max-w-md">
        Looks like this robot wandered off the map. Let&apos;s get you back on track!
      </p>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleGoBack}
          className="btn-secondary inline-flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <Home size={16} />
          Back to Home
        </Link>
      </div>

      {/* Quick link cards */}
      <div className="mt-14 w-full max-w-3xl">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
          Or head somewhere useful
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map(({ href, icon: Icon, title, description }) => (
            <Link
              key={href}
              href={href}
              className="card group p-5 flex flex-col gap-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Fun fact */}
      <div className="mt-14 max-w-lg text-center px-4 py-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <span className="font-bold">Did you know?</span> Our robots have a 0% chance of getting lost. Unlike web pages.
        </p>
      </div>
    </main>
  );
}

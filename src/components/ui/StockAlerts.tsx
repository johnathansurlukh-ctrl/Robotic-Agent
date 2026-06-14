'use client';

import { useEffect, useState } from 'react';
import { Eye, Flame } from 'lucide-react';

type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

// djb2-style hash
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash);
}

// --- StockBadge ---

interface StockBadgeProps {
  status: StockStatus;
  count?: number;
}

export function StockBadge({ status, count }: StockBadgeProps) {
  if (status === 'in_stock' && (count === undefined || count >= 20)) {
    return null;
  }

  if (status === 'out_of_stock') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
        Out of Stock
      </span>
    );
  }

  // low_stock or in_stock with count < 20
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-700">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
      </span>
      {count !== undefined ? `Only ${count} left` : 'Low Stock'}
    </span>
  );
}

// --- LowStockBar ---

interface LowStockBarProps {
  status: StockStatus;
  count: number;
}

export function LowStockBar({ status, count }: LowStockBarProps) {
  const isVisible =
    status === 'low_stock' || status === 'out_of_stock' || count < 30;

  if (!isVisible) {
    return null;
  }

  const fillPercent = Math.min(100, Math.max(0, count));

  // Shift color redder as stock drops below 15%
  const isVeryLow = fillPercent < 15;

  const fillClass = isVeryLow
    ? 'bg-gradient-to-r from-orange-500 to-red-600'
    : 'bg-gradient-to-r from-orange-400 to-red-500';

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Stock level</span>
        <span>{count} remaining</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${fillClass}`}
          style={{ width: `${fillPercent}%` }}
        />
      </div>
    </div>
  );
}

// --- UrgencyTimer ---

interface UrgencyTimerProps {
  productId: string;
}

export function UrgencyTimer({ productId }: UrgencyTimerProps) {
  const [stats, setStats] = useState<{ viewers: number; sold: number } | null>(
    null
  );

  useEffect(() => {
    const hash = djb2Hash(productId);
    // viewers: 4-12 (range of 9)
    const viewers = 4 + (hash % 9);
    // sold: 8-47 (range of 40)
    const sold = 8 + ((hash >> 4) % 40);
    setStats({ viewers, sold });
  }, [productId]);

  if (!stats) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      <span className="flex items-center gap-1 text-blue-600">
        <Eye className="h-4 w-4" />
        <span>
          <strong>{stats.viewers}</strong> viewing now
        </span>
      </span>
      <span className="flex items-center gap-1 text-rose-600">
        <Flame className="h-4 w-4" />
        <span>
          <strong>{stats.sold}</strong> sold today
        </span>
      </span>
    </div>
  );
}

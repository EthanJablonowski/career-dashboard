'use client';

import { formatMonths } from '@/lib/durationUtils';

interface ExperienceMeterProps {
  months: number;
  maxMonths: number;
}

/**
 * ExperienceMeter - displays total experience time with an animated progress bar.
 *
 * - Shows duration as "Xy Ym" format
 * - Animated horizontal bar from 0 -> filled percentage
 * - Respects prefers-reduced-motion via CSS
 * - Uses existing design system colors
 */
export default function ExperienceMeter({ months, maxMonths }: ExperienceMeterProps) {
  if (months <= 0) {
    return null;
  }

  // Calculate target percentage (0-100)
  const targetPercentage = maxMonths > 0 ? Math.min(100, (months / maxMonths) * 100) : 0;

  return (
    <div className="flex items-center gap-2 mt-1">
      {/* Duration text */}
      <span className="text-[10px] text-warm-500 whitespace-nowrap">
        {formatMonths(months)}
      </span>

      {/* Progress bar container */}
      <div className="flex-1 h-1.5 bg-warm-300/50 rounded-full overflow-hidden min-w-[40px] max-w-[60px]">
        {/* Animated fill - uses CSS animation that respects prefers-reduced-motion */}
        <div
          className="h-full bg-sage-500 rounded-full experience-meter-bar"
          style={{ '--target-width': `${targetPercentage}%` } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

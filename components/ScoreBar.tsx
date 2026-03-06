"use client";

import { useEffect, useState } from "react";

/**
 * Reusable animated progress bar with color-coded scoring.
 *
 * Colors:
 * - Green (70+): Good to great
 * - Yellow (50-69): Needs improvement
 * - Red (below 50): Major issues
 */

interface ScoreBarProps {
  label: string;
  score: number;
  maxScore?: number;
}

export default function ScoreBar({
  label,
  score,
  maxScore = 100,
}: ScoreBarProps) {
  // Start at 0 width and animate to the actual score
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const percentage = Math.round((score / maxScore) * 100);

  // Trigger the animation after component mounts
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Pick color based on score
  const barColor =
    score >= 70
      ? "bg-emerald-500"
      : score >= 50
        ? "bg-amber-500"
        : "bg-red-500";

  const textColor =
    score >= 70
      ? "text-emerald-400"
      : score >= 50
        ? "text-amber-400"
        : "text-red-400";

  return (
    <div className="space-y-1.5">
      {/* Label and score number */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-300 capitalize">{label}</span>
        <span className={`font-semibold ${textColor}`}>{score}</span>
      </div>

      {/* Progress bar track */}
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        {/* Animated fill */}
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${barColor}`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
    </div>
  );
}

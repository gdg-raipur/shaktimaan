"use client";

import { useEffect, useState } from "react";
import type { EvaluationResult } from "@/lib/types";
import ScoreBar from "./ScoreBar";

/**
 * Displays the overall evaluation results: big score, summary, and section breakdown.
 * Uses a smooth fade-in animation when it appears.
 */

interface ResultsCardProps {
  result: EvaluationResult;
}

// Human-friendly labels for each section score
const SECTION_LABELS: Record<string, string> = {
  experience: "Experience",
  skills: "Skills",
  education: "Education",
  formatting: "Formatting",
  impact: "Impact",
};

export default function ResultsCard({ result }: ResultsCardProps) {
  // Animate the overall score counting up from 0
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    // Count up to the actual score over ~1 second
    const target = result.overall_score;
    const duration = 1000;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setDisplayScore(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result.overall_score]);

  // Color for the overall score ring
  const scoreColor =
    result.overall_score >= 70
      ? "text-emerald-400 border-emerald-500"
      : result.overall_score >= 50
        ? "text-amber-400 border-amber-500"
        : "text-red-400 border-red-500";

  return (
    <div className="w-full max-w-2xl animate-slide-up">
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-6">
        {/* Overall score + summary */}
        <div className="flex items-center gap-6">
          {/* Big circular score display */}
          <div
            className={`flex-shrink-0 w-24 h-24 rounded-full border-4 flex items-center justify-center ${scoreColor}`}
          >
            <span className="text-3xl font-bold">{displayScore}</span>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              Overall Score
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {result.summary}
            </p>
          </div>
        </div>

        {/* Section score breakdown */}
        <div>
          <h3 className="text-sm font-medium text-slate-400 mb-4">
            Section Breakdown
          </h3>
          <div className="space-y-3">
            {Object.entries(result.section_scores).map(([key, score]) => (
              <ScoreBar
                key={key}
                label={SECTION_LABELS[key] || key}
                score={score}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

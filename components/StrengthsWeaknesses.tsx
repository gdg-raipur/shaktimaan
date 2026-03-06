"use client";

import type { EvaluationResult } from "@/lib/types";

/**
 * Displays strengths, weaknesses, suggestions, and the rewritten bullet.
 * Uses color-coded cards with icons for visual distinction.
 */

interface StrengthsWeaknessesProps {
  result: EvaluationResult;
}

// Checkmark icon for strengths
function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

// Alert icon for weaknesses
function AlertIcon() {
  return (
    <svg className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

// Lightbulb icon for suggestions
function LightbulbIcon() {
  return (
    <svg className="w-4 h-4 text-sky-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

export default function StrengthsWeaknesses({
  result,
}: StrengthsWeaknessesProps) {
  return (
    <div className="w-full max-w-2xl space-y-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
      {/* Strengths & Weaknesses in a two-column grid (stacked on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Strengths panel */}
        <div className="bg-slate-800/50 border border-emerald-500/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-emerald-400 mb-3">
            Strengths
          </h3>
          <ul className="space-y-2">
            {result.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <CheckIcon />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses panel */}
        <div className="bg-slate-800/50 border border-amber-500/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-amber-400 mb-3">
            Weaknesses
          </h3>
          <ul className="space-y-2">
            {result.weaknesses.map((weakness, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <AlertIcon />
                <span>{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions panel — full width */}
      <div className="bg-slate-800/50 border border-sky-500/20 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-sky-400 mb-3">
          Suggestions
        </h3>
        <ul className="space-y-2">
          {result.suggestions.map((suggestion, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <LightbulbIcon />
              <span>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Rewritten bullet — before/after comparison */}
      {result.rewritten_bullet && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-purple-400 mb-3">
            Rewritten Bullet Point
          </h3>
          <p className="text-sm text-slate-400 mb-2">
            Here&apos;s how to improve your weakest bullet:
          </p>
          <div className="bg-slate-900/50 rounded-lg p-3">
            <p className="text-sm text-slate-300 italic">
              &ldquo;{result.rewritten_bullet}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import TextPreview from "@/components/TextPreview";
import ResultsCard from "@/components/ResultsCard";
import StrengthsWeaknesses from "@/components/StrengthsWeaknesses";
import { extractText } from "@/lib/extract";
import type { EvaluationResult } from "@/lib/types";

// Main page — the complete flow: Upload → Extract → Evaluate → View Results

export default function Home() {
  // Extracted resume text
  const [resumeText, setResumeText] = useState<string | null>(null);
  // Evaluation result from Gemini
  const [result, setResult] = useState<EvaluationResult | null>(null);
  // Loading states
  const [isExtracting, setIsExtracting] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  // Error state
  const [error, setError] = useState<string | null>(null);

  // Step 1: User selects a file → extract text
  async function handleFileSelect(file: File) {
    console.log("✅ File received in page:", file.name);

    // Reset all state for a fresh evaluation
    setResumeText(null);
    setResult(null);
    setError(null);
    setIsExtracting(true);

    try {
      const text = await extractText(file);
      console.log("✅ Text extracted successfully, length:", text.length);
      setResumeText(text);
    } catch (err) {
      console.error("❌ Text extraction failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to extract text from file."
      );
    } finally {
      setIsExtracting(false);
    }
  }

  // Step 2: User clicks "Evaluate" → send text to Gemini API
  async function handleEvaluate() {
    if (!resumeText) return;

    console.log("🚀 Starting evaluation...");
    setIsEvaluating(true);
    setError(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Evaluation failed.");
      }

      console.log("✅ Evaluation complete!", data);
      setResult(data as EvaluationResult);
    } catch (err) {
      console.error("❌ Evaluation failed:", err);
      setError(
        err instanceof Error ? err.message : "Failed to evaluate resume."
      );
    } finally {
      setIsEvaluating(false);
    }
  }

  // Reset everything for a new evaluation
  function handleReset() {
    setResumeText(null);
    setResult(null);
    setError(null);
  }

  return (
    <main className="min-h-screen flex flex-col items-center p-8 gap-8">
      {/* Header section */}
      <div className="text-center mt-12 mb-4">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          AI Resume Judge
        </h1>
        <p className="text-slate-400 text-lg max-w-xl">
          Upload your resume. Get instant AI feedback powered by Gemini.
        </p>
      </div>

      {/* Show upload zone only when there are no results yet */}
      {!result && (
        <>
          <UploadZone onFileSelect={handleFileSelect} isLoading={isExtracting} />

          {/* Error message */}
          {error && (
            <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center animate-fade-in">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Show extracted text */}
          {resumeText && <TextPreview text={resumeText} />}

          {/* Evaluate button — appears after text extraction */}
          {resumeText && (
            <button
              onClick={handleEvaluate}
              disabled={isEvaluating}
              className={`
                px-8 py-3 rounded-xl font-medium text-white transition-all duration-200
                ${isEvaluating
                  ? "bg-slate-700 cursor-not-allowed"
                  : "bg-sky-500 hover:bg-sky-400 active:scale-95"
                }
              `}
            >
              {isEvaluating ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing your resume...
                </span>
              ) : (
                "Evaluate with Gemini"
              )}
            </button>
          )}
        </>
      )}

      {/* Results — shown after successful evaluation */}
      {result && (
        <>
          <ResultsCard result={result} />
          <StrengthsWeaknesses result={result} />

          {/* Try another resume button */}
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-xl font-medium text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-white transition-all duration-200 mb-12"
          >
            Try another resume
          </button>
        </>
      )}
    </main>
  );
}

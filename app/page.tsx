"use client";

import { useState } from "react";
import UploadZone from "@/components/UploadZone";
import TextPreview from "@/components/TextPreview";
import { extractText } from "@/lib/extract";

// Main page — handles the flow: Upload → Extract → (Evaluate comes in checkpoint-3)

export default function Home() {
  // Track the extracted text from the resume
  const [resumeText, setResumeText] = useState<string | null>(null);
  // Loading state while extracting text
  const [isExtracting, setIsExtracting] = useState(false);
  // Error state if extraction fails
  const [error, setError] = useState<string | null>(null);

  // Called when the user selects a valid file
  async function handleFileSelect(file: File) {
    console.log("✅ File received in page:", file.name);

    // Reset previous state
    setResumeText(null);
    setError(null);
    setIsExtracting(true);

    try {
      // Extract text from the uploaded file (PDF or DOCX)
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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      {/* Header section */}
      <div className="text-center mb-4">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          AI Resume Judge
        </h1>
        <p className="text-slate-400 text-lg max-w-xl">
          Upload your resume. Get instant AI feedback powered by Gemini.
        </p>
      </div>

      {/* Upload zone — pass isLoading so it shows a spinner during extraction */}
      <UploadZone onFileSelect={handleFileSelect} isLoading={isExtracting} />

      {/* Error message */}
      {error && (
        <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center animate-fade-in">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Show extracted text once available */}
      {resumeText && <TextPreview text={resumeText} />}

      {/* TODO (checkpoint-3): "Evaluate" button and API call */}
      {/* TODO (checkpoint-4): Polished results display */}
    </main>
  );
}

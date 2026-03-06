"use client";

import UploadZone from "@/components/UploadZone";

// This is the main page of the AI Resume Judge app.
// In this checkpoint we've added the UploadZone component.
// The onFileSelect callback just logs the file for now — we'll extract text next!

export default function Home() {
  // Called when the user selects a valid file
  function handleFileSelect(file: File) {
    console.log("✅ File received in page:", file.name);
    // TODO (checkpoint-2): Extract text from the file
    // TODO (checkpoint-3): Send text to the Gemini API for evaluation
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Header section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
          AI Resume Judge
        </h1>
        <p className="text-slate-400 text-lg max-w-xl">
          Upload your resume. Get instant AI feedback powered by Gemini.
        </p>
      </div>

      {/* Upload zone — handles drag & drop and file selection */}
      <UploadZone onFileSelect={handleFileSelect} />
    </main>
  );
}

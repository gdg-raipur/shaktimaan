"use client";

// This is the main page of the AI Resume Judge app.
// Right now it just shows the landing page with a placeholder upload zone.
// We'll build this out step by step in the upcoming checkpoints!

export default function Home() {
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

      {/* Placeholder for the upload zone — we'll replace this in checkpoint-1 */}
      <div className="w-full max-w-2xl border-2 border-dashed border-slate-700 rounded-xl p-12 text-center">
        <p className="text-slate-500 text-lg">Coming soon...</p>
        <p className="text-slate-600 text-sm mt-2">
          The upload zone will appear here in the next checkpoint.
        </p>
      </div>
    </main>
  );
}

"use client";

// Displays the extracted resume text in a scrollable, monospace container.
// Shows character/word count and truncates long text for readability.

const DISPLAY_CHAR_LIMIT = 2000;

interface TextPreviewProps {
  text: string;
}

export default function TextPreview({ text }: TextPreviewProps) {
  // Count words by splitting on whitespace
  const wordCount = text.trim().split(/\s+/).length;
  const charCount = text.length;
  const isTruncated = charCount > DISPLAY_CHAR_LIMIT;

  // Truncate display text if it's really long
  const displayText = isTruncated
    ? text.slice(0, DISPLAY_CHAR_LIMIT)
    : text;

  return (
    <div className="w-full max-w-2xl animate-fade-in">
      {/* Header with stats */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-slate-400">Extracted Text</h3>
        <div className="flex gap-3 text-xs text-slate-500">
          <span>{wordCount.toLocaleString()} words</span>
          <span>{charCount.toLocaleString()} chars</span>
        </div>
      </div>

      {/* Text content — scrollable, monospace */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 max-h-64 overflow-y-auto">
        <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
          {displayText}
        </pre>

        {/* Truncation notice */}
        {isTruncated && (
          <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-slate-700">
            Showing first {DISPLAY_CHAR_LIMIT.toLocaleString()} of{" "}
            {charCount.toLocaleString()} characters
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

// Allowed file types for resume upload
const ACCEPTED_TYPES = [
  "application/pdf",
  ".pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".docx",
];

// Human-readable file size (e.g., "1.2 MB")
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Check if a file is a valid resume format
function isValidFile(file: File): boolean {
  const name = file.name.toLowerCase();
  return name.endsWith(".pdf") || name.endsWith(".docx");
}

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading?: boolean;
}

export default function UploadZone({
  onFileSelect,
  isLoading = false,
}: UploadZoneProps) {
  // Track whether user is dragging a file over the zone
  const [isDragging, setIsDragging] = useState(false);
  // Store the selected file so we can show its info
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Error message for invalid file types
  const [error, setError] = useState<string | null>(null);
  // Hidden file input ref — we trigger it on click
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle a file being chosen (from drag or file picker)
  function handleFile(file: File) {
    console.log("📄 File selected:", file.name, file.type, file.size);

    // Validate file type
    if (!isValidFile(file)) {
      setError("Please upload a PDF or DOCX file.");
      setSelectedFile(null);
      return;
    }

    // Clear any previous error, store the file, and notify parent
    setError(null);
    setSelectedFile(file);
    onFileSelect(file);
  }

  // --- Drag & Drop handlers ---

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault(); // Required to allow drop
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  // --- Click to browse handler ---

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  // Reset everything so the user can pick a new file
  function handleClear() {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="w-full max-w-2xl">
      {/* Drop zone — changes style when dragging over it */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && !isLoading && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center
          transition-all duration-200 cursor-pointer
          ${isDragging
            ? "border-sky-400 bg-sky-400/10"
            : selectedFile
              ? "border-slate-600 bg-slate-800/50"
              : "border-slate-700 hover:border-slate-500 hover:bg-slate-800/30"
          }
          ${isLoading ? "pointer-events-none opacity-60" : ""}
        `}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleInputChange}
          className="hidden"
        />

        {isLoading ? (
          // Loading state — show spinner
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-400">Processing...</p>
          </div>
        ) : selectedFile ? (
          // File selected — show file info
          <div className="flex flex-col items-center gap-3">
            {/* File icon */}
            <div className="w-12 h-12 rounded-lg bg-sky-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">{selectedFile.name}</p>
              <p className="text-slate-400 text-sm">{formatFileSize(selectedFile.size)}</p>
            </div>
            {/* Clear button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Don't trigger the file picker
                handleClear();
              }}
              className="text-sm text-slate-500 hover:text-red-400 transition-colors mt-1"
            >
              Remove file
            </button>
          </div>
        ) : (
          // Empty state — prompt to upload
          <div className="flex flex-col items-center gap-3">
            {/* Upload icon */}
            <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">
                Drop your resume here, or{" "}
                <span className="text-sky-400">browse</span>
              </p>
              <p className="text-slate-500 text-sm mt-1">PDF or DOCX, up to 10 MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
      )}
    </div>
  );
}
